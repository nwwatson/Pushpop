;'use strict';

// Load custom build of Modernizr if an appropriate build has not been loaded.
if (!window['Modernizr'] || Modernizr.touch === undefined || Modernizr.csstransitions === undefined || Modernizr.csstransforms === undefined || Modernizr.csstransforms3d === undefined) {

  /* Modernizr 2.5.2 (Custom Build) | MIT & BSD
   * Build: http://www.modernizr.com/download/#-csstransforms-csstransforms3d-csstransitions-touch-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes
   */
  ;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.substr(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.5.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;","<style>",a,"</style>"].join(""),k.id=h,m.innerHTML+=f,m.appendChild(k),l||g.appendChild(m),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e});var G=function(c,d){var f=c.join(""),g=d.length;w(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j.touch&&j.touch.offsetTop)===9,e.csstransforms3d=(j.csstransforms3d&&j.csstransforms3d.offsetLeft)===9&&j.csstransforms3d.offsetHeight===3},g,d)}([,["@media (",m.join("touch-enabled),("),h,")","{#touch{top:9px;position:absolute}}"].join(""),["@media (",m.join("transform-3d),("),h,")","{#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join("")],[,"touch","csstransforms3d"]);q.touch=function(){return e.touch},q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&(a=e.csstransforms3d),a},q.csstransitions=function(){return F("transition")};for(var H in q)y(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return z(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document);
}

/**
  The base Pushpop object.
*/
var Pushpop = window['Pushpop'] || {};

/**
  Event types for Pushpop.
*/
Pushpop.EventType = {
  WillPushView: 'Pushpop:WillPushView',
  DidPushView: 'Pushpop:DidPushView',
  WillPopView: 'Pushpop:WillPopView',
  DidPopView: 'Pushpop:DidPopView',
  WillDismissView: 'Pushpop:WillDismissView',
  DidDismissView: 'Pushpop:DidDismissView',
  WillPresentView: 'Pushpop:WillPresentView',
  DidPresentView: 'Pushpop:DidPresentView'
};

/**
  Default transition to use for pushing and popping views when no transition is specified.
*/
Pushpop.defaultTransition = 'slide-horizontal';

/**
  Traverses the parents of the specified element and returns the closest Pushpop.ViewStack.
  @param {HTMLElement} element The element for which to find the closest parent view stack.
  @type Pushpop.ViewStack
*/
Pushpop.getViewStackForElement = function(element) {
  var $parents = $(element).parents();
  var viewStack;
  for (var i = 0, length = $parents.length; i < length; i++) if (!!(viewStack = $parents[i].viewStack) && viewStack instanceof Pushpop.ViewStack) return viewStack;
  return null;
};

/**
  Creates a new ViewStack.
  @param {HTMLDivElement} element The DIV element to initialize as a new ViewStack.
  @constructor
*/
Pushpop.ViewStack = function ViewStack(element) {
  if (!element) return;
  
  var $element = this.$element = $(element);
  element = this.element = $element[0];
  
  var viewStack = element.viewStack;
  if (viewStack) return viewStack;
  
  element.viewStack = this;
  
  var views = this.views = [];
  
  var $rootViewElement = $element.children('.pp-view, .pp-split-view').first().addClass('active');
  var rootViewElement = $rootViewElement[0];
  
  if (!rootViewElement) return;
  
  var rootView = this.rootView = rootViewElement.view || new Pushpop.View($rootViewElement.addClass('root'));
  views.push(rootView);
};

Pushpop.ViewStack.prototype = {
  constructor: Pushpop.ViewStack,
  
  element: null,
  $element: null,
  
  views: null,
  rootView: null,
  isTransitioning: false,
  handleEvent: function(evt) {
    switch (evt.type) {
      case 'webkitTransitionEnd':
      case 'transitionend':
      case 'oTransitionEnd':
      case 'transitionEnd':
        var target = evt.target;
        if (!target.view || $(target).hasClass('active')) return;
        
        var newActiveView = target;
        newActiveView = (newActiveView) ? newActiveView.view : null;
        if (!newActiveView) return;
        
        var viewStack = newActiveView.getViewStack();
        if (!viewStack || !viewStack.isTransitioning) return;
        
        var oldActiveView = viewStack.$element.children('.pp-view.active')[0];
        oldActiveView = (oldActiveView) ? oldActiveView.view : null;
        if (!oldActiveView) return;
        
        viewStack.isTransitioning = false;
        $(target).unbind(evt);
        
        var $newActiveViewElement = newActiveView.$element;
        var $oldActiveViewElement = oldActiveView.$element;
        var action = ($newActiveViewElement.hasClass('push') ? 'push' : 'pop');

        $newActiveViewElement.addClass('active');
        $newActiveViewElement.removeClass('transition push pop ' + newActiveView.transition);
        $oldActiveViewElement.removeClass('active transition push pop ' + newActiveView.transition);
        
        if (action === 'push') {
          
          // Trigger an event indicating that the new view was pushed.
          $newActiveViewElement.trigger($.Event(Pushpop.EventType.DidPushView, {
            view: newActiveView
          }));
        } else {
          
          // Trigger an event indicating that the previous view was popped.
          $oldActiveViewElement.trigger($.Event(Pushpop.EventType.DidPopView, {
            view: oldActiveView
          }));
        }
        
        // Trigger an event indicating that the previous view was dismissed.
        $oldActiveViewElement.trigger($.Event(Pushpop.EventType.DidDismissView, {
          view: oldActiveView,
          action: action
        }));
        
        // Trigger an event for each active child view of the previous view indicating
        // that their parent was dismissed.
        $oldActiveViewElement.find('.pp-view-stack').each(function(index, element) {
          var viewStack = element.viewStack;
          var activeView = viewStack.getActiveView();
          if (!activeView) return;
        
          activeView.$element.trigger($.Event(Pushpop.EventType.DidDismissView, {
            view: activeView,
            action: 'parent-' + action
          }));
        });
        
        // Trigger an event indicating that the new view was presented.
        $newActiveViewElement.trigger($.Event(Pushpop.EventType.DidPresentView, {
          view: newActiveView,
          action: action
        }));
        
        // Trigger an event for each active child view of the new view indicating
        // that their parent was presented.
        $newActiveViewElement.find('.pp-view-stack').each(function(index, element) {
          var viewStack = element.viewStack;
          var activeView = viewStack.getActiveView();
          if (!activeView) return;
        
          activeView.$element.trigger($.Event(Pushpop.EventType.DidPresentView, {
            view: activeView,
            action: 'parent-' + action
          }));
        });
        
        // Remove the previous active view from the DOM if it is marked for removal when popped.
        if (action === 'pop' && oldActiveView.getShouldRemoveWhenPopped()) $oldActiveViewElement.remove();
        
        // Call the callback to execute when a push/pop transition completes if one exists.
				if (!viewStack.callback) return;
				viewStack.callback();
				viewStack.callback = null;
        break;
      default:
        break;
    }
  },
  
  /**
    Pushes the specified view to the view stack using the optionally specified transition. If a
    transition is not specified, the default will be used. A callback may optionally be provided
    to be called after the transition completes.
    @param {Pushpop.View} view The view to be pushed to the view stack.
    @param {String|Function} [transitionOrCallback] Either the name of the transition to use when
    pushing the view or a callback function to be executed upon completion of the default transition.
    If this parameter is omitted, the default transition is used.
    @param {Function} [callback] A callback function to be executed upon completion of the specified
    transition.
  */
  push: function(view, transitionOrCallback, callback) {
    var oldActiveView = this.getActiveView();
    var newActiveView = view;
    
    if (newActiveView === oldActiveView) return;
    
    if (this.isTransitioning) {
      // Manually kick off transitionEnd event.  Chances are it should have fired, but didn't.
      if (!oldActiveView) return;
      
      oldActiveView.$element.trigger('transitionend');
    }
    
    this.isTransitioning = true;
    
    var $element = this.$element;
    
    var $oldActiveViewElement = oldActiveView.$element;
    var $newActiveViewElement = newActiveView.$element;
    
    // Trigger an event indicating that the new view is about to be pushed.
    $newActiveViewElement.trigger($.Event(Pushpop.EventType.WillPushView, {
      view: newActiveView
    }));
    
    // Trigger an event indicating that the previous view is about to be dismissed.
    $oldActiveViewElement.trigger($.Event(Pushpop.EventType.WillDismissView, {
      view: oldActiveView,
      action: 'push'
    }));
    
    // Trigger an event for each active child view of the previous view indicating that
    // their parent is about to be dismissed.
    $oldActiveViewElement.find('.pp-view-stack').each(function(index, element) {
      var viewStack = element.viewStack;
      var activeView = viewStack.getActiveView();
      if (!activeView) return;
      
      activeView.$element.trigger($.Event(Pushpop.EventType.WillDismissView, {
        view: activeView,
        action: 'parent-push'
      }));
    });
    
    // Trigger an event indicating that the new view is about to be presented.
    $newActiveViewElement.trigger($.Event(Pushpop.EventType.WillPresentView, {
      view: newActiveView,
      action: 'push'
    }));
    
    // Trigger an event for each active child view of the new view indicating that
    // their parent is about to be presented.
    $newActiveViewElement.find('.pp-view-stack').each(function(index, element) {
      var viewStack = element.viewStack;
      var activeView = viewStack.getActiveView();
      if (!activeView) return;
      
      activeView.$element.trigger($.Event(Pushpop.EventType.WillPresentView, {
        view: activeView,
        action: 'parent-push'
      }));
    });
    
    this.views.push(newActiveView);

    $newActiveViewElement.bind('webkitTransitionEnd transitionend oTransitionEnd transitionEnd', this.handleEvent);
    
		var transition;
		if (transitionOrCallback) {
			if (typeof transitionOrCallback === 'function') {
				this.callback = transitionOrCallback;
			} else {
				transition = transitionOrCallback;
				this.callback = callback;
			}
		}

    transition = newActiveView.transition = transition || newActiveView.transition || Pushpop.defaultTransition;
    
    $oldActiveViewElement.addClass('push ' + transition);
    $newActiveViewElement.addClass('push ' + transition);
    
    oldActiveView.forceReflow();
    newActiveView.forceReflow();
    
    $oldActiveViewElement.addClass('transition');
    $newActiveViewElement.addClass('transition');
  },
  
  /**
    Pops the current or specified view off the view stack using the optionally specified transition.
    If a view is not specified, the current view will be popped (unless it is the root view). If a 
    transition is not specified, the default will be used. A callback may optionally be provided to
    be called after the transition completes.
    @param {Pushpop.View|String} viewOrTransition Either the view to be popped to on the view stack
    or the name of the transition to use when popping the view. If this parameter is omitted or if
    it specifies a transition name, the current view will be assumed to be popped.
    @param {String|Function} [transitionOrCallback] Either the name of the transition to use when
    popping the view or a callback function to be executed upon completion of the default transition.
    If this parameter is omitted, the default transition is used.
    @param {Function} [callback] A callback function to be executed upon completion of the specified
    transition.
  */
  pop: function(viewOrTransition, transitionOrCallback, callback) {
    var oldActiveView = this.getActiveView();
    var newActiveView, transition;
    
    if (this.isTransitioning) {
      // Manually kick off transitionEnd event.  Chances are it should have fired, but didn't.
      if (!oldActiveView) return;
      
      oldActiveView.$element.trigger('transitionend');
    }
    
    this.isTransitioning = true;
    
    var views = this.views;
    if (views.length <= 1) return;
    
    if (viewOrTransition && typeof viewOrTransition !== 'string') {
      newActiveView = viewOrTransition;
      
      if (newActiveView === oldActiveView) return;
      
      if (this.containsView(newActiveView)) {
        while (views.length > 1 && this.getActiveView() !== newActiveView) {
          views.pop();
        }
      }
    } else {
      if (viewOrTransition) transition = viewOrTransition;
      
      views.pop();
      newActiveView = this.getActiveView();
    }

		if (transitionOrCallback) {
			if (typeof transitionOrCallback === 'function') {
				this.callback = transitionOrCallback;
			} else {
				transition = transitionOrCallback;
				this.callback = callback;
			}
		}
    
    var $element = this.$element;
    
    var $oldActiveViewElement = oldActiveView.$element;
    var $newActiveViewElement = newActiveView.$element;
    
    // Trigger an event indicating that the previous view is about to be popped.
    $oldActiveViewElement.trigger($.Event(Pushpop.EventType.WillPopView, {
      view: oldActiveView
    }));
    
    // Trigger an event indicating that the previous view is about to be dismissed.
    $oldActiveViewElement.trigger($.Event(Pushpop.EventType.WillDismissView, {
      view: oldActiveView,
      action: 'pop'
    }));
    
    // Trigger an event for each active child view of the previous view indicating that
    // their parent is about to be dismissed.
    $oldActiveViewElement.find('.pp-view-stack').each(function(index, element) {
      var viewStack = element.viewStack;
      var activeView = viewStack.getActiveView();
      if (!activeView) return;
      
      activeView.$element.trigger($.Event(Pushpop.EventType.WillDismissView, {
        view: activeView,
        action: 'parent-pop'
      }));
    });
    
    // Trigger an event indicating that the new view is about to be presented.
    $newActiveViewElement.trigger($.Event(Pushpop.EventType.WillPresentView, {
      view: newActiveView,
      action: 'pop'
    }));
    
    // Trigger an event for each active child view of the new view indicating that
    // their parent is about to be presented.
    $newActiveViewElement.find('.pp-view-stack').each(function(index, element) {
      var viewStack = element.viewStack;
      var activeView = viewStack.getActiveView();
      if (!activeView) return;
      
      activeView.$element.trigger($.Event(Pushpop.EventType.WillPresentView, {
        view: activeView,
        action: 'parent-pop'
      }));
    });
    
    $newActiveViewElement.bind('webkitTransitionEnd transitionend oTransitionEnd transitionEnd', this.handleEvent);
    
    transition = newActiveView.transition = transition || oldActiveView.transition || Pushpop.defaultTransition;
    
    $oldActiveViewElement.addClass('pop ' + transition);
    $newActiveViewElement.addClass('pop ' + transition);
    
    oldActiveView.forceReflow();
    newActiveView.forceReflow();
    
    $oldActiveViewElement.addClass('transition');
    $newActiveViewElement.addClass('transition');
  },
  
  /**
    Returns the current active (topmost) Pushpop.View on this view stack.
    @type Pushpop.View
  */
  getActiveView: function() {
    var views = this.views;
    var viewCount = views.length;
    
    return (viewCount === 0) ? null : views[viewCount - 1];
  },
  
  /**
    Returns a flag indicating if the specified Pushpop.View is contained wihin this
    view stack.
    @param {Pushpop.View} view The view to search for in this view stack.
    @type Boolean
  */
  containsView: function(view) {
    var views = this.views;
    var viewCount = views.length;
    
    for (var i = viewCount - 1; i >= 0; i--) if (views[i] === view) return true;
    return false;
  },
  
  /**
    Creates a new view and pushes it to the view stack using the optionally specified transition.
    Before pushing the view, a required callback is called that passes in the newly-created view to
    give an opportunity to set up the view's content. If a transition is not specified, the default
    will be used. A callback may optionally be provided to be called after the transition completes.
    @description NOTE: By default, the newly-created view is marked for removal from the DOM when it
    is popped.
    @param {Function} beforePushCallback A callback function to be executed before the newly-created
    view is pushed. The function is called with a single parameter passing the view to be pushed.
    @param {String|Function} [transitionOrCallback] Either the name of the transition to use when
    pushing the view or a callback function to be executed upon completion of the default transition.
    If this parameter is omitted, the default transition is used.
    @param {Function} [callback] A callback function to be executed upon completion of the specified
    transition.
  */
  pushNewView: function(beforePushCallback, transitionOrCallback, callback) {
    var $viewElement = $('<div class="pp-view"/>').appendTo(this.$element);
    var view = new Pushpop.View($viewElement);
    
    view.setShouldRemoveWhenPopped(true);
    
    if (beforePushCallback && typeof beforePushCallback === 'function') beforePushCallback(view);
    
    this.push(view, transitionOrCallback, callback);
  },
  
  /**
    Creates a new view with a new table view and pushes it to the view stack using the optionally
    specified transition. Before pushing the view, a required callback is called that passes in the
    newly-created table view to give an opportunity to set up the table view's data source and other
    properties. If a transition is not specified, the default will be used. A callback may optionally
    be provided to be called after the transition completes.
    @description NOTE: By default, the newly-created view containing the newly-created table view is
    marked for removal from the DOM when it is popped.
    @param {Function} beforePushCallback A callback function to be executed before the newly-created
    view is pushed. The function is called with a single parameter passing the newly-created table
    view contained in the view to be pushed.
    @param {String|Function} [transitionOrCallback] Either the name of the transition to use when
    pushing the view or a callback function to be executed upon completion of the default transition.
    If this parameter is omitted, the default transition is used.
    @param {Function} [callback] A callback function to be executed upon completion of the specified
    transition.
  */
  pushNewTableView: function(beforePushCallback, transitionOrCallback, callback) {
    var $viewElement = $('<div class="pp-view"/>').appendTo(this.$element);
    var $scrollViewElement = $('<div class="sk-scroll-view" data-always-bounce-vertical="true"/>').appendTo($viewElement);
    var $tableViewElement = $('<ul class="pp-table-view"/>').appendTo($scrollViewElement);
    var view = new Pushpop.View($viewElement);
    var scrollView = new ScrollKit.ScrollView($scrollViewElement);
    var tableView = new Pushpop.TableView($tableViewElement);
    
    view.setShouldRemoveWhenPopped(true);
    
    if (beforePushCallback && typeof beforePushCallback === 'function') beforePushCallback(tableView);
    
    this.push(view, transitionOrCallback, callback);
  }
};

/**
  Creates a new View.
  @param {HTMLDivElement} element The DIV element to initialize as a new View.
  @constructor
*/
Pushpop.View = function View(element) {
  if (!element) return;
  
  var $element = this.$element = $(element);
  element = this.element = $element[0];
  
  var view = element.view;
  if (view) return view;
  
  element.view = this;
  
  this.title = $element.attr('data-view-title');
  var $navbarButtonsContainer = $element.find('.pp-navigationbar-buttons');
  var $navbarButtons = this.$navbarButtons = $navbarButtonsContainer.find('.pp-barbutton');
  
  // Hide the back button if data-hide-back-button="true" or if there is a left navigation bar
  var dataHideBackButton = $navbarButtonsContainer.attr('data-hide-back-button');
  this.hideNavBackButton = ((dataHideBackButton && dataHideBackButton !== 'false') || $navbarButtons.filter('.pp-barbutton-align-left').length > 0);
};

Pushpop.View.prototype = {
  constructor: Pushpop.View,
  
  element: null,
  $element: null,
  
  transition: null,
  title: null,
  $navbarButtons: null,
  hideNavBackButton: false,
  
  /**
    Sets the transition that should be used when pushing or popping to this view.
    @param {String} value The name of the transition to be used when pushing or popping
    to this view.
  */
  setTransition: function(value) {
    this.transition = value;
    this.$element.addClass(value);
  },
  
  /**
    Sets the title for this view.
    @description The title is stored in the |data-view-title| attribute of this view's
    element. NOTE: When a Pushpop.NavigationBar is used in conjunction with this view's
    view stack, this view's title will appear in the navigation bar when it is the active
    view.
    @param {String} value The title for this view.
  */
  setTitle: function(value) {
    this.title = value;
    this.$element.attr('data-view-title', value);
  },
  
  _shouldRemoveWhenPopped: false,
  
  getShouldRemoveWhenPopped: function() { return this._shouldRemoveWhenPopped; },
  
  setShouldRemoveWhenPopped: function(shouldRemoveWhenPopped) { this._shouldRemoveWhenPopped = shouldRemoveWhenPopped; },
  
  /**
    Traverses the parents of this view's element and returns the closest Pushpop.ViewStack.
    @type Pushpop.ViewStack
  */
  getViewStack: function() { return Pushpop.getViewStackForElement(this.$element); },
  
  /**
    Forces a reflow in the browser for this view.
  */
  forceReflow: function() { this.element.offsetWidth; },
  
	setBackButtonVisible: function(visible) {
	  if (this.$navbarButtons.filter('.pp-barbutton-align-left').length === 0) this.hideNavBackButton = !visible;
	},
	
	/**
	  Convenience accessor for jQuery's .bind() method.
	*/
	$bind: function() { this.$element.bind.apply(this.$element, arguments); },
	
	/**
	  Convenience accessor for jQuery's .unbind() method.
	*/
	$unbind: function() { this.$element.unbind.apply(this.$element, arguments); },
	
	/**
	  Convenience accessor for jQuery's .delegate() method.
	*/
	$delegate: function() { this.$element.delegate.apply(this.$element, arguments); },
	
	/**
	  Convenience accessor for jQuery's .undelegate() method.
	*/
	$undelegate: function() { this.$element.undelegate.apply(this.$element, arguments); },
	
	/**
	  Convenience accessor for jQuery's .trigger() method.
	*/
	$trigger: function() { this.$element.trigger.apply(this.$element, arguments); }
};

$(function() {
  $('.pp-view').each(function(index, element) { new Pushpop.View(element); });
  $('.pp-view-stack').each(function(index, element) { new Pushpop.ViewStack(element); });
  
  $(document).bind('touchstart', function() {});
  
  // TODO: Remove legacy .push class.
  $('a.pp-push, a.push').live('click', function(evt) {
    evt.preventDefault();
    
    var $this = $(this);
    var href = $this.attr('href');
    var $viewElement, view, viewStack;
    
    $viewElement = $(href);
    if ($viewElement.length === 0) return;
    
    view = $viewElement[0].view || new Pushpop.View($viewElement);
    
    viewStack = view.getViewStack();
    if (viewStack) viewStack.push(view, $this.attr('data-transition'));
  });
  
  // TODO: Remove legacy .pop class.
  $('a.pp-pop, a.pop').live('click', function(evt) {
    evt.preventDefault();
    
    var $this = $(this);
    var href = $this.attr('href');
    var $viewElement, view, viewStack;
    
    if (href === '#') {
      viewStack = Pushpop.getViewStackForElement($this);
      if (viewStack) viewStack.pop($this.attr('data-transition'));
    } else {
      $viewElement = $(href);
      if ($viewElement.length === 0) return;
      
      view = $viewElement[0].view || new Pushpop.View($viewElement);
      
      viewStack = view.getViewStack();      
      if (viewStack) viewStack.pop(view, $this.attr('data-transition'));
    }
  });
});
