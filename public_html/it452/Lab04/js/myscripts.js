cbp=new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
var xhrActive = false;
lastItemId=null;

// Generic DB call used by all AJAX functions
function dbCall(file, data, response) {
	$.ajax({
		type: "POST",
		url: file,
		data: data,
		success: response,
		error: function(request, status, error) {
			alert('Could not connect to the server, please try again later:\n('+status+'): '+error );
		}
	});
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
function handleResponse_feed(response) {
	var root = response.documentElement;  // Returns DOM root element
	if(root==null) {
		//console.log('done');
		return null;
	}

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
		var item=parseItem(items.eq(i));			
	
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

		var li=$('<li></li>');
		// html for the grid
		item.img=item.img[0];
		li.append(""+
		"<figure>"+
			'<span class="itemId hidden">'+item.id+'</span>'+
			'<img src="'+item.img+'" alt="'+item.name+'"/>'+
			'<figcaption>'+item.lookingFor+
				'<h3>'+item.name+'</h3>'+
				'<p class="price">$'+item.price+'</p>'+
				'<p>'+item.description+'</p>'+
				'<span class="time right">Posted '+item.timestamp+' ago</span>'+
			'</figcaption>'+
		'</figure>');

		lig[lig.length]=li;
	}
	return lig;
}

// Parse an XML response and use to insert new row into table
function handleResponse_itemFeed(response) {

	var lig=handleResponse_feed(response);
	if(lig==null) return;
	
	lastItemId=lig[lig.length-1].find('.itemId').html();
	/* all appending is done in CBPGridGallery because cbp
	 * handles all of the grid and slide show events and 
	 * initialization
	*/
	cbp.appendGrid(lig);
}

// gets more information when you click on an item
function handleResponse_itemSlide(response) {
	var root = response.documentElement;  // Returns DOM root element
	if(root==null) {
		//console.log('done');
		return null;
	}
	
	items = stripResponse(root);
	
	if (items.length>1) return;

	//get data from xml file
	
	var item=parseItem(items);			
	item.userId=items.find("userId").html();
	item.fname=items.find("fname").html();
	item.userPhoto=items.find("userPhoto").html();
	item.quantity=items.find("quantity").html();
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

	/*
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
	
	var li=$('<li></li>');
	// html for the grid
	item.img=item.img[0];
	li.addClass("show current");
	li.append(""+
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
	'</figure>');

	cbp.appendSlideshow(li);		
  
}

// generic function for removing all the extra text nodes
function stripResponse(root) {
	// Use DOM to get data from the XML response
	var children = $(root).children("item");
	return children;
}

// generic parsing item function
function parseItem(items) {
	var item = {};

	item.id=items.find("id").html();
	item.name=items.find("name").html();
	item.price=items.find("price").html();
	item.description=items.find("description").html();
	item.timestamp=items.find("timestamp").html();
	item.lookingFor=items.find("lookingFor").html();

	// has multiple pictures
	item.img=[];
	items.find("picture").each(
		function (index, element) {
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
var results_holder=$('.searchbox-results');
var submitIcon = $('.searchbox-icon');
var inputBox = $('.searchbox-input');
var searchBox = $('.searchbox');
var isOpen = false;
var last=0;

// opens or closes the search bar
submitIcon.click( function(){
	if(isOpen == false){
		inputBox.attr('placeholder','Search, Filter, or Sort Posts');
		searchBox.addClass('searchbox-open');
		inputBox.focus();
		isOpen = true;
	} else {
		results_holder.hide();
		searchBox.removeClass('searchbox-open');
		inputBox.blur();
		searchBox[0].reset();
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
});  

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
		/*
		else if(elem != inputBox && elem != submitIcon)
			submitIcon.click();
		*/
	}
}

function getSearch(){
	if(inputBox.val().length > 0) {
		// Send result to server
		var file='php/search.php';
		var data='search='+inputBox.val()+'&last='+last;
		var response=handleResponse_searchFeed;
	
		dbCall(file, data, response);
	}
}

function submitSearch() {
	setTimeout(cbp.resetGrid(), 10000);
	document.body.scrollTop=0;
	last=0;

	getSearch();
	getNextItems=getSearch;
}

function handleResponse_searchFeed(response) {

	var lig=handleResponse_feed(response);
	if(lig.length-1==0) return;

	last=last+lig.length-1;
	cbp.appendGrid(lig);
}

// for multiple searches that end up in the main post feed
$('#query').autocomplete({
	url: 'php/autocomplete.php',
	useCache: false,
	filterResults: false,
	maxCacheLength: 5,
	minChars: 1,
	mustMatch: 1
});

// open post; quick and dirty function
function openPost() {
	$('.post-show').addClass('post-show-open');
	$('#iframe-post').attr('src', 'post/index.html');
}

// close post
function closePost() {
	$('.post-show').removeClass('post-show-open');
	$('#iframe-post').attr('src', '');
}

// send the post to the db. no checks. TODO: add checks, make nicer
function submitPost() {
	var item_name=$('.post-show-content input[name="item_name"]').val();
	var price=$('.post-show-content input[name="price"]').val();
	var description=$('.post-show-content textarea').val();

	var file='php/postItem.php';
	var data='item_name='+item_name+'&price='+price+'&description='+description;
	var response=handleResponse_submitPost;
	
	dbCall(file, data, response);
	return false;
}

// TODO:: finish here;
function handleResponse_submitPost(response) {
	var root = response.documentElement;  // Returns DOM root element
	results = $(root);
	console.log(results.html());
	if( results.html()!='' ) {
		alert("Error: "+results.html());
	} else { 
		closePost();
		$('.post-show-content')[0].reset();	

		// reload items and show user
		document.body.scrollTop=0;
		cbp.resetGrid();	
		lastItemId=null;
		getNextItems=loadItems
		getNextItems();
	}
	
}
