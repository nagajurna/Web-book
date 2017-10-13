"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),WebBook=function(){function t(e,i){var n=this;_classCallCheck(this,t),this._bookContainer=e,this._container=e.querySelector("[data-wb-text-container]"),this._text=e.querySelector("[data-wb-text]"),this._height=i.height,this._width=i.maxWidth,this._marginX=void 0===i.marginX?35:i.marginX,this._marginY=void 0===i.marginY?20:i.marginY,this._position=0,this.col=!0,this._bookmark=null,this._containerWidth=null,this._lastBreak=document.createElement("div"),this._lastBreak.className="wb-text-break",this._text.appendChild(this._lastBreak),this._lastElement=document.createElement("div"),this._lastElement.innerHTML="&nbsp;",this._lastElement.className="wb-section",this._text.appendChild(this._lastElement),this._sections=this._text.querySelectorAll(".wb-section"),this._breaks=this._text.querySelectorAll(".wb-text-break"),this._elements=this._text.querySelectorAll(":not(.wb-text-break)"),this._currentPages=this._bookContainer.querySelectorAll(".wb-current-page"),this._totalPages=this._bookContainer.querySelectorAll(".wb-total-pages"),this._currentTotalPages=this._bookContainer.querySelectorAll(".wb-currentByTotal-pages"),this._elPageNumbers=this._bookContainer.querySelectorAll(".wb-element-page-number"),this._sectionTitles=this._bookContainer.querySelectorAll(".wb-current-section-title"),("WebkitColumnWidth"in document.body.style||"MozColumnWidth"in document.body.style||"columnWidth"in document.body.style)&&this.toBook();for(var s=this._bookContainer.querySelectorAll(".wb-link"),o=0;o<s.length;o++)s[o].addEventListener("click",function(t){if(!0===n.col){t.preventDefault();var e=t.target.href.replace(/^.+#/,"");n.goToPage(n.elementPageNumber(e))}},!1)}return _createClass(t,[{key:"toBook",value:function(){if("WebkitColumnWidth"in document.body.style||"MozColumnWidth"in document.body.style||"columnWidth"in document.body.style){this.col=!0;var t=this._container.style,e=this._text.style;console.log(this._bookContainer.clientHeight),t.overflow="hidden",t.position="relative",t.padding="0px",t.height=this.getHeight()+"px",t.maxWidth=this.getWidth()+"px",this._containerWidth=this._container.clientWidth;for(var i=0;i<this._sections.length;i++)"10%"!==this._sections[i].style.minHeight&&(this._sections[i].style.minHeight="10%");for(var n=0;n<this._breaks.length;n++)"300%"!==this._breaks[n].style.marginBottom&&(this._breaks[n].style.marginBottom="300%");"300%"!==this._lastElement.style.marginBottom&&(this._lastElement.style.marginBottom="300%"),e.position="absolute",e.left=0,e.boxSizing="border-box",e.height="100%",e.width="100%",e.paddingRight=this.getMarginX()+"px",e.paddingLeft=this.getMarginX()+"px",e.paddingTop=this.getMarginY()+"px",e.paddingBottom=this.getMarginY()+"px",e.WebkitColumnsWidth=this._containerWidth+"px",e.MozColumnWidth=this._containerWidth+"px",e.columnWidth=this._containerWidth+"px",e.MozColumnGap=2*this.getMarginX()+"px",e.WebkitColumnGap=2*this.getMarginX()+"px",e.columnGap=2*this.getMarginX()+"px",e.MozColumnFill="auto",this._bookmark&&(this.goToBookmark(this._bookmark),this._position=this._text.offsetLeft),this.refresh()}}},{key:"toScroll",value:function(){this.col=!1;var t=this._container.style,e=this._text.style;t.height="auto",t.maxWidth=this.getWidth()+"px",t.overflow="visible",e.position="static",e.height="auto",t.paddingRight=this.getMarginX()+"px",t.paddingLeft=this.getMarginX()+"px",t.paddingTop=this.getMarginY()+"px",t.paddingBottom=this.getMarginY()+"px",("WebkitColumnWidth"in document.body.style||"MozColumnWidth"in document.body.style||"columnWidth"in document.body.style)&&(e.WebkitColumns="auto 1",e.MozColumns="auto 1",e.columns="auto 1");for(var i=0;i<this._sections.length;i++)this._sections[i].style.minHeight="0";for(var n=0;n<this._breaks.length;n++)this._breaks[n].style.marginBottom="0";this._lastElement.style.marginBottom="0px"}},{key:"setWidth",value:function(t){return this._width=t,this}},{key:"getWidth",value:function(){return this._width}},{key:"setHeight",value:function(t){return this._height=t,this}},{key:"getHeight",value:function(){return this._height}},{key:"setMarginX",value:function(t){return this._marginX=t,this}},{key:"getMarginX",value:function(){return this._marginX}},{key:"setMarginY",value:function(t){return this._marginY=t,this}},{key:"getMarginY",value:function(){return this._marginY}},{key:"forward",value:function(){this._lastElement.offsetLeft+this._position>this._containerWidth+this.getMarginX()&&(this._position=this._text.offsetLeft,this._position-=this._containerWidth,this._text.style.left=this._position+"px",this.refresh())}},{key:"backward",value:function(){this._position<0&&(this._position=this._text.offsetLeft,this._position+=this._containerWidth,this._text.style.left=this._position+"px",this.refresh())}},{key:"tofirstPage",value:function(){this._position<0&&(this._position=0,this._text.style.left=this._position+"px",this.refresh())}},{key:"tolastPage",value:function(){this._lastElement.offsetLeft+this._position>this._containerWidth+this.getMarginX()&&(this._position=this._containerWidth+this.getMarginX()-this._lastElement.offsetLeft,this._text.style.left=this._position+"px",this.refresh())}},{key:"getPageNumber",value:function(){return Math.abs(Math.floor(this._position/this._containerWidth))+1}},{key:"getTotalPages",value:function(){return Math.floor(this._lastElement.offsetLeft/this._containerWidth)}},{key:"goToPage",value:function(t){t=(t=t<1?1:t)>this.getTotalPages()?this.getTotalPages():t;var e=this._containerWidth*(t-1);this._text.style.left=-e+"px",this._position=this._text.offsetLeft,this.refresh()}},{key:"elementPageNumber",value:function(t){var e=document.getElementById(t).offsetLeft-this.getMarginX();return(e=e%this._containerWidth!=0?e-e%this._containerWidth:e)/this._containerWidth+1}},{key:"getSectionTitle",value:function(){for(var t=-this._position,e=void 0,i=1;i<this._sections.length;i++)if(this._sections[i].offsetLeft-this._containerWidth>=t){var n=this._sections[i-1].id;e=void 0!==n&&this.getPageNumber()===this.elementPageNumber(n)?"":this._sections[i-1].getAttribute("data-wb-title");break}return e}},{key:"insertBookmark",value:function(){for(var t=null,e=0;e<this._elements.length;e++){var i=this._elements[e].offsetLeft-this.getMarginX();if((i=i%this._containerWidth!=0?i-i%this._containerWidth:i)===-this._position){t=e;break}if(i>-this._position){t=e-1;break}}this._bookmark=t}},{key:"goToBookmark",value:function(t){var e=this._elements[this._bookmark].offsetLeft-this.getMarginX();e=e%this._containerWidth!=0?e-e%this._containerWidth:e,this._text.style.left=-e+"px",this._position=this._text.offsetLeft,this.refresh()}},{key:"refresh",value:function(){var t=this;this.insertBookmark(),!1===this.col?(this._currentPages.forEach(function(t){t.style.display="none"}),this._totalPages.forEach(function(t){t.style.display="none"}),this._currentTotalPages.forEach(function(t){t.style.display="none"}),this._elPageNumbers.forEach(function(t){t.style.display="none"}),this._sectionTitles.forEach(function(t){t.style.display="none"})):(this._currentPages.forEach(function(e){e.innerHTML=t.getPageNumber(),e.style.display="inline-block"}),this._totalPages.forEach(function(e){e.innerHTML=t.getTotalPages(),e.style.display="inline-block"}),this._currentTotalPages.forEach(function(e){e.innerHTML=t.getPageNumber()+"/"+t.getTotalPages(),e.style.display="inline-block"}),this._elPageNumbers.forEach(function(e){var i=e.getAttribute("data-wb-element"),n=t.elementPageNumber(i);e.innerHTML=n,e.style.display="inline-block"}),this._sectionTitles.forEach(function(e){e.innerHTML=t.getSectionTitle(),e.style.display="inline-block"}))}}]),t}();