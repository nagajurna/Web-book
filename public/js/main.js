window.addEventListener('load', function() {
	
	//AJAX requests
	var ajax = function(options) {
		'use strict';
		let promise = new Promise( (resolve,reject) => {
			let method = options.method;
			let url = options.url;
			let data = options.data;
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = () => {
				if(xmlhttp.readyState===4) {
					if(xmlhttp.status===200) {
						resolve(xmlhttp.responseText);
					} else {
						reject(Error(xmlhttp.statusText));
					}
				}
			}
			
			xmlhttp.open(method,url,true);
			xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xmlhttp.setRequestHeader("Accept", "text/json, text/html");
						
			if(data) {
				xmlhttp.setRequestHeader("Content-type", "application/json");
				xmlhttp.send(data);
			} else {
				xmlhttp.send();
			}
		});
		
		return promise;
	}
	
	ajax({ method: 'GET', url: '/books/my_text.html' })
	.then( function(content) {
		init(content);
	})
	.catch(function(error) {
		console.log(error);
	});
	
	function init(content) {

		var bookContainer = document.querySelector('#bookContainer');
		
		//DIMENSIONS
		var h, w;
		
		//width (responsive)
		if(window.innerWidth >= 768) {
			h = window.innerHeight-88-60;//navBars height *2 (2*44) + textContainer top * 2 (2*30)
			w = 640;
		 } else {
			 h = window.innerHeight;
			 w = window.innerWidth;
		 }
		 
		 var text = content;
	
		//new Book
		var book = new WebBook(bookContainer, {
			 height: h,
			 maxWidth: w,
			 marginY: 45,
			 text: text });
		 
		book.init()
		.then (function(b) {
			console.log(b);
		});
		//Toc-large height
		document.querySelector("#toc-large-device div").style.maxHeight = h-30 + "px";
			 
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
			
			//set new dimensions
			book.setHeight(h);
			book.setMaxWidth(w);
			
			if(book.col===true) {
				book.init();
			}
			//Toc-large height
			document.querySelector("#toc-large-device div").style.maxHeight = h-30 + "px";
		
		}, false);
	
	
	
		//BUTTONS
		//small
		var forward = bookContainer.querySelector('#forward');
		var backward = bookContainer.querySelector('#backward');
		
		forward.addEventListener('click', function(event) {
			book.forward();
		}, false);

		backward.addEventListener('click', function(event) {
			book.backward();
		}, false);
	
		//large
		var forwardLarge = bookContainer.querySelector('#forward-large');
		var backwardLarge = bookContainer.querySelector('#backward-large');
		var first = bookContainer.querySelector('#first');
		var last = bookContainer.querySelector('#last');
		
		forwardLarge.addEventListener('click', function(event) {
			book.forward();
		}, false);

		backwardLarge.addEventListener('click', function(event) {
			book.backward();
		}, false);
		
		first.addEventListener('click', function(event) {
			book.toFirstPage();
		}, false);
		
		last.addEventListener('click', function(event) {
			book.toLastPage();
		}, false);
	
	
		//TOC		
		var toc = bookContainer.querySelector('#toc');
		
		bookContainer.querySelectorAll('.open-toc').forEach( val => {
				val.addEventListener('click', function() {
					toc.className = toc.className === "open" ? "" : "open";
				}, false);
		});
		
		toc.querySelector("#close-toc").addEventListener('click', function() {
			toc.className = "";
		}, false);
		
		//Close toc on click
		var tocLinks = toc.querySelectorAll('a');
		for(var i=0; i<tocLinks.length; i++) {
			tocLinks[i].addEventListener('click', function() {
				toc.className = "";
			}, false);
		}
	
	
		//TOC-LARGE-DEVICE
		var tocLarge = bookContainer.querySelector('#toc-large-device');
		var swingContainer = bookContainer.querySelector('#swing-container');
		var swingBar = bookContainer.querySelector('#swing-bar');
		//Toggle toc-large-device, swing-container, swing-bar
		bookContainer.querySelector('#toggle-toc-large-device').addEventListener('click', function(event) {
			if(!tocLarge.className.match(/open/)) {
				tocLarge.className += " open";
				swingContainer.className += " left";
				swingBar.className += " left";
			} else {
				tocLarge.className = tocLarge.className.replace(/ open/,'');
				swingContainer.className = swingContainer.className.replace(/ left/,'');
				swingBar.className = swingContainer.className.replace(/ left/,'');
			}
		}, false);
	
	
	}
		
}, false);

	
