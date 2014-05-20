/*!CK:402392410!*//*1399859039,178142509*/

if (self.CavalryLogger) { CavalryLogger.start_js(["7+twb"]); }

__d("SwapButtonDEPRECATED",["Event","Arbiter","copyProperties","CSS","Focus"],function(a,b,c,d,e,f,g,h,i,j,k){function l(m,n,o){this._swapperButton=m;this._swappeeButton=n;g.listen(m,'click',this.swap.bind(this));if(o)g.listen(n,'click',this.unswap.bind(this));h.subscribe('SwapButtonDEPRECATED/focusOnJoinButton',this.setFocusOnSwapper.bind(this),h.SUBSCRIBE_ALL);}i(l.prototype,{_swapperButton:null,_swappeeButton:null,swap:function(m){j.hide(this._swapperButton);j.show(this._swappeeButton);m!==false&&k.setWithoutOutline(this._swappeeButton);},unswap:function(m){j.show(this._swapperButton);j.hide(this._swappeeButton);m!==false&&k.setWithoutOutline(this._swapperButton);},toggle:function(){j.toggle(this._swapperButton);j.toggle(this._swappeeButton);},setFocusOnSwapper:function(){this._swapperButton.focus();}});e.exports=l;});
__d("ShareAttachmentDescriptionEllipsis",["DOMDimensions","LitestandEllipsis","Style"],function(a,b,c,d,e,f,g,h,i){var j={add:function(k,l){var m=g.getElementDimensions(l).height,n=i.getFloat(k,'marginTop'),o=k.parentElement.clientHeight-m-n;h.add(k,o);}};e.exports=j;});
__d("PopoverAsyncMenu",["AsyncRequest","Event","PopoverMenu","copyProperties"],function(a,b,c,d,e,f,g,h,i,j){var k={},l=0;for(var m in i)if(i.hasOwnProperty(m))o[m]=i[m];var n=i===null?null:i.prototype;o.prototype=Object.create(n);o.prototype.constructor=o;o.__superConstructor__=i;function o(p,q,r,s,t){"use strict";this._endpoint=s;this._loadingMenu=r;this._instanceId=l++;k[this._instanceId]=this;this._mouseoverListener=h.listen(q,'mouseover',this._fetchMenu.bind(this));i.call(this,p,q,null,t);}o.prototype._onLayerInit=function(){"use strict";if(!this._menu&&this._loadingMenu)this.setMenu(this._loadingMenu);this._fetchMenu();this._popover.getLayer().subscribe('key',this._handleKeyEvent.bind(this));};o.prototype._fetchMenu=function(){"use strict";if(this._fetched)return;new g().setURI(this._endpoint).setData({pmid:this._instanceId}).send();this._fetched=true;if(this._mouseoverListener){this._mouseoverListener.remove();this._mouseoverListener=null;}};o.setMenu=function(p,q){"use strict";k[p].setMenu(q);};o.getInstance=function(p){"use strict";return k[p];};j(o.prototype,{_fetched:false,_mouseoverListener:null});e.exports=o;});
__d("PopoverMenuShowOnHover",["Event"],function(a,b,c,d,e,f,g){var h=250;function i(j){"use strict";this._popoverMenu=j;this._listeners=[];}i.prototype.enable=function(){"use strict";this._attachMouseListeners(this._popoverMenu.getTriggerElem());this._setMenuSubscription=this._popoverMenu.subscribe('setMenu',this._onSetMenu.bind(this));};i.prototype.disable=function(){"use strict";while(this._listeners.length)this._listeners.pop().remove();if(this._setMenuSubscription){this._setMenuSubscription.unsubscribe();this._setMenuSubscription=null;}};i.prototype._onSetMenu=function(){"use strict";this._attachMouseListeners(this._popoverMenu.getMenu().getRoot());};i.prototype._attachMouseListeners=function(j){"use strict";var k=this._popoverMenu.getPopover(),l=null;this._listeners.push(g.listen(j,'mouseleave',k.hideLayer.bind(k)),g.listen(j,'mouseenter',function(){l=Date.now();k.showLayer();}),g.listen(j,'click',function(m){if(Date.now()<l+h)m.stop();}));};e.exports=i;});
__d("TimelineDrag",["ArbiterMixin","Event","Locale","Style","Vector","mixin"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=l(g);for(var n in m)if(m.hasOwnProperty(n))p[n]=m[n];var o=m===null?null:m.prototype;p.prototype=Object.create(o);p.prototype.constructor=p;p.__superConstructor__=m;function p(q,r,s){"use strict";s=s||{};this._listenOn=s.listenOn;this._offsetInput=r;this._defaultOffset=s.default_offset;this._killClicks=s.killClicks;this._vertical=true;this._RTLXSwitch=false;this.setPicture(q,s);}p.prototype.setPicture=function(q,r){"use strict";if(!q)return false;r=r||{};this._picture=q;this._defaultOffset=r.default_offset;if(r.offsetInput)this._offsetInput=r.offsetInput;if(r.vertical!==undefined)this._vertical=r.vertical;if(r.height)this._containerHeight=r.height;if(r.width)this._containerWidth=r.width;if(this._vertical){this._offsetType='top';this._eventCoord='y';}else{this._RTLXSwitch=i.isRTL();this._offsetType='left';this._eventCoord='x';}if(this._picture.complete){this._initialLoad();}else this._loadListener=h.listen(this._picture,'load',function(){this._loadListener.remove();this._loadListener=null;this._initialLoad();}.bind(this));};p.prototype.destroy=function(){"use strict";this._stopDrag();this._saveOffset();this._mousedown&&this._mousedown.remove();this._mousedown=null;this._onclick&&this._onclick.remove();this._onclick=null;this._loadListener&&this._loadListener.remove();this._loadListener=null;};p.prototype._initialLoad=function(){"use strict";var q=this._listenOn?this._listenOn:this._picture;this._mousedown&&this._mousedown.remove();this._mousedown=h.listen(q,'mousedown',this._onMouseDown.bind(this));if(this._vertical){this._maxOffset=this._containerHeight-this._picture.offsetHeight;}else this._maxOffset=this._containerWidth-this._picture.offsetWidth;if(this._defaultOffset!==undefined)this._setOffset(this._defaultOffset);this._onclick&&this._onclick.remove();this._onclick=null;if(this._killClicks)this._onclick=h.listen(q,'click',this._onClick.bind(this));this._saveOffset();};p.prototype._onClick=function(event){"use strict";event.kill();};p.prototype._onMouseDown=function(event){"use strict";var q=parseInt(j.get(this._picture,this._offsetType),10)||0;this._pictureStartDragOffset=q-k.getEventPosition(event)[this._eventCoord];this._startDrag();event.kill();};p.prototype._startDrag=function(){"use strict";if(!this._dragStarted){this.inform('startdrag',this);this._dragTokens=[h.listen(document.documentElement,'mouseup',this._onMouseUp.bind(this)),h.listen(document.documentElement,'mousemove',this._onMouseMove.bind(this))];this._dragStarted=true;}};p.prototype._saveOffset=function(){"use strict";var q=parseInt(j.get(this._picture,this._offsetType),10);if(this._RTLXSwitch){this._offsetInput.value=q+this._containerWidth-this._picture.offsetWidth;}else this._offsetInput.value=q;};p.prototype._stopDrag=function(){"use strict";if(this._dragStarted){this.inform('stopdrag',this);this._dragStarted=false;this._dragTokens.forEach(function(q){q.remove();});this._saveOffset();}};p.prototype._onMouseUp=function(event){"use strict";this._stopDrag();event.kill();};p.prototype._setOffset=function(q){"use strict";if(this._RTLXSwitch){q=Math.max(0,Math.min(q,-this._maxOffset));}else q=Math.min(0,Math.max(q,this._maxOffset));j.set(this._picture,this._offsetType,q+'px');};p.prototype._onMouseMove=function(event){"use strict";this._setOffset(this._pictureStartDragOffset+k.getEventPosition(event)[this._eventCoord]);event.kill();};e.exports=p;});
__d("TimelineCover",["Arbiter","Button","CSS","DOM","DOMScroll","HTML","Parent","Style","TimelineDrag","$","cx","ge"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){function s(t,u,v){"use strict";this.root=p('fbProfileCover');if(typeof u==='object'){this._coverHeight=u.cover_height;this._coverWidth=u.cover_width;this.previewing=u.previewing;this._isLegacy=false;}else{this._isLegacy=true;this._coverHeight=u;this.previewing=v;}this._parentSection=m.byClass(this.root,'fbTimelineSection');this.cover=j.find(this.root,'.cover');s.instance=this;this.editing=false;if(!this._parentSection)this._parentSection=m.byClass(this.root,'fbEventHeader');if(this.previewing){this.editMode();this.updateCoverImage(this.previewing);}}s.prototype.showLoadingIndicator=function(){"use strict";var t=r('fbCoverImageContainer');if(t)i.addClass(t,'opaquedLoading');};s.prototype.hideLoadingIndicator=function(){"use strict";var t=r('fbCoverImageContainer');if(t)i.removeClass(t,'opaquedLoading');};s.prototype.isCoverImageVerticalFlow=function(t){"use strict";return !(t.style.height);};s.prototype.editMode=function(){"use strict";h.setEnabled(j.find(this.root,'button.cancelButton'),true);h.setEnabled(j.find(this.root,'button.saveButton'),true);this.hideLoadingIndicator();this._coverImage=j.scry(this.root,'.coverImage')[0];var t=j.scry(this._coverImage,'.coverWrap')[0];if(t){var u=j.find(t,'.coverPhotoImg');this._originalIsVertical=this.isCoverImageVerticalFlow(u);this._originalOffset=n.get(u,this._originalIsVertical?'top':'left');}i.addClass(this._parentSection,'fbEditCover');k.scrollTo(this.root);if(this.previewing){j.remove(this._coverImage);i.show(this._coverImage);}var v=j.scry(this._coverImage,'.coverPhotoImg')[0];if(v)this._createDragger();this.editing=true;g.inform('CoverPhotoEdit',{sender:this,state:"open"});};s.prototype._exitEditMode=function(){"use strict";if(this._timelineDrag){this._timelineDrag.destroy();this._timelineDrag=null;}j.find(this.root,'input.hiddenPhotoID').value=null;j.find(this.root,'input.hiddenVideoID').value=null;h.setEnabled(j.find(this.root,'button.cancelButton'),false);h.setEnabled(j.find(this.root,'button.saveButton'),false);i.removeClass(this._parentSection,'fbEditCover');this.hideLoadingIndicator();this.previewing=false;g.inform('CoverPhotoEdit',{sender:this,state:"closed"});};s.prototype._createDragger=function(t){"use strict";var u;if(this._isLegacy){u=j.find(this.root,'input.photoOffsetInput');this._originalIsVertical=true;}else{var v=t===undefined?this._originalIsVertical:t;u=v?j.find(this.root,'input.photoOffsetYInput'):j.find(this.root,'input.photoOffsetXInput');}this._timelineDrag=new o(j.find(this.root,'.coverImage .coverPhotoImg'),u,{height:this._coverHeight,width:this._coverWidth,listenOn:this.cover,vertical:v,killClicks:true});};s.prototype.updateCoverImage=function(t,u,v){"use strict";this.videoID=v;if(u)this.editMode();j.find(this.root,'input.hiddenPhotoID').value=t;j.find(this.root,'input.hiddenVideoID').value=v||null;h.setEnabled(j.find(this.root,'button.saveButton'),true);if(u)j.replace(j.find(this.root,'.coverImage'),typeof u==='string'?l(u):u);var w=j.find(j.find(this.root,'.coverImage'),'.coverPhotoImg'),x=this.isCoverImageVerticalFlow(w),y;if(this._isLegacy){y=j.find(this.root,'input.photoOffsetInput');}else y=x?j.find(this.root,'input.photoOffsetYInput'):j.find(this.root,'input.photoOffsetXInput');if(this._timelineDrag){this._timelineDrag.setPicture(w,{offsetInput:y,vertical:x});}else this._createDragger(x);this._updateHeader();};s.prototype.cancelUpdate=function(){"use strict";j.remove(j.scry(this.root,'.coverImage')[0]);j.prependContent(this.cover,this._coverImage);if(this._originalOffset!==undefined)n.set(j.find(this._coverImage,'.coverPhotoImg'),this._originalIsVertical?'top':'left',this._originalOffset);this._exitEditMode();this._updateHeader();};s.prototype.saveComplete=function(){"use strict";this._coverImage=j.scry(this.root,'.coverImage')[0];var t=m.byClass(this.root,'fbTimelineTopSectionBase');t&&i.removeClass(t,"_6_5");this._exitEditMode();this._updateHeader();};s.prototype.isInEditMode=function(){"use strict";return this.editing;};s.prototype._updateHeader=function(){"use strict";var t=j.scry(this.root,'.coverImage')[0];if(!t)return;var u=i.hasClass(t,'coverNoImage'),v=i.hasClass(this._parentSection,'noCoverImage');if(u!==v)i.conditionClass(this._parentSection,'noCoverImage',u);};s.getInstance=function(){"use strict";return s.instance;};s.instance=null;e.exports=s;});
__d("TimelineCoverDisclaimer",["Dialog"],function(a,b,c,d,e,f,g){function h(i,j,k){if(h.displayed===undefined){h.displayed=true;}else return;new g().setModal(true).setTitle(i).setBody(j).setButtonsMessage(k).setButtons(g.OK).show();}e.exports=h;});
__d("legacy:TimelineCoverDisclaimer",["TimelineCoverDisclaimer"],function(a,b,c,d){a.TimelineCoverDisclaimer=b('TimelineCoverDisclaimer');},3);
__d("TimelineNavLight",["CSS","DOM","DOMQuery","Parent","TimelineSection","csx","cx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){function n(o){var p=i.scry(o,"._6-7")[0],q=i.scry(o,"._6-6"),r=j.byClass(o,"_70k").offsetWidth,s=q[q.length-1];if(s.offsetLeft+s.offsetWidth>r)g.addClass(o,"_5215");for(var t=q.length-1;t>1;t--)if(q[t].offsetLeft+q[t].offsetWidth>r){h.remove(q[t]);}else break;var u="_529n";g.removeClass(j.byClass(o,u),u);k.subscribe('Medley/transitionToSection',function(v,w){if(p&&w===p.getAttribute('data-medley-id'))return;p&&g.removeClass(p,"_6-7");for(var x=0;x<q.length;++x)if(q[x].getAttribute('data-medley-id')===w){g.addClass(q[x],"_6-7");p=q[x];return;}});}e.exports=n;});
__d("TimelineStickyRightColumn",["Arbiter","CSS","DOMQuery","Event","PhotoSnowlift","Run","Style","TimelineContentLoader","Vector","csx","queryThenMutateDOM"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r=100,s=15,t=15,u=35,v=false,w=null,x=null,y,z,aa,ba,ca,da,ea,fa;function ga(){if(k.getInstance().isOpen)return;y=n.getCurrentSection();if(!y||!y.rightColumnFinished)return;var oa=i.scry(y.node,"._3rbf")[0],pa=i.scry(y.node,"._3rbh")[0];z=oa?oa.offsetHeight:0;aa=pa?pa.offsetHeight:0;ba=o.getViewportDimensions().y;ea=oa?o.getElementPosition(oa).y:0;fa=document.body.clientWidth<document.body.scrollWidth;}function ha(){if(!y||k.getInstance().isOpen)return;if(x&&x!==y){var oa=i.scry(x.node,"._3rbh")[0];if(oa)ja(oa,'','','');}var pa=i.scry(y.node,"._3rbh")[0];if(!pa)return;if(fa){ja(pa,'','','');return;}if(!y||!y.rightColumnFinished)return;ia(y);x=h.hasClass(pa,'fixed_always')?y:null;}function ia(oa){if(aa>=z||z<=ba)return;da=ca;ca=o.getScrollPosition().y;var pa,qa=i.scry(oa.node,"._3rbh")[0];if(!qa)return;if(ca<=ea-ka()){ja(qa,'','','');return;}if(z+ea<=ca+Math.min(aa+ka(),ba-t-u)){ja(qa,'absolute','',t+'px');return;}if(aa>ba-t-ka()){if(ca<da){var ra=false;if(qa.style.position==='absolute')if(qa.style.top!==''&&ca+ka()-ea<=parseInt(qa.style.top,10)){ra=true;}else if(qa.style.bottom!==''&&ca<=(ea+z-ka())-aa)ra=true;if(ra){ja(qa,'fixed',ka()+'px','');return;}else if(qa.style.position==='absolute'&&qa.style.top){return;}else if(h.hasClass(qa,'fixed_always')){if(parseInt(qa.style.top,10)>=ka())return;pa=ca-ea-(aa-(ba-u));if(da)pa+=da-ca;ja(qa,'absolute',pa+'px','');return;}}else{var sa=false;if(qa.style.position==='absolute'||(qa.style.position===''&&!h.hasClass(qa,'fixed_always'))){pa=qa.style.top?parseInt(qa.style.top,10):0;if(ca+ba>=ea+pa+aa+u)sa=true;}if(sa){pa=ba-aa-t-u;ja(qa,'fixed',pa+'px','');return;}else if(ca==da){return;}else if(h.hasClass(qa,'fixed_always')){if(parseInt(qa.style.top,10)>=ka()){pa=ca-ea+ka();if(da)pa+=da-ca;ja(qa,'absolute',pa+'px','');return;}}else if(qa.style.position==='absolute')return;}}else ja(qa,'fixed',ka()+'px','');}function ja(oa,pa,qa,ra){m.set(oa,'bottom',ra);if(pa==='fixed'){h.addClass(oa,'fixed_always');m.set(oa,'position','');}else{h.removeClass(oa,'fixed_always');m.set(oa,'position',pa);}m.set(oa,'top',qa);g.inform('reflow');}function ka(){return h.hasClass(document.documentElement,'tinyViewport')?s:r;}function la(){q(ga,ha);}function ma(){v=false;x=null;while(w.length)w.pop().remove();w=null;}var na={init:function(){if(v)return;v=true;w=[j.listen(window,'scroll',la),j.listen(window,'resize',la)];l.onLeave(ma);},adjust:function(){if(v){ga();ha();}}};e.exports=na;});
__d("legacy:TimelineCover",["TimelineCover"],function(a,b,c,d){a.TimelineCover=b('TimelineCover');},3);
__d("NFXExposureLogging",["AsyncSignal","SelectorDeprecated"],function(a,b,c,d,e,f,g,h){var i={addListenerForProfileReporting:function(j){var k=false;h.listen(j,'open',function(l){if(!k){k=true;new g('/ajax/feed/filter_action/afro_exposure_log',{qe_name:'profile_reporting'}).send();}});}};f.addListenerForProfileReporting=i.addListenerForProfileReporting;});
__d("StreamShareVideo",["AsyncRequest","CSS","Event","cx","ge"],function(a,b,c,d,e,f,g,h,i,j,k){var l={_endpoints:[],_thumbs:[],registerThumb:function(m,n,o,p){l._endpoints[m+' '+o]=p;l._thumbs[m+' '+o]=n;},clickTitle:function(m,n,event){return this.expandInlineOrRedirect(m,n,event);},expandInlineOrRedirect:function(m,n,event){if(l._shouldFollowHref(event))return true;var o=l._thumbs[m+' '+n],p=k(o);if(p){h.addClass(p,"uiVideoThumbLoading");g.bootstrap(l._endpoints[m+' '+n],p.parentNode);return false;}return true;},clickTimeline:function(m,n,event){if(l._shouldFollowHref(event))return true;h.addClass(m,"_1xu");h.removeClass(m,"_1xv");g.bootstrap(n,m);return false;},_shouldFollowHref:function(event){event=i.$E(event);if(!event)return false;if(event.getModifiers().any||event.isMiddleClick())return true;return false;}};e.exports=l;});
__d("legacy:stream-share-video",["StreamShareVideo"],function(a,b,c,d){a.StreamShareVideo=b('StreamShareVideo');},3);
__d("PopoverLoadingMenu",["BehaviorsMixin","DOM","PopoverMenuInterface","copyProperties","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i,j,k,l){for(var m in i)if(i.hasOwnProperty(m))o[m]=i[m];var n=i===null?null:i.prototype;o.prototype=Object.create(n);o.prototype.constructor=o;o.__superConstructor__=i;function o(p){"use strict";i.call(this);this._config=p||{};this._theme=p.theme||{};}o.prototype.getRoot=function(){"use strict";if(!this._root){this._root=h.create('div',{className:l("_54nq",this._config.className,this._theme.className)},h.create('div',{className:"_54ng"},h.create('div',{className:"_54nf _54af"},h.create('span',{className:"_54ag"}))));if(this._config.behaviors)this.enableBehaviors(this._config.behaviors);}return this._root;};j(o.prototype,g,{_root:null});e.exports=o;});
__d("ContextualLayerAsyncRelative",["Event","Parent","copyProperties"],function(a,b,c,d,e,f,g,h,i){function j(k){"use strict";this._layer=k;}j.prototype.enable=function(){"use strict";this._layerSubscription=this._layer.subscribe('show',this._attachListener.bind(this));if(this._layer.isShown())this._attachListener();};j.prototype.disable=function(){"use strict";this._layerSubscription.unsubscribe();this._layerSubscription=null;if(this._listener){this._listener.remove();this._listener=null;}};j.prototype._attachListener=function(){"use strict";this._listener=g.listen(this._layer.getRoot(),'click',this._onclick.bind(this));};j.prototype._onclick=function(k){"use strict";var l=h.byTag(k.getTarget(),'A');if(!l)return;var m=l.getAttribute('ajaxify'),n=l.href,o=m||n;if(l.rel==='async'||l.rel==='async-post'){d(['AsyncRequest'],function(p){p.bootstrap(o,this._layer.getContext(),l.rel==='async-post');}.bind(this));return false;}};i(j.prototype,{_layerSubscription:null,_listener:null});e.exports=j;});
__d("SubMenu",["Arbiter","CSS","Event","copyProperties"],function(a,b,c,d,e,f,g,h,i,j){function k(){"use strict";}k.prototype.init=function(l,m,n,o){"use strict";this._subMenu=l;this._mainMenu=m;this._forward=n;this._backward=o;g.subscribe('SubMenu/Reset',this._goToMainMenu.bind(this));i.listen(n,'click',this._goToSubMenu.bind(this));i.listen(o,'click',this._goToMainMenu.bind(this));};k.prototype.initAsyncChildMenu=function(l){"use strict";i.listen(this._forward,'click',function(){this._goToSubMenu();l.load();}.bind(this));};k.prototype._goToMainMenu=function(){"use strict";h.hide(this._subMenu);h.show(this._mainMenu);};k.prototype._goToSubMenu=function(){"use strict";h.hide(this._mainMenu);h.show(this._subMenu);};j(k.prototype,{_subMenu:null,_mainMenu:null,_forward:null,_backward:null});e.exports=k;});
__d("legacy:ui-submenu",["SubMenu"],function(a,b,c,d){a.SubMenu=b('SubMenu');},3);
__d("AsyncMenu",["AsyncRequest","copyProperties","emptyFunction"],function(a,b,c,d,e,f,g,h,i){function j(k,l){"use strict";this._uri=k;this._elem=l;}j.prototype.load=function(){"use strict";this.load=i;g.bootstrap(this._uri,this._elem);};h(j.prototype,{_uri:null,_elem:null});e.exports=j;});