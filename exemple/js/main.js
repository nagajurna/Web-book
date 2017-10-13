window.addEventListener('load', function() {
	//book-container
	var bookContainer = document.getElementById('bookContainer');
	var h;
	
	//height (responsive)
	if(window.innerHeight < 740) {
		h =  window.innerHeight-50;
		//bookContainer.style.marginTop = "0px";
	} else {
		h = 650;
		//bookContainer.style.marginTop = "40px";
	 }
	 
	 //bookContainer.style.height = h+50+"px";
	
	//new Book
	var book = new WebBook(bookContainer, {
		 height: h,
		 maxWidth: 620});
		 	 
	//on resize
	window.addEventListener('resize',function(event) {
		if(event.target.innerHeight < 740) {
			h = event.target.innerHeight-50;
			book.setHeight(h);
			//bookContainer.style.marginTop = "0px";
		} else {
			h = 650;
			book.setHeight(h);
			//bookContainer.style.marginTop = "40px";
		}
		
		 //bookContainer.style.height = h+50+"px";
		
		if(book.col===true) {
			book.toBook();
		}
	
	}, false);
	
	
	
	//buttons	
	bookContainer.querySelector('#forward').addEventListener('click', function() {
		book.forward();
	}, false);

	bookContainer.querySelector('#backward').addEventListener('click', function() {
		book.backward();
	}, false);
	
	//bottom
	var bottom = bookContainer.querySelector('#bottom');
	bottom.style.display = book.col ? 'block' : 'none';
		
	//toc		
	var toc = bookContainer.querySelector('#toc');
	toc.style.display = book.col ? 'block' : 'none';
	bookContainer.querySelector('#showTable').addEventListener('click', function() {
		toc.className = toc.className === "show" ? "" : "show";
		}, false);
	
	var tocLinks = toc.querySelectorAll('a');
	for(var i=0; i<tocLinks.length; i++) {
		tocLinks[i].addEventListener('click', function() {
			toc.className = "";
		}, false);
	}
	
	toc.querySelector("#close").addEventListener('click', function() {
		toc.className = "";
	}, false);
		
}, false);
	
