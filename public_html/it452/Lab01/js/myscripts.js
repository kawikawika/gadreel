var currentAction=null;
var tempNode="";

function doupdate(curNode) {
	var grid=document.getElementsByClassName("grid")[0];
	if(currentAction=="copy") {
		//copy the clicked on node
		var copyNode=curNode.cloneNode(true);
		grid.insertBefore(copyNode, curNode);
	}
	else if(currentAction=="rearrange") {
		// in order to rearrange, user has to click what needs to move
		// and then where it needs to be placed.
		currentAction="rearrange2"; 
		tempNode=curNode;
	}
	else if(currentAction=="rearrange2") {
		grid.insertBefore(tempNode, curNode);	
		$('.active').toggleClass('active'); //turn off rearrange
		currentAction=null;
	}
	else if(currentAction=="hide") {
		grid.removeChild(curNode);
	}
	else if(currentAction=="switchColor") {
		// find the fig caption to change it's background color
		for(var i=0; i<curNode.childNodes.length; i++) {
			if(curNode.childNodes[i].tagName=="FIGURE") {
				var fig=curNode.childNodes[i];
				for(var i=0; i<fig.childNodes.length; i++) {
					if(fig.childNodes[i].tagName=="FIGCAPTION") {
						var figcap=fig.childNodes[i];
						figcap.style.background="#f2d5e5";
						break;
					}
				}
				break;
			}	
		}
	}
	else return; // if null, then return

	// make the grid cascade
	updateGrid(grid);	
}

// uses the masonry plugin to rearrange the grid.
function updateGrid(grid) {
	imagesLoaded( grid, function() {
		new Masonry( grid, {
			itemSelector: 'li',
			columnWidth: grid.querySelector( '.grid-sizer' ) 
		});
	});
}

// Show which button is active
function toggleClass(button) {
	$('.active').toggleClass('active');
	$(button).toggleClass('active');
}

//using selection sort to sort by title
function selectionSort() {
	var grid=document.getElementsByClassName("grid")[0];
	var i, j, tmp;

	children=grid.childNodes;
	for( i=0; i<children.length-1; i++) {
		if(children[i].nodeType!=1 || children[i].className=="grid-sizer") continue;
		tmp=i;
		for( j=i+1; j<children.length; j++) {
			if(children[j].nodeType!=1 || children[i].className=="grid-sizer") continue;
			var childj=children[j].getElementsByTagName('h3')[0].textContent;
			var childtmp=children[tmp].getElementsByTagName('h3')[0].textContent;
			if(childj<childtmp) tmp=j;
		}
		if(tmp!=i) {
			var i2, tmp2;
	
			//swap
			i2=children[i].cloneNode(true);
			tmp2=children[tmp].cloneNode(true);

			grid.insertBefore(i2, children[tmp]);	
			grid.removeChild(children[tmp+1]); //tmp+1 because you added a new element before it

			grid.insertBefore(tmp2, children[i]);
			grid.removeChild(children[i+1]);

			updateGrid(grid);
		}

	}
}
