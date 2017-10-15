window.addEventListener('load', function() {
	//book-container
	
	var h, w;
	
	//width (responsive)
	if(window.innerWidth >= 768) {
		h = window.innerHeight-88-60;//navBars height *2 (2*44) + textContainer top * 2 (2*30)
		w = 640;
	 } else {
		 h = window.innerHeight;
		 w = window.innerWidth;
	 }
	
	//new Book
	var book = new WebBook(bookContainer, {
		 height: h,
		 maxWidth: w,
		 marginY: 45});
		 
	setTimeout(function() {
		bookContainer.className = 'show';
	},300);
		 	 
	//on resize
	window.addEventListener('resize',function(event) {
		if(window.innerWidth >= 768) {
			h = window.innerHeight-88-60;
			w = 640;
		} else {
			h = window.innerHeight;
			w = window.innerWidth;
		}
		
		book.setHeight(h);
		book.setMaxWidth(w);
		
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
	bookContainer.querySelector('#forward-large').addEventListener('click', function() {
		book.forward();
	}, false);

	bookContainer.querySelector('#backward-large').addEventListener('click', function() {
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
	bookContainer.querySelector('#showTable-large').addEventListener('click', function() {
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

	
