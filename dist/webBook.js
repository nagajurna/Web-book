function Book(bookContainer, textContainer, text, options) {
	'use strict';
	//containers
	this.bookContainer = bookContainer;
	this.container = textContainer;
	this.text = text;
		
	//options
	this.height = options.height;
	this.width = options.width;
	this.marginX = options.marginX;
	this.marginY = options.marginY;
	this.position = 0;
	this.col = null;
	//this.break is used as a ghost page
	this.lastBreak = document.createElement("div");
	this.lastBreak.className = "text-break";
	this.text.appendChild(this.lastBreak);
	//this.lastElement is used as landmark
	this.lastElement = document.createElement("div");
	this.lastElement.innerHTML = "&nbsp;";//not empty (for mozColumns)
	this.lastElement.className = "wb-section";
	this.text.appendChild(this.lastElement);
	//sections
	this.sections = this.text.getElementsByClassName('wb-section');
	this.breaks = this.text.getElementsByClassName('text-break');
	
	if('WebkitColumnWidth' in document.body.style || 'MozColumnWidth' in document.body.style || 'columnWidth'  in document.body.style) {
		this.toBook();
	} else {
		this.toScroll();
	}
		
	var links = this.bookContainer.getElementsByClassName('wb-link');
	for(var i=0; i<links.length; i++) {
		links[i].addEventListener('click', function(e) {
			if(this.col===true) {
				e.preventDefault();
				var href = e.target.href;
				var id = href.replace(/^.+#/,"");
				var el = document.getElementById(id);
				var elPosition = el.offsetLeft-this.getMarginX();
				elPosition = (elPosition%this.containerWidth!==0 ? elPosition-elPosition%this.containerWidth : elPosition);
				this.text.style.left = -elPosition + "px";
				this.position = -elPosition;
				this.refresh();
			}
		}.bind(this), false);
	}
}

Book.prototype.toBook = function() {
	'use strict';
	if('WebkitColumnWidth' in document.body.style || 'MozColumnWidth' in document.body.style || 'columnWidth'  in document.body.style) {
		this.col = true;
		var cs = this.container.style;
		var ts = this.text.style;
		var i;
		//container
		cs.position = "relative";
		cs.padding = "0px";
		cs.height = this.getHeight() + "px";
		cs.maxWidth = this.getWidth() + "px";//maxWidth : responsive
		this.containerWidth = this.container.clientWidth;//responsive
		
		//sections
		//hack firefox (pour offsetLeft) : minHeight = 10%
		for(i=0; i<this.sections.length; i++) {
			if(this.sections[i].style.minHeight!=="10%") {
				this.sections[i].style.minHeight = "10%";
			}
		}
		//manual breaks
		for(i=0; i<this.breaks.length; i++) {
			if(this.breaks[i].style.marginBottom!=="300%") {
				this.breaks[i].style.marginBottom = "300%";
			}
		}
		
		//last element
		if(this.lastElement.style.marginBottom!=="300%") {
			this.lastElement.style.marginBottom = "300%";
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
		ts.WebkitColumnWidth = this.containerWidth + "px";
		ts.MozColumnWidth = this.containerWidth + "px";
		ts.columnWidth = this.containerWidth + "px";
		ts.MozColumnGap = this.getMarginX()*2 + "px";
		ts.WebkitColumnGap = this.getMarginX()*2 + "px";
		ts.columnGap = this.getMarginX()*2 + "px";
		//position
		if('MozColumnWidth' in document.body.style) {//hack firefox (pour resize et insertion el-page-number) : overflow = visible 
			cs.overflow = "visible";
			var elPageNumbers = this.bookContainer.getElementsByClassName('wb-element-page-number');
			var pages = [];
			for(i=0; i< elPageNumbers.length; i++) {
				var id = elPageNumbers[i].getAttribute('data-wb');
				pages.push(this.elementPageNumber(id));
			}
			
			this.position = this.text.offsetLeft;
			
			for(i=0; i< elPageNumbers.length; i++) {
				elPageNumbers[i].innerHTML = pages[i];
				elPageNumbers[i].style.display = "inline";
			}
		} 
		cs.overflow = "hidden";
				
		if(this.bookmark) { 
			this.goToBookmark(this.bookmark); 
			this.position = this.text.offsetLeft;
		}
				
		this.refresh();
	}
};

Book.prototype.toScroll = function() {
	'use strict';
	this.col = false;
	var cs = this.container.style;
	var ts = this.text.style;
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
	
	var i;
	//Sections (for mozColumns)
	for(i=0; i<this.sections.length; i++) {
		this.sections[i].style.minHeight = "0";
	}
	//manual breaks
	for(i=0; i<this.breaks.length; i++) {
		this.breaks[i].style.marginBottom = "0";
	}
	//last element
	this.lastElement.style.marginBottom = "0px";
	
	this.refresh();
};

Book.prototype.setWidth = function(w) {
	this.width = w;
	return this;
};

Book.prototype.getWidth = function() {
	return this.width;
};

Book.prototype.setHeight = function(h) {
	this.height = h;
	return this;
};

Book.prototype.getHeight = function() {
	return this.height;
};

Book.prototype.setMarginX = function(m) {
	this.marginX = m;
	return this;
};

Book.prototype.getMarginX = function() {
	return this.marginX;
};

Book.prototype.setMarginY = function(m) {
	this.marginY = m;
	return this;
};

Book.prototype.getMarginY = function() {
	return this.marginY;
};

Book.prototype.forward = function() {
	'use strict';
	if(this.lastElement.offsetLeft+this.position > this.containerWidth+this.getMarginX()) {
		this.position -= this.containerWidth;
		this.text.style.left = this.position+"px";
		this.refresh();
	} 
};

Book.prototype.backward = function() {
	'use strict';
	if(this.position < 0) {
		this.position += this.containerWidth;
		this.text.style.left = this.position+"px";
		this.refresh();
	}
};

Book.prototype.tofirstPage = function() {
	'use strict';
	if(this.position < 0) {
		this.position = 0;
		this.text.style.left = this.position+"px";
		this.refresh();
	}
};

Book.prototype.tolastPage = function() {
	'use strict';
	if(this.lastElement.offsetLeft+this.position > this.containerWidth+this.getMarginX()) {
		this.position = this.containerWidth+this.getMarginX()-this.lastElement.offsetLeft;
		this.text.style.left = this.position+"px";
		this.refresh();
	}
};

Book.prototype.getPageNumber = function() {
	'use strict';
	var position = this.position;
	var pageNumber = -position/this.containerWidth + 1;
	return pageNumber;
};

Book.prototype.totalPages = function() {
	'use strict';
	var totalPages = Math.floor(this.lastElement.offsetLeft/this.containerWidth);
	return totalPages;
};

Book.prototype.goToPage = function(number) {
	'use strict';
	number = (number<1 ? 1 : number);
	number= (number>this.totalPages() ? this.totalPages() : number);
	var position = this.containerWidth*(number-1);
	this.text.style.left = -position + "px";
	this.position = this.text.offsetLeft;
	this.refresh();
};

Book.prototype.elementPageNumber = function(id) {
	'use strict';
	var el = document.getElementById(id);
	var elPosition = el.offsetLeft - this.getMarginX();
	elPosition = (elPosition%this.containerWidth!==0 ? elPosition-elPosition%this.containerWidth : elPosition);//toujours se trouver au début exact d'une page
	var elPageNumber = elPosition/this.containerWidth + 1;
	return elPageNumber;
};

Book.prototype.sectionTitle = function() {
	'use strict';
	var position = -this.position;
	var title;
	for(var i=1; i<this.sections.length; i++) {
		if(this.sections[i].offsetLeft-this.containerWidth>=position) {
			var id = this.sections[i-1].id;
			if(id!==undefined && this.getPageNumber() === this.elementPageNumber(id)) {
				title = "";
			} else {
				title = this.sections[i-1].title;
			}
			break;
		}	
	}
	return title;
};

Book.prototype.insertBookmark = function() {
	'use strict';
	var elements = this.text.querySelectorAll('*');
	var bookmark = {};
	for(var i=0; i<elements.length; i++)
	{
		var elPosition = elements[i].offsetLeft-this.getMarginX();
		elPosition = (elPosition%this.containerWidth!==0 ? elPosition-elPosition%this.containerWidth : elPosition);//toujours se trouver au début exact d'une page
		if(elPosition === -this.position)
		{
			bookmark.element = elements[i];
			bookmark.index = i;
			break;
		}
		else if(elPosition > -this.position)
		{
			bookmark.element = elements[i-1];
			bookmark.index = i-1;
			break;
		}
	}
	return bookmark;
};

Book.prototype.goToBookmark = function(bookmark) {
	'use strict';
	var elements = this.text.querySelectorAll('*');
	var element = elements[bookmark.index];
	var position = element.offsetLeft-this.getMarginX();
	position = (position%this.containerWidth!==0 ? position-position%this.containerWidth : position);//toujours se trouver au début exact d'une page
	this.text.style.left = -position + "px";
	this.position = this.text.offsetLeft;
	this.refresh();
};

Book.prototype.refresh = function() {
	'use strict';
	var book = this.bookContainer;
	var currentPages = book.getElementsByClassName('wb-current-page');
	var totalPages = book.getElementsByClassName('wb-total-pages');
	var currentTotalPages = book.getElementsByClassName('wb-currentByTotal-pages');
	var elPageNumbers = book.getElementsByClassName('wb-element-page-number');
	var sectionTitle = book.getElementsByClassName('wb-current-section-title');
	var i;
	if(this.col===false) { 
		for(i=0; i< currentPages.length; i++) {
			currentPages[i].style.display = "none";
		}
		
		for(i=0; i< totalPages.length; i++) {
			totalPages[i].style.display = "none";
		}
		
		for(i=0; i< currentTotalPages.length; i++) {
			currentTotalPages[i].style.display = "none";
		}
		
		for(i=0; i< elPageNumbers.length; i++) {
			elPageNumbers[i].style.display = "none";
		}
		
		for(i=0; i< sectionTitle.length; i++) {
			sectionTitle[i].style.display = "none";
		}
	} else {
		this.bookmark = this.insertBookmark();
		for(i=0; i< currentPages.length; i++) {
			currentPages[i].innerHTML = this.getPageNumber();
			currentPages[i].style.display = "inline-block";
		}
	
		for(i=0; i< totalPages.length; i++) {
			totalPages[i].innerHTML = this.totalPages();
			totalPages[i].style.display = "inline-block";
		}
		
		for(i=0; i< currentTotalPages.length; i++) {
			currentTotalPages[i].innerHTML = this.getPageNumber() + "/" + this.totalPages();
			currentTotalPages[i].style.display = "inline-block";
		}
		
		if('MozColumnWidth' in document.body.style) {
			//see this.toBook();
		} else {
			for(i=0; i< elPageNumbers.length; i++) {
				var id = elPageNumbers[i].getAttribute('data-wb');
				elPageNumbers[i].innerHTML = this.elementPageNumber(id);
				elPageNumbers[i].style.display = "inline-block";
			}
		}		
		
		for(i=0; i< sectionTitle.length; i++) {
			sectionTitle[i].innerHTML = this.sectionTitle();
			sectionTitle[i].style.display = "inline-block";
		}
	}
};

