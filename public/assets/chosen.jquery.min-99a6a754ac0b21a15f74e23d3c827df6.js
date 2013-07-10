// Copyright (c) 2011 Harvest http://getharvest.com
!function(){var t;t=function(){function t(){this.options_index=0,this.parsed=[]}return t.prototype.add_node=function(t){return"OPTGROUP"===t.nodeName.toUpperCase()?this.add_group(t):this.add_option(t)},t.prototype.add_group=function(t){var e,s,i,r,l,h;for(e=this.parsed.length,this.parsed.push({array_index:e,group:!0,label:t.label,children:0,disabled:t.disabled}),l=t.childNodes,h=[],i=0,r=l.length;r>i;i++)s=l[i],h.push(this.add_option(s,e,t.disabled));return h},t.prototype.add_option=function(t,e,s){return"OPTION"===t.nodeName.toUpperCase()?(""!==t.text?(null!=e&&(this.parsed[e].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:t.value,text:t.text,html:t.innerHTML,selected:t.selected,disabled:s===!0?s:t.disabled,group_array_index:e,classes:t.className,style:t.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},t}(),t.select_to_array=function(e){var s,i,r,l,h;for(i=new t,h=e.childNodes,r=0,l=h.length;l>r;r++)s=h[r],i.add_node(s);return i.parsed},this.SelectParser=t}.call(this),function(){var t,e;e=this,t=function(){function t(e,s){this.form_field=e,this.options=null!=s?s:{},t.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers(),this.finish_setup())}return t.prototype.set_default_values=function(){var t=this;return this.click_test_action=function(e){return t.test_active_click(e)},this.activate_action=function(e){return t.activate_field(e)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.result_single_selected=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=this.options.single_backstroke_delete||!1,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1},t.prototype.set_default_text=function(){return this.default_text=this.form_field.getAttribute("data-placeholder")?this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.options.placeholder_text_multiple||this.options.placeholder_text||t.default_multiple_text:this.options.placeholder_text_single||this.options.placeholder_text||t.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||t.default_no_result_text},t.prototype.mouse_enter=function(){return this.mouse_on_container=!0},t.prototype.mouse_leave=function(){return this.mouse_on_container=!1},t.prototype.input_focus=function(){var t=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return t.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},t.prototype.input_blur=function(){var t=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return t.blur_test()},100))},t.prototype.result_add_option=function(t){var e,s;return t.disabled?"":(t.dom_id=this.container_id+"_o_"+t.array_index,e=t.selected&&this.is_multiple?[]:["active-result"],t.selected&&e.push("result-selected"),null!=t.group_array_index&&e.push("group-option"),""!==t.classes&&e.push(t.classes),s=""!==t.style.cssText?' style="'+t.style+'"':"",'<li id="'+t.dom_id+'" class="'+e.join(" ")+'"'+s+">"+t.html+"</li>")},t.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.result_single_selected=null,this.results_build()},t.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},t.prototype.results_search=function(){return this.results_showing?this.winnow_results():this.results_show()},t.prototype.choices_count=function(){var t,e,s,i;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,i=this.form_field.options,e=0,s=i.length;s>e;e++)t=i[e],t.selected&&(this.selected_option_count+=1);return this.selected_option_count},t.prototype.choices_click=function(t){return t.preventDefault(),this.results_showing?void 0:this.results_show()},t.prototype.keyup_checker=function(t){var e,s;switch(e=null!=(s=t.which)?s:t.keyCode,this.search_field_scale(),e){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(t.preventDefault(),this.results_showing)return this.result_select(t);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}},t.prototype.generate_field_id=function(){var t;return t=this.generate_random_id(),this.form_field.id=t,t},t.prototype.generate_random_char=function(){var t,e,s;return t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",s=Math.floor(Math.random()*t.length),e=t.substring(s,s+1)},t.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},t.browser_is_supported=function(){var t;return"Microsoft Internet Explorer"===window.navigator.appName?null!==(t=document.documentMode)&&t>=8:!0},t.default_multiple_text="Select Some Options",t.default_single_text="Select an Option",t.default_no_result_text="No results match",t}(),e.AbstractChosen=t}.call(this),function(){var t,e,s,i={}.hasOwnProperty,r=function(t,e){function s(){this.constructor=t}for(var r in e)i.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t};s=this,t=jQuery,t.fn.extend({chosen:function(s){return AbstractChosen.browser_is_supported()?this.each(function(){var i;return i=t(this),i.hasClass("chzn-done")?void 0:i.data("chosen",new e(this,s))}):this}}),e=function(e){function i(){return i.__super__.constructor.apply(this,arguments)}return r(i,e),i.prototype.setup=function(){return this.form_field_jq=t(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chzn-rtl")},i.prototype.finish_setup=function(){return this.form_field_jq.addClass("chzn-done")},i.prototype.set_up_html=function(){var e,s;return this.container_id=this.form_field.id.length?this.form_field.id.replace(/[^\w]/g,"_"):this.generate_field_id(),this.container_id+="_chzn",e=["chzn-container"],e.push("chzn-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&e.push(this.form_field.className),this.is_rtl&&e.push("chzn-rtl"),s={id:this.container_id,"class":e.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.container=t("<div />",s),this.is_multiple?this.container.html('<ul class="chzn-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop"><ul class="chzn-results"></ul></div>'):this.container.html('<a href="javascript:void(0)" class="chzn-single chzn-default" tabindex="-1"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chzn-drop"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chzn-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chzn-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chzn-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chzn-search").first(),this.selected_item=this.container.find(".chzn-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior(),this.form_field_jq.trigger("liszt:ready",{chosen:this})},i.prototype.register_observers=function(){var t=this;return this.container.mousedown(function(e){t.container_mousedown(e)}),this.container.mouseup(function(e){t.container_mouseup(e)}),this.container.mouseenter(function(e){t.mouse_enter(e)}),this.container.mouseleave(function(e){t.mouse_leave(e)}),this.search_results.mouseup(function(e){t.search_results_mouseup(e)}),this.search_results.mouseover(function(e){t.search_results_mouseover(e)}),this.search_results.mouseout(function(e){t.search_results_mouseout(e)}),this.search_results.bind("mousewheel DOMMouseScroll",function(e){t.search_results_mousewheel(e)}),this.form_field_jq.bind("liszt:updated",function(e){t.results_update_field(e)}),this.form_field_jq.bind("liszt:activate",function(e){t.activate_field(e)}),this.form_field_jq.bind("liszt:open",function(e){t.container_mousedown(e)}),this.search_field.blur(function(e){t.input_blur(e)}),this.search_field.keyup(function(e){t.keyup_checker(e)}),this.search_field.keydown(function(e){t.keydown_checker(e)}),this.search_field.focus(function(e){t.input_focus(e)}),this.is_multiple?this.search_choices.click(function(e){t.choices_click(e)}):this.container.click(function(t){t.preventDefault()})},i.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chzn-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus",this.activate_action),this.close_field()):(this.container.removeClass("chzn-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus",this.activate_action))},i.prototype.container_mousedown=function(e){return this.is_disabled||(e&&"mousedown"===e.type&&!this.results_showing&&e.preventDefault(),null!=e&&t(e.target).hasClass("search-choice-close"))?void 0:(this.active_field?!this.is_multiple&&e&&(t(e.target)[0]===this.selected_item[0]||t(e.target).parents("a.chzn-single").length)&&(e.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),t(document).click(this.click_test_action),this.results_show()),this.activate_field())},i.prototype.container_mouseup=function(t){return"ABBR"!==t.target.nodeName||this.is_disabled?void 0:this.results_reset(t)},i.prototype.search_results_mousewheel=function(t){var e,s,i;return e=-(null!=(s=t.originalEvent)?s.wheelDelta:void 0)||(null!=(i=t.originialEvent)?i.detail:void 0),null!=e?(t.preventDefault(),"DOMMouseScroll"===t.type&&(e*=40),this.search_results.scrollTop(e+this.search_results.scrollTop())):void 0},i.prototype.blur_test=function(){return!this.active_field&&this.container.hasClass("chzn-container-active")?this.close_field():void 0},i.prototype.close_field=function(){return t(document).unbind("click",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chzn-container-active"),this.winnow_results_clear(),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},i.prototype.activate_field=function(){return this.container.addClass("chzn-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},i.prototype.test_active_click=function(e){return t(e.target).parents("#"+this.container_id).length?this.active_field=!0:this.close_field()},i.prototype.results_build=function(){var t,e,i,r,l;for(this.parsing=!0,this.selected_option_count=null,this.results_data=s.SelectParser.select_to_array(this.form_field),this.is_multiple&&this.choices_count()>0?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.selected_item.addClass("chzn-default").find("span").text(this.default_text),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?this.container.addClass("chzn-container-single-nosearch"):this.container.removeClass("chzn-container-single-nosearch")),t="",l=this.results_data,i=0,r=l.length;r>i;i++)e=l[i],e.group?t+=this.result_add_group(e):e.empty||(t+=this.result_add_option(e),e.selected&&this.is_multiple?this.choice_build(e):e.selected&&!this.is_multiple&&(this.selected_item.removeClass("chzn-default").find("span").text(e.text),this.allow_single_deselect&&this.single_deselect_control_build()));return this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.search_results.html(t),this.parsing=!1},i.prototype.result_add_group=function(e){return e.disabled?"":(e.dom_id=this.container_id+"_g_"+e.array_index,'<li id="'+e.dom_id+'" class="group-result">'+t("<div />").text(e.label).html()+"</li>")},i.prototype.result_do_highlight=function(t){var e,s,i,r,l;if(t.length){if(this.result_clear_highlight(),this.result_highlight=t,this.result_highlight.addClass("highlighted"),i=parseInt(this.search_results.css("maxHeight"),10),l=this.search_results.scrollTop(),r=i+l,s=this.result_highlight.position().top+this.search_results.scrollTop(),e=s+this.result_highlight.outerHeight(),e>=r)return this.search_results.scrollTop(e-i>0?e-i:0);if(l>s)return this.search_results.scrollTop(s)}},i.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},i.prototype.results_show=function(){if(null!=this.result_single_selected)this.result_do_highlight(this.result_single_selected);else if(this.is_multiple&&this.max_selected_options<=this.choices_count())return this.form_field_jq.trigger("liszt:maxselected",{chosen:this}),!1;return this.container.addClass("chzn-with-drop"),this.form_field_jq.trigger("liszt:showing_dropdown",{chosen:this}),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results()},i.prototype.results_hide=function(){return this.result_clear_highlight(),this.container.removeClass("chzn-with-drop"),this.form_field_jq.trigger("liszt:hiding_dropdown",{chosen:this}),this.results_showing=!1},i.prototype.set_tab_index=function(){var t;return this.form_field_jq.attr("tabindex")?(t=this.form_field_jq.attr("tabindex"),this.form_field_jq.attr("tabindex",-1),this.search_field.attr("tabindex",t)):void 0},i.prototype.set_label_behavior=function(){var e=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=t("label[for="+this.form_field.id+"]")),this.form_field_label.length>0?this.form_field_label.click(function(t){return e.is_multiple?e.container_mousedown(t):e.activate_field()}):void 0},i.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},i.prototype.search_results_mouseup=function(e){var s;return s=t(e.target).hasClass("active-result")?t(e.target):t(e.target).parents(".active-result").first(),s.length?(this.result_highlight=s,this.result_select(e),this.search_field.focus()):void 0},i.prototype.search_results_mouseover=function(e){var s;return s=t(e.target).hasClass("active-result")?t(e.target):t(e.target).parents(".active-result").first(),s?this.result_do_highlight(s):void 0},i.prototype.search_results_mouseout=function(e){return t(e.target).hasClass("active-result")?this.result_clear_highlight():void 0},i.prototype.choice_build=function(e){var s,i,r=this;return s=t("<li />",{"class":"search-choice"}).html("<span>"+e.html+"</span>"),e.disabled?s.addClass("search-choice-disabled"):(i=t("<a />",{href:"#","class":"search-choice-close",rel:e.array_index}),i.click(function(t){return r.choice_destroy_link_click(t)}),s.append(i)),this.search_container.before(s)},i.prototype.choice_destroy_link_click=function(e){return e.preventDefault(),e.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(t(e.target))},i.prototype.choice_destroy=function(t){return this.result_deselect(t.attr("rel"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),t.parents("li").first().remove(),this.search_field_scale()):void 0},i.prototype.results_reset=function(){return this.form_field.options[0].selected=!0,this.selected_option_count=null,this.selected_item.find("span").text(this.default_text),this.is_multiple||this.selected_item.addClass("chzn-default"),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},i.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},i.prototype.result_select=function(t){var e,s,i,r;return this.result_highlight?(e=this.result_highlight,s=e.attr("id"),this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("liszt:maxselected",{chosen:this}),!1):(this.is_multiple?this.result_deactivate(e):(this.search_results.find(".result-selected").removeClass("result-selected"),this.result_single_selected=e,this.selected_item.removeClass("chzn-default")),e.addClass("result-selected"),r=s.substr(s.lastIndexOf("_")+1),i=this.results_data[r],i.selected=!0,this.form_field.options[i.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(i):(this.selected_item.find("span").first().text(i.text),this.allow_single_deselect&&this.single_deselect_control_build()),(!t.metaKey&&!t.ctrlKey||!this.is_multiple)&&this.results_hide(),this.search_field.val(""),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[i.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,this.search_field_scale())):void 0},i.prototype.result_activate=function(t){return t.addClass("active-result")},i.prototype.result_deactivate=function(t){return t.removeClass("active-result")},i.prototype.result_deselect=function(e){var s,i;return i=this.results_data[e],this.form_field.options[i.options_index].disabled?!1:(i.selected=!1,this.form_field.options[i.options_index].selected=!1,this.selected_option_count=null,s=t("#"+this.container_id+"_o_"+e),s.removeClass("result-selected").addClass("active-result").show(),this.result_clear_highlight(),this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[i.options_index].value}),this.search_field_scale(),!0)},i.prototype.single_deselect_control_build=function(){return this.allow_single_deselect&&this.selected_item.find("abbr").length<1?this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'):void 0},i.prototype.winnow_results=function(){var e,s,i,r,l,h,n,o,a,c,_,u,d,f,p,g,m,v;for(this.no_results_clear(),a=0,c=this.search_field.val()===this.default_text?"":t("<div/>").text(t.trim(this.search_field.val())).html(),h=this.search_contains?"":"^",l=new RegExp(h+c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i"),d=new RegExp(c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),"i"),v=this.results_data,f=0,g=v.length;g>f;f++)if(s=v[f],!s.disabled&&!s.empty)if(s.group)t("#"+s.dom_id).css("display","none");else if(!this.is_multiple||!s.selected){if(e=!1,o=s.dom_id,n=t("#"+o),l.test(s.html))e=!0,a+=1;else if(this.enable_split_word_search&&(s.html.indexOf(" ")>=0||0===s.html.indexOf("["))&&(r=s.html.replace(/\[|\]/g,"").split(" "),r.length))for(p=0,m=r.length;m>p;p++)i=r[p],l.test(i)&&(e=!0,a+=1);e?(c.length?(_=s.html.search(d),u=s.html.substr(0,_+c.length)+"</em>"+s.html.substr(_+c.length),u=u.substr(0,_)+"<em>"+u.substr(_)):u=s.html,n.html(u),this.result_activate(n),null!=s.group_array_index&&t("#"+this.results_data[s.group_array_index].dom_id).css("display","list-item")):(this.result_highlight&&o===this.result_highlight.attr("id")&&this.result_clear_highlight(),this.result_deactivate(n))}return 1>a&&c.length?this.no_results(c):this.winnow_results_set_highlight()},i.prototype.winnow_results_clear=function(){var e,s,i,r,l;for(this.search_field.val(""),s=this.search_results.find("li"),l=[],i=0,r=s.length;r>i;i++)e=s[i],e=t(e),e.hasClass("group-result")?l.push(e.css("display","auto")):this.is_multiple&&e.hasClass("result-selected")?l.push(void 0):l.push(this.result_activate(e));return l},i.prototype.winnow_results_set_highlight=function(){var t,e;return this.result_highlight||(e=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),t=e.length?e.first():this.search_results.find(".active-result").first(),null==t)?void 0:this.result_do_highlight(t)},i.prototype.no_results=function(e){var s;return s=t('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>'),s.find("span").first().html(e),this.search_results.append(s)},i.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},i.prototype.keydown_arrow=function(){var e,s;return this.result_highlight?this.results_showing&&(s=this.result_highlight.nextAll("li.active-result").first(),s&&this.result_do_highlight(s)):(e=this.search_results.find("li.active-result").first(),e&&this.result_do_highlight(t(e))),this.results_showing?void 0:this.results_show()},i.prototype.keyup_arrow=function(){var t;return this.results_showing||this.is_multiple?this.result_highlight?(t=this.result_highlight.prevAll("li.active-result"),t.length?this.result_do_highlight(t.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},i.prototype.keydown_backstroke=function(){var t;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(t=this.search_container.siblings("li.search-choice").last(),t.length&&!t.hasClass("search-choice-disabled")?(this.pending_backstroke=t,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},i.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},i.prototype.keydown_checker=function(t){var e,s;switch(e=null!=(s=t.which)?s:t.keyCode,this.search_field_scale(),8!==e&&this.pending_backstroke&&this.clear_backstroke(),e){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(t),this.mouse_on_container=!1;break;case 13:t.preventDefault();break;case 38:t.preventDefault(),this.keyup_arrow();break;case 40:this.keydown_arrow()}},i.prototype.search_field_scale=function(){var e,s,i,r,l,h,n,o;if(this.is_multiple){for(s=0,h=0,r="position:absolute; left: -1000px; top: -1000px; display:none;",l=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],n=0,o=l.length;o>n;n++)i=l[n],r+=i+":"+this.search_field.css(i)+";";return e=t("<div />",{style:r}),e.text(this.search_field.val()),t("body").append(e),h=e.width()+25,e.remove(),this.f_width||(this.f_width=this.container.outerWidth()),h>this.f_width-10&&(h=this.f_width-10),this.search_field.css({width:h+"px"})}},i.prototype.generate_random_id=function(){var e;for(e="sel"+this.generate_random_char()+this.generate_random_char()+this.generate_random_char();t("#"+e).length>0;)e+=this.generate_random_char();return e},i}(AbstractChosen),s.Chosen=e}.call(this);