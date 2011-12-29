var Pushpop = {
  views: [],
  handleEvent: function(evt) {
    switch (evt.type) {
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'transitionend':
        var activeView = Pushpop.activeView();
        var $activeViewElement = $('.view.active');
        var $newActiveViewElement = $(activeView.element);
        
        if (!Pushpop.isGecko()) {
          $(document.documentElement).removeClass('transition');
        }
        
        $activeViewElement.removeClass('active push pop transition ' +
          'slideHorizontal slideVertical flipHorizontal flipVertical cardSwap crossFade zoom');
        $newActiveViewElement.removeClass('push pop transition ' +
          'slideHorizontal slideVertical flipHorizontal flipVertical cardSwap crossFade zoom');
        
        $newActiveViewElement.addClass('active')
          .unbind('webkitTransitionEnd').unbind('oTransitionEnd').unbind('transitionend');
        
        $(document.body).animate({
          scrollLeft: activeView.scrollX,
          scrollTop: activeView.scrollY
        }, 400);
        break;
      default:
        break;
    }
  },
  isGecko: function() {
    if (this._isGecko !== undefined) {
      return this._isGecko;
    }
    
    var cssStyleDeclarations = Object.keys(CSSStyleDeclaration.prototype);
    
    for (var i = 0; i < cssStyleDeclarations.length; i++) {
      if (cssStyleDeclarations[i].match(/^Moz/)) {
        return this._isGecko = true;
      }
    }
    
    return this._isGecko = false;
  },
  activeView: function() {
    var views = this.views;
    
    return views[views.length - 1];
  },
  getView: function(viewOrHref) {
    var views = this.views;
    var view, i;
    
    if (typeof viewOrHref === 'string') {
      for (i = 0; i < views.length; i++) {
        view = views[i];
      
        if (view.href === viewOrHref) {
          return view;
        }
      }
    } else {
      for (i = 0; i < views.length; i++) {
        view = views[i];
      
        if (view === viewOrHref) {
          return view;
        }
      }
    }
    
    return null;
  },
  push: function(view, transition) {
    var views = this.views;
    var isGecko = this.isGecko();
    var activeView, newActiveView;
    
    view.isRoot = views.length === 0;
    
    if (!view.isRoot) {
      activeView = this.activeView();
      newActiveView = view;
    }
    
    views.push(view);
    
    if (view.isRoot) return;

    activeView.scrollX = window.scrollX;
    activeView.scrollY = window.scrollY;
    
    window.scrollTo(0, 0);
    
    var $activeViewElement = $(activeView.element);
    var $newActiveViewElement = $(newActiveView.element);
    
    if (isGecko) {
      if (transition === 'flipHorizontal') {
        transition = 'slideHorizontal';
      }

      else if (transition === 'flipVertical') {
        transition = 'slideVertical';
      }
      
      else if (transition === 'cardSwap') {
        transition = 'zoom';
      }
    }
    
    $activeViewElement.addClass(transition + ' push');
    $newActiveViewElement.addClass(transition + ' push');
    
    $newActiveViewElement.bind('webkitTransitionEnd oTransitionEnd transitionend', this.handleEvent);
    
    setTimeout(function() {
      if (!isGecko) {
        $(document.documentElement).addClass('transition');
      }
      
      $activeViewElement.addClass('transition');
      $newActiveViewElement.addClass('transition');
    }, isGecko ? 100 : 0);
  },
  pop: function(viewOrTransition, transition) {
    var views = this.views;
    var isGecko = this.isGecko();
    var activeView, newActiveView;
    
    if (views.length <= 1) return;
    
    window.scrollTo(0, 0);
    
    activeView = this.activeView();
    
    if (typeof viewOrTransition === 'string') {
      transition = viewOrTransition;
    } else {
      newActiveView = viewOrTransition;
    }
  
    if (newActiveView) {
      var isOnStack = this.getView(newActiveView) !== null;
  
      if (isOnStack) {
        while (this.activeView() !== newActiveView) {
          views.pop();
        }
      }
    }
  
    else {
      views.pop();
      newActiveView = this.activeView();
    }
    
    var $activeViewElement = $(activeView.element);
    var $newActiveViewElement = $(newActiveView.element);
    
    if (isGecko) {
      if (transition === 'flipHorizontal') {
        transition = 'slideHorizontal';
      }

      else if (transition === 'flipVertical') {
        transition = 'slideVertical';
      }
      
      else if (transition === 'cardSwap') {
        transition = 'zoom';
      }
    }
    
    $activeViewElement.addClass(transition + ' pop');
    $newActiveViewElement.addClass(transition + ' pop');
    
    $newActiveViewElement.bind('webkitTransitionEnd oTransitionEnd transitionend', this.handleEvent);
    
    setTimeout(function() {
      if (!isGecko) {
        $(document.documentElement).addClass('transition');
      }
      
      $activeViewElement.addClass('transition');
      $newActiveViewElement.addClass('transition');
    }, isGecko ? 100 : 0);
  }
};

Pushpop.View = function(elementOrHref) {
  var $element;
  
  if (typeof elementOrHref === 'string') {
    var isHash = elementOrHref.charAt(0) === '#';
    
    // Target view is a <div/>.
    if (isHash) {
      $element = $(elementOrHref);
    }
    
    // Target view is a new <iframe/>.
    else {
      $element = $('<iframe class="view" src="' + elementOrHref + '"/>');
      $(document.body).append($element);
    }
    
    this.href = elementOrHref;
  }
  
  else if (elementOrHref.hasClass('view')) {
    $element = $(elementOrHref);
    
    // Target view is a <div/>.
    if ($element.is('div')) {
      this.href = '#' + $element.attr('id');
    }
    
    // Target view is a new <iframe/>.
    else {
      this.href = $element.attr('src');
    }
  }
  
  if ($element && $element.size() === 1) {
    $element.data('view', this);
    this.element = $element.get(0);
  }
};

Pushpop.View.prototype = {
  element: null,
  isRoot: false,
  href: '',
  scrollX: 0,
  scrollY: 0
};

$(function() {
  
  // Set the first <div class="view"/> child of the document body as the root View.
  Pushpop.push(new Pushpop.View($('body > div.view:first').addClass('active')));
  
  // Attach all Views as immediate children of the document body.
  var body = $(document.body);
  
  $('.view').each(function(index, element) {
    body.append(element);
  });
  
  // Attach a click event handler to all anchor links set up for push or pop.
  $('a.push, a.pop').live('click', function(evt) {
    var $this = $(this);
    var href = $this.attr('href');
    var isPop = $this.hasClass('pop');
    var transition;
    
    if ($this.hasClass('slideHorizontal')) {
      transition = 'slideHorizontal';
    }
    
    else if ($this.hasClass('slideVertical')) {
      transition = 'slideVertical';
    }
    
    else if ($this.hasClass('flipHorizontal')) {
      transition = 'flipHorizontal';
    }
    
    else if ($this.hasClass('flipVertical')) {
      transition = 'flipVertical';
    }
    
    else if ($this.hasClass('cardSwap')) {
      transition = 'cardSwap';
    }
    
    else if ($this.hasClass('crossFade')) {
      transition = 'crossFade';
    }
    
    else if ($this.hasClass('zoom')) {
      transition = 'zoom';
    }
    
    if (transition) {
      if (isPop && href === '#') {
        Pushpop.pop(transition);
      }
  
      else {
        var view = Pushpop.getView(href) || new Pushpop.View(href);
    
        if (isPop) {
          Pushpop.pop(view, transition);
        }
    
        else {
          Pushpop.push(view, transition);
        }
      }
    }
    
    evt.preventDefault();
  });
  
});
