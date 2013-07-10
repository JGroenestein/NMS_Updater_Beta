/* Flot plugin for rendering pie charts.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The plugin assumes that each series has a single data value, and that each
value is a positive integer or zero.  Negative numbers don't make sense for a
pie chart, and have unpredictable results.  The values do NOT need to be
passed in as percentages; the plugin will calculate the total and per-slice
percentages internally.

* Created by Brian Medendorp

* Updated with contributions from btburnett3, Anthony Aragues and Xavi Ivars

The plugin supports these options:

	series: {
		pie: {
			show: true/false
			radius: 0-1 for percentage of fullsize, or a specified pixel length, or 'auto'
			innerRadius: 0-1 for percentage of fullsize or a specified pixel length, for creating a donut effect
			startAngle: 0-2 factor of PI used for starting angle (in radians) i.e 3/2 starts at the top, 0 and 2 have the same result
			tilt: 0-1 for percentage to tilt the pie, where 1 is no tilt, and 0 is completely flat (nothing will show)
			offset: {
				top: integer value to move the pie up or down
				left: integer value to move the pie left or right, or 'auto'
			},
			stroke: {
				color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#FFF')
				width: integer pixel width of the stroke
			},
			label: {
				show: true/false, or 'auto'
				formatter:  a user-defined function that modifies the text/style of the label text
				radius: 0-1 for percentage of fullsize, or a specified pixel length
				background: {
					color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#000')
					opacity: 0-1
				},
				threshold: 0-1 for the percentage value at which to hide labels (if they're too small)
			},
			combine: {
				threshold: 0-1 for the percentage value at which to combine slices (if they're too small)
				color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#CCC'), if null, the plugin will automatically use the color of the first slice to be combined
				label: any text value of what the combined slice should be labeled
			}
			highlight: {
				opacity: 0-1
			}
		}
	}

More detail and specific examples can be found in the included HTML file.

*/
!function(e){function i(i){function a(i){y||(y=!0,w=i.getCanvas(),k=e(w).parent(),r=i.getOptions(),i.setData(l(i.getData())))}function l(i){for(var s=0,t=0,a=0,l=r.series.pie.combine.color,n=[],o=0;o<i.length;++o){var p=i[o].data;e.isArray(p)&&1==p.length&&(p=p[0]),e.isArray(p)?p[1]=!isNaN(parseFloat(p[1]))&&isFinite(p[1])?+p[1]:0:p=!isNaN(parseFloat(p))&&isFinite(p)?[1,+p]:[1,0],i[o].data=[p]}for(var o=0;o<i.length;++o)s+=i[o].data[0][1];for(var o=0;o<i.length;++o){var p=i[o].data[0][1];p/s<=r.series.pie.combine.threshold&&(t+=p,a++,l||(l=i[o].color))}for(var o=0;o<i.length;++o){var p=i[o].data[0][1];(2>a||p/s>r.series.pie.combine.threshold)&&n.push({data:[[1,p]],color:i[o].color,label:i[o].label,angle:2*p*Math.PI/s,percent:p/(s/100)})}return a>1&&n.push({data:[[1,t]],color:l,label:r.series.pie.combine.label,angle:2*t*Math.PI/s,percent:t/(s/100)}),n}function n(i,a){function l(){m.clearRect(0,0,h,g),k.children().filter(".pieLabel, .pieLabelBackground").remove()}function n(){var e=r.series.pie.shadow.left,i=r.series.pie.shadow.top,s=10,t=r.series.pie.shadow.alpha,a=r.series.pie.radius>1?r.series.pie.radius:M*r.series.pie.radius;if(!(a>=h/2-e||a*r.series.pie.tilt>=g/2-i||s>=a)){m.save(),m.translate(e,i),m.globalAlpha=t,m.fillStyle="#000",m.translate(P,A),m.scale(1,r.series.pie.tilt);for(var l=1;s>=l;l++)m.beginPath(),m.arc(0,0,a,0,2*Math.PI,!1),m.fill(),a-=l;m.restore()}}function p(){function i(e,i,s){0>=e||isNaN(e)||(s?m.fillStyle=i:(m.strokeStyle=i,m.lineJoin="round"),m.beginPath(),Math.abs(e-2*Math.PI)>1e-9&&m.moveTo(0,0),m.arc(0,0,a,l,l+e/2,!1),m.arc(0,0,a,l+e/2,l+e,!1),m.closePath(),l+=e,s?m.fill():m.stroke())}function s(){function i(i,s,t){if(0==i.data[0][1])return!0;var l,n=r.legend.labelFormatter,o=r.series.pie.label.formatter;l=n?n(i.label,i):i.label,o&&(l=o(l,i));var p=(s+i.angle+s)/2,c=P+Math.round(Math.cos(p)*a),u=A+Math.round(Math.sin(p)*a)*r.series.pie.tilt,d="<span class='pieLabel' id='pieLabel"+t+"' style='position:absolute;top:"+u+"px;left:"+c+"px;'>"+l+"</span>";k.append(d);var f=k.children("#pieLabel"+t),v=u-f.height()/2,b=c-f.width()/2;if(f.css("top",v),f.css("left",b),0-v>0||0-b>0||g-(v+f.height())<0||h-(b+f.width())<0)return!1;if(0!=r.series.pie.label.background.opacity){var w=r.series.pie.label.background.color;null==w&&(w=i.color);var M="top:"+v+"px;left:"+b+"px;";e("<div class='pieLabelBackground' style='position:absolute;width:"+f.width()+"px;height:"+f.height()+"px;"+M+"background-color:"+w+";'></div>").css("opacity",r.series.pie.label.background.opacity).insertBefore(f)}return!0}for(var s=t,a=r.series.pie.label.radius>1?r.series.pie.label.radius:M*r.series.pie.label.radius,l=0;l<u.length;++l){if(u[l].percent>=100*r.series.pie.label.threshold&&!i(u[l],s,l))return!1;s+=u[l].angle}return!0}var t=Math.PI*r.series.pie.startAngle,a=r.series.pie.radius>1?r.series.pie.radius:M*r.series.pie.radius;m.save(),m.translate(P,A),m.scale(1,r.series.pie.tilt),m.save();for(var l=t,n=0;n<u.length;++n)u[n].startAngle=l,i(u[n].angle,u[n].color,!0);if(m.restore(),r.series.pie.stroke.width>0){m.save(),m.lineWidth=r.series.pie.stroke.width,l=t;for(var n=0;n<u.length;++n)i(u[n].angle,r.series.pie.stroke.color,!1);m.restore()}return o(m),m.restore(),r.series.pie.label.show?s():!0}if(k){var h=i.getPlaceholder().width(),g=i.getPlaceholder().height(),c=k.children().filter(".legend").children().width()||0;m=a,y=!1,M=Math.min(h,g/r.series.pie.tilt)/2,A=g/2+r.series.pie.offset.top,P=h/2,"auto"==r.series.pie.offset.left?r.legend.position.match("w")?P+=c/2:P-=c/2:P+=r.series.pie.offset.left,M>P?P=M:P>h-M&&(P=h-M);var u=i.getData(),d=0;do d>0&&(M*=t),d+=1,l(),r.series.pie.tilt<=.8&&n();while(!p()&&s>d);d>=s&&(l(),k.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")),i.setSeries&&i.insertLegend&&(i.setSeries(u),i.insertLegend())}}function o(e){if(r.series.pie.innerRadius>0){e.save();var i=r.series.pie.innerRadius>1?r.series.pie.innerRadius:M*r.series.pie.innerRadius;e.globalCompositeOperation="destination-out",e.beginPath(),e.fillStyle=r.series.pie.stroke.color,e.arc(0,0,i,0,2*Math.PI,!1),e.fill(),e.closePath(),e.restore(),e.save(),e.beginPath(),e.strokeStyle=r.series.pie.stroke.color,e.arc(0,0,i,0,2*Math.PI,!1),e.stroke(),e.closePath(),e.restore()}}function p(e,i){for(var s=!1,t=-1,r=e.length,a=r-1;++t<r;a=t)(e[t][1]<=i[1]&&i[1]<e[a][1]||e[a][1]<=i[1]&&i[1]<e[t][1])&&i[0]<(e[a][0]-e[t][0])*(i[1]-e[t][1])/(e[a][1]-e[t][1])+e[t][0]&&(s=!s);return s}function h(e,s){for(var t,r,a=i.getData(),l=i.getOptions(),n=l.series.pie.radius>1?l.series.pie.radius:M*l.series.pie.radius,o=0;o<a.length;++o){var h=a[o];if(h.pie.show){if(m.save(),m.beginPath(),m.moveTo(0,0),m.arc(0,0,n,h.startAngle,h.startAngle+h.angle/2,!1),m.arc(0,0,n,h.startAngle+h.angle/2,h.startAngle+h.angle,!1),m.closePath(),t=e-P,r=s-A,m.isPointInPath){if(m.isPointInPath(e-P,s-A))return m.restore(),{datapoint:[h.percent,h.data],dataIndex:0,series:h,seriesIndex:o}}else{var g=n*Math.cos(h.startAngle),c=n*Math.sin(h.startAngle),u=n*Math.cos(h.startAngle+h.angle/4),d=n*Math.sin(h.startAngle+h.angle/4),f=n*Math.cos(h.startAngle+h.angle/2),v=n*Math.sin(h.startAngle+h.angle/2),b=n*Math.cos(h.startAngle+h.angle/1.5),w=n*Math.sin(h.startAngle+h.angle/1.5),k=n*Math.cos(h.startAngle+h.angle),y=n*Math.sin(h.startAngle+h.angle),I=[[0,0],[g,c],[u,d],[f,v],[b,w],[k,y]],O=[t,r];if(p(I,O))return m.restore(),{datapoint:[h.percent,h.data],dataIndex:0,series:h,seriesIndex:o}}m.restore()}}return null}function g(e){u("plothover",e)}function c(e){u("plotclick",e)}function u(e,s){var t=i.offset(),a=parseInt(s.pageX-t.left),l=parseInt(s.pageY-t.top),n=h(a,l);if(r.grid.autoHighlight)for(var o=0;o<I.length;++o){var p=I[o];p.auto==e&&(!n||p.series!=n.series)&&f(p.series)}n&&d(n.series,e);var g={pageX:s.pageX,pageY:s.pageY};k.trigger(e,[g,n])}function d(e,s){var t=v(e);-1==t?(I.push({series:e,auto:s}),i.triggerRedrawOverlay()):s||(I[t].auto=!1)}function f(e){null==e&&(I=[],i.triggerRedrawOverlay());var s=v(e);-1!=s&&(I.splice(s,1),i.triggerRedrawOverlay())}function v(e){for(var i=0;i<I.length;++i){var s=I[i];if(s.series==e)return i}return-1}function b(e,i){function s(e){e.angle<=0||isNaN(e.angle)||(i.fillStyle="rgba(255, 255, 255, "+t.series.pie.highlight.opacity+")",i.beginPath(),Math.abs(e.angle-2*Math.PI)>1e-9&&i.moveTo(0,0),i.arc(0,0,r,e.startAngle,e.startAngle+e.angle/2,!1),i.arc(0,0,r,e.startAngle+e.angle/2,e.startAngle+e.angle,!1),i.closePath(),i.fill())}var t=e.getOptions(),r=t.series.pie.radius>1?t.series.pie.radius:M*t.series.pie.radius;i.save(),i.translate(P,A),i.scale(1,t.series.pie.tilt);for(var a=0;a<I.length;++a)s(I[a].series);o(i),i.restore()}var w=null,k=null,M=null,P=null,A=null,y=!1,m=null,I=[];i.hooks.processOptions.push(function(e,i){i.series.pie.show&&(i.grid.show=!1,"auto"==i.series.pie.label.show&&(i.series.pie.label.show=i.legend.show?!1:!0),"auto"==i.series.pie.radius&&(i.series.pie.radius=i.series.pie.label.show?.75:1),i.series.pie.tilt>1?i.series.pie.tilt=1:i.series.pie.tilt<0&&(i.series.pie.tilt=0))}),i.hooks.bindEvents.push(function(e,i){var s=e.getOptions();s.series.pie.show&&(s.grid.hoverable&&i.unbind("mousemove").mousemove(g),s.grid.clickable&&i.unbind("click").click(c))}),i.hooks.processDatapoints.push(function(e,i,s,t){var r=e.getOptions();r.series.pie.show&&a(e,i,s,t)}),i.hooks.drawOverlay.push(function(e,i){var s=e.getOptions();s.series.pie.show&&b(e,i)}),i.hooks.draw.push(function(e,i){var s=e.getOptions();s.series.pie.show&&n(e,i)})}var s=10,t=.95,r={series:{pie:{show:!1,radius:"auto",innerRadius:0,startAngle:1.5,tilt:1,shadow:{left:5,top:15,alpha:.02},offset:{top:0,left:"auto"},stroke:{color:"#fff",width:1},label:{show:"auto",formatter:function(e,i){return"<div style='font-size:x-small;text-align:center;padding:2px;color:"+i.color+";'>"+e+"<br/>"+Math.round(i.percent)+"%</div>"},radius:1,background:{color:null,opacity:0},threshold:0},combine:{threshold:-1,color:null,label:"Other"},highlight:{opacity:.5}}}};e.plot.plugins.push({init:i,options:r,name:"pie",version:"1.1"})}(jQuery);