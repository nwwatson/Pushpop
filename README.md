Pushpop
=======

Creates animated transitions between views resembling those found in mobile apps in CSS3.

Usage
-----

Simply drop the CSS onto any page:

``` html
<link rel="stylesheet" href="pushpop.css"/>
```

Then, include the JavaScript with jQuery:

``` html
<script src="jquery-1.7.1.min.js"></script>
<script src="pushpop.js"></script>
```

See the included demo page for usage.

Documentation
-------------
The documentation for this project is generated using the node-jsdoc-toolkit with the "bootdoc" Twitter Boostrap theme. In order to properly skip generating documentation for included libraries (i.e.: jQuery, Twitter Bootstrap), the toolkit should be executed as follows:

$ app/run.js -a -r=3 -E="jquery|bootstrap|generate|tableview" -t=templates/bootdoc /path/to/pushpop

Internet Explorer Support
-------------------------
There is currently no support for old versions of IE (6-9), however, support is planned in the near future.

Related Links:
http://msdn.microsoft.com/en-us/library/ms532847(v=vs.85).aspx
http://samples.msdn.microsoft.com/workshop/samples/author/dhtml/overview/FiltWzrd.htm
http://samples.msdn.microsoft.com/workshop/samples/author/dhtml/overview/trnswzrd.htm
http://www.useragentman.com/blog/2010/03/09/cross-browser-css-transforms-even-in-ie/
http://www.useragentman.com/IETransformsTranslator/
http://css3please.com/
http://selectivizr.com/

License
---------------------
Copyright 2011 Entropi Software, LLC.

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
