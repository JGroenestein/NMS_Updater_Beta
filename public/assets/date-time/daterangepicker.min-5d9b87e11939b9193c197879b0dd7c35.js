!function(t){var e=function(e,a,s){var i,n="object"==typeof a;this.startDate=moment().startOf("day"),this.endDate=moment().endOf("day"),this.minDate=!1,this.maxDate=!1,this.changed=!1,this.cleared=!1,this.showDropdowns=!1,this.dropdownAdjusts=!1,this.ranges={},this.dateLimit=!1,this.opens="right",this.cb=function(){},this.format="MM/DD/YYYY",this.separator=" - ",this.showWeekNumbers=!1,this.buttonClasses=["btn"],this.applyClass="btn btn-small btn-success",this.clearClass="btn btn-small",this.locale={applyLabel:"Apply",clearLabel:"Clear",fromLabel:"From",toLabel:"To",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:moment()._lang._weekdaysMin,monthNames:moment()._lang._monthsShort,firstDay:0},i=this.locale,this.leftCalendar={month:moment([this.startDate.year(),this.startDate.month(),1]),calendar:[]},this.rightCalendar={month:moment([this.endDate.year(),this.endDate.month(),1]),calendar:[]},this.element=t(e),this.element.hasClass("pull-right")&&(this.opens="left"),this.element.is("input")?this.element.on({click:t.proxy(this.show,this),focus:t.proxy(this.show,this)}):this.element.on("click",t.proxy(this.show,this)),n&&("object"==typeof a.locale&&t.each(i,function(t,e){i[t]=a.locale[t]||e}),a.applyClass&&(this.applyClass=a.applyClass),a.clearClass&&(this.clearClass=a.clearClass));var r='<div class="daterangepicker dropdown-menu"><div class="calendar left"></div><div class="calendar right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input" style="float: left"><label for="daterangepicker_start">'+this.locale.fromLabel+'</label><input class="input-mini" type="text" name="daterangepicker_start" value="" disabled="disabled" /></div><div class="daterangepicker_end_input" style="float: left; padding-left: 11px"><label for="daterangepicker_end">'+this.locale.toLabel+'</label><input class="input-mini" type="text" name="daterangepicker_end" value="" disabled="disabled" /></div><button class="'+this.applyClass+' applyBtn" disabled="disabled">'+this.locale.applyLabel+'</button>&nbsp;<button class="'+this.clearClass+' clearBtn">'+this.locale.clearLabel+"</button></div></div></div>";if(this.container=t(r).appendTo("body"),n){if("string"==typeof a.format&&(this.format=a.format),"string"==typeof a.separator&&(this.separator=a.separator),"string"==typeof a.startDate&&(this.startDate=moment(a.startDate,this.format).startOf("day")),"string"==typeof a.endDate&&(this.endDate=moment(a.endDate,this.format).endOf("day")),"string"==typeof a.minDate&&(this.minDate=moment(a.minDate,this.format).startOf("day")),"string"==typeof a.maxDate&&(this.maxDate=moment(a.maxDate,this.format).endOf("day")),"object"==typeof a.startDate&&(this.startDate=a.startDate instanceof Date?moment(a.startDate).startOf("day"):a.startDate.startOf("day")),"object"==typeof a.endDate&&(this.endDate=a.endDate instanceof Date?moment(a.endDate).endOf("day"):a.endDate.endOf("day")),"object"==typeof a.minDate&&(this.minDate=a.minDate instanceof Date?moment(a.minDate).startOf("day"):a.minDate.startOf("day")),"object"==typeof a.maxDate&&(this.maxDate=a.maxDate instanceof Date?moment(a.maxDate).endOf("day"):a.maxDate.endOf("day")),"object"==typeof a.ranges){for(var h in a.ranges){var o=moment(a.ranges[h][0]).startOf("day"),l=moment(a.ranges[h][1]).endOf("day");this.minDate&&o.isBefore(this.minDate)&&(o=moment(this.minDate)),this.maxDate&&l.isAfter(this.maxDate)&&(l=moment(this.maxDate)),this.minDate&&l.isBefore(this.minDate)||this.maxDate&&o.isAfter(this.maxDate)||(this.ranges[h]=[o,l])}var d="<ul>";for(var h in this.ranges)d+="<li>"+h+"</li>";d+="<li>"+this.locale.customRangeLabel+"</li>",d+="</ul>",this.container.find(".ranges").prepend(d)}if("object"==typeof a.dateLimit&&(this.dateLimit=a.dateLimit),"object"==typeof a.locale&&"number"==typeof a.locale.firstDay){this.locale.firstDay=a.locale.firstDay;for(var c=a.locale.firstDay;c>0;)this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),c--}"string"==typeof a.opens&&(this.opens=a.opens),"boolean"==typeof a.showWeekNumbers&&(this.showWeekNumbers=a.showWeekNumbers),"string"==typeof a.buttonClasses&&(this.buttonClasses=[a.buttonClasses]),"object"==typeof a.buttonClasses&&(this.buttonClasses=a.buttonClasses),"boolean"==typeof a.showDropdowns&&(this.showDropdowns=a.showDropdowns),"boolean"==typeof a.dropdownAdjusts&&(this.dropdownAdjusts=a.dropdownAdjusts)}var m=this.container;if(t.each(this.buttonClasses,function(t,e){m.find("button").addClass(e)}),"right"==this.opens){var f=this.container.find(".calendar.left"),p=this.container.find(".calendar.right");f.removeClass("left").addClass("right"),p.removeClass("right").addClass("left")}if(("undefined"==typeof a||"undefined"==typeof a.ranges)&&(this.container.find(".calendar").show(),this.move()),"function"==typeof s&&(this.cb=s),this.container.addClass("opens"+this.opens),(!n||"undefined"==typeof a.startDate&&"undefined"==typeof a.endDate)&&t(this.element).is("input[type=text]")){var u=t(this.element).val(),y=u.split(this.separator);2==y.length&&(this.startDate=moment(y[0],this.format).startOf("day"),this.endDate=moment(y[1],this.format).endOf("day"))}this.container.on("mousedown",t.proxy(this.mousedown,this)),this.container.find(".calendar").on("click",".prev",t.proxy(this.clickPrev,this)),this.container.find(".calendar").on("click",".next",t.proxy(this.clickNext,this)),this.container.find(".ranges").on("click","button.applyBtn",t.proxy(this.clickApply,this)),this.container.find(".ranges").on("click","button.clearBtn",t.proxy(this.clickClear,this)),this.container.find(".calendar").on("click","td.available",t.proxy(this.clickDate,this)),this.container.find(".calendar").on("mouseenter","td.available",t.proxy(this.enterDate,this)),this.container.find(".calendar").on("mouseleave","td.available",t.proxy(this.updateView,this)),this.container.find(".ranges").on("click","li",t.proxy(this.clickRange,this)),this.container.find(".ranges").on("mouseenter","li",t.proxy(this.enterRange,this)),this.container.find(".ranges").on("mouseleave","li",t.proxy(this.updateView,this)),this.container.find(".calendar").on("change","select.yearselect",t.proxy(this.updateYear,this)),this.container.find(".calendar").on("change","select.monthselect",t.proxy(this.updateMonth,this)),this.element.on("keyup",t.proxy(this.updateFromControl,this)),this.updateView(),this.updateCalendars()};e.prototype={constructor:e,mousedown:function(e){e.stopPropagation(),(!this.showDropdowns||t(e.target).not("select").length)&&e.preventDefault()},updateView:function(){this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()),this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()),this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format)),this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format)),this.startDate.isSame(this.endDate)||this.startDate.isBefore(this.endDate)?this.container.find("button.applyBtn").removeAttr("disabled"):this.container.find("button.applyBtn").attr("disabled","disabled")},updateFromControl:function(){if(this.element.is("input")&&this.element.val().length){var t=this.element.val().split(this.separator),e=moment(t[0],this.format).startOf("day"),a=moment(t[1],this.format).endOf("day");null!=e&&null!=a&&(a.isBefore(e)||(this.startDate=e,this.endDate=a,this.updateView(),this.cb(this.startDate,this.endDate),this.updateCalendars()))}},notify:function(){this.cleared||this.updateView(),this.element.is("input")&&this.element.val(this.cleared?"":this.startDate.format(this.format)+this.separator+this.endDate.format(this.format));var t=this.cleared?null:this.startDate,e=this.cleared?null:this.endDate;this.cleared=!1,this.cb(t,e)},move:function(){var e=t(this.container).find(".ranges").outerWidth();if(t(this.container).find(".calendar").is(":visible")){var a=24;e+=2*t(this.container).find(".calendar").outerWidth()+a}"left"==this.opens?(this.container.css({top:this.element.offset().top+this.element.outerHeight(),right:t(window).width()-this.element.offset().left-this.element.outerWidth(),left:"auto","min-width":e}),this.container.offset().left<0&&this.container.css({right:"auto",left:9})):(this.container.css({top:this.element.offset().top+this.element.outerHeight(),left:this.element.offset().left,right:"auto","min-width":e}),this.container.offset().left+this.container.outerWidth()>t(window).width()&&this.container.css({left:"auto",right:0}))},show:function(e){this.container.show(),this.move(),e&&(e.stopPropagation(),e.preventDefault()),this.changed=!1,this.element.trigger("shown",{target:e.target,picker:this}),t(document).on("mousedown",t.proxy(this.hide,this))},hide:function(){this.container.hide(),t(document).off("mousedown",this.hide),this.changed&&(this.changed=!1,this.notify())},enterRange:function(t){var e=t.target.innerHTML;if(e==this.locale.customRangeLabel)this.updateView();else{var a=this.ranges[e];this.container.find("input[name=daterangepicker_start]").val(a[0].format(this.format)),this.container.find("input[name=daterangepicker_end]").val(a[1].format(this.format))}},clickRange:function(t){var e=t.target.innerHTML;if(e==this.locale.customRangeLabel)this.container.find(".calendar").show(),this.move();else{var a=this.ranges[e];this.startDate=a[0],this.endDate=a[1],this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()),this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()),this.updateCalendars(),this.changed=!0,this.container.find(".calendar").hide(),this.move(),this.hide()}},clickPrev:function(e){var a=t(e.target).parents(".calendar");a.hasClass("left")?this.leftCalendar.month.subtract("month",1):this.rightCalendar.month.subtract("month",1),this.updateCalendars()},clickNext:function(e){var a=t(e.target).parents(".calendar");a.hasClass("left")?this.leftCalendar.month.add("month",1):this.rightCalendar.month.add("month",1),this.updateCalendars()},enterDate:function(e){var a=t(e.target).attr("data-title"),s=a.substr(1,1),i=a.substr(3,1),n=t(e.target).parents(".calendar");n.hasClass("left")?this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[s][i].format(this.format)):this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[s][i].format(this.format))},clickDate:function(e){var a=t(e.target).attr("data-title"),s=a.substr(1,1),i=a.substr(3,1),n=t(e.target).parents(".calendar");if(n.hasClass("left")){var r=this.leftCalendar.calendar[s][i],h=this.endDate;if("object"==typeof this.dateLimit){var o=moment(r).add(this.dateLimit).endOf("day");h.isAfter(o)&&(h=o)}this.element.trigger("clicked",{dir:"left",picker:this})}else{var r=this.startDate,h=this.rightCalendar.calendar[s][i];if("object"==typeof this.dateLimit){var l=moment(h).subtract(this.dateLimit).startOf("day");r.isBefore(l)&&(r=l)}this.element.trigger("clicked",{dir:"right",picker:this})}n.find("td").removeClass("active"),r.isSame(h)||r.isBefore(h)?(t(e.target).addClass("active"),r.isSame(this.startDate)&&h.isSame(this.endDate)||(this.changed=!0),this.startDate=r,this.endDate=h):r.isAfter(h)&&(t(e.target).addClass("active"),this.changed=!0,this.startDate=r,this.endDate=moment(r).add("day",1).endOf("day")),this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()),this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()),this.updateCalendars()},clickApply:function(){this.hide()},clickClear:function(){this.changed=!0,this.cleared=!0,this.hide()},updateYear:function(e){var a=parseInt(t(e.target).val()),s=t(e.target).closest(".calendar").hasClass("left");s?this.leftCalendar.month.month(this.startDate.month()).year(a):this.rightCalendar.month.month(this.endDate.month()).year(a),this.updateCalendars()},updateMonth:function(e){var a=parseInt(t(e.target).val()),s=t(e.target).closest(".calendar").hasClass("left");s?this.leftCalendar.month.month(a).year(this.startDate.year()):this.rightCalendar.month.month(a).year(this.endDate.year()),this.updateCalendars()},updateCalendars:function(){this.leftCalendar.calendar=this.buildCalendar(this.leftCalendar.month.month(),this.leftCalendar.month.year(),"left"),this.rightCalendar.calendar=this.buildCalendar(this.rightCalendar.month.month(),this.rightCalendar.month.year(),"right"),this.container.find(".calendar.left").html(this.renderCalendar(this.leftCalendar.calendar,this.startDate,this.minDate,this.maxDate)),this.container.find(".calendar.right").html(this.renderCalendar(this.rightCalendar.calendar,this.endDate,this.startDate,this.maxDate)),this.container.find(".ranges li").removeClass("active");var t=!0,e=0;for(var a in this.ranges)this.startDate.isSame(this.ranges[a][0])&&this.endDate.isSame(this.ranges[a][1])&&(t=!1,this.container.find(".ranges li:eq("+e+")").addClass("active")),e++;t&&this.container.find(".ranges li:last").addClass("active"),this.element.trigger("updated",this)},buildCalendar:function(t,e,a){for(var s=moment([e,t,1]),i=moment(s).subtract("month",1).month(),n=moment(s).subtract("month",1).year(),r=moment([n,i]).daysInMonth(),h=s.day(),o=[],l=0;6>l;l++)o[l]=[];var d=r-h+this.locale.firstDay+1;d>r&&(d-=7),h==this.locale.firstDay&&(d=r-6);var c;c="right"==a?moment([n,i,d]).endOf("day"):moment([n,i,d]).startOf("day");for(var l=0,m=0,f=0;42>l;l++,m++,c=moment(c).add("day",1))l>0&&0==m%7&&(m=0,f++),o[f][m]=c;return o},renderDropdowns:function(t,e,a){for(var s=t.month(),i='<select class="monthselect">',n=!1,r=!1,h=0;12>h;h++)(!n||h>=e.month())&&(!r||h<=a.month())&&(i+="<option value='"+h+"'"+(h===s?" selected='selected'":"")+">"+this.locale.monthNames[h]+"</option>");i+="</select>";for(var o=t.year(),l=a&&a.year()||o+5,d=e&&e.year()||o-50,c='<select class="yearselect">',m=d;l>=m;m++)c+='<option value="'+m+'"'+(m===o?' selected="selected"':"")+">"+m+"</option>";return c+="</select>",i+c},renderCalendar:function(e,a,s,i){var n='<table class="table-condensed">';n+="<thead>",n+="<tr>",this.showWeekNumbers&&(n+="<th></th>"),n+=!s||s.isBefore(e[1][1])?'<th class="prev available"><i class="icon-arrow-left"></i></th>':"<th></th>";var r=this.locale.monthNames[e[1][1].month()]+e[1][1].format(" YYYY");this.showDropdowns&&(r=this.renderDropdowns(e[1][1],s,i)),n+='<th colspan="5" style="width: auto">'+r+"</th>",n+=!i||i.isAfter(e[1][1])?'<th class="next available"><i class="icon-arrow-right"></i></th>':"<th></th>",n+="</tr>",n+="<tr>",this.showWeekNumbers&&(n+='<th class="week">'+this.locale.weekLabel+"</th>"),t.each(this.locale.daysOfWeek,function(t,e){n+="<th>"+e+"</th>"}),n+="</tr>",n+="</thead>",n+="<tbody>";for(var h=0;6>h;h++){n+="<tr>",this.showWeekNumbers&&(n+='<td class="week">'+e[h][0].week()+"</td>");for(var o=0;7>o;o++){var l="available ";l+=e[h][o].month()==e[1][1].month()?"":"off",s&&e[h][o].isBefore(s)||i&&e[h][o].isAfter(i)?l=" off disabled ":e[h][o].isSame(a)?(l+=" active ",e[h][o].isSame(this.startDate)&&(l+=" start-date "),e[h][o].isSame(this.endDate)&&(l+=" end-date ")):e[h][o]>=this.startDate&&e[h][o]<=this.endDate&&(l+=" in-range ",e[h][o].isSame(this.startDate)&&(l+=" start-date "),e[h][o].isSame(this.endDate)&&(l+=" end-date "));var d="r"+h+"c"+o;n+='<td class="'+l.replace(/\s+/g," ").replace(/^\s?(.*?)\s?$/,"$1")+'" data-title="'+d+'">'+e[h][o].date()+"</td>"}n+="</tr>"}return n+="</tbody>",n+="</table>"}},t.fn.daterangepicker=function(a,s){return this.each(function(){var i=t(this);i.data("daterangepicker")||i.data("daterangepicker",new e(i,a,s))}),this}}(window.jQuery);