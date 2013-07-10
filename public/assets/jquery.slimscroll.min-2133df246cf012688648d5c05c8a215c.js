/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.1.1
 *
 */
!function(t){jQuery.fn.extend({slimScroll:function(e){var i=t.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200},e);return this.each(function(){function o(e){if(c){e=e||window.event;var o=0;e.wheelDelta&&(o=-e.wheelDelta/120),e.detail&&(o=e.detail/3),t(e.target||e.srcTarget).closest("."+i.wrapperClass).is(m.parent())&&s(o,!0),e.preventDefault&&!b&&e.preventDefault(),b||(e.returnValue=!1)}}function s(t,e,o){var s=t,a=m.outerHeight()-H.outerHeight();e&&(s=parseInt(H.css("top"))+t*parseInt(i.wheelStep)/100*H.outerHeight(),s=Math.min(Math.max(s,0),a),s=t>0?Math.ceil(s):Math.floor(s),H.css({top:s+"px"})),f=parseInt(H.css("top"))/(m.outerHeight()-H.outerHeight()),s=f*(m[0].scrollHeight-m.outerHeight()),o&&(s=t,t=s/m[0].scrollHeight*m.outerHeight(),t=Math.min(Math.max(t,0),a),H.css({top:t+"px"})),m.scrollTop(s),m.trigger("slimscrolling",~~s),l(),n()}function a(){window.addEventListener?(this.addEventListener("DOMMouseScroll",o,!1),this.addEventListener("mousewheel",o,!1)):document.attachEvent("onmousewheel",o)}function r(){g=Math.max(m.outerHeight()/m[0].scrollHeight*m.outerHeight(),w),H.css({height:g+"px"});var t=g==m.outerHeight()?"none":"block";H.css({display:t})}function l(){r(),clearTimeout(u),f==~~f&&(b=i.allowPageScroll,v!=f&&m.trigger("slimscroll",0==~~f?"top":"bottom")),v=f,g>=m.outerHeight()?b=!0:(H.stop(!0,!0).fadeIn("fast"),i.railVisible&&C.stop(!0,!0).fadeIn("fast"))}function n(){i.alwaysVisible||(u=setTimeout(function(){i.disableFadeOut&&c||h||d||(H.fadeOut("slow"),C.fadeOut("slow"))},1e3))}var c,h,d,u,p,g,f,v,w=30,b=!1,m=t(this);if(m.parent().hasClass(i.wrapperClass)){var y=m.scrollTop(),H=m.parent().find("."+i.barClass),C=m.parent().find("."+i.railClass);if(r(),t.isPlainObject(e)){if("scrollTo"in e)y=parseInt(i.scrollTo);else if("scrollBy"in e)y+=parseInt(i.scrollBy);else if("destroy"in e)return H.remove(),C.remove(),m.unwrap(),void 0;s(y,!1,!0)}}else{i.height="auto"==i.height?m.parent().innerHeight():i.height,y=t("<div></div>").addClass(i.wrapperClass).css({position:"relative",overflow:"hidden",width:i.width,height:i.height}),m.css({overflow:"hidden",width:i.width,height:i.height});var C=t("<div></div>").addClass(i.railClass).css({width:i.size,height:"100%",position:"absolute",top:0,display:i.alwaysVisible&&i.railVisible?"block":"none","border-radius":i.size,background:i.railColor,opacity:i.railOpacity,zIndex:90}),H=t("<div></div>").addClass(i.barClass).css({background:i.color,width:i.size,position:"absolute",top:0,opacity:i.opacity,display:i.alwaysVisible?"block":"none","border-radius":i.size,BorderRadius:i.size,MozBorderRadius:i.size,WebkitBorderRadius:i.size,zIndex:99}),x="right"==i.position?{right:i.distance}:{left:i.distance};C.css(x),H.css(x),m.wrap(y),m.parent().append(H),m.parent().append(C),i.railDraggable&&H.draggable({axis:"y",containment:"parent",start:function(){d=!0},stop:function(){d=!1,n()},drag:function(){s(0,t(this).position().top,!1)}}),C.hover(function(){l()},function(){n()}),H.hover(function(){h=!0},function(){h=!1}),m.hover(function(){c=!0,l(),n()},function(){c=!1,n()}),m.bind("touchstart",function(t){t.originalEvent.touches.length&&(p=t.originalEvent.touches[0].pageY)}),m.bind("touchmove",function(t){t.originalEvent.preventDefault(),t.originalEvent.touches.length&&s((p-t.originalEvent.touches[0].pageY)/i.touchScrollStep,!0)}),"bottom"===i.start?(H.css({top:m.outerHeight()-H.outerHeight()}),s(0,!0)):"top"!==i.start&&(s(t(i.start).position().top,null,!0),i.alwaysVisible||H.hide()),a(),r()}}),this}}),jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll})}(jQuery);