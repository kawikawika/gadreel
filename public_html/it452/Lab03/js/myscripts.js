cbp=new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
var xhrActive = false;
lastItemId=null;

// Generic DB call used by all AJAX functions
function dbCall(file, data, response) {
	if (xhrActive) {
		return false;   // ignore if busy already  
	}
	
	xhr = window.ActiveXObject 
		? new ActiveXObject("Microsoft.XMLHTTP")
		: new XMLHttpRequest();

	// Start getting data from server        
	xhr.open("POST", file, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = response;
	xhr.send(data);  // POST data to PHP
}

function dbCall_async(file, data, response) {
	if (xhrActive) {
		return false;   // ignore if busy already  
	}
	
	xhr = window.ActiveXObject 
		? new ActiveXObject("Microsoft.XMLHTTP")
		: new XMLHttpRequest();

	// Start getting data from server        
	xhr.open("POST", file, false);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = response;
	xhr.send(data);  // POST data to PHP
}

// Loads the posts
function loadItems() {
	var file = "php/itemFeed.php";
	var data = "lastItemId="+lastItemId;
	var response = handleResponse_itemFeed;

	// check dbCall for more information
	dbCall(file, data, response);
}

/*******
function for loading items for the "slideshow" are in cbpGridGallery.js
CBPGridGallery.prototype._initGridEventListener = function() {
		var self = this;

		var file = "php/item.php";
		var response = handleResponse_itemSlide;
		this.gridItems.forEach( function( item, idx ) {
			item.addEventListener( 'click', function() {
				var data = "itemId="+item.querySelector('.itemId').innerHTML;

				dbCall_async(file, data, response);

				self._openSlideshow( );
			} );
		} );	
	}	
*******/
// handles the main post feed. Returns an array of li elements
function handleResponse_feed() {

	if (xhr.readyState != 4) {
		// not finished yet
		return null;   
	}

	// Deal with results        
	if (xhr.status != 200) {
		alert("Error with results! Status code: "+xhr.status);        
	} else {        
		if(xhr.responseXML==null) {
			//console.log('done');
			return null;
		}
		var root  = xhr.responseXML.documentElement;  // Returns DOM root element
		items = stripResponse(root);

		// last item was loaded
		if(items.length==0) {
			//console.log('done');
			return null;
		}

		var lig=[];
		// Get each child and add it to an array
		for(var i=0; i<items.length-1; i++) {

			//get data from xml file
			var item=parseItem(items[i]);			
		
			// TODO: change this function to account for everything else
			if(item.lookingFor=='1') {
				item.lookingFor='<span class="flaticon-compass53"></span>';
			} else {
				item.lookingFor='';
			}

			// get the time difference
			var diff=new Date().getTime()-new Date(item.timestamp);
			var dd = Math.floor(diff/ 1000/ 60/ 60/ 24);
			var hh = Math.floor(diff/ 1000/ 60/ 60);
			var mm = Math.floor(diff/ 1000/ 60);
			var ss = Math.floor(diff/ 1000/ 60);
			if(dd>0) item.timestamp=""+dd+"d";
			else if(hh>0) item.timestamp=""+hh+"h";
			else if(mm>0) item.timestamp=""+mm+"m";
			else item.timestamp=""+ss+"s";

			var li=document.createElement('li');

			// html for the grid
			item.img=item.img[0];
			li.innerHTML=""+
			"<figure>"+
				'<span class="itemId hidden">'+item.id+'</span>'+
				'<img src="'+item.img+'" alt="'+item.name+'"/>'+
				'<figcaption>'+item.lookingFor+
					'<h3>'+item.name+'</h3>'+
					'<p class="price">$'+item.price+'</p>'+
					'<p>'+item.description+'</p>'+
					'<span class="time right">Posted '+item.timestamp+' ago</span>'+
				'</figcaption>'+
			'</figure>';

			lig[lig.length]=li;
		}
		xhrActive = false;      
		return lig;
	}
}


// Parse an XML response and use to insert new row into table
function handleResponse_itemFeed() {

	var lig=handleResponse_feed();
	if(lig==null) return;
	
	lastItemId=lig[lig.length-1].querySelector('.itemId').innerHTML;
	/* all appending is done in CBPGridGallery because cbp
	 * handles all of the grid and slide show events and 
	 * initialization
	*/
	cbp.appendGrid(lig);
}

// gets more information when you click on an item
function handleResponse_itemSlide() {

	if (xhr.readyState != 4) {
		// not finished yet
		return;   
	}

	// Deal with results        
	if (xhr.status != 200) {
		alert("Error with results! Status code: "+xhr.status);        
	} else {        
		var root  = xhr.responseXML.documentElement;  // Returns DOM root element
		var items = stripResponse(root);

		if (items.length>1) return;

		//get data from xml file
		
		items=items[0];	
		var item=parseItem(items);			
		item.userId=items.getElementsByTagName("userId")[0].innerHTML;
		item.fname=items.getElementsByTagName("fname")[0].innerHTML;
		item.userPhoto=items.getElementsByTagName("userPhoto")[0].innerHTML;
		item.quantity=items.getElementsByTagName("quantity")[0].innerHTML;
		// TODO: location and review for the user
		
		// if any part is empty, just put none in it's place
		for(var i in item) {
			if(item[i]=='') item[i]='None';
		}
	
		// TODO: change this function to account for everything else
		if(item.lookingFor=='1') {
			item.lookingFor='<span class="flaticon-compass53"><span class="small-text">This owner is looking for:</span> </span>';
		} else {
			item.lookingFor='';
		}

		// get the time difference
		var diff=new Date().getTime()-new Date(item.timestamp);
		var dd = Math.floor(diff/ 1000/ 60/ 60/ 24);
		var hh = Math.floor(diff/ 1000/ 60/ 60);
		var mm = Math.floor(diff/ 1000/ 60);
		var ss = Math.floor(diff/ 1000/ 60);
		if(dd>0) item.timestamp=""+dd+"d";
		else if(hh>0) item.timestamp=""+hh+"h";
		else if(mm>0) item.timestamp=""+mm+"m";
		else item.timestamp=""+ss+"s";

		var li=document.createElement('li');

		// html for the grid
		item.img=item.img[0]; //TODO: for multiple pictures
		li.className="show current";
		li.innerHTML=""+
		"<figure>"+
			'<figcaption>'+
				'<h3>'+item.lookingFor+item.name+'</h3>'+
				'<div class="slide-content">'+
					'<div class="owner">'+
						'<img src="'+item.userPhoto+'"alt="'+item.userId+'"/>'+
						'<span>'+item.fname+'</span>'+
					'</div>'+
					'<button class="slide-content-message slide-content-hidden">Message Owner</button>'+
					'<div class="slide-content-hidden">'+ // this is hidden for media.
						'<img src="'+item.img+'" alt="'+item.name+'"/>'+
					'</div>'+
					'<div>'+
						'<span class="slide-content-price">$'+item.price+'</span>'+
						'<span class="slide-content-time">Posted '+item.timestamp+' ago</span>'+
						'<span class="slide-content-qty">Qty: '+item.quantity+'</span>'+
					'</div>'+
					'<div>'+
						'<h4>Description:</h4>'+
						'<div>'+item.description+'</div>'+
					'</div>'+
					'<button class="slide-content-message slide-content-display">Message Owner</button>'+
				'</div>'+
				'<div class="slide-img slide-content-display">'+
					'<img src="'+item.img+'" alt="'+item.name+'"/>'+
				'</div>'+
			'</figcaption>'+
		'</figure>';

		/* all appending is done in CBPGridGallery because cbp
		 * handles all of the grid and slide show events and 
		 * initialization
		*/
		cbp.appendSlideshow(li);
	}		
	xhrActive = false;      
}

// generic function for removing all the extra text nodes
function stripResponse(root) {
	// Use DOM to get data from the XML response
	var children = root.childNodes;

	// remove lousy #text nodes
	for(var k=0; k<children.length-1; k++) {
		if(children[k].nodeType != 1) children[k].remove();	
	}

	return children;
}

// generic parsing item function
function parseItem(items) {
	var item = {};

	item.id=items.getElementsByTagName("id")[0].innerHTML;
	item.name=items.getElementsByTagName("name")[0].innerHTML;
	item.price=items.getElementsByTagName("price")[0].innerHTML;
	item.description=items.getElementsByTagName("description")[0].innerHTML;
	item.timestamp=items.getElementsByTagName("timestamp")[0].innerHTML;
	item.lookingFor=items.getElementsByTagName("lookingFor")[0].innerHTML;

	// has multiple pictures
	item.img=[];
	Array.prototype.slice.call(items.getElementsByTagName("picture")).forEach(
		function (element, index, array) {
			item.img[item.img.length]=(element.innerHTML);
		}
	);

	return item;
}

/******************* Infinite Scroll AJAX **********************/
var getNextItems=loadItems;
window.onscroll = function(e) { 
	var threshold=window.getSize($('ul')[0]).height-window.innerHeight;
	if(window.pageYOffset>threshold) getNextItems(); 
};


/******************* SEARCH BAR **********************/
/* search bar from http://thecodeblock.com/expanding-search-bar-with-jquery-tutroial 
 * converted to pure javascript and also added more features. Basically used the 
 * tutorial for a basis and added onto it
*/
var results_holder=document.querySelector('.searchbox-results');
var submitIcon = document.querySelector('.searchbox-icon');
var inputBox = document.querySelector('.searchbox-input');
var searchBox = document.querySelector('.searchbox');
var isOpen = false;
var last=0;

// opens or closes the search bar
submitIcon.onclick = function(){
	if(isOpen == false){
		inputBox.placeholder="Search, Filter, or Sort Posts";
		results_holder.innerHTML=''+
				'<li>Filter: "Looking For"</li>'+
				'<li>Filter: "Post"</li>'+
				'<li>Sort: "Price"</li>'+
				'<li>Sort: Distance</li>';
		results_holder.style.display='block';

		searchBox.className = 'searchbox searchbox-open';
		inputBox.focus();
		isOpen = true;
	} else {
		results_holder.style.display='none';
		searchBox.className = 'searchbox';
		inputBox.blur();
		searchBox.reset();
		isOpen = false;

		// when the user closes the search button
		if(getNextItems!=loadItems) {
			document.body.scrollTop=0;
			cbp.resetGrid();	
			lastItemId=null;
			getNextItems=loadItems
			getNextItems();
		}
	}
};  

// when user clicks anywhere
document.onmouseup=function(e) {
	elem=e.toElement;
	// if not on searchbox then retrack
	if(isOpen == true){
		if (elem.parentNode==results_holder) {
			inputBox.value=elem.innerHTML;
			results_holder.style.display='none';
			last=0;

			var file='php/search.php';
			var data='search='+inputBox.value+'&last='+last;
			var response=handleResponse_searchFeed;

			dbCall(file, data, response);
			getNextItems=getSearch;
		}
		else if(elem != inputBox && elem != submitIcon)
			submitIcon.click();
	}
}

// for multiple searches that end up in the main post feed
function getSearch(){
	if(inputBox.value.length > 0) {
		// Send result to server
		var file='php/search.php';
		var data='search='+inputBox.value+'&last='+last;
		var response=handleResponse_searchFeed;
	
		dbCall(file, data, response);
	}
}

function handleResponse_searchFeed() {
	setTimeout(cbp.resetGrid(), 10000);
	document.body.scrollTop=0;

	var lig=handleResponse_feed();
	if(lig==null) return;

	last=last+lig.length-1;
	cbp.appendGrid(lig);
}

// for the search drop down, probably should name these better
function submitSearch(){
	if(inputBox.value.length > 0) {
		// Send result to server
		var file='php/search.php';
		var data='search='+inputBox.value+'&last='+last;
		var response=handleResponse_searchResult;
	
		dbCall(file, data, response);
	}
}

function handleResponse_searchResult() {
	
	if (xhr.readyState != 4) {
		// not finished yet
		return null;   
	}

	// Deal with results        
	if (xhr.status != 200) {
		alert("Error with results! Status code: "+xhr.status);        
	} else {        
		if(xhr.responseXML==null) {
			//console.log('done');
			return null;
		}
		var root  = xhr.responseXML.documentElement;  // Returns DOM root element
		results = stripResponse(root);

		// last item was loaded
		if(results.length==0) {
			//console.log('done');
			return null;
		} else {
			results_holder.innerHTML='';
		}

		// Get each child and add it to an array
		var titles=[]; // for no repeats
		for(var i=0; i<results.length-1 && results_holder.childNodes.length<5; i++) {
			// check for repeats, if not continue
			var title=results[i].getElementsByTagName('name')[0].innerHTML;
			if(titles.indexOf(title) != -1) break;  
			else titles.push(title);	

			var newli=document.createElement('li');
			newli.innerHTML=results[i].getElementsByTagName('name')[0].innerHTML;
			results_holder.appendChild(newli);
		}
		xhrActive = false;      
	}
}

// open post; quick and dirty function
function openPost() {
	document.querySelector('.post-show').className='post-show post-show-open';
}

// close post
function closePost() {
	document.querySelector('.post-show').className='post-show';
}

// send the post to the db. no checks. TODO: add checks, make nicer
function submitPost() {
	var item_name=document.querySelector('.post-show-content input[name="item_name"]').value;
	var price=document.querySelector('.post-show-content input[name="price"]').value;
	var description=document.querySelector('.post-show-content textarea').value;

	var file='php/postItem.php';
	var data='item_name='+item_name+'&price='+price+'&description='+description;
	var response=handleResponse_submitPost;
	
	dbCall(file, data, response);
	return false;
}

function handleResponse_submitPost() {
	if (xhr.readyState != 4) {
		// not finished yet
		return null;   
	}

	// Deal with results        
	if (xhr.status != 200) {
		alert("Error with results! Status code: "+xhr.status);        
	} else {        
		var response  = xhr.responseText;  // Returns DOM root element
		closePost();
		document.body.scrollTop=0;
		cbp.resetGrid();	
		lastItemId=null;
		getNextItems=loadItems
		getNextItems();
	}
}
