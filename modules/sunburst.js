/*
 Highcharts JS v6.1.0-modified (2018-06-14)

 (c) 2016 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(E){"object"===typeof module&&module.exports?module.exports=E:E(Highcharts)})(function(E){var O=function(){return function(b){var B=this,n=B.graphic,k=b.animate,w=b.attr,e=b.onComplete,H=b.css,D=b.group,t=b.renderer,x=b.shapeArgs;b=b.shapeType;B.shouldDraw()?(n||(B.graphic=n=t[b](x).add(D)),n.css(H).attr(w).animate(k,void 0,e)):n&&n.animate(k,void 0,function(){B.graphic=n=n.destroy();"function"===typeof e&&e()});n&&n.addClass(B.getClassName(),!0)}}(),M=function(b){var B=b.each,n=b.extend,
k=b.isArray,w=b.isObject,e=b.isNumber,H=b.merge,D=b.pick,t=b.reduce;return{getColor:function(x,y){var v=y.index,p=y.mapOptionsToLevel,n=y.parentColor,C=y.parentColorIndex,z=y.series,l=y.colors,k=y.siblings,q=z.points,e,t,w,B;if(x){q=q[x.i];x=p[x.level]||{};if(e=q&&x.colorByPoint)w=q.index%(l?l.length:z.chart.options.chart.colorCount),t=l&&l[w];l=q&&q.options.color;e=x&&x.color;if(p=n)p=(p=x&&x.colorVariation)&&"brightness"===p.key?b.color(n).brighten(v/k*p.to).get():n;e=D(l,e,t,p,z.color);B=D(q&&
q.options.colorIndex,x&&x.colorIndex,w,C,y.colorIndex)}return{color:e,colorIndex:B}},getLevelOptions:function(b){var y=null,v,p,F,C;if(w(b))for(y={},F=e(b.from)?b.from:1,C=b.levels,p={},v=w(b.defaults)?b.defaults:{},k(C)&&(p=t(C,function(b,l){var p,q;w(l)&&e(l.level)&&(q=H({},l),p="boolean"===typeof q.levelIsConstant?q.levelIsConstant:v.levelIsConstant,delete q.levelIsConstant,delete q.level,l=l.level+(p?0:F-1),w(b[l])?n(b[l],q):b[l]=q);return b},{})),C=e(b.to)?b.to:1,b=0;b<=C;b++)y[b]=H({},v,w(p[b])?
p[b]:{});return y},setTreeValues:function y(b,p){var e=p.before,t=p.idRoot,k=p.mapIdToNode[t],l=p.points[b.i],w=l&&l.options||{},q=0,v=[];n(b,{levelDynamic:b.level-(("boolean"===typeof p.levelIsConstant?p.levelIsConstant:1)?0:k.level),name:D(l&&l.name,""),visible:t===b.id||("boolean"===typeof p.visible?p.visible:!1)});"function"===typeof e&&(b=e(b,p));B(b.children,function(e,l){var t=n({},p);n(t,{index:l,siblings:b.children.length,visible:b.visible});e=y(e,t);v.push(e);e.visible&&(q+=e.val)});b.visible=
0<q||b.visible;e=D(w.value,q);n(b,{children:v,childrenTotal:q,isLeaf:b.visible&&!q,val:e});return b},updateRootId:function(b){var e;w(b)&&(e=w(b.options)?b.options:{},e=D(b.rootNode,e.rootId,""),w(b.userOptions)&&(b.userOptions.rootId=e),b.rootNode=e);return e}}}(E);(function(b,B){var n=b.seriesType,k=b.seriesTypes,w=b.map,e=b.merge,H=b.extend,D=b.noop,t=b.each,x=B.getColor,y=B.getLevelOptions,v=b.grep,p=b.isNumber,F=b.isObject,C=b.isString,z=b.pick,l=b.Series,E=b.stableSort,q=b.Color,L=function(a,
d,c){c=c||this;b.objectEach(a,function(f,g){d.call(c,f,g,a)})},J=b.reduce,I=function(a,d,c){c=c||this;a=d.call(c,a);!1!==a&&I(a,d,c)},K=B.updateRootId;n("treemap","scatter",{showInLegend:!1,marker:!1,colorByPoint:!1,dataLabels:{enabled:!0,defer:!1,verticalAlign:"middle",formatter:function(){return this.point.name||this.point.id},inside:!0},tooltip:{headerFormat:"",pointFormat:"\x3cb\x3e{point.name}\x3c/b\x3e: {point.value}\x3cbr/\x3e"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",
alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,opacity:.15,states:{hover:{borderColor:"#999999",brightness:k.heatmap?0:.1,halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],axisTypes:k.heatmap?["xAxis","yAxis","colorAxis"]:["xAxis","yAxis"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:D,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",translateColors:k.heatmap&&k.heatmap.prototype.translateColors,
colorAttribs:k.heatmap&&k.heatmap.prototype.colorAttribs,trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,d){a=J(a||[],function(c,a,d){a=z(a.parent,"");void 0===c[a]&&(c[a]=[]);c[a].push(d);return c},{});L(a,function(a,f,g){""!==f&&-1===b.inArray(f,d)&&(t(a,function(a){g[""].push(a)}),delete g[f])});return a},getTree:function(){var a=w(this.data,function(a){return a.id}),a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},init:function(a,
d){l.prototype.init.call(this,a,d);this.options.allowDrillToNode&&b.addEvent(this,"click",this.onClickDrillToNode)},buildNode:function(a,d,c,f,g){var b=this,r=[],h=b.points[d],u=0,G;t(f[a]||[],function(d){G=b.buildNode(b.points[d].id,d,c+1,f,a);u=Math.max(G.height+1,u);r.push(G)});d={id:a,i:d,children:r,height:u,level:c,parent:g,visible:!1};b.nodeMap[d.id]=d;h&&(h.node=d);return d},setTreeValues:function(a){var d=this,c=d.options,b=d.nodeMap[d.rootNode],c="boolean"===typeof c.levelIsConstant?c.levelIsConstant:
!0,g=0,A=[],r,h=d.points[a.i];t(a.children,function(a){a=d.setTreeValues(a);A.push(a);a.ignore||(g+=a.val)});E(A,function(a,c){return a.sortIndex-c.sortIndex});r=z(h&&h.options.value,g);h&&(h.value=r);H(a,{children:A,childrenTotal:g,ignore:!(z(h&&h.visible,!0)&&0<r),isLeaf:a.visible&&!g,levelDynamic:a.level-(c?0:b.level),name:z(h&&h.name,""),sortIndex:z(h&&h.sortIndex,-r),val:r});return a},calculateChildrenAreas:function(a,d){var c=this,b=c.options,g=c.mapOptionsToLevel[a.level+1],A=z(c[g&&g.layoutAlgorithm]&&
g.layoutAlgorithm,b.layoutAlgorithm),r=b.alternateStartingDirection,h=[];a=v(a.children,function(a){return!a.ignore});g&&g.layoutStartingDirection&&(d.direction="vertical"===g.layoutStartingDirection?0:1);h=c[A](d,a);t(a,function(a,b){b=h[b];a.values=e(b,{val:a.childrenTotal,direction:r?1-d.direction:d.direction});a.pointValues=e(b,{x:b.x/c.axisRatio,width:b.width/c.axisRatio});a.children.length&&c.calculateChildrenAreas(a,a.values)})},setPointValues:function(){var a=this,b=a.xAxis,c=a.yAxis;t(a.points,
function(d){var g=d.node,f=g.pointValues,r,h,u;u=(a.pointAttribs(d)["stroke-width"]||0)%2/2;f&&g.visible?(g=Math.round(b.translate(f.x,0,0,0,1))-u,r=Math.round(b.translate(f.x+f.width,0,0,0,1))-u,h=Math.round(c.translate(f.y,0,0,0,1))-u,f=Math.round(c.translate(f.y+f.height,0,0,0,1))-u,d.shapeType="rect",d.shapeArgs={x:Math.min(g,r),y:Math.min(h,f),width:Math.abs(r-g),height:Math.abs(f-h)},d.plotX=d.shapeArgs.x+d.shapeArgs.width/2,d.plotY=d.shapeArgs.y+d.shapeArgs.height/2):(delete d.plotX,delete d.plotY)})},
setColorRecursive:function(a,d,c,b,g){var f=this,r=f&&f.chart,r=r&&r.options&&r.options.colors,h;if(a){h=x(a,{colors:r,index:b,mapOptionsToLevel:f.mapOptionsToLevel,parentColor:d,parentColorIndex:c,series:f,siblings:g});if(d=f.points[a.i])d.color=h.color,d.colorIndex=h.colorIndex;t(a.children||[],function(c,d){f.setColorRecursive(c,h.color,h.colorIndex,d,a.children.length)})}},algorithmGroup:function(a,d,c,b){this.height=a;this.width=d;this.plot=b;this.startDirection=this.direction=c;this.lH=this.nH=
this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,c){return Math.max(a/c,c/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/
this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,d,c,b){var f,A,r,h,u=c.lW,e=c.lH,m=c.plot,l,N=0,p=c.elArr.length-1;d?(u=c.nW,e=c.nH):l=c.elArr[c.elArr.length-1];t(c.elArr,function(a){if(d||N<p)0===c.direction?(f=m.x,A=m.y,r=u,h=a/r):(f=m.x,A=m.y,h=e,r=a/h),
b.push({x:f,y:A,width:r,height:h}),0===c.direction?m.y+=h:m.x+=r;N+=1});c.reset();0===c.direction?c.width-=u:c.height-=e;m.y=m.parent.y+(m.parent.height-c.height);m.x=m.parent.x+(m.parent.width-c.width);a&&(c.direction=1-c.direction);d||c.addElement(l)},algorithmLowAspectRatio:function(a,b,c){var d=[],g=this,A,r={x:b.x,y:b.y,parent:b},h=0,u=c.length-1,e=new this.algorithmGroup(b.height,b.width,b.direction,r);t(c,function(c){A=c.val/b.val*b.height*b.width;e.addElement(A);e.lP.nR>e.lP.lR&&g.algorithmCalcPoints(a,
!1,e,d,r);h===u&&g.algorithmCalcPoints(a,!0,e,d,r);h+=1});return d},algorithmFill:function(a,b,c){var d=[],g,A=b.direction,r=b.x,h=b.y,u=b.width,e=b.height,m,l,p,q;t(c,function(c){g=c.val/b.val*b.height*b.width;m=r;l=h;0===A?(q=e,p=g/q,u-=p,r+=p):(p=u,q=g/p,e-=q,h+=q);d.push({x:m,y:l,width:p,height:q});a&&(A=1-A)});return d},strip:function(a,b){return this.algorithmLowAspectRatio(!1,a,b)},squarified:function(a,b){return this.algorithmLowAspectRatio(!0,a,b)},sliceAndDice:function(a,b){return this.algorithmFill(!0,
a,b)},stripes:function(a,b){return this.algorithmFill(!1,a,b)},translate:function(){var a=this,b=a.options,c=K(a),f,g;l.prototype.translate.call(a);g=a.tree=a.getTree();f=a.nodeMap[c];a.mapOptionsToLevel=y({from:f.level+1,levels:b.levels,to:g.height,defaults:{levelIsConstant:a.options.levelIsConstant,colorByPoint:b.colorByPoint}});""===c||f&&f.children.length||(a.drillToNode("",!1),c=a.rootNode,f=a.nodeMap[c]);I(a.nodeMap[a.rootNode],function(c){var b=!1,f=c.parent;c.visible=!0;if(f||""===f)b=a.nodeMap[f];
return b});I(a.nodeMap[a.rootNode].children,function(a){var c=!1;t(a,function(a){a.visible=!0;a.children.length&&(c=(c||[]).concat(a.children))});return c});a.setTreeValues(g);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=c={x:0,y:0,width:100,height:100};a.nodeMap[""].values=c=e(c,{width:c.width*a.axisRatio,direction:"vertical"===b.layoutStartingDirection?0:1,val:g.val});a.calculateChildrenAreas(g,c);a.colorAxis?a.translateColors():b.colorByPoint||a.setColorRecursive(a.tree);b.allowDrillToNode&&
(b=f.pointValues,a.xAxis.setExtremes(b.x,b.x+b.width,!1),a.yAxis.setExtremes(b.y,b.y+b.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},drawDataLabels:function(){var a=this,b=a.mapOptionsToLevel,c=v(a.points,function(a){return a.node.visible}),f,g;t(c,function(c){g=b[c.node.level];f={style:{}};c.node.isLeaf||(f.enabled=!1);g&&g.dataLabels&&(f=e(f,g.dataLabels),a._hasPointLabels=!0);c.shapeArgs&&(f.style.width=c.shapeArgs.width,c.dataLabel&&c.dataLabel.css({width:c.shapeArgs.width+
"px"}));c.dlOptions=e(f,c.options.dataLabels)});l.prototype.drawDataLabels.call(this)},alignDataLabel:function(a){k.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||0)+1})},pointAttribs:function(a,b){var c=F(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},f=a&&c[a.node.level]||{},c=this.options,g=b&&c.states[b]||{},d=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||f.borderColor||g.borderColor||c.borderColor,"stroke-width":z(a&&a.borderWidth,
f.borderWidth,g.borderWidth,c.borderWidth),dashstyle:a&&a.borderDashStyle||f.borderDashStyle||g.borderDashStyle||c.borderDashStyle,fill:a&&a.color||this.color};-1!==d.indexOf("highcharts-above-level")?(a.fill="none",a["stroke-width"]=0):-1!==d.indexOf("highcharts-internal-node-interactive")?(b=z(g.opacity,c.opacity),a.fill=q(a.fill).setOpacity(b).get(),a.cursor="pointer"):-1!==d.indexOf("highcharts-internal-node")?a.fill="none":b&&(a.fill=q(a.fill).brighten(g.brightness).get());return a},drawPoints:function(){var a=
this,b=v(a.points,function(a){return a.node.visible});t(b,function(c){var b="level-group-"+c.node.levelDynamic;a[b]||(a[b]=a.chart.renderer.g(b).attr({zIndex:1E3-c.node.levelDynamic}).add(a.group));c.group=a[b]});k.column.prototype.drawPoints.call(this);a.options.allowDrillToNode&&t(b,function(c){c.graphic&&(c.drillId=a.options.interactByLeaf?a.drillToByLeaf(c):a.drillToByGroup(c))})},onClickDrillToNode:function(a){var b=(a=a.point)&&a.drillId;C(b)&&(a.setState(""),this.drillToNode(b))},drillToByGroup:function(a){var b=
!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(b=a.id);return b},drillToByLeaf:function(a){var b=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!b;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(b=a.id);return b},drillUp:function(){var a=this.nodeMap[this.rootNode];a&&C(a.parent)&&this.drillToNode(a.parent)},drillToNode:function(a,b){var c=this.nodeMap[a];this.idPreviousRoot=this.rootNode;this.rootNode=a;""===a?this.drillUpButton=this.drillUpButton.destroy():
this.showDrillUpButton(c&&c.name||a);this.isDirty=!0;z(b,!0)&&this.chart.redraw()},showDrillUpButton:function(a){var b=this;a=a||"\x3c Back";var c=b.options.drillUpButton,f,g;c.text&&(a=c.text);this.drillUpButton?(this.drillUpButton.placed=!1,this.drillUpButton.attr({text:a}).align()):(g=(f=c.theme)&&f.states,this.drillUpButton=this.chart.renderer.button(a,null,null,function(){b.drillUp()},f,g&&g.hover,g&&g.select).addClass("highcharts-drillup-button").attr({align:c.position.align,zIndex:7}).add().align(c.position,
!1,c.relativeTo||"plotBox"))},buildKDTree:D,drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,getExtremes:function(){l.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;l.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};l.prototype.bindAxes.call(this);b.extend(this.yAxis.options,
a);b.extend(this.xAxis.options,a)},utils:{recursive:I,reduce:J}},{getClassName:function(){var a=b.Point.prototype.getClassName.call(this),d=this.series,c=d.options;this.node.level<=d.nodeMap[d.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||z(c.interactByLeaf,!c.allowDrillToNode)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return this.id||p(this.value)},setState:function(a){b.Point.prototype.setState.call(this,
a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})},setVisible:k.pie.prototype.pointClass.prototype.setVisible})})(E,M);(function(b,B,n){var k=b.CenteredSeriesMixin,w=b.Series,e=b.each,H=b.extend,D=k.getCenter,t=n.getColor,x=n.getLevelOptions,y=k.getStartAndEndRadians,v=b.grep,p=b.inArray,F=b.isNumber,C=b.isObject,z=b.isString,l=b.keys,E=b.merge,q=180/Math.PI,k=b.seriesType,L=n.setTreeValues,J=b.reduce,I=n.updateRootId,K=function(a,b){var c=[];if(F(a)&&F(b)&&a<=b)for(;a<=b;a++)c.push(a);
return c},a=function(a,b){var c;b=C(b)?b:{};var f=0,d,h,u,q;C(a)&&(c=E({},a),a=F(b.from)?b.from:0,q=F(b.to)?b.to:0,h=K(a,q),a=v(l(c),function(a){return-1===p(+a,h)}),d=u=F(b.diffRadius)?b.diffRadius:0,e(h,function(a){a=c[a];var b=a.levelSize.unit,g=a.levelSize.value;"weight"===b?f+=g:"percentage"===b?(a.levelSize={unit:"pixels",value:g/100*d},u-=a.levelSize.value):"pixels"===b&&(u-=g)}),e(h,function(a){var b=c[a];"weight"===b.levelSize.unit&&(b=b.levelSize.value,c[a].levelSize={unit:"pixels",value:b/
f*u})}),e(a,function(a){c[a].levelSize={value:0,unit:"pixels"}}));return c},d=function(a,b){var c=b.mapIdToNode[a.parent],d=b.series,f=d.chart,h=d.points[a.i],c=t(a,{colors:f&&f.options&&f.options.colors,colorIndex:d.colorIndex,index:b.index,mapOptionsToLevel:b.mapOptionsToLevel,parentColor:c&&c.color,parentColorIndex:c&&c.colorIndex,series:b.series,siblings:b.siblings});a.color=c.color;a.colorIndex=c.colorIndex;h&&(h.color=a.color,h.colorIndex=a.colorIndex,a.sliced=a.id!==b.idRoot?h.sliced:!1);return a};
k("sunburst","treemap",{center:["50%","50%"],colorByPoint:!1,dataLabels:{defer:!0,style:{textOverflow:"ellipsis"},rotationMode:"perpendicular"},rootId:void 0,levelIsConstant:!0,levelSize:{value:1,unit:"weight"},slicedOffset:10},{drawDataLabels:b.noop,drawPoints:function(){var a=this,b=a.mapOptionsToLevel,d=a.shapeRoot,p=a.group,r=a.hasRendered,h=a.rootNode,u=a.idPreviousRoot,l=a.nodeMap,m=l[u],t=m&&m.shapeArgs,m=a.points,n=a.startAndEndRadians,k=a.chart,k=k&&k.options&&k.options.chart||{},y="boolean"===
typeof k.animation?k.animation:!0,x=a.center[3]/2,B=a.chart.renderer,z,v=!1,D=!1;if(k=!!(y&&r&&h!==u&&a.dataLabelsGroup))a.dataLabelsGroup.attr({opacity:0}),z=function(){v=!0;a.dataLabelsGroup&&a.dataLabelsGroup.animate({opacity:1,visibility:"visible"})};e(m,function(c){var f,g,e=c.node,m=b[e.level];f=c.shapeExisting||{};var k=e.shapeArgs||{},A,w=!(!e.visible||!e.shapeArgs);if(r&&y){var G={};g={end:k.end,start:k.start,innerR:k.innerR,r:k.r,x:k.x,y:k.y};w?!c.graphic&&t&&(G=h===c.id?{start:n.start,
end:n.end}:t.end<=k.start?{start:n.end,end:n.end}:{start:n.start,end:n.start},G.innerR=G.r=x):c.graphic&&(u===c.id?g={innerR:x,r:x}:d&&(g=d.end<=f.start?{innerR:x,r:x,start:n.end,end:n.end}:{innerR:x,r:x,start:n.start,end:n.start}));f=G}else g=k,f={};var G=[k.plotX,k.plotY],v;c.node.isLeaf||(h===c.id?(v=l[h],v=v.parent):v=c.id);H(c,{shapeExisting:k,tooltipPos:G,drillId:v,name:""+(c.name||c.id||c.index),plotX:k.plotX,plotY:k.plotY,value:e.val,isNull:!w});v=c.options;e=C(k)?k:{};v=C(v)?v.dataLabels:
{};m=C(m)?m.dataLabels:{};m=E({rotationMode:"perpendicular",style:{width:e.radius}},m,v);F(m.rotation)||(e=e.end-(e.end-e.start)/2,e=e*q%180,"parallel"===m.rotationMode&&(e-=90),90<e&&(e-=180),m.rotation=e);0===m.rotation&&(m.rotation=.001);c.dlOptions=m;!D&&w&&(D=!0,A=z);c.draw({animate:g,attr:H(f,a.pointAttribs&&a.pointAttribs(c,c.selected&&"select")),onComplete:A,group:p,renderer:B,shapeType:"arc",shapeArgs:k})});k&&D?(a.hasRendered=!1,a.options.dataLabels.defer=!0,w.prototype.drawDataLabels.call(a),
a.hasRendered=!0,v&&z()):w.prototype.drawDataLabels.call(a)},pointAttribs:b.seriesTypes.column.prototype.pointAttribs,layoutAlgorithm:function(a,b,d){var c=a.start,f=a.end-c,h=a.val,g=a.x,e=a.y,m=d&&C(d.levelSize)&&F(d.levelSize.value)?d.levelSize.value:0,k=a.r,p=k+m,l=d&&F(d.slicedOffset)?d.slicedOffset:0;return J(b||[],function(a,b){var d=1/h*b.val*f,u=c+d/2,r=g+Math.cos(u)*l,u=e+Math.sin(u)*l;b={x:b.sliced?r:g,y:b.sliced?u:e,innerR:k,r:p,radius:m,start:c,end:c+d};a.push(b);c=b.end;return a},[])},
setShapeArgs:function(a,b,d){var c=[],f=d[a.level+1];a=v(a.children,function(a){return a.visible});c=this.layoutAlgorithm(b,a,f);e(a,function(a,b){b=c[b];var f=b.start+(b.end-b.start)/2,e=b.innerR+(b.r-b.innerR)/2,g=b.end-b.start,f=0===b.innerR&&6.28<g?{x:b.x,y:b.y}:{x:b.x+Math.cos(f)*e,y:b.y+Math.sin(f)*e},e=a.val?a.childrenTotal>a.val?a.childrenTotal:a.val:a.childrenTotal;this.points[a.i]&&(this.points[a.i].innerArcLength=g*b.innerR,this.points[a.i].outerArcLength=g*b.r);a.shapeArgs=E(b,{plotX:f.x,
plotY:f.y});a.values=E(b,{val:e});a.children.length&&this.setShapeArgs(a,a.values,d)},this)},translate:function(){var b=this.options,f=this.center=D.call(this),e=this.startAndEndRadians=y(b.startAngle,b.endAngle),k=f[3]/2,p=f[2]/2-k,h=I(this),l=this.nodeMap,n,m=l&&l[h],q,t;this.shapeRoot=m&&m.shapeArgs;w.prototype.translate.call(this);t=this.tree=this.getTree();l=this.nodeMap;m=l[h];n=z(m.parent)?m.parent:"";q=l[n];n=x({from:0<m.level?m.level:1,levels:this.options.levels,to:t.height,defaults:{colorByPoint:b.colorByPoint,
dataLabels:b.dataLabels,levelIsConstant:b.levelIsConstant,levelSize:b.levelSize,slicedOffset:b.slicedOffset}});n=a(n,{diffRadius:p,from:0<m.level?m.level:1,to:t.height});L(t,{before:d,idRoot:h,levelIsConstant:b.levelIsConstant,mapOptionsToLevel:n,mapIdToNode:l,points:this.points,series:this});b=l[""].shapeArgs={end:e.end,r:k,start:e.start,val:m.val,x:f[0],y:f[1]};this.setShapeArgs(q,b,n);this.mapOptionsToLevel=n},animate:function(a){var b=this.chart,c=[b.plotWidth/2,b.plotHeight/2],d=b.plotLeft,e=
b.plotTop,b=this.group;a?(a={translateX:c[0]+d,translateY:c[1]+e,scaleX:.001,scaleY:.001,rotation:10,opacity:.01},b.attr(a)):(a={translateX:d,translateY:e,scaleX:1,scaleY:1,rotation:0,opacity:1},b.animate(a,this.options.animation),this.animate=null)},utils:{calculateLevelSizes:a,range:K}},{draw:B,shouldDraw:function(){return!this.isNull}})})(E,O,M)});
