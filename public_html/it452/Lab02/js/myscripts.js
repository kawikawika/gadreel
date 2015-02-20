// the grid that holds all the items: javascript taken from http://tympanus.net/codrops/2014/03/21/google-grid-gallery/
//$('.morph-button').addClass('active open scroll');
cbp=new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
var n=0;
var xhrActive = false;

// for post feed
function loadItems() {
	if (xhrActive) {
		return false;   // ignore if busy already  
	}
	
	xhr = window.ActiveXObject 
		? new ActiveXObject("Microsoft.XMLHTTP")
		: new XMLHttpRequest();

	// Start getting data from server        
	xhr.open("GET", "testData.xml", true);
	xhr.onreadystatechange = handleResponse;
	xhr.send(null);  // GET, so no "data" part

	xhrActive = true;      
}

// Parse an XML response and use to insert new row into table
function handleResponse() {

	if (xhr.readyState != 4) {
		// not finished yet
		return;   
	}

	// Deal with results        
	if (xhr.status != 200) {
		alert("Error with results! Status code: "+xhr.status);        
	} else {        
		// Use DOM to get data from the XML response
		var root  = xhr.responseXML.documentElement;  // Returns DOM root element
		var items = root.childNodes;

		// remove lousy #text nodes
		for(var k=0; k<items.length-1; k++) {
			if(items[k].nodeType != 1) items[k].remove();	
		}

		// don't continue if all items are already posted
		if(n>=items.length) {
			console.log('done');
			xhrActive = false;      
		}

		// Get each child and add it to an array
		var j=0;
		for(var i=n; j<15 && i<items.length-1; i++) {
			var item=items[i];
			var title=item.getElementsByTagName("title")[0].innerHTML;
			var description=item.getElementsByTagName("description")[0].innerHTML;
			var img=item.getElementsByTagName("img")[0].innerHTML;

			appendItem(title, img, description);	
			j++; n=i;
		}          
		n++;
	}		
	xhrActive = false;      
}

function appendItem(title, img, description) {				
	var lig=document.createElement('li');
	// html for the grid
	lig.innerHTML=""+
	"<figure>"+
		'<img src="'+img+'" alt="'+title+'"/>'+
		'<figcaption>'+
			'<h3>'+title+'</h3>'+
			'<p>'+description+'</p>'+
		'</figcaption>'+
	'</figure>';

	// html for the slide
	var lis=document.createElement('li');
	lis.innerHTML=""+
	"<figure>"+
		'<figcaption>'+
			'<h3>'+title+'</h3>'+
			'<p>'+description+'</p>'+
		'</figcaption>'+
		'<img src="'+img+'" alt="'+title+'"/>'+
	'</figure>';

	/* all appending is done in CBPGridGallery because cbp
	 * handles all of the grid and slide show events and 
    * initialization
	*/
	cbp.append(lig, lis);
}

/******************* Infinite Scroll AJAX **********************/
window.onscroll = function(e) { 
	var threshold=window.getSize($('ul')[0]).height-window.innerHeight;
	if(window.pageYOffset>threshold) loadItems(); 
};

// for message feed
function loadMessages() {
	console.log('loadMessages');
	if (xhrActive) {
		return false;   // ignore if busy already  
	}
	
	xhr = window.ActiveXObject 
		? new ActiveXObject("Microsoft.XMLHTTP")
		: new XMLHttpRequest();

	// Start getting data from server        
	xhr.open("GET", "testMessages.xml", false);
	xhr.onreadystatechange = handleMessage;
	xhr.send(null);  // GET, so no "data" part

	xhrActive = true;      
}

