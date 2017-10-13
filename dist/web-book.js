"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),WebBook=function(){function t(e,i){var n=this;_classCallCheck(this,t),this._bookContainer=e,this._textContainer=e.querySelector("[data-wb-text-container]"),this._text=e.querySelector("[data-wb-text]"),this._height=i.height,this._width=i.maxWidth,this._marginX=void 0===i.marginX?35:i.marginX,this._marginY=void 0===i.marginY?20:i.marginY,this._position=0,this.col=!0,this._bookmark=null,this._containerWidth=null,this._lastBreak=document.createElement("div"),this._lastBreak.className="wb-text-break",this._text.appendChild(this._lastBreak),this._lastElement=document.createElement("div"),this._lastElement.innerHTML="&nbsp;",this._lastElement.className="wb-section",this._text.appendChild(this._lastElement),this._sections=this._text.querySelectorAll(".wb-section"),this._breaks=this._text.querySelectorAll(".wb-text-break"),this._elements=this._text.querySelectorAll(":not(.wb-text-break)"),this._toc=this._bookContainer.querySelector("[data-wb-toc]"),this._tocInserts=this._textContainer.querySelectorAll(".wb-toc-insert"),this.setToc(),this._currentPages=this._bookContainer.querySelectorAll(".wb-current-page"),this._totalPages=this._bookContainer.querySelectorAll(".wb-total-pages"),this._currentTotalPages=this._bookContainer.querySelectorAll(".wb-currentByTotal-pages"),this._elPageNumbers=this._bookContainer.querySelectorAll(".wb-element-page-number"),this._sectionTitles=this._bookContainer.querySelectorAll(".wb-current-section-title"),this._bookContainer.querySelectorAll(".wb-link").forEach(function(t){t.addEventListener("click",function(t){if(!0===n.col){t.preventDefault();var e=t.target.getAttribute("href").replace(/^#/,"");n.goToPage(n.elementPageNumber(e))}},!1)}),("WebkitColumnWidth"in document.body.style||"MozColumnWidth"in document.body.style||"columnWidth"in document.body.style)&&this.toBook()}return _createClass(t,[{key:"toBook",value:function(){if("WebkitColumnWidth"in document.body.style||"MozColumnWidth"in document.body.style||"columnWidth"in document.body.style){this.col=!0;var t=this._textContainer.style,e=this._text.style;t.boxSizing="border-box",t.overflow="hidden",t.position="relative",t.left=0,t.top=0,t.padding="0px",t.height=this.getHeight()+"px",t.maxWidth=this.getWidth()+"px",this._containerWidth=this._textContainer.clientWidth;for(var i=0;i<this._sections.length;i++)"10%"!==this._sections[i].style.minHeight&&(this._sections[i].style.minHeight="10%");for(var n=0;n<this._breaks.length;n++)"300%"!==this._breaks[n].style.marginBottom&&(this._breaks[n].style.marginBottom="300%");"300%"!==this._lastElement.style.marginBottom&&(this._lastElement.style.marginBottom="300%"),e.boxSizing="border-box",e.position="absolute",e.left=0,e.top=0,e.height="100%",e.width="100%",e.paddingRight=this.getMarginX()+"px",e.paddingLeft=this.getMarginX()+"px",e.paddingTop=this.getMarginY()+"px",e.paddingBottom=this.getMarginY()+"px",e.MozColumnFill="auto",e.WebkitColumnsWidth=this._containerWidth+"px",e.MozColumnWidth=this._containerWidth+"px",e.columnWidth=this._containerWidth+"px",e.MozColumnGap=2*this.getMarginX()+"px",e.WebkitColumnGap=2*this.getMarginX()+"px",e.columnGap=2*this.getMarginX()+"px",this._bookmark&&(this.goToBookmark(this._bookmark),this._position=this._text.offsetLeft),this.refresh()}}},{key:"toScroll",value:function(){this.col=!1;var t=this._container.style,e=this._text.style;t.height="auto",t.maxWidth=this.getWidth()+"px",t.overflow="visible",e.position="static",e.height="auto",t.paddingRight=this.getMarginX()+"px",t.paddingLeft=this.getMarginX()+"px",t.paddingTop=this.getMarginY()+"px",t.paddingBottom=this.getMarginY()+"px",("WebkitColumnWidth"in document.body.style||"MozColumnWidth"in document.body.style||"columnWidth"in document.body.style)&&(e.WebkitColumns="auto 1",e.MozColumns="auto 1",e.columns="auto 1");for(var i=0;i<this._sections.length;i++)this._sections[i].style.minHeight="0";for(var n=0;n<this._breaks.length;n++)this._breaks[n].style.marginBottom="0";this._lastElement.style.marginBottom="0px",this.refresh()}},{key:"setWidth",value:function(t){return this._width=t,this}},{key:"getWidth",value:function(){return this._width}},{key:"setHeight",value:function(t){return this._height=t,this}},{key:"getHeight",value:function(){return this._height}},{key:"setMarginX",value:function(t){return this._marginX=t,this}},{key:"getMarginX",value:function(){return this._marginX}},{key:"setMarginY",value:function(t){return this._marginY=t,this}},{key:"getMarginY",value:function(){return this._marginY}},{key:"forward",value:function(){this._lastElement.offsetLeft+this._position>this._containerWidth+this.getMarginX()&&(this._position=this._text.offsetLeft,this._position-=this._containerWidth,this._text.style.left=this._position+"px",this.refresh())}},{key:"backward",value:function(){this._position<0&&(this._position=this._text.offsetLeft,this._position+=this._containerWidth,this._text.style.left=this._position+"px",this.refresh())}},{key:"tofirstPage",value:function(){this._position<0&&(this._position=0,this._text.style.left=this._position+"px",this.refresh())}},{key:"tolastPage",value:function(){this._lastElement.offsetLeft+this._position>this._containerWidth+this.getMarginX()&&(this._position=this._containerWidth+this.getMarginX()-this._lastElement.offsetLeft,this._text.style.left=this._position+"px",this.refresh())}},{key:"getPageNumber",value:function(){return Math.abs(Math.floor(this._position/this._containerWidth))+1}},{key:"getTotalPages",value:function(){return Math.floor(this._lastElement.offsetLeft/this._containerWidth)}},{key:"goToPage",value:function(t){t=(t=t<1?1:t)>this.getTotalPages()?this.getTotalPages():t;var e=this._containerWidth*(t-1);this._text.style.left=-e+"px",this._position=this._text.offsetLeft,this.refresh()}},{key:"elementPageNumber",value:function(t){var e=document.getElementById(t).offsetLeft-this.getMarginX();return(e=e%this._containerWidth!=0?e-e%this._containerWidth:e)/this._containerWidth+1}},{key:"getSectionTitle",value:function(){for(var t=-this._position,e=void 0,i=1;i<this._sections.length;i++)if(this._sections[i].offsetLeft-this._containerWidth>=t){var n=this._sections[i-1].id;e=void 0!==n&&this.getPageNumber()===this.elementPageNumber(n)?"":this._sections[i-1].getAttribute("data-wb-title");break}return e}},{key:"getCurrentSection",value:function(){for(var t=this,e=-this._position,i=1;i<this._sections.length&&!(this._sections[i].offsetLeft-this._containerWidth>=e&&"break"===function(){var e=t._sections[i-1].id;return t._bookContainer.querySelectorAll("[data-wb-toc] a").forEach(function(t){t.getAttribute("href").replace(/^#/,"")===e?t.parentElement.className.match(/current/)||(t.parentElement.className+=" current"):t.parentElement.className.match(/current/)&&(t.parentElement.className=t.parentElement.className.replace(/ current/,""))}),"break"}());i++);}},{key:"setToc",value:function(){var t=this;if(this._toc){if(this._toc.getAttribute("data-wb-toc")){var e=document.createElement("p");e.setAttribute("class","data-wb-toc-title"),e.innerHTML=toc.getAttribute("data-wb-toc"),this._toc.appendChild(e)}this._tocInserts.forEach(function(e){var i=document.createElement("p");i.innerHTML=e.getAttribute("data-wb-title"),i.setAttribute("class","wb-toc-item");var n=document.createElement("a");n.setAttribute("href","#"+e.id),n.setAttribute("class","wb-element-page-number wb-link"),i.appendChild(n),t._toc.appendChild(i)})}}},{key:"insertBookmark",value:function(){for(var t=null,e=0;e<this._elements.length;e++){var i=this._elements[e].offsetLeft-this.getMarginX();if((i=i%this._containerWidth!=0?i-i%this._containerWidth:i)===-this._position){t=e;break}if(i>-this._position){t=e-1;break}}this._bookmark=t}},{key:"goToBookmark",value:function(t){var e=this._elements[this._bookmark].offsetLeft-this.getMarginX();e=e%this._containerWidth!=0?e-e%this._containerWidth:e,this._text.style.left=-e+"px",this._position=this._text.offsetLeft,this.refresh()}},{key:"refresh",value:function(){var t=this;this.insertBookmark(),!1===this.col?(this._currentPages.forEach(function(t){t.innerHTML=""}),this._totalPages.forEach(function(t){t.innerHTML=""}),this._currentTotalPages.forEach(function(t){t.innerHTML=""}),this._elPageNumbers.forEach(function(t){t.innerHTML=""}),this._sectionTitles.forEach(function(t){t.innerHTML=""})):(this._toc&&this.getCurrentSection(),this._currentPages.forEach(function(e){e.innerHTML!=t.getPageNumber()&&(e.innerHTML=t.getPageNumber())}),this._totalPages.forEach(function(e){e.innerHTML!=t.getTotalPages()&&(e.innerHTML=t.getTotalPages())}),this._currentTotalPages.forEach(function(e){e.innerHTML!==t.getPageNumber()+"/"+t.getTotalPages()&&(e.innerHTML=t.getPageNumber()+"/"+t.getTotalPages())}),this._elPageNumbers.forEach(function(e){var i=e.getAttribute("href").replace(/^#/,""),n=t.elementPageNumber(i);e.innerHTML!=n&&(e.innerHTML=n)}),this._sectionTitles.forEach(function(e){e.innerHTML!==t.getSectionTitle()&&(e.innerHTML=t.getSectionTitle())}))}}]),t}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYi1ib29rLmpzIl0sIm5hbWVzIjpbIldlYkJvb2siLCJib29rQ29udGFpbmVyIiwib3B0aW9ucyIsIl90aGlzIiwidGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9ib29rQ29udGFpbmVyIiwiX3RleHRDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiX3RleHQiLCJfaGVpZ2h0IiwiX3dpZHRoIiwibWF4V2lkdGgiLCJfbWFyZ2luWCIsInVuZGVmaW5lZCIsIm1hcmdpblgiLCJfbWFyZ2luWSIsIm1hcmdpblkiLCJfcG9zaXRpb24iLCJoZWlnaHQiLCJfbGFzdEVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJjb2wiLCJjbGFzc05hbWUiLCJfYm9va21hcmsiLCJfc2VjdGlvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiX2xhc3RCcmVhayIsIl9lbGVtZW50cyIsImFwcGVuZENoaWxkIiwiX2JyZWFrcyIsIl90b3RhbFBhZ2VzIiwiX2VsUGFnZU51bWJlcnMiLCJfdG9jIiwic2V0VG9jIiwidmFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJfY3VycmVudFBhZ2VzIiwiX2N1cnJlbnRUb3RhbFBhZ2VzIiwiZ2V0QXR0cmlidXRlIiwiX3NlY3Rpb25UaXRsZXMiLCJlbGVtZW50UGFnZU51bWJlciIsImJvZHkiLCJzdHlsZSIsInByZXZlbnREZWZhdWx0IiwiY3MiLCJ0cyIsInRvQm9vayIsImJveFNpemluZyIsIm92ZXJmbG93IiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwicGFkZGluZyIsImdldEhlaWdodCIsImNsaWVudFdpZHRoIiwiaSIsImxlbmd0aCIsIm1pbkhlaWdodCIsIl9jb250YWluZXJXaWR0aCIsIm1hcmdpbkJvdHRvbSIsIndpZHRoIiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ0xlZnQiLCJnZXRNYXJnaW5YIiwicGFkZGluZ1RvcCIsImdldE1hcmdpblkiLCJwYWRkaW5nQm90dG9tIiwiTW96Q29sdW1uRmlsbCIsIldlYmtpdENvbHVtbnNXaWR0aCIsIm9mZnNldExlZnQiLCJXZWJraXRDb2x1bW5HYXAiLCJfY29udGFpbmVyIiwiZ2V0V2lkdGgiLCJjb2x1bW5zIiwiV2Via2l0Q29sdW1ucyIsInJlZnJlc2giLCJ3IiwiaCIsIm0iLCJNYXRoIiwiYWJzIiwiZmxvb3IiLCJudW1iZXIiLCJnZXRUb3RhbFBhZ2VzIiwiaWQiLCJlbFBvc2l0aW9uIiwiZ2V0RWxlbWVudEJ5SWQiLCJ0aXRsZSIsInRvdGFsUGFnZXMiLCJnZXRQYWdlTnVtYmVyIiwiX3RoaXMyIiwiZWwiLCJlbFBhZ2VOdW1iZXIiLCJtYXRjaCIsInBhcmVudEVsZW1lbnQiLCJyZXBsYWNlIiwiX3RoaXMzIiwidG9jVGl0bGUiLCJ0b2MiLCJfdG9jSW5zZXJ0cyIsImZvckVhY2giLCJwIiwic2V0QXR0cmlidXRlIiwiYSIsImJvb2ttYXJrIiwiZ2V0Q3VycmVudFNlY3Rpb24iLCJlbGVtZW50IiwiX3RoaXM0IiwiaW5zZXJ0Qm9va21hcmsiLCJwYWdlTnVtYmVyIiwiZ2V0U2VjdGlvblRpdGxlIl0sIm1hcHBpbmdzIjoiNlhBQU1BLG1CQUNMLFNBQUFBLEVBQVlDLEVBQWVDLEdBQVMsSUFBQUMsRUFBQUMsS0FBQUMsZ0JBQUFELEtBQUFKLEdBRW5DSSxLQUFLRSxlQUFpQkwsRUFDdEJHLEtBQUtHLGVBQWlCTixFQUFjTyxjQUFjLDRCQUNsREosS0FBS0ssTUFBUVIsRUFBY08sY0FBYyxrQkFKMUNKLEtBQUFNLFFBQUFSLEVBQVlELE9BQXdCRyxLQUFBTyxPQUFBVCxFQUFBVSxTQVFuQ1IsS0FBS1MsY0FBNkJDLElBQWxCWixFQUFRYSxRQUFzQixHQUFLYixFQUFRYSxRQVJ4QlgsS0FBQVksY0FBQUYsSUFBQVosRUFBQWUsUUFBQSxHQUFBZixFQUFBZSxRQUNuQ2IsS0FBQWMsVUFBQSxFQUNBZCxLQUFLRSxLQUFBQSxFQUNMRixLQUFLRyxVQUFBQSxLQUNMSCxLQUFLSyxnQkFBUVIsS0FFYkcsS0FBS00sV0FBVVIsU0FBUWlCLGNBQXZC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LE1BQ1AvQixLQUFLeUcsb0JBcENQekcsS0FBSWlELGNBQVd5RCxRQUFRckMsU0FBQUEsR0FDdkJwQixFQUFBQSxXQUFZQSxFQUFTd0Msa0JBQ3JCeEQsRUFBQWQsVUFBQXdGLEVBQUFsQixtQkFJQXpGLEtBQUE2QixZQUFBdUUsUUFBQSxTQUFBbkUsR0F3Q0tBLEVBQUlkLFdBQVd3RixFQUFLeEIsa0JBQ3RCbEQsRUFBSWQsVUFBWXdGLEVBQUt4QixtQkF0Q3hCbkYsS0FBSzRHLG1CQUFMUixRQUFBLFNBQUFuRSxHQTJDS0EsRUFBSWQsWUFBYXdGLEVBQUtsQixnQkFBa0IsSUFBTWtCLEVBQUt4QixrQkF6Q3hEbEQsRUFBR2QsVUFBV3dGLEVBQWRsQixnQkFBcUIsSUFBQWtCLEVBQUF4QixtQkFJbkJuRixLQUZEOEIsZUFBQXNFLFFBQUEsU0FBQW5FLEdBNkNDLElBQUltRCxFQUFLbkQsRUFBSUssYUFBYSxRQUFReUQsUUFBUSxLQUFLLElBekNoRGMsRUFBaUJULEVBQUFBLGtCQUFnQmhCLEdBQ2hDbkQsRUFBSWQsV0FBWTBGLElBRGpCNUUsRUFBQWQsVUFBQTBGLEtBTUM3RyxLQUZEdUMsZUFBQTZELFFBQUEsU0FBQW5FLEdBNkNJQSxFQUFJZCxZQUFZd0YsRUFBS0csb0JBekN6QjdFLEVBQUtILFVBQUFBLEVBQWVzRSIsImZpbGUiOiJ3ZWItYm9vay5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFdlYkJvb2sge1xuXHRjb25zdHJ1Y3Rvcihib29rQ29udGFpbmVyLCBvcHRpb25zKSB7XG5cdFx0Ly9jb250YWluZXJzXG5cdFx0dGhpcy5fYm9va0NvbnRhaW5lciA9IGJvb2tDb250YWluZXI7XG5cdFx0dGhpcy5fdGV4dENvbnRhaW5lciA9IGJvb2tDb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtd2ItdGV4dC1jb250YWluZXJdJyk7XG5cdFx0dGhpcy5fdGV4dCA9IGJvb2tDb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtd2ItdGV4dF0nKTtcblx0XHQvL29wdGlvbnNcblx0XHR0aGlzLl9oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcblx0XHR0aGlzLl93aWR0aCA9IG9wdGlvbnMubWF4V2lkdGg7XG5cdFx0dGhpcy5fbWFyZ2luWCA9IG9wdGlvbnMubWFyZ2luWD09PXVuZGVmaW5lZCA/IDM1IDogb3B0aW9ucy5tYXJnaW5YO1xuXHRcdHRoaXMuX21hcmdpblkgPSBvcHRpb25zLm1hcmdpblk9PT11bmRlZmluZWQgPyAyMCA6IG9wdGlvbnMubWFyZ2luWTtcblx0XHQvL2luaXQgcG9zaXRpb24sIGNvbCAsY29udGFpbmVyV2lkdGggYW5kIGJvb2ttYXJrXG5cdFx0dGhpcy5fcG9zaXRpb24gPSAwO1xuXHRcdHRoaXMuY29sID0gdHJ1ZTsvL2RlZmF1bHQgdHJ1ZSA9IHRvQm9vaygpXG5cdFx0dGhpcy5fYm9va21hcmsgPSBudWxsO1xuXHRcdHRoaXMuX2NvbnRhaW5lcldpZHRoID0gbnVsbDtcblx0XHQvL3RoaXMubGFzdEJyZWFrIGlzIHVzZWQgYXMgYSBnaG9zdCBwYWdlXG5cdFx0dGhpcy5fbGFzdEJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl9sYXN0QnJlYWsuY2xhc3NOYW1lID0gXCJ3Yi10ZXh0LWJyZWFrXCI7XG5cdFx0dGhpcy5fdGV4dC5hcHBlbmRDaGlsZCh0aGlzLl9sYXN0QnJlYWspO1xuXHRcdC8vdGhpcy5fbGFzdEVsZW1lbnQgaXMgdXNlZCBhcyBsYW5kbWFya1xuXHRcdHRoaXMuX2xhc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHR0aGlzLl9sYXN0RWxlbWVudC5pbm5lckhUTUwgPSBcIiZuYnNwO1wiOy8vbm90IGVtcHR5IChmb3IgbW96Q29sdW1ucylcblx0XHR0aGlzLl9sYXN0RWxlbWVudC5jbGFzc05hbWUgPSBcIndiLXNlY3Rpb25cIjtcblx0XHR0aGlzLl90ZXh0LmFwcGVuZENoaWxkKHRoaXMuX2xhc3RFbGVtZW50KTtcblx0XHQvL3NlY3Rpb25zXG5cdFx0dGhpcy5fc2VjdGlvbnMgPSB0aGlzLl90ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoJy53Yi1zZWN0aW9uJyk7XG5cdFx0Ly9icmVha3Ncblx0XHR0aGlzLl9icmVha3MgPSB0aGlzLl90ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoJy53Yi10ZXh0LWJyZWFrJyk7XG5cdFx0Ly9lbGVtZW50cyA6IHNlbGVjdCBhbGwgZWxlbWVudHMgYnV0IC50ZXh0LWJyZWFrcyAoZm9yIGJvb2ttYXJrcylcblx0XHR0aGlzLl9lbGVtZW50cyA9IHRoaXMuX3RleHQucXVlcnlTZWxlY3RvckFsbCgnOm5vdCgud2ItdGV4dC1icmVhayknKTtcblx0XHQvL3RvY1xuXHRcdHRoaXMuX3RvYyA9IHRoaXMuX2Jvb2tDb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtd2ItdG9jXScpO1xuXHRcdC8vdG9jLWluc2VydHNcblx0XHR0aGlzLl90b2NJbnNlcnRzID0gdGhpcy5fdGV4dENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcud2ItdG9jLWluc2VydCcpO1xuXHRcdC8vc2V0VG9jIGJlZm9yZSBxdWVyeWluZyB0aGlzLmVsUGFnZU51bWJlcnNcblx0XHR0aGlzLnNldFRvYygpO1xuXHRcdC8vaW5mb3MgY29udGFpbmVyc1xuXHRcdHRoaXMuX2N1cnJlbnRQYWdlcyA9IHRoaXMuX2Jvb2tDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLndiLWN1cnJlbnQtcGFnZScpO1xuXHRcdHRoaXMuX3RvdGFsUGFnZXMgPSB0aGlzLl9ib29rQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy53Yi10b3RhbC1wYWdlcycpO1xuXHRcdHRoaXMuX2N1cnJlbnRUb3RhbFBhZ2VzID0gdGhpcy5fYm9va0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcud2ItY3VycmVudEJ5VG90YWwtcGFnZXMnKTtcblx0XHR0aGlzLl9lbFBhZ2VOdW1iZXJzID0gdGhpcy5fYm9va0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcud2ItZWxlbWVudC1wYWdlLW51bWJlcicpO1xuXHRcdHRoaXMuX3NlY3Rpb25UaXRsZXMgPSB0aGlzLl9ib29rQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy53Yi1jdXJyZW50LXNlY3Rpb24tdGl0bGUnKTtcblx0XHRcblx0XHQvL2xpbmtzIDogcmVwbGFjZSBkZWZhdWx0IHdpdGggZ29Ub1BhZ2Vcblx0XHRsZXQgbGlua3MgPSB0aGlzLl9ib29rQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy53Yi1saW5rJyk7XG5cdFx0bGlua3MuZm9yRWFjaCggdmFsID0+IHtcblx0XHRcdHZhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdFx0XHRpZih0aGlzLmNvbD09PXRydWUpIHtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0bGV0IGhyZWYgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0XHRcdFx0XHRsZXQgaWQgPSBocmVmLnJlcGxhY2UoL14jLyxcIlwiKTtcblx0XHRcdFx0XHR0aGlzLmdvVG9QYWdlKHRoaXMuZWxlbWVudFBhZ2VOdW1iZXIoaWQpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdH0pXG5cdFx0XG5cdFx0XG5cdFx0aWYoJ1dlYmtpdENvbHVtbldpZHRoJyBpbiBkb2N1bWVudC5ib2R5LnN0eWxlIHx8ICdNb3pDb2x1bW5XaWR0aCcgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSB8fCAnY29sdW1uV2lkdGgnIGluIGRvY3VtZW50LmJvZHkuc3R5bGUpIHtcblx0XHRcdHRoaXMudG9Cb29rKCk7XG5cdFx0fVxuXG5cdH1cblxuXHR0b0Jvb2soKSB7XG5cdFx0aWYoJ1dlYmtpdENvbHVtbldpZHRoJyBpbiBkb2N1bWVudC5ib2R5LnN0eWxlIHx8ICdNb3pDb2x1bW5XaWR0aCcgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSB8fCAnY29sdW1uV2lkdGgnICBpbiBkb2N1bWVudC5ib2R5LnN0eWxlKSB7XG5cdFx0XHR0aGlzLmNvbCA9IHRydWU7XG5cdFx0XHRsZXQgY3MgPSB0aGlzLl90ZXh0Q29udGFpbmVyLnN0eWxlO1xuXHRcdFx0bGV0IHRzID0gdGhpcy5fdGV4dC5zdHlsZTtcblx0XHRcdC8vdGV4dC1jb250YWluZXJcblx0XHRcdGNzLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuXHRcdFx0Y3Mub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdFx0Y3MucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cdFx0XHRjcy5sZWZ0ID0gMDtcblx0XHRcdGNzLnRvcCA9IDA7XG5cdFx0XHRjcy5wYWRkaW5nID0gXCIwcHhcIjtcblx0XHRcdGNzLmhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0KCkgKyBcInB4XCI7XG5cdFx0XHRjcy5tYXhXaWR0aCA9IHRoaXMuZ2V0V2lkdGgoKSArIFwicHhcIjsvL21heFdpZHRoIDogcmVzcG9uc2l2ZVxuXHRcdFx0dGhpcy5fY29udGFpbmVyV2lkdGggPSB0aGlzLl90ZXh0Q29udGFpbmVyLmNsaWVudFdpZHRoOy8vcmVzcG9uc2l2ZVxuXHRcdFx0XG5cdFx0XHQvL3NlY3Rpb25zXG5cdFx0XHQvL2hhY2sgZmlyZWZveCAocG91ciBvZmZzZXRMZWZ0KSA6IG1pbkhlaWdodCA9IDEwJVxuXHRcdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5fc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYodGhpcy5fc2VjdGlvbnNbaV0uc3R5bGUubWluSGVpZ2h0IT09XCIxMCVcIikge1xuXHRcdFx0XHRcdHRoaXMuX3NlY3Rpb25zW2ldLnN0eWxlLm1pbkhlaWdodCA9IFwiMTAlXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vbWFudWFsIGJyZWFrc1xuXHRcdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5fYnJlYWtzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmKHRoaXMuX2JyZWFrc1tpXS5zdHlsZS5tYXJnaW5Cb3R0b20hPT1cIjMwMCVcIikge1xuXHRcdFx0XHRcdHRoaXMuX2JyZWFrc1tpXS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjMwMCVcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly9sYXN0IGVsZW1lbnRcblx0XHRcdGlmKHRoaXMuX2xhc3RFbGVtZW50LnN0eWxlLm1hcmdpbkJvdHRvbSE9PVwiMzAwJVwiKSB7XG5cdFx0XHRcdHRoaXMuX2xhc3RFbGVtZW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMzAwJVwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvL3RleHRcblx0XHRcdHRzLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuXHRcdFx0dHMucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdFx0XHR0cy5sZWZ0ID0gMDtcblx0XHRcdHRzLnRvcCA9IDA7XG5cdFx0XHR0cy5oZWlnaHQgPSBcIjEwMCVcIjtcblx0XHRcdHRzLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0XHR0cy5wYWRkaW5nUmlnaHQgPSB0aGlzLmdldE1hcmdpblgoKSArIFwicHhcIjtcblx0XHRcdHRzLnBhZGRpbmdMZWZ0ID0gdGhpcy5nZXRNYXJnaW5YKCkgKyBcInB4XCI7XG5cdFx0XHR0cy5wYWRkaW5nVG9wID0gdGhpcy5nZXRNYXJnaW5ZKCkgKyBcInB4XCI7XG5cdFx0XHR0cy5wYWRkaW5nQm90dG9tID0gdGhpcy5nZXRNYXJnaW5ZKCkgKyBcInB4XCI7XG5cdFx0XHR0cy5Nb3pDb2x1bW5GaWxsID0gXCJhdXRvXCI7Ly9pbXBvcnRhbnQgISEhXG5cdFx0XHR0cy5XZWJraXRDb2x1bW5zV2lkdGggPSB0aGlzLl9jb250YWluZXJXaWR0aCArIFwicHhcIjtcblx0XHRcdHRzLk1vekNvbHVtbldpZHRoID0gdGhpcy5fY29udGFpbmVyV2lkdGggKyBcInB4XCI7XG5cdFx0XHR0cy5jb2x1bW5XaWR0aCA9IHRoaXMuX2NvbnRhaW5lcldpZHRoICsgXCJweFwiO1xuXHRcdFx0dHMuTW96Q29sdW1uR2FwID0gdGhpcy5nZXRNYXJnaW5YKCkqMiArIFwicHhcIjtcblx0XHRcdHRzLldlYmtpdENvbHVtbkdhcCA9IHRoaXMuZ2V0TWFyZ2luWCgpKjIgKyBcInB4XCI7XG5cdFx0XHR0cy5jb2x1bW5HYXAgPSB0aGlzLmdldE1hcmdpblgoKSoyICsgXCJweFwiO1xuXHRcdFx0XG5cdFx0XHQvL0dvIHRvIGJvb2ttYXJrXG5cdFx0XHRpZih0aGlzLl9ib29rbWFyaykge1xuXHRcdFx0XHR0aGlzLmdvVG9Cb29rbWFyayh0aGlzLl9ib29rbWFyayk7XG5cdFx0XHRcdHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fdGV4dC5vZmZzZXRMZWZ0O1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvL1JlZnJlc2ggaW5mbyBjb250YWluZXJzXG5cdFx0XHR0aGlzLnJlZnJlc2goKTtcblx0XHRcdFxuXHRcdH1cblx0fVxuXG5cdHRvU2Nyb2xsKCkge1xuXHRcdCd1c2Ugc3RyaWN0Jztcblx0XHR0aGlzLmNvbCA9IGZhbHNlO1xuXHRcdGxldCBjcyA9IHRoaXMuX2NvbnRhaW5lci5zdHlsZTtcblx0XHRsZXQgdHMgPSB0aGlzLl90ZXh0LnN0eWxlO1xuXHRcdC8vY29udGFpbmVyXG5cdFx0Y3MuaGVpZ2h0ID0gXCJhdXRvXCI7XG5cdFx0Y3MubWF4V2lkdGggPSB0aGlzLmdldFdpZHRoKCkgKyBcInB4XCI7XG5cdFx0Y3Mub3ZlcmZsb3cgPSBcInZpc2libGVcIjtcblx0XHQvL3RleHRcblx0XHR0cy5wb3NpdGlvbiA9IFwic3RhdGljXCI7XG5cdFx0dHMuaGVpZ2h0ID0gXCJhdXRvXCI7XG5cdFx0Y3MucGFkZGluZ1JpZ2h0ID0gdGhpcy5nZXRNYXJnaW5YKCkgKyBcInB4XCI7XG5cdFx0Y3MucGFkZGluZ0xlZnQgPSB0aGlzLmdldE1hcmdpblgoKSArIFwicHhcIjtcblx0XHRjcy5wYWRkaW5nVG9wID0gdGhpcy5nZXRNYXJnaW5ZKCkgKyBcInB4XCI7XG5cdFx0Y3MucGFkZGluZ0JvdHRvbSA9IHRoaXMuZ2V0TWFyZ2luWSgpICsgXCJweFwiO1xuXG5cdFx0aWYoJ1dlYmtpdENvbHVtbldpZHRoJyBpbiBkb2N1bWVudC5ib2R5LnN0eWxlIHx8ICdNb3pDb2x1bW5XaWR0aCcgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSB8fCAnY29sdW1uV2lkdGgnICBpbiBkb2N1bWVudC5ib2R5LnN0eWxlKSB7XG5cdFx0XHR0cy5XZWJraXRDb2x1bW5zID0gXCJhdXRvIDFcIjtcblx0XHRcdHRzLk1vekNvbHVtbnMgPSBcImF1dG8gMVwiO1xuXHRcdFx0dHMuY29sdW1ucyA9IFwiYXV0byAxXCI7XG5cdFx0fVxuXG5cdFx0Ly9TZWN0aW9ucyAoZm9yIG1vekNvbHVtbnMpXG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5fc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuX3NlY3Rpb25zW2ldLnN0eWxlLm1pbkhlaWdodCA9IFwiMFwiO1xuXHRcdH1cblx0XHQvL21hbnVhbCBicmVha3Ncblx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLl9icmVha3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuX2JyZWFrc1tpXS5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjBcIjtcblx0XHR9XG5cdFx0Ly9sYXN0IGVsZW1lbnRcblx0XHR0aGlzLl9sYXN0RWxlbWVudC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjBweFwiO1xuXG5cdFx0dGhpcy5yZWZyZXNoKCk7XG5cdH07XG5cblx0c2V0V2lkdGgodykge1xuXHRcdHRoaXMuX3dpZHRoID0gdztcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFdpZHRoKCkge1xuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcblx0fVxuXG5cdHNldEhlaWdodChoKSB7XG5cdFx0dGhpcy5faGVpZ2h0ID0gaDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEhlaWdodCgpIHtcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xuXHR9XG5cblx0c2V0TWFyZ2luWChtKSB7XG5cdFx0dGhpcy5fbWFyZ2luWCA9IG07XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYXJnaW5YKCkge1xuXHRcdHJldHVybiB0aGlzLl9tYXJnaW5YO1xuXHR9XG5cblx0c2V0TWFyZ2luWShtKSB7XG5cdFx0dGhpcy5fbWFyZ2luWSA9IG07XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYXJnaW5ZKCkge1xuXHRcdHJldHVybiB0aGlzLl9tYXJnaW5ZO1xuXHR9XG5cblx0Zm9yd2FyZCgpIHtcblx0XHRpZih0aGlzLl9sYXN0RWxlbWVudC5vZmZzZXRMZWZ0K3RoaXMuX3Bvc2l0aW9uID4gdGhpcy5fY29udGFpbmVyV2lkdGgrdGhpcy5nZXRNYXJnaW5YKCkpIHtcblx0XHRcdC8vbGV0IGNsb25lID0gdGhpcy5fdGV4dC5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0XHR0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX3RleHQub2Zmc2V0TGVmdDtcblx0XHRcdHRoaXMuX3Bvc2l0aW9uIC09IHRoaXMuX2NvbnRhaW5lcldpZHRoO1xuXHRcdFx0dGhpcy5fdGV4dC5zdHlsZS5sZWZ0ID0gdGhpcy5fcG9zaXRpb24gKyBcInB4XCI7XG5cdFx0XHRcblx0XHRcdC8vY29uc29sZS5sb2coY2xvbmUpO1xuXHRcdFx0Ly9jbG9uZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0XHRcdC8vdGhpcy5fY29udGFpbmVyLmluc2VydEJlZm9yZShjbG9uZSx0aGlzLnRleHQpO1xuXHRcdFx0dGhpcy5yZWZyZXNoKCk7XG5cdFx0fVxuXHR9XG5cblx0YmFja3dhcmQoKSB7XG5cdFx0aWYodGhpcy5fcG9zaXRpb24gPCAwKSB7XG5cdFx0XHR0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX3RleHQub2Zmc2V0TGVmdDtcblx0XHRcdHRoaXMuX3Bvc2l0aW9uICs9IHRoaXMuX2NvbnRhaW5lcldpZHRoO1xuXHRcdFx0dGhpcy5fdGV4dC5zdHlsZS5sZWZ0ID0gdGhpcy5fcG9zaXRpb24gKyBcInB4XCI7XG5cdFx0XHR0aGlzLnJlZnJlc2goKTtcblx0XHR9XG5cdH1cblxuXHR0b2ZpcnN0UGFnZSgpIHtcblx0XHRpZih0aGlzLl9wb3NpdGlvbiA8IDApIHtcblx0XHRcdHRoaXMuX3Bvc2l0aW9uID0gMDtcblx0XHRcdHRoaXMuX3RleHQuc3R5bGUubGVmdCA9IHRoaXMuX3Bvc2l0aW9uICsgXCJweFwiO1xuXHRcdFx0dGhpcy5yZWZyZXNoKCk7XG5cdFx0fVxuXHR9XG5cblx0dG9sYXN0UGFnZSgpIHtcblx0XHRpZih0aGlzLl9sYXN0RWxlbWVudC5vZmZzZXRMZWZ0K3RoaXMuX3Bvc2l0aW9uID4gdGhpcy5fY29udGFpbmVyV2lkdGgrdGhpcy5nZXRNYXJnaW5YKCkpIHtcblx0XHRcdHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fY29udGFpbmVyV2lkdGgrdGhpcy5nZXRNYXJnaW5YKCktdGhpcy5fbGFzdEVsZW1lbnQub2Zmc2V0TGVmdDtcblx0XHRcdHRoaXMuX3RleHQuc3R5bGUubGVmdCA9IHRoaXMuX3Bvc2l0aW9uK1wicHhcIjtcblx0XHRcdHRoaXMucmVmcmVzaCgpO1xuXHRcdH1cblx0fVxuXG5cdGdldFBhZ2VOdW1iZXIoKSB7XG5cdFx0bGV0IHBhZ2VOdW1iZXIgPSBNYXRoLmFicyhNYXRoLmZsb29yKHRoaXMuX3Bvc2l0aW9uL3RoaXMuX2NvbnRhaW5lcldpZHRoKSkrMTtcblx0XHRyZXR1cm4gcGFnZU51bWJlcjtcblx0fVxuXG5cdGdldFRvdGFsUGFnZXMoKSB7XG5cdFx0bGV0IHRvdGFsUGFnZXMgPSBNYXRoLmZsb29yKHRoaXMuX2xhc3RFbGVtZW50Lm9mZnNldExlZnQvdGhpcy5fY29udGFpbmVyV2lkdGgpO1xuXHRcdHJldHVybiB0b3RhbFBhZ2VzO1xuXHR9XG5cblx0Z29Ub1BhZ2UobnVtYmVyKSB7XG5cdFx0bnVtYmVyID0gKG51bWJlcjwxID8gMSA6IG51bWJlcik7XG5cdFx0bnVtYmVyPSAobnVtYmVyPnRoaXMuZ2V0VG90YWxQYWdlcygpID8gdGhpcy5nZXRUb3RhbFBhZ2VzKCkgOiBudW1iZXIpO1xuXHRcdGxldCBwb3NpdGlvbiA9IHRoaXMuX2NvbnRhaW5lcldpZHRoKihudW1iZXItMSk7XG5cdFx0dGhpcy5fdGV4dC5zdHlsZS5sZWZ0ID0gLXBvc2l0aW9uICsgXCJweFwiO1xuXHRcdHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fdGV4dC5vZmZzZXRMZWZ0O1xuXHRcdHRoaXMucmVmcmVzaCgpO1xuXHR9XG5cblx0ZWxlbWVudFBhZ2VOdW1iZXIoaWQpIHtcblx0XHRsZXQgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdFx0bGV0IGVsUG9zaXRpb24gPSBlbC5vZmZzZXRMZWZ0IC0gdGhpcy5nZXRNYXJnaW5YKCk7XG5cdFx0ZWxQb3NpdGlvbiA9IChlbFBvc2l0aW9uJXRoaXMuX2NvbnRhaW5lcldpZHRoIT09MCA/IGVsUG9zaXRpb24tZWxQb3NpdGlvbiV0aGlzLl9jb250YWluZXJXaWR0aCA6IGVsUG9zaXRpb24pOy8vYWx3YXlzIGF0IGEgcGFnZSBiZWdpbm5pbmdcblx0XHRsZXQgZWxQYWdlTnVtYmVyID0gZWxQb3NpdGlvbi90aGlzLl9jb250YWluZXJXaWR0aCArIDE7XG5cdFx0cmV0dXJuIGVsUGFnZU51bWJlcjtcblx0fVxuXG5cdGdldFNlY3Rpb25UaXRsZSgpIHtcblx0XHRsZXQgcG9zaXRpb24gPSAtdGhpcy5fcG9zaXRpb247XG5cdFx0bGV0IHRpdGxlO1xuXHRcdGZvcihsZXQgaT0xOyBpPHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZih0aGlzLl9zZWN0aW9uc1tpXS5vZmZzZXRMZWZ0LXRoaXMuX2NvbnRhaW5lcldpZHRoPj1wb3NpdGlvbikge1xuXHRcdFx0XHRsZXQgaWQgPSB0aGlzLl9zZWN0aW9uc1tpLTFdLmlkO1xuXHRcdFx0XHRpZihpZCE9PXVuZGVmaW5lZCAmJiB0aGlzLmdldFBhZ2VOdW1iZXIoKSA9PT0gdGhpcy5lbGVtZW50UGFnZU51bWJlcihpZCkpIHtcblx0XHRcdFx0XHR0aXRsZSA9IFwiXCI7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGl0bGUgPSB0aGlzLl9zZWN0aW9uc1tpLTFdLmdldEF0dHJpYnV0ZSgnZGF0YS13Yi10aXRsZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGl0bGU7XG5cdH1cblx0XG5cdGdldEN1cnJlbnRTZWN0aW9uKCkge1xuXHRcdGxldCBwb3NpdGlvbiA9IC10aGlzLl9wb3NpdGlvbjtcblx0XHRmb3IobGV0IGk9MTsgaTx0aGlzLl9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYodGhpcy5fc2VjdGlvbnNbaV0ub2Zmc2V0TGVmdC10aGlzLl9jb250YWluZXJXaWR0aD49cG9zaXRpb24pIHtcblx0XHRcdFx0bGV0IGlkID0gdGhpcy5fc2VjdGlvbnNbaS0xXS5pZDtcblx0XHRcdFx0dGhpcy5fYm9va0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS13Yi10b2NdIGEnKS5mb3JFYWNoKCB2YWwgPT4ge1xuXHRcdFx0XHRcdGlmKHZhbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5yZXBsYWNlKC9eIy8sJycpID09PSBpZCkge1xuXHRcdFx0XHRcdFx0aWYoIXZhbC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZS5tYXRjaCgvY3VycmVudC8pKSB7XG5cdFx0XHRcdFx0XHRcdHZhbC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSs9JyBjdXJyZW50Jztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYodmFsLnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lLm1hdGNoKC9jdXJyZW50LykpIHtcblx0XHRcdFx0XHRcdFx0dmFsLnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lPXZhbC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKC8gY3VycmVudC8sJycpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0c2V0VG9jKCkge1xuXHRcdGlmKCF0aGlzLl90b2MpIHsgcmV0dXJuOyB9XG5cdFx0aWYodGhpcy5fdG9jLmdldEF0dHJpYnV0ZSgnZGF0YS13Yi10b2MnKSkge1xuXHRcdFx0bGV0IHRvY1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0dG9jVGl0bGUuc2V0QXR0cmlidXRlKCdjbGFzcycsJ2RhdGEtd2ItdG9jLXRpdGxlJyk7XG5cdFx0XHR0b2NUaXRsZS5pbm5lckhUTUwgPSB0b2MuZ2V0QXR0cmlidXRlKCdkYXRhLXdiLXRvYycpO1xuXHRcdFx0dGhpcy5fdG9jLmFwcGVuZENoaWxkKHRvY1RpdGxlKTtcblx0XHR9XG5cdFx0dGhpcy5fdG9jSW5zZXJ0cy5mb3JFYWNoKCB2YWwgPT4ge1xuXHRcdFx0bGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHRwLmlubmVySFRNTCA9IHZhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtd2ItdGl0bGUnKTtcblx0XHRcdHAuc2V0QXR0cmlidXRlKCdjbGFzcycsJ3diLXRvYy1pdGVtJyk7XG5cdFx0XHRsZXQgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdGEuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnICsgdmFsLmlkKTtcblx0XHRcdGEuc2V0QXR0cmlidXRlKCdjbGFzcycsICd3Yi1lbGVtZW50LXBhZ2UtbnVtYmVyIHdiLWxpbmsnKTtcblx0XHRcdHAuYXBwZW5kQ2hpbGQoYSk7XG5cdFx0XHR0aGlzLl90b2MuYXBwZW5kQ2hpbGQocCk7XG5cdFx0fSlcblx0fVxuXG5cdGluc2VydEJvb2ttYXJrKCkge1xuXHRcdGxldCBib29rbWFyayA9IG51bGw7XG5cdFx0Zm9yKGxldCBpPTA7IGk8dGhpcy5fZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBlbFBvc2l0aW9uID0gdGhpcy5fZWxlbWVudHNbaV0ub2Zmc2V0TGVmdC10aGlzLmdldE1hcmdpblgoKTtcblx0XHRcdGVsUG9zaXRpb24gPSAoZWxQb3NpdGlvbiV0aGlzLl9jb250YWluZXJXaWR0aCE9PTAgPyBlbFBvc2l0aW9uLWVsUG9zaXRpb24ldGhpcy5fY29udGFpbmVyV2lkdGggOiBlbFBvc2l0aW9uKTsvL2Fsd2F5cyBhdCBhIHBhZ2UgYmVnaW5uaW5nXG5cdFx0XHRpZihlbFBvc2l0aW9uID09PSAtdGhpcy5fcG9zaXRpb24pXG5cdFx0XHR7XG5cdFx0XHRcdGJvb2ttYXJrID0gaTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKGVsUG9zaXRpb24gPiAtdGhpcy5fcG9zaXRpb24pXG5cdFx0XHR7XG5cdFx0XHRcdGJvb2ttYXJrID0gaS0xO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fYm9va21hcmsgPSBib29rbWFyaztcblx0fVxuXG5cdGdvVG9Cb29rbWFyayhib29rbWFyaykge1xuXHRcdGxldCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudHNbdGhpcy5fYm9va21hcmtdO1xuXHRcdC8vcG9zaXRpb24gOiBvZmZzZXRMZWZ0IG9mIGVsZW1lbnQgcmVsYXRpdmUgdG8gdGV4dFxuXHRcdGxldCBwb3NpdGlvbiA9IGVsZW1lbnQub2Zmc2V0TGVmdC10aGlzLmdldE1hcmdpblgoKTtcblx0XHRwb3NpdGlvbiA9IChwb3NpdGlvbiV0aGlzLl9jb250YWluZXJXaWR0aCE9PTAgPyBwb3NpdGlvbi1wb3NpdGlvbiV0aGlzLl9jb250YWluZXJXaWR0aCA6IHBvc2l0aW9uKTsvL2Fsd2F5cyBhdCBhIHBhZ2UgYmVnaW5uaW5nXG5cdFx0Ly90ZXh0IHBvc2l0aW9uID0gLXBvc2l0aW9uXG5cdFx0dGhpcy5fdGV4dC5zdHlsZS5sZWZ0ID0gLXBvc2l0aW9uICsgXCJweFwiO1xuXHRcdHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fdGV4dC5vZmZzZXRMZWZ0O1xuXHRcdHRoaXMucmVmcmVzaCgpO1xuXHR9XG5cblx0cmVmcmVzaCgpIHtcblx0XHR0aGlzLmluc2VydEJvb2ttYXJrKCk7XG5cblx0XHRpZih0aGlzLmNvbD09PWZhbHNlKSB7XG5cdFx0XHRcblx0XHRcdHRoaXMuX2N1cnJlbnRQYWdlcy5mb3JFYWNoKCB2YWwgPT4ge1xuXHRcdFx0XHR2YWwuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLl90b3RhbFBhZ2VzLmZvckVhY2goIHZhbCA9PiB7XG5cdFx0XHRcdHZhbC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMuX2N1cnJlbnRUb3RhbFBhZ2VzLmZvckVhY2goIHZhbCA9PiB7XG5cdFx0XHRcdHZhbC5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHRoaXMuX2VsUGFnZU51bWJlcnMuZm9yRWFjaCggdmFsID0+IHtcblx0XHRcdFx0dmFsLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fc2VjdGlvblRpdGxlcy5mb3JFYWNoKCB2YWwgPT4ge1xuXHRcdFx0XHR2YWwuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0fSBlbHNlIHtcblx0XHRcdFxuXHRcdFx0aWYodGhpcy5fdG9jKSB7XG5cdFx0XHRcdHRoaXMuZ2V0Q3VycmVudFNlY3Rpb24oKTtcblx0XHRcdH1cdFxuXHRcdFx0XG5cdFx0XHR0aGlzLl9jdXJyZW50UGFnZXMuZm9yRWFjaCggdmFsID0+IHtcblx0XHRcdFx0aWYodmFsLmlubmVySFRNTCE9dGhpcy5nZXRQYWdlTnVtYmVyKCkpIHtcblx0XHRcdFx0XHR2YWwuaW5uZXJIVE1MID0gdGhpcy5nZXRQYWdlTnVtYmVyKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLl90b3RhbFBhZ2VzLmZvckVhY2goIHZhbCA9PiB7XG5cdFx0XHRcdGlmKHZhbC5pbm5lckhUTUwhPXRoaXMuZ2V0VG90YWxQYWdlcygpKSB7XG5cdFx0XHRcdFx0dmFsLmlubmVySFRNTCA9IHRoaXMuZ2V0VG90YWxQYWdlcygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fY3VycmVudFRvdGFsUGFnZXMuZm9yRWFjaCggdmFsID0+IHtcblx0XHRcdFx0aWYodmFsLmlubmVySFRNTCE9PSB0aGlzLmdldFBhZ2VOdW1iZXIoKSArIFwiL1wiICsgdGhpcy5nZXRUb3RhbFBhZ2VzKCkpIHtcblx0XHRcdFx0XHR2YWwuaW5uZXJIVE1MID0gdGhpcy5nZXRQYWdlTnVtYmVyKCkgKyBcIi9cIiArIHRoaXMuZ2V0VG90YWxQYWdlcygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fZWxQYWdlTnVtYmVycy5mb3JFYWNoKCB2YWwgPT4ge1xuXHRcdFx0XHRsZXQgaWQgPSB2YWwuZ2V0QXR0cmlidXRlKCdocmVmJykucmVwbGFjZSgvXiMvLCcnKTtcblx0XHRcdFx0bGV0IHBhZ2VOdW1iZXIgPSB0aGlzLmVsZW1lbnRQYWdlTnVtYmVyKGlkKTtcblx0XHRcdFx0aWYodmFsLmlubmVySFRNTCE9cGFnZU51bWJlcikge1xuXHRcdFx0XHRcdHZhbC5pbm5lckhUTUwgPSBwYWdlTnVtYmVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0dGhpcy5fc2VjdGlvblRpdGxlcy5mb3JFYWNoKCB2YWwgPT4ge1xuXHRcdFx0XHRpZih2YWwuaW5uZXJIVE1MIT09dGhpcy5nZXRTZWN0aW9uVGl0bGUoKSkge1xuXHRcdFx0XHRcdHZhbC5pbm5lckhUTUwgPSB0aGlzLmdldFNlY3Rpb25UaXRsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdH1cblx0fVxufVxuXG4iXX0=