var Gallery = imageGallery();

imageSearch=null;
prev = -1;
google.load('search', '1');

function addPaginationLinks() {

	// To paginate search results, use the cursor function.
	var next = $('.es-nav-next');
	var prev = $('.es-nav-prev');
	var cursor = imageSearch.cursor;
	var curPage = cursor.currentPageIndex; // check what page the app is on

	next.click( function(e) {
		if(prev == curPage) return;
		curPage++;
		imageSearch.gotoPage(curPage);
	});	
}

var page=0;
function searchComplete() {
	// only load 8 pages of images
	if(page==8) return;
	// Check that we got results
	if (imageSearch.results && imageSearch.results.length > 0) {

		// Grab our content div, clear it.
		var contentDiv = $('.es-carousel ul');
		//contentDiv.html('');

		// Loop through our results, printing them to the page.
		var results = imageSearch.results;
		for (var i = 0; i < results.length; i++) {
			// For each result write it's title and image to the screen
			var result = results[i];

			// get empty <a> created by javascript and append img to it
			var img = $('.es-carousel li a:empty').first().append('<img/>').find('img');
		
			// give image results	
			img.attr('src', result.tbUrl);
			img.attr('data-large', result.url);
			img.attr('alt', result.titleNoFormatting);
			img.attr('data-description', result.contentNoFormatting);
		}
		// load all the next page of images
		imageSearch.gotoPage(page++);
	}
}

function OnLoad() {

	// Create an Image Search instance.
	imageSearch = new google.search.ImageSearch();

	// Set searchComplete as the callback function when a search is 
	// complete.  The imageSearch object will have results in it.
	imageSearch.setSearchCompleteCallback(this, searchComplete, null);

	// set the amount of results to be returned
	imageSearch.setResultSetSize(8);

	// imageSearch.execute();

	// Include the required Google branding
	google.search.Search.getBranding('rg-google-branding');
}

google.setOnLoadCallback(OnLoad);

function newQuery() {
	q = $('input[name="image-search"]').val();
	if(q.length > 0) {
		// reset the pages
		page=0;
	
		// reset the carousel
		$('.es-carousel li a').empty();
	
		// once the first image is loaded, start loading it to
		// large image holder
		setTimeout( function() {	
			Gallery.showImage($('.es-carousel li').first());
		}, 1000);
	
		// execute the new query
		imageSearch.execute(q);
		$('#rg-gallery').show();
	}
}


