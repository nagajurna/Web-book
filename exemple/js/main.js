window.addEventListener('load', function() {
	//containers
	var bookContainer = document.getElementById('bookContainer');
	var textContainer = document.getElementById('textContainer');
	var text = document.getElementById('text');
	
	//height (responsive)
	if(window.innerHeight < 740) {
		var h =  window.innerHeight-50;
		bookContainer.style.marginTop = "0px";
	} else {
		var h = 650;
		bookContainer.style.marginTop = "40px";
	 }
	 
	 bookContainer.style.height = h+50+"px";
	
	//new Book
	var book = new Book(bookContainer, textContainer, text, {
		 height: h,
		 width: 520, 
		 marginX: 35,
		 marginY: 20})
		 
	//on resize
	window.addEventListener('resize',function(event) {
		if(event.target.innerHeight < 740) {
			h = event.target.innerHeight-50;
			book.setHeight(h);
			bookContainer.style.marginTop = "0px";
		} else {
			h = 650;
			book.setHeight(h);
			bookContainer.style.marginTop = "40px";
		}
		
		 bookContainer.style.height = h+50+"px";
		
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
		
	//toc		
	var toc = document.getElementById('toc');
	var tocContent = document.getElementById('toc').firstElementChild;
	tocContent.style.top="-1000px";
	bookContainer.querySelector('#showTable').addEventListener('click', function() {
		tocContent.style.top === "-1000px" ? tocContent.style.top = "0px" : tocContent.style.top = "-1000px";
		}, false);
	
	var tocLinks = toc.querySelectorAll('a');
	for(var i=0; i<tocLinks.length; i++) {
		tocLinks[i].addEventListener('click', function() {
			tocContent.style.top = "-1000px";
		}, false);
	}
	
	toc.querySelector("#close").addEventListener('click', function() {
		tocContent.style.top = "-1000px";
	}, false);
		
}, false);
	
