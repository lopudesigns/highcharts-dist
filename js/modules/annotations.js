/*
 Highcharts JS v6.1.0-modified (2018-06-14)
 Annotations module

 (c) 2009-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(l){"object"===typeof module&&module.exports?module.exports=l:l(Highcharts)})(function(l){(function(f){var m=f.merge,l=f.addEvent,v=f.extend,n=f.each,C=f.isString,z=f.isNumber,p=f.defined,D=f.isObject,u=f.erase,E=f.find,F=f.format,w=f.pick,G=f.uniqueKey,H=f.destroyObjectProperties,I=f.grep,A=f.Tooltip.prototype,J=f.Series.prototype,B=f.Chart.prototype,K={arrow:{tagName:"marker",render:!1,id:"arrow",refY:5,refX:5,markerWidth:10,markerHeight:10,children:[{tagName:"path",d:"M 0 0 L 10 5 L 0 10 Z"}]}},
q={markerSetter:function(a){return function(b){this.attr(a,"url(#"+b+")")}}};v(q,{markerEndSetter:q.markerSetter("marker-end"),markerStartSetter:q.markerSetter("marker-start")});f.SVGRenderer.prototype.addMarker=function(a,b){b=this.definition(m({markerWidth:20,markerHeight:20,refX:0,refY:0,orient:"auto"},b,{id:a}));b.id=a;return b};var x=f.MockPoint=function(a,b){this.mock=!0;this.series={visible:!0,chart:a,getPlotBox:J.getPlotBox};this.init(a,b)},L=f.mockPoint=function(a,b){return new x(a,b)};x.prototype=
{init:function(a,b){var c=b.xAxis,c=p(c)?a.xAxis[c]||a.get(c):null,e=b.yAxis;a=p(e)?a.yAxis[e]||a.get(e):null;c?(this.x=b.x,this.series.xAxis=c):this.plotX=b.x;a?(this.y=b.y,this.series.yAxis=a):this.plotY=b.y},translate:function(){var a=this.series,b=a.xAxis,a=a.yAxis;b&&(this.plotX=b.toPixels(this.x,!0));a&&(this.plotY=a.toPixels(this.y,!0));this.isInside=this.isInsidePane()},alignToBox:function(a){a&&this.translate();a=this.plotX;var b=this.plotY,c;this.series.chart.inverted&&(c=a,a=b,b=c);return[a,
b,0,0]},getLabelConfig:function(){return{x:this.x,y:this.y,point:this}},isInsidePane:function(){var a=this.plotX,b=this.plotY,c=this.series.xAxis,e=this.series.yAxis,d=!0;c&&(d=p(a)&&0<=a&&a<=c.len);e&&(d=d&&p(b)&&0<=b&&b<=e.len);return d}};f.defaultOptions.annotations=[];var y=f.Annotation=function(a,b){this.chart=a;this.labels=[];this.shapes=[];this.userOptions=b;this.options=m(this.defaultOptions,b);this.init(a,b)};y.prototype={shapesWithoutBackground:["connector"],attrsMap:{zIndex:"zIndex",width:"width",
height:"height",borderRadius:"r",r:"r",padding:"padding"},defaultOptions:{visible:!0,labelOptions:{align:"center",allowOverlap:!1,backgroundColor:"rgba(0, 0, 0, 0.75)",borderColor:"black",borderRadius:3,borderWidth:1,className:"",crop:!1,formatter:function(){return p(this.y)?this.y:"Annotation label"},overflow:"justify",padding:5,shadow:!1,shape:"callout",style:{fontSize:"11px",fontWeight:"normal",color:"contrast"},useHTML:!1,verticalAlign:"bottom",x:0,y:-16},shapeOptions:{stroke:"rgba(0, 0, 0, 0.75)",
strokeWidth:1,fill:"rgba(0, 0, 0, 0.75)",r:0},zIndex:6},init:function(){var a=this;n(this.options.labels||[],this.initLabel,this);n(this.options.shapes||[],this.initShape,this);this.labelCollector=function(){return I(a.labels,function(a){return!a.options.allowOverlap})};this.chart.labelCollectors.push(this.labelCollector)},redraw:function(){this.group||this.render();this.redrawItems(this.shapes);this.redrawItems(this.labels)},redrawItems:function(a){for(var b=a.length;b--;)this.redrawItem(a[b])},
render:function(){var a=this.chart.renderer,b=this.group=a.g("annotation").attr({zIndex:this.options.zIndex,visibility:this.options.visible?"visible":"hidden"}).add();this.shapesGroup=a.g("annotation-shapes").add(b);this.labelsGroup=a.g("annotation-labels").attr({translateX:0,translateY:0}).add(b);this.shapesGroup.clip(this.chart.plotBoxClip)},setVisible:function(a){var b=this.options;a=w(a,!b.visible);this.group.attr({visibility:a?"visible":"hidden"});b.visible=a},destroy:function(){var a=this.chart,
b=function(a){a.destroy()};u(this.chart.labelCollectors,this.labelCollector);n(this.labels,b);n(this.shapes,b);H(this,a)},initShape:function(a){var b=this.chart.renderer;a=m(this.options.shapeOptions,a);var c=this.attrsFromOptions(a),e=b[a.type]?a.type:"rect",b=b[e](0,-9E9,0,0);b.points=[];b.type=e;b.options=a;b.itemType="shape";"path"===e&&v(b,{markerStartSetter:q.markerStartSetter,markerEndSetter:q.markerEndSetter,markerStart:q.markerStart,markerEnd:q.markerEnd});b.attr(c);a.className&&b.addClass(a.className);
this.shapes.push(b)},initLabel:function(a){a=m(this.options.labelOptions,a);var b=this.attrsFromOptions(a),c=this.chart.renderer.label("",0,-9E9,a.shape,null,null,a.useHTML,null,"annotation-label");c.points=[];c.options=a;c.itemType="label";c.labelrank=a.labelrank;c.annotation=this;c.attr(b);a.className&&c.addClass(a.className);this.labels.push(c)},redrawItem:function(a){var b=this.linkPoints(a),c=a.options,e,d=this.chart.time;b.length?(a.parentGroup||this.renderItem(a),"label"===a.itemType&&(e=c.format||
c.text,a.attr({text:e?F(e,b[0].getLabelConfig(),d):c.formatter.call(b[0])})),"path"===a.type?this.redrawPath(a):this.alignItem(a,!a.placed)):this.destroyItem(a)},destroyItem:function(a){u(this[a.itemType+"s"],a);a.destroy()},pointItem:function(a,b){b&&null!==b.series||(D(a)?b=L(this.chart,a):C(a)&&(b=this.chart.get(a)||null));return b},linkPoints:function(a){var b=a.options.points||a.options.point&&f.splat(a.options.point),c=a.points,e=b&&b.length,d,t;for(d=0;d<e;d++){t=this.pointItem(b[d],c[d]);
if(!t)return a.points=[];c[d]=t}return c},alignItem:function(a,b){var c=this.itemAnchor(a,a.points[0]),e=this.itemPosition(a,c);e?(a.alignAttr=e,a.placed=!0,e.anchorX=c.absolutePosition.x,e.anchorY=c.absolutePosition.y,a[b?"attr":"animate"](e)):(a.placed=!1,a.attr({x:0,y:-9E9}))},redrawPath:function(a,b){var c=a.points,e=a["stroke-width"]||1,d=["M"],f=0,h=0,g=c&&c.length,k,r;if(g){do r=c[f],k=this.itemAnchor(a,r).absolutePosition,d[++h]=k.x,d[++h]=k.y,k=h%5,0===k&&(d[k+1]===d[k+4]&&(d[k+1]=d[k+4]=
Math.round(d[k+1])-e%2/2),d[k+2]===d[k+5]&&(d[k+2]=d[k+5]=Math.round(d[k+2])+e%2/2)),f<g-1&&(d[++h]="L"),r=r.series.visible;while(++f<g&&r)}if(r)a[b?"attr":"animate"]({d:d});else a.attr({d:"M 0 -9000000000"});a.placed=r},renderItem:function(a){a.add("label"===a.itemType?this.labelsGroup:this.shapesGroup);this.setItemMarkers(a)},setItemMarkers:function(a){var b=a.options,c=this.chart,e=c.options.defs,d=b.fill,f=p(d)&&"none"!==d?d:b.stroke;n(["markerStart","markerEnd"],function(d){var g=b[d],k,h,t;
if(g){for(t in e)if(k=e[t],g===k.id&&"marker"===k.tagName){h=k;break}h&&(g=a[d]=c.renderer.addMarker((b.id||G())+"-"+h.id,m(h,{color:f})),a.attr(d,g.attr("id")))}})},itemAnchor:function(a,b){a=b.series.getPlotBox();b=b.mock?b.alignToBox(!0):A.getAnchor.call({chart:this.chart},b);b={x:b[0],y:b[1],height:b[2]||0,width:b[3]||0};return{relativePosition:b,absolutePosition:m(b,{x:b.x+a.translateX,y:b.y+a.translateY})}},itemPosition:function(a,b){var c=this.chart,e=a.points[0],d=a.options,f=b.absolutePosition,
h=b.relativePosition,g;if(b=e.series.visible&&x.prototype.isInsidePane.call(e))p(d.distance)||d.positioner?g=(d.positioner||A.getPosition).call({chart:c,distance:w(d.distance,16)},a.width,a.height,{plotX:h.x,plotY:h.y,negative:e.negative,ttBelow:e.ttBelow,h:h.height||h.width}):(e={x:f.x,y:f.y,width:0,height:0},g=this.alignedPosition(v(d,{width:a.width,height:a.height}),e),"justify"===a.options.overflow&&(g=this.alignedPosition(this.justifiedOptions(a,d,g),e))),d.crop&&(d=g.x-c.plotLeft,e=g.y-c.plotTop,
b=c.isInsidePlot(d,e)&&c.isInsidePlot(d+a.width,e+a.height));return b?g:null},alignedPosition:function(a,b){var c=a.align,e=a.verticalAlign,d=(b.x||0)+(a.x||0),f=(b.y||0)+(a.y||0),h,g;"right"===c?h=1:"center"===c&&(h=2);h&&(d+=(b.width-(a.width||0))/h);"bottom"===e?g=1:"middle"===e&&(g=2);g&&(f+=(b.height-(a.height||0))/g);return{x:Math.round(d),y:Math.round(f)}},justifiedOptions:function(a,b,c){var e=this.chart,d=b.align,f=b.verticalAlign,h=a.box?0:a.padding||0,g=a.getBBox();a={align:d,verticalAlign:f,
x:b.x,y:b.y,width:a.width,height:a.height};b=c.x-e.plotLeft;var k=c.y-e.plotTop;c=b+h;0>c&&("right"===d?a.align="left":a.x=-c);c=b+g.width-h;c>e.plotWidth&&("left"===d?a.align="right":a.x=e.plotWidth-c);c=k+h;0>c&&("bottom"===f?a.verticalAlign="top":a.y=-c);c=k+g.height-h;c>e.plotHeight&&("top"===f?a.verticalAlign="bottom":a.y=e.plotHeight-c);return a},attrsFromOptions:function(a){var b=this.attrsMap,c={},e,d;for(e in a)(d=b[e])&&(c[d]=a[e]);return c}};f.extend(B,{addAnnotation:function(a,b){var c=
new y(this,a);this.annotations.push(c);this.options.annotations.push(a);w(b,!0)&&c.redraw();return c},removeAnnotation:function(a){var b=this.annotations,c=E(b,function(b){return b.options.id===a});c&&(u(this.options.annotations,c.userOptions),u(b,c),c.destroy())},drawAnnotations:function(){var a=this.plotBoxClip,b=this.plotBox;a?a.attr(b):this.plotBoxClip=this.renderer.clipRect(b);n(this.annotations,function(a){a.redraw()})}});B.callbacks.push(function(a){a.annotations=[];n(a.options.annotations,
function(b){a.annotations.push(new y(a,b))});a.drawAnnotations();l(a,"redraw",a.drawAnnotations);l(a,"destroy",function(){var b=a.plotBoxClip;b&&b.destroy&&b.destroy()})});l(f.Chart,"afterGetContainer",function(){this.options.defs=m(K,this.options.defs||{})});f.SVGRenderer.prototype.symbols.connector=function(a,b,c,e,d){var f=d&&d.anchorX;d=d&&d.anchorY;var h,g,k=c/2;z(f)&&z(d)&&(h=["M",f,d],g=b-d,0>g&&(g=-e-g),g<c&&(k=f<a+c/2?g:c-g),d>b+e?h.push("L",a+k,b+e):d<b?h.push("L",a+k,b):f<a?h.push("L",
a,b+e/2):f>a+c&&h.push("L",a+c,b+e/2));return h||[]}})(l)});