// Parse an XML response and use to insert new row into table
var m=0;
function handleMessage() {

	if (xhr.readyState != 4) {
		// not finished yet
		return;   
	}

	console.log('handleMessage');
	// Deal with results        
	if (xhr.status != 200) {
		alert("Error with results! Status code: "+xhr.status);        
	} else {        
		// Use DOM to get data from the XML response
		var root  = xhr.responseXML.documentElement;  // Returns DOM root element
		var chats = root.childNodes;

		// remove lousy #text nodes
		for(var k=0; k<chats.length; k++) {
			console.log(k);
			if(chats[k].nodeType != 1) chats[k].remove();	
		}
		console.log(chats)

		// don't continue if all chats are already posted
		if(m>=chats.length) {
			console.log('done');
			xhrActive = false;      
			return;
		}
		console.log('should continue')

		// Get each child and add it to an array
		var j=0;
		for(var i=m; j<6 && i<chats.length-1; i++) {
			var chat=chats[i];
			console.log(chat)
			var person=chat.getElementsByTagName("to")[0].innerHTML;
			console.log(person)
			var img=chat.getElementsByTagName("senderPhoto")[0].innerHTML;
			var message=chat.getElementsByTagName("message")[0].getElementsByTagName("content")[0].innerHTML;
			console.log(message);

			appendMessage(person, img, message);	
			j++; m=i;
		}          
		m++;
	}		
	xhrActive = false;      
}

function appendMessage(person, img, message) {				
	console.log('here')
	var lig=document.createElement('li');
	// html for the grid
	lig.innerHTML=''+
	'<button type="button">'+
		'<img src="'+img+'" alt="'+person+'"/>'+
		'<div>'+
			'<h4>'+person+'</h4>'+
			'<p>'+message+'</p>'+
		'</div>'+
	'</button>';

	document.getElementById('messages').appendChild(lig);
}
/***************************************************************
* Everything beyond this point is code I get the 
* formatting of the page to work. The "javascript" for the 
* requirements of the lab is above this banner                
****************************************************************/
(function() {
	var docElem = window.document.documentElement, didScroll, scrollPosition,
		container = document.getElementById( 'container' );

	// trick to prevent scrolling when opening/closing button
	function noScrollFn() {
		window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
	}

	function noScroll() {
		window.removeEventListener( 'scroll', scrollHandler );
		window.addEventListener( 'scroll', noScrollFn );
	}

	function scrollFn() {
		window.addEventListener( 'scroll', scrollHandler );
	}

	function canScroll() {
		window.removeEventListener( 'scroll', noScrollFn );
		scrollFn();
	}

	function scrollHandler() {
		if( !didScroll ) {
			didScroll = true;
			setTimeout( function() { scrollPage(); }, 60 );
		}
	};

	function scrollPage() {
		scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
		didScroll = false;
	};

	scrollFn();
	
	var el = document.querySelector( '.morph-button-sidebar' );
	
	var test=new UIMorphingButton( el, {
		closeEl : '.morph-icon-close',
		onBeforeOpen : function() {
			// don't allow to scroll
			noScroll();
			// redistrubute the grid
			cbp._initMasonry();
			// push main container
			cbp.isContainerPushed=true;
			classie.addClass( container, 'pushed' );
		},
		onAfterOpen : function() {
			// can scroll again
			canScroll();
			// add scroll class to main el
			classie.addClass( el, 'scroll' );
		},
		onBeforeClose : function() {
			// remove scroll class from main el
			classie.removeClass( el, 'scroll' );
			// don't allow to scroll
			noScroll();
			if(cbp.isSlideshowVisible) cbp._closeSlideshow();
			// redistrubute the grid
			cbp._initMasonry();
			// push back main container
			classie.removeClass( container, 'pushed' );
			cbp.isContainerPushed=false;
		},
		onAfterClose : function() {
			// can scroll again
			canScroll();
		}
	} );


})();

// for changes in width
function checkForChanges() {
	var li = $( '.grid-wrap li' );

	if(document.querySelector('.container').offsetWidth<383) { 
		if(li.css("width")!=$('.container').css("width")) {
			li.css("width",""+document.querySelector('header').offsetWidth+"px");
			cbp._initMasonry();
		}
	}
	else if(document.querySelector('.container').offsetWidth>383) {
		if(li.css("width")!="25%") {
			li.css("width","25%");
			cbp._initMasonry();
		}
	}

	setTimeout(checkForChanges, 500);
}checkForChanges();	
