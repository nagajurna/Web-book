class WebBook {
	constructor(bookContainer, options) {
		//containers
		this._bookContainer = bookContainer;
		this._container = bookContainer.querySelector('[data-wb-text-container]');
		this._text = bookContainer.querySelector('[data-wb-text]');
		//options
		this._height = options.height;
		this._width = options.maxWidth;
		this._marginX = options.marginX===undefined ? 35 : options.marginX;
		this._marginY = options.marginY===undefined ? 20 : options.marginY;
		//init position, col ,containerWidth and bookmark
		this._position = 0;
		this.col = true;
		this._bookmark = null;
		this._containerWidth = null;
		//this.lastBreak is used as a ghost page
		this._lastBreak = document.createElement("div");
		this._lastBreak.className = "wb-text-break";
		this._text.appendChild(this._lastBreak);
		//this._lastElement is used as landmark
		this._lastElement = document.createElement("div");
		this._lastElement.innerHTML = "&nbsp;";//not empty (for mozColumns)
		this._lastElement.className = "wb-section";
		this._text.appendChild(this._lastElement);
		//sections
		this._sections = this._text.querySelectorAll('.wb-section');
		//breaks
		this._breaks = this._text.querySelectorAll('.wb-text-break');
		//elements : select all elements but .text-breaks (for bookmarks)
		this._elements = this._text.querySelectorAll(':not(.wb-text-break)');
		//infos containers
		this._currentPages = this._bookContainer.querySelectorAll('.wb-current-page');
		this._totalPages = this._bookContainer.querySelectorAll('.wb-total-pages');
		this._currentTotalPages = this._bookContainer.querySelectorAll('.wb-currentByTotal-pages');
		this._elPageNumbers = this._bookContainer.querySelectorAll('.wb-element-page-number');
		this._sectionTitles = this._bookContainer.querySelectorAll('.wb-current-section-title');
		
		if('WebkitColumnWidth' in document.body.style || 'MozColumnWidth' in document.body.style || 'columnWidth' in document.body.style) {
			this.toBook();
		}
		
		//links : replace default with goToPage
		let links = this._bookContainer.querySelectorAll('.wb-link');
		for(let i=0; i<links.length; i++) {
			links[i].addEventListener('click', e => {
				if(this.col===true) {
					e.preventDefault();
					let href = e.target.href;
					let id = href.replace(/^.+#/,"");
					this.goToPage(this.elementPageNumber(id));
					
				}
			}, false);
		}

	}

	toBook() {
		if('WebkitColumnWidth' in document.body.style || 'MozColumnWidth' in document.body.style || 'columnWidth'  in document.body.style) {
			
			this.col = true;
			let cs = this._container.style;
			let ts = this._text.style;
			console.log(this._bookContainer.clientHeight);
			//text-container
			cs.overflow = "hidden";
			cs.position = "relative";
			//cs.left = 0;
			//cs.top = 0;
			cs.padding = "0px";
			cs.height = this.getHeight() + "px";
			cs.maxWidth = this.getWidth() + "px";//maxWidth : responsive
			this._containerWidth = this._container.clientWidth;//responsive
			
			//sections
			//hack firefox (pour offsetLeft) : minHeight = 10%
			for(let i=0; i<this._sections.length; i++) {
				if(this._sections[i].style.minHeight!=="10%") {
					this._sections[i].style.minHeight = "10%";
				}
			}
			//manual breaks
			for(let i=0; i<this._breaks.length; i++) {
				if(this._breaks[i].style.marginBottom!=="300%") {
					this._breaks[i].style.marginBottom = "300%";
				}
			}
			//last element
			if(this._lastElement.style.marginBottom!=="300%") {
				this._lastElement.style.marginBottom = "300%";
			}

			//text
			ts.position = "absolute";
			ts.left = 0;
			ts.boxSizing = "border-box";
			ts.height = "100%";
			ts.width = "100%";
			ts.paddingRight = this.getMarginX() + "px";
			ts.paddingLeft = this.getMarginX() + "px";
			ts.paddingTop = this.getMarginY() + "px";
			ts.paddingBottom = this.getMarginY() + "px";
			ts.WebkitColumnsWidth = this._containerWidth + "px";
			ts.MozColumnWidth = this._containerWidth + "px";
			ts.columnWidth = this._containerWidth + "px";
			ts.MozColumnGap = this.getMarginX()*2 + "px";
			ts.WebkitColumnGap = this.getMarginX()*2 + "px";
			ts.columnGap = this.getMarginX()*2 + "px";
			ts.MozColumnFill = "auto";//important !!!
			
			//Go to bookmark
			if(this._bookmark) {
				this.goToBookmark(this._bookmark);
				this._position = this._text.offsetLeft;
			}
			
			//Refresh info containers
			this.refresh();
			
		}
	}

	toScroll() {
		'use strict';
		this.col = false;
		let cs = this._container.style;
		let ts = this._text.style;
		//container
		cs.height = "auto";
		cs.maxWidth = this.getWidth() + "px";
		cs.overflow = "visible";
		//text
		ts.position = "static";
		ts.height = "auto";
		cs.paddingRight = this.getMarginX() + "px";
		cs.paddingLeft = this.getMarginX() + "px";
		cs.paddingTop = this.getMarginY() + "px";
		cs.paddingBottom = this.getMarginY() + "px";

		if('WebkitColumnWidth' in document.body.style || 'MozColumnWidth' in document.body.style || 'columnWidth'  in document.body.style) {
			ts.WebkitColumns = "auto 1";
			ts.MozColumns = "auto 1";
			ts.columns = "auto 1";
		}

		//Sections (for mozColumns)
		for(let i=0; i<this._sections.length; i++) {
			this._sections[i].style.minHeight = "0";
		}
		//manual breaks
		for(let i=0; i<this._breaks.length; i++) {
			this._breaks[i].style.marginBottom = "0";
		}
		//last element
		this._lastElement.style.marginBottom = "0px";

		//this.refresh();
	};

	setWidth(w) {
		this._width = w;
		return this;
	}

	getWidth() {
		return this._width;
	}

	setHeight(h) {
		this._height = h;
		return this;
	}

	getHeight() {
		return this._height;
	}

	setMarginX(m) {
		this._marginX = m;
		return this;
	}

	getMarginX() {
		return this._marginX;
	}

	setMarginY(m) {
		this._marginY = m;
		return this;
	}

	getMarginY() {
		return this._marginY;
	}

	forward() {
		if(this._lastElement.offsetLeft+this._position > this._containerWidth+this.getMarginX()) {
			//let clone = this._text.cloneNode(true);
			this._position = this._text.offsetLeft;
			this._position -= this._containerWidth;
			this._text.style.left = this._position + "px";
			
			//console.log(clone);
			//clone.style.position = "absolute";
			//this._container.insertBefore(clone,this.text);
			this.refresh();
		}
	}

	backward() {
		if(this._position < 0) {
			this._position = this._text.offsetLeft;
			this._position += this._containerWidth;
			this._text.style.left = this._position + "px";
			this.refresh();
		}
	}

	tofirstPage() {
		if(this._position < 0) {
			this._position = 0;
			this._text.style.left = this._position + "px";
			this.refresh();
		}
	}

	tolastPage() {
		if(this._lastElement.offsetLeft+this._position > this._containerWidth+this.getMarginX()) {
			this._position = this._containerWidth+this.getMarginX()-this._lastElement.offsetLeft;
			this._text.style.left = this._position+"px";
			this.refresh();
		}
	}

	getPageNumber() {
		let pageNumber = Math.abs(Math.floor(this._position/this._containerWidth))+1;
		return pageNumber;
	}

	getTotalPages() {
		let totalPages = Math.floor(this._lastElement.offsetLeft/this._containerWidth);
		return totalPages;
	}

	goToPage(number) {
		number = (number<1 ? 1 : number);
		number= (number>this.getTotalPages() ? this.getTotalPages() : number);
		let position = this._containerWidth*(number-1);
		this._text.style.left = -position + "px";
		this._position = this._text.offsetLeft;
		this.refresh();
	}

	elementPageNumber(id) {
		let el = document.getElementById(id);
		let elPosition = el.offsetLeft - this.getMarginX();
		elPosition = (elPosition%this._containerWidth!==0 ? elPosition-elPosition%this._containerWidth : elPosition);//always at a page beginning
		let elPageNumber = elPosition/this._containerWidth + 1;
		return elPageNumber;
	}

	getSectionTitle() {
		let position = -this._position;
		let title;
		for(let i=1; i<this._sections.length; i++) {
			if(this._sections[i].offsetLeft-this._containerWidth>=position) {
				let id = this._sections[i-1].id;
				if(id!==undefined && this.getPageNumber() === this.elementPageNumber(id)) {
					title = "";
				} else {
					title = this._sections[i-1].getAttribute('data-wb-title');
				}
				break;
			}
		}
		return title;
	}

	insertBookmark() {
		let bookmark = null;
		for(let i=0; i<this._elements.length; i++) {
			let elPosition = this._elements[i].offsetLeft-this.getMarginX();
			elPosition = (elPosition%this._containerWidth!==0 ? elPosition-elPosition%this._containerWidth : elPosition);//always at a page beginning
			if(elPosition === -this._position)
			{
				bookmark = i;
				break;
			}
			else if(elPosition > -this._position)
			{
				bookmark = i-1;
				break;
			}
		}
		this._bookmark = bookmark;
	}

	goToBookmark(bookmark) {
		let element = this._elements[this._bookmark];
		//position : offsetLeft of element relative to text
		let position = element.offsetLeft-this.getMarginX();
		position = (position%this._containerWidth!==0 ? position-position%this._containerWidth : position);//always at a page beginning
		//text position = -position
		this._text.style.left = -position + "px";
		this._position = this._text.offsetLeft;
		this.refresh();
	}

	refresh() {
		this.insertBookmark();

		if(this.col===false) {
			
			this._currentPages.forEach( val => {
				val.style.display = "none";
			});

			this._totalPages.forEach( val => {
				val.style.display = "none";
			});

			this._currentTotalPages.forEach( val => {
				val.style.display = "none";
			});
			
			this._elPageNumbers.forEach( val => {
				val.style.display = "none";
			});

			this._sectionTitles.forEach( val => {
				val.style.display = "none";
			});
			
		} else {
			
			this._currentPages.forEach( val => {
				val.innerHTML = this.getPageNumber();
				val.style.display = "inline-block";
			});

			this._totalPages.forEach( val => {
				val.innerHTML = this.getTotalPages();
				val.style.display = "inline-block";
			});

			this._currentTotalPages.forEach( val => {
				val.innerHTML = this.getPageNumber() + "/" + this.getTotalPages();
				val.style.display = "inline-block";
			});

			this._elPageNumbers.forEach( val => {
				let id = val.getAttribute('data-wb-element');
				let pageNumber = this.elementPageNumber(id);
				val.innerHTML = pageNumber;
				val.style.display = "inline-block";
			});
			
			this._sectionTitles.forEach( val => {
				val.innerHTML = this.getSectionTitle();
				val.style.display = "inline-block";
			});

		}
	}
}

