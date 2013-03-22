/*!
 * iButton jQuery Plug-in
 *
 * Copyright 2011 Giva, Inc. (http://www.givainc.com/labs/) 
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Date: 2011-07-26
 * Rev:  1.0.03
 *
 * MWS Admin v2.1 - Modified iButton Plugin JS
 * This file is part of MWS Admin, an Admin template build for sale at ThemeForest.
 * Last Updated:
 * December 08, 2012
 *
 */

;(function(c){c.iButton={version:"1.0.03",setDefaults:function(m){c.extend(A,m)}};c.fn.iButton=function(m){var a="string"==typeof arguments[0]&&arguments[0],i=a&&Array.prototype.slice.call(arguments,1)||arguments,b=0==this.length?null:c.data(this[0],"iButton");if(b&&a&&this.length){if("object"==a.toLowerCase())return b;if(b[a]){var e;this.each(function(k){var f=c.data(this,"iButton")[a].apply(b,i);if(0==k&&f)if(f.jquery)e=c([]).add(f);else return e=f,!1;else f&&f.jquery&&(e=e.add(f))});return e||this}return this}return this.each(function(){new E(this,
m)})};var F=0;c.browser.iphone=-1<navigator.userAgent.toLowerCase().indexOf("iphone");var E=function(m,a){var i=this,b=c(m),e=++F,k=!1,f,v,w,n,x=!1,p=null,B=null,q=null,C=null,a=c.extend({},A,a,b.data());if(b.is(":checkbox, :radio")){if(c.data(b[0],"iButton"))return}else return b.find(":checkbox, :radio").iButton(a);c.data(b[0],"iButton",i);b.parent().is("label")&&b.parent().bind("click.iButton",function(a){a.preventDefault()});this.toggle=function(a){b.attr("checked",0<arguments.length?a:!b[0].checked).trigger("change")};
this.disable=function(d){var y=0<arguments.length?d:!k;k=y;b.attr("disabled",y);g[y?"addClass":"removeClass"](a.classDisabled);c.isFunction(a.disable)&&a.disable.apply(i,[k,b,a])};this.repaint=function(){D();r()};this.destroy=function(){c([b[0],g[0]]).unbind(".iButton");b.parent().is("label")&&b.parent().unbind(".iButton");c(document).unbind(".iButton_"+e);g.after(b).remove();c.data(b[0],"iButton",null);c.isFunction(a.destroy)&&a.destroy.apply(i,[b,a])};b.wrap('<div class="'+c.trim(a.classContainer+
" "+a.className)+'" />').after('<div class="'+a.classHandle+'"><div class="'+a.classHandleInner+'" /></div><div class="'+a.classLabelOff+'"><span><label>'+a.labelOff+'</label></span></div><div class="'+a.classLabelOn+'"><span><label>'+a.labelOn+"</label></span></div>");var g=b.parent(),j=b.siblings("."+a.classHandle),s=b.siblings("."+a.classLabelOff),t=s.children("span"),l=b.siblings("."+a.classLabelOn),u=l.children("span"),h,D=function(){f=u.outerWidth();v=t.outerWidth();w=Math.min(f,v);j.css("width",
w);n=f+v;g.css("width",n+Math.max(parseInt(s.css("border-left-width"),10)+parseInt(s.css("border-right-width"),10),parseInt(l.css("border-left-width"),10)+parseInt(l.css("border-right-width"),10)));s.css("width",n);h=n-w};D();var r=function(d){var c=b[0].checked?h:0;(d=0<arguments.length?arguments[0]:!0)&&a.enableFx?(j.stop().animate({left:c},a.duration,a.easing),l.stop().animate({width:c},a.duration,a.easing),u.stop().animate({marginLeft:c-h},a.duration,a.easing),t.stop().animate({marginRight:-c},
a.duration,a.easing)):(j.css("left",c),l.css("width",c),u.css("marginLeft",c-h),t.css("marginRight",-c))};r(!1);var z=function(a){return a.pageX||(a.originalEvent.changedTouches?a.originalEvent.changedTouches[0].pageX:0)};g.bind("mousedown.iButton touchstart.iButton",function(d){if(!c(d.target).is(":checkbox, :radio")&&!(k||!a.allowRadioUncheck&&b.is(":radio:checked")))d.preventDefault(),p=j,B=z(d),q=B-(parseInt(j.css("left"),10)||0),C=(new Date).getTime()});a.enableDrag&&c(document).bind("mousemove.iButton_"+
e+" touchmove.iButton_"+e,function(b){p==j&&(b.preventDefault(),b=z(b),b!=q&&(x=!0,g.addClass(a.classHandleActive)),b=Math.min(1,Math.max(0,(b-q)/h)),j.css("left",b*h),l.css("width",b*h),t.css("marginRight",-b*h),u.css("marginLeft",-(1-b)*h))});c(document).bind("mouseup.iButton_"+e+" touchend.iButton_"+e,function(d){if(p==j){d.preventDefault();var e=!0;!x||(new Date).getTime()-C<a.clickOffset?(d=b[0].checked,b.attr("checked",!d),c.isFunction(a.click)&&a.click.apply(i,[!d,b,a])):(d=0.5<=(z(d)-q)/h,
b[0].checked==d&&(e=!1),b.attr("checked",d));g.removeClass(a.classHandleActive);x=p=null;e?b.trigger("change"):r()}});b.bind("change.iButton",function(){r();if(b.is(":radio")){var d=b[0];c(d.form?d.form[d.name]:":radio[name="+d.name+"]").filter(":not(:checked)").iButton("repaint")}c.isFunction(a.change)&&a.change.apply(i,[b,a])}).bind("focus.iButton",function(){g.addClass(a.classFocus)}).bind("blur.iButton",function(){g.removeClass(a.classFocus)});c.isFunction(a.click)&&b.bind("click.iButton",function(){a.click.apply(i,
[b[0].checked,b,a])});b.is(":disabled")&&this.disable(!0);c.browser.msie&&(g.find("*").andSelf().attr("unselectable","on"),b.bind("click.iButton",function(){b.triggerHandler("change.iButton")}));c.isFunction(a.init)&&a.init.apply(i,[b,a])},A={duration:200,easing:"swing",labelOn:"ON",labelOff:"OFF",enableDrag:!0,enableFx:!0,allowRadioUncheck:!1,clickOffset:120,className:"",classContainer:"ibutton-container",classDisabled:"ibutton-disabled",classFocus:"ibutton-focus",classLabelOn:"ibutton-label-on",
classLabelOff:"ibutton-label-off",classHandle:"ibutton-handle",classHandleInner:"ibutton-handle-inner",classHandleActive:"ibutton-active-handle",init:null,change:null,click:null,disable:null,destroy:null}})(jQuery);