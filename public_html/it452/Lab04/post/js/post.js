function submitPost() {
	var description = $('textarea[name="description"]').val();
	var item_name   = $('input[name="item_name"]').val();
	var price		 = $('input[name="price"]').val();
	var files       = $('input[name="pictures"]').get();

	fd = new FormData();
	fd.append('description', description);
	fd.append('item_name', item_name);
	fd.append('price', price);
	fd.append('files', files);

	$.ajax({
		type: 'POST',
		url: '../php/postItem.php',
		datatype: 'script',
		cache: false,
		contentType: false,
		processData: false,
		data: fd, 
		success: function(response) {
			var error = $(response).html();
			
			// success
			if( error == "" ) {
				alert('success!');
			} else {
				alert(error);
			}
		}
	});
	
}

function makeFileList() {
	// get files from inputs
	var input = $('input[name="pictures"]').prop('files');
	
	// get container for results
	var container = $('#picture-results');

	// clear the container if prompt
	$('.upload-placeholder').hide();

	// upload-file will hold all the file names
	if( !container.find('.upload-file').length ) {
		container.append('<span class="upload-file"></span>');
	} else {
		container.find('.upload-file').empty();
	}

	// add file names into the container
	$.map(input, function(v) { 
		container.find('.upload-file').append(''+
			'<span class="picture-list" onclick="removeFromList_file(this)">'+
			v.name+
			'</span>'
		); 
	});

}

function saveURL() {
	// if there is nothing in the input
	if( $('input[name="image-url"]').val().length == 0 ) {
		return;
	}

	// create url
	var input = '<span class="picture-list" '+
					'onclick="removeFromList(this)">'+
					$('input[name="image-url"]').val()+
					'</span>';

	// get container
	var container = $('#picture-results');

	// remove container prompt
	$('.upload-placeholder').hide();

	// create container for urls
	if( !container.find('.upload-url').length ) {
		container.append('<span class="upload-url"></span>');
	} 	

	// make sure the user doesn't upload the same url twice
	if( $('.upload-url').html().indexOf(input) == -1 ) {	
		$('.upload-url').append(input); 
		$('input[name="image-url"]').val('');
	}

}

function savePhoto() {
	// create url
	var input = '<span class="picture-list" '+
					'onclick="removeFromList(this)">'+
					$('.rg-image img').prop('currentSrc')+
					'</span>';

	// get container
	var container = $('#picture-results');

	// remove container prompt
	$('.upload-placeholder').hide();

	// create container for urls
	if( !container.find('.upload-url').length ) {
		container.append('<span class="upload-url"></span>');
	} 	

	// make sure the user doesn't upload the same url twice
	if( $('.upload-url').html().indexOf(input) == -1 ) {	
		$('.upload-url').append(input); 
	}

}

function removeFromList_file(e) {
	alert('Inorder to remove a file you loaded, you have to use the "Choose Files" button');		
}

function removeFromList(e) {
	//remove the element
	e.remove();
	if( $('.upload-file, upload-url').text()=='' ) {
		$('.upload-placeholder').show();
	}
}

