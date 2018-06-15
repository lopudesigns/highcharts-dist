/*
 Highcharts JS v6.1.0-modified (2018-06-16)

 (c) 2016 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(m){"object"===typeof module&&module.exports?module.exports=m:m(Highcharts)})(function(m){var D=function(){return function(d){var n=this,f=n.graphic,p=d.animate,m=d.attr,l=d.onComplete,z=d.css,A=d.group,r=d.renderer,w=d.shapeArgs;d=d.shapeType;n.shouldDraw()?(f||(n.graphic=f=r[d](w).add(A)),f.css(z).attr(m).animate(p,void 0,l)):f&&f.animate(p,void 0,function(){n.graphic=f=f.destroy();"function"===typeof l&&l()});f&&f.addClass(n.getClassName(),!0)}}();(function(d,n){var f=d.each,p=d.extend,
m=d.isArray,l=d.isNumber,z=d.isObject,A=d.reduce,r=d.Series,w=function(a,b){return!(b.left>a.right||b.right<a.left||b.top>a.bottom||b.bottom<a.top)},D=function(a,b){var c=!1,e=a.rect,g;a.lastCollidedWith&&(g=a.lastCollidedWith.rect,(c=w(e,g))||delete a.lastCollidedWith);c||(c=!!d.find(b,function(b){var c;g=b.rect;if(c=w(e,g))a.lastCollidedWith=b;return c}));return c},u=function(a){var b=Math.ceil((Math.sqrt(a)-1)/2),c=2*b+1,e=Math.pow(c,2),g=!1,c=c-1;1E4>=a&&("boolean"===typeof g&&a>=e-c&&(g={x:b-
(e-a),y:-b}),e-=c,"boolean"===typeof g&&a>=e-c&&(g={x:-b,y:-b+(e-a)}),e-=c,"boolean"===typeof g&&(g=a>=e-c?{x:-b+(e-a),y:b}:{x:b,y:b-(e-a-c)}),g.x*=5,g.y*=5);return g},H=function(a,b,c){a/=b;c=A(c,function(a,b){b=b.dimensions;a.maxHeight=Math.max(a.maxHeight,b.height);a.maxWidth=Math.max(a.maxWidth,b.width);a.area+=b.width*b.height;return a},{maxHeight:0,maxWidth:0,area:0});c=1.1*Math.max(c.maxHeight,c.maxWidth,Math.sqrt(c.area));return{width:c*a,height:c,ratio:a}},B=function(a,b,c,e){var g=!1;l(a)&&
l(b)&&l(c)&&l(e)&&-1<a&&-1<b&&e>c&&(g=c+b%a*((e-c)/(a-1)));return g},I=function(a,b){a=a.getBBox();var c=b.width/2,e=-(b.height/2),g=b.height/2;return!(-(b.width/2)<a.x-a.width/2&&c>a.x+a.width/2&&e<a.y-a.height/2&&g>a.y+a.height/2)};d.seriesType("wordcloud","column",{animation:{duration:500},borderWidth:0,clip:!1,colorByPoint:!0,minFontSize:1,maxFontSize:25,placementStrategy:"center",rotation:{from:0,orientations:2,to:90},showInLegend:!1,spiral:"rectangular",style:{fontFamily:"sans-serif",fontWeight:"900"},
tooltip:{followPointer:!0,pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.weight}\x3c/b\x3e\x3cbr/\x3e'}},{animate:r.prototype.animate,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};r.prototype.bindAxes.call(this);p(this.yAxis.options,a);p(this.xAxis.options,a)},deriveFontSize:function(a,b,c){a=l(a)?a:0;b=l(b)?b:1;c=l(c)?c:1;return Math.floor(Math.max(c,a*b))},drawPoints:function(){var a=
this,b=a.hasRendered,c=a.xAxis,e=a.yAxis,g=a.group,d=a.options,m=d.animation,n=a.chart.renderer,v=n.text().add(g),r=[],w=a.placementStrategy[d.placementStrategy],A=a.spirals[d.spiral],B=d.rotation,u=a.points.map(function(a){return a.weight}),E=Math.max.apply(null,u),C=a.points.sort(function(a,b){return b.weight-a.weight}),q;f(C,function(b){var c=a.deriveFontSize(1/E*b.weight,d.maxFontSize,d.minFontSize),c=p({fontSize:c+"px"},d.style);v.css(c).attr({x:0,y:0,text:b.name});c=v.getBBox(!0);b.dimensions=
{height:c.height,width:c.width}});q=H(c.len,e.len,C);f(C,function(c){var e=a.deriveFontSize(1/E*c.weight,d.maxFontSize,d.minFontSize),e=p({fontSize:e+"px",fill:c.color},d.style),f=w(c,{data:C,field:q,placed:r,rotation:B}),k={align:"center",x:f.x,y:f.y,text:c.name,rotation:f.rotation},u,x,h;v.css(e).attr(k);c.clientRect=h=p({},v.element.getBoundingClientRect());x=v;for(var F=q,G=1,y={x:0,y:0},t=c.rect=p({},h);(D(c,r)||I(x,F))&&!1!==y;)y=A(G,{field:F}),z(y)&&(t.left=h.left+y.x,t.right=t.left+t.width,
t.top=h.top+y.y,t.bottom=t.top+t.height),G++;x=y;if(z(x)){k.x+=x.x;k.y+=x.y;p(f,{left:k.x-h.width/2,right:k.x+h.width/2,top:k.y-h.height/2,bottom:k.y+h.height/2});h=q;if(!l(h.left)||h.left>f.left)h.left=f.left;if(!l(h.right)||h.right<f.right)h.right=f.right;if(!l(h.top)||h.top>f.top)h.top=f.top;if(!l(h.bottom)||h.bottom<f.bottom)h.bottom=f.bottom;q=h;r.push(c);c.isNull=!1}else c.isNull=!0;m&&(u={x:k.x,y:k.y},b?(delete k.x,delete k.y):(k.x=0,k.y=0));c.draw({animate:u,attr:k,css:e,group:g,renderer:n,
shapeArgs:void 0,shapeType:"text"})});v=v.destroy();c=Math.min(1/(2*Math.max(Math.abs(q.left),Math.abs(q.right)))*c.len,1/(2*Math.max(Math.abs(q.top),Math.abs(q.bottom)))*e.len);a.group.attr({scaleX:c,scaleY:c})},hasData:function(){return z(this)&&!0===this.visible&&m(this.points)&&0<this.points.length},placementStrategy:{random:function(a,b){var c=b.field;b=b.rotation;return{x:Math.round(c.width*(Math.random()+.5)/2)-c.width/2,y:Math.round(c.height*(Math.random()+.5)/2)-c.height/2,rotation:B(b.orientations,
a.index,b.from,b.to)}},center:function(a,b){b=b.rotation;return{x:0,y:0,rotation:B(b.orientations,a.index,b.from,b.to)}}},pointArrayMap:["weight"],spirals:{archimedean:function(a,b){var c=b.field;b=!1;var c=c.width*c.width+c.height*c.height,d=.2*a;1E4>=a&&(b={x:d*Math.cos(d),y:d*Math.sin(d)},Math.min(Math.abs(b.x),Math.abs(b.y))<c||(b=!1));return b},rectangular:function(a,b){a=u(a,b);b=b.field;a&&(a.x*=b.ratio);return a},square:u},utils:{getRotation:B},getPlotBox:function(){var a=this.chart,b=a.inverted,
c=this[b?"yAxis":"xAxis"],b=this[b?"xAxis":"yAxis"];return{translateX:(c?c.left:a.plotLeft)+(c?c.len:a.plotWidth)/2,translateY:(b?b.top:a.plotTop)+(b?b.len:a.plotHeight)/2,scaleX:1,scaleY:1}}},{draw:n,shouldDraw:function(){return!this.isNull}})})(m,D)});
