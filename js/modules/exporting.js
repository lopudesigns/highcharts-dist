/*
 Highcharts JS v6.0.0 (2017-10-04)
 Exporting module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(p){"object"===typeof module&&module.exports?module.exports=p:p(Highcharts)})(function(p){(function(f){var p=f.defaultOptions,y=f.doc,C=f.Chart,t=f.addEvent,L=f.removeEvent,I=f.fireEvent,n=f.createElement,E=f.discardElement,J=f.css,w=f.merge,F=f.pick,m=f.each,G=f.objectEach,x=f.extend,z=f.win,K=z.navigator.userAgent,H=f.SVGRenderer,M=f.Renderer.prototype.symbols,N=/Edge\/|Trident\/|MSIE /.test(K),O=/firefox/i.test(K);x(p.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",
downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});p.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};p.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",
menuItems:"printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")}},menuItemDefinitions:{printChart:{textKey:"printChart",onclick:function(){this.print()}},separator:{separator:!0},downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChart()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},downloadSVG:{textKey:"downloadSVG",
onclick:function(){this.exportChart({type:"image/svg+xml"})}}}};f.post=function(a,b,d){var c=n("form",w({method:"post",action:a,enctype:"multipart/form-data"},d),{display:"none"},y.body);G(b,function(a,b){n("input",{type:"hidden",name:b,value:a},null,c)});c.submit();E(c)};x(C.prototype,{sanitizeSVG:function(a,b){if(b&&b.exporting&&b.exporting.allowHTML){var d=a.match(/<\/svg>(.*?$)/);d&&d[1]&&(d='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+b.chart.width+'" height\x3d"'+b.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+
d[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",a=a.replace("\x3c/svg\x3e",d+"\x3c/svg\x3e"))}return a=a.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,
'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad")},getChartHTML:function(){this.inlineStyles();return this.container.innerHTML},getSVG:function(a){var b,d,c,u,k,g=w(this.options,a);d=n("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},y.body);c=this.renderTo.style.width;k=this.renderTo.style.height;c=g.exporting.sourceWidth||g.chart.width||/px$/.test(c)&&parseInt(c,10)||600;k=g.exporting.sourceHeight||
g.chart.height||/px$/.test(k)&&parseInt(k,10)||400;x(g.chart,{animation:!1,renderTo:d,forExport:!0,renderer:"SVGRenderer",width:c,height:k});g.exporting.enabled=!1;delete g.data;g.series=[];m(this.series,function(a){u=w(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});u.isInternal||g.series.push(u)});m(this.axes,function(a){a.userOptions.internalKey||(a.userOptions.internalKey=f.uniqueKey())});b=new f.Chart(g,this.callback);a&&m(["xAxis","yAxis","series"],function(c){var e=
{};a[c]&&(e[c]=a[c],b.update(e))});m(this.axes,function(a){var c=f.find(b.axes,function(b){return b.options.internalKey===a.userOptions.internalKey}),e=a.getExtremes(),d=e.userMin,e=e.userMax;!c||void 0===d&&void 0===e||c.setExtremes(d,e,!0,!1)});c=b.getChartHTML();c=this.sanitizeSVG(c,g);g=null;b.destroy();E(d);return c},getSVGForExport:function(a,b){var d=this.options.exporting;return this.getSVG(w({chart:{borderRadius:0}},d.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||d.sourceWidth,
sourceHeight:a&&a.sourceHeight||d.sourceHeight}}))},exportChart:function(a,b){b=this.getSVGForExport(a,b);a=w(this.options.exporting,a);f.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale,svg:b},a.formAttributes)},print:function(){var a=this,b=a.container,d=[],c=b.parentNode,f=y.body,k=f.childNodes,g=a.options.exporting.printMaxWidth,e,l;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);I(a,"beforePrint");if(l=g&&a.chartWidth>g)e=[a.options.chart.width,void 0,
!1],a.setSize(g,void 0,!1);m(k,function(a,b){1===a.nodeType&&(d[b]=a.style.display,a.style.display="none")});f.appendChild(b);z.focus();z.print();setTimeout(function(){c.appendChild(b);m(k,function(a,b){1===a.nodeType&&(a.style.display=d[b])});a.isPrinting=!1;l&&a.setSize.apply(a,e);I(a,"afterPrint")},1E3)}},contextMenu:function(a,b,d,c,u,k,g){var e=this,l=e.chartWidth,q=e.chartHeight,r="cache-"+a,h=e[r],B=Math.max(u,k),D,v;h||(e[r]=h=n("div",{className:a},{position:"absolute",zIndex:1E3,padding:B+
"px"},e.container),D=n("div",{className:"highcharts-menu"},null,h),v=function(){J(h,{display:"none"});g&&g.setState(0);e.openMenu=!1},e.exportEvents.push(t(h,"mouseleave",function(){h.hideTimer=setTimeout(v,500)}),t(h,"mouseenter",function(){clearTimeout(h.hideTimer)}),t(y,"mouseup",function(b){e.pointer.inClass(b.target,a)||v()})),m(b,function(a){"string"===typeof a&&(a=e.options.exporting.menuItemDefinitions[a]);if(f.isObject(a,!0)){var b;b=a.separator?n("hr",null,null,D):n("div",{className:"highcharts-menu-item",
onclick:function(b){b&&b.stopPropagation();v();a.onclick&&a.onclick.apply(e,arguments)},innerHTML:a.text||e.options.lang[a.textKey]},null,D);e.exportDivElements.push(b)}}),e.exportDivElements.push(D,h),e.exportMenuWidth=h.offsetWidth,e.exportMenuHeight=h.offsetHeight);b={display:"block"};d+e.exportMenuWidth>l?b.right=l-d-u-B+"px":b.left=d-B+"px";c+k+e.exportMenuHeight>q&&"top"!==g.alignOptions.verticalAlign?b.bottom=q-c-B+"px":b.top=c+k-B+"px";J(h,b);e.openMenu=!0},addButton:function(a){var b=this,
d=b.renderer,c=w(b.options.navigation.buttonOptions,a),f=c.onclick,k=c.menuItems,g,e,l=c.symbolSize||12;b.btnCount||(b.btnCount=0);b.exportDivElements||(b.exportDivElements=[],b.exportSVGElements=[]);if(!1!==c.enabled){var q=c.theme,r=q.states,h=r&&r.hover,r=r&&r.select,m;delete q.states;f?m=function(a){a.stopPropagation();f.call(b,a)}:k&&(m=function(){b.contextMenu(e.menuClassName,k,e.translateX,e.translateY,e.width,e.height,e);e.setState(2)});c.text&&c.symbol?q.paddingLeft=F(q.paddingLeft,25):c.text||
x(q,{width:c.width,height:c.height,padding:0});e=d.button(c.text,0,0,m,q,h,r).addClass(a.className).attr({title:b.options.lang[c._titleKey],zIndex:3});e.menuClassName=a.menuClassName||"highcharts-menu-"+b.btnCount++;c.symbol&&(g=d.symbol(c.symbol,c.symbolX-l/2,c.symbolY-l/2,l,l).addClass("highcharts-button-symbol").attr({zIndex:1}).add(e));e.add().align(x(c,{width:e.width,x:F(c.x,b.buttonOffset)}),!0,"spacingBox");b.buttonOffset+=(e.width+c.buttonSpacing)*("right"===c.align?-1:1);b.exportSVGElements.push(e,
g)}},destroyExport:function(a){var b=a?a.target:this;a=b.exportSVGElements;var d=b.exportDivElements,c=b.exportEvents,f;a&&(m(a,function(a,c){a&&(a.onclick=a.ontouchstart=null,f="cache-"+a.menuClassName,b[f]&&delete b[f],b.exportSVGElements[c]=a.destroy())}),a.length=0);d&&(m(d,function(a,c){clearTimeout(a.hideTimer);L(a,"mouseleave");b.exportDivElements[c]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null;E(a)}),d.length=0);c&&(m(c,function(a){a()}),c.length=0)}});H.prototype.inlineToAttributes=
"fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");H.prototype.inlineBlacklist=[/-/,/^(clipPath|cssText|d|height|width)$/,/^font$/,/[lL]ogical(Width|Height)$/,/perspective/,/TapHighlightColor/,/^transition/];H.prototype.unstyledElements=["clipPath","defs","desc"];C.prototype.inlineStyles=function(){function a(a){return a.replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()})}function b(d){function r(b,f){n=t=!1;if(k){for(A=k.length;A--&&!t;)t=k[A].test(f);n=!t}"transform"===
f&&"none"===b&&(n=!0);for(A=u.length;A--&&!n;)n=u[A].test(f)||"function"===typeof b;n||q[f]!==b&&e[d.nodeName][f]!==b&&(-1!==c.indexOf(f)?d.setAttribute(a(f),b):p+=a(f)+":"+b+";")}var h,q,p="",v,n,t,A;if(1===d.nodeType&&-1===g.indexOf(d.nodeName)){h=z.getComputedStyle(d,null);q="svg"===d.nodeName?{}:z.getComputedStyle(d.parentNode,null);e[d.nodeName]||(l||(l=y.createElementNS(f.SVG_NS,"svg"),l.setAttribute("version","1.1"),y.body.appendChild(l)),v=y.createElementNS(d.namespaceURI,d.nodeName),l.appendChild(v),
e[d.nodeName]=w(z.getComputedStyle(v,null)),l.removeChild(v));if(O||N)for(var x in h)r(h[x],x);else G(h,r);p&&(h=d.getAttribute("style"),d.setAttribute("style",(h?h+";":"")+p));"svg"===d.nodeName&&d.setAttribute("stroke-width","1px");"text"!==d.nodeName&&m(d.children||d.childNodes,b)}}var d=this.renderer,c=d.inlineToAttributes,u=d.inlineBlacklist,k=d.inlineWhitelist,g=d.unstyledElements,e={},l;b(this.container.querySelector("svg"));l.parentNode.removeChild(l)};M.menu=function(a,b,d,c){return["M",
a,b+2.5,"L",a+d,b+2.5,"M",a,b+c/2+.5,"L",a+d,b+c/2+.5,"M",a,b+c-1.5,"L",a+d,b+c-1.5]};C.prototype.renderExporting=function(){var a=this,b=a.options.exporting,d=b.buttons,c=a.isDirtyExporting||!a.exportSVGElements;a.buttonOffset=0;a.isDirtyExporting&&a.destroyExport();c&&!1!==b.enabled&&(a.exportEvents=[],G(d,function(b){a.addButton(b)}),a.isDirtyExporting=!1);t(a,"destroy",a.destroyExport)};C.prototype.callbacks.push(function(a){a.renderExporting();t(a,"redraw",a.renderExporting);m(["exporting","navigation"],
function(b){a[b]={update:function(d,c){a.isDirtyExporting=!0;w(!0,a.options[b],d);F(c,!0)&&a.redraw()}}})})})(p)});
