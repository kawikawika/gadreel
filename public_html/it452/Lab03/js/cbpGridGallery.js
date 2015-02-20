/**
 * cbpGridGallery.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
/* PORTIONS OF THIS CODE WAS RETRIEVED FROM  http://tympanus.net/codrops/2014/03/21/google-grid-gallery */
;( function( window ) {
	
	'use strict';

	var docElem = window.document.documentElement,
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = {
			transitions : Modernizr.csstransitions,
			support3d : Modernizr.csstransforms3d
		};

	function setTransform( el, transformStr ) {
		el.style.WebkitTransform = transformStr;
		el.style.msTransform = transformStr;
		el.style.transform = transformStr;
	}

	// from http://responsejs.com/labs/dimensions/
	function getViewportW() {
		var client = docElem['clientWidth'],
			inner = window['innerWidth'];
		
		if( client < inner )
			return inner;
		else
			return client;
	}

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function CBPGridGallery( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	CBPGridGallery.prototype.options = {
	};

	CBPGridGallery.prototype._init = function() {
		// main grid
		this.grid = this.el.querySelector( 'section.grid-wrap > ul.grid' );
		// main grid items
		this.gridItems = [].slice.call( this.grid.querySelectorAll( 'li:not(.grid-sizer)' ) );
		// items total
		this.itemsCount = this.gridItems.length;

		// slideshow control buttons
		this.ctrlClose = this.el.querySelector( 'section.slideshow > nav > span.nav-close' );

		this.slideshow = this.el.querySelector( 'section.slideshow > ul' );

		// init container push //****** might not work for other browsers?
		this.isContainerPushed=document.querySelector('.container').classList.contains('pushed');
		// init masonry grid
		this._initMasonry();
		// init events
		this._initEvents();
	};

	CBPGridGallery.prototype._initMasonry = function() {
		var grid=this.grid;

		this.il=imagesLoaded( grid, function() {
			new Masonry( grid, {
				itemSelector: 'li',
				columnWidth: grid.querySelector( '.grid-sizer' )
			});
		});
	};

	CBPGridGallery.prototype._initEvents = function() {
		var self = this;

		this._initGridEventListener();

		// slideshow controls
		this.ctrlClose.addEventListener( 'click', function() { self._closeSlideshow(); } );

		// window resize
		window.addEventListener( 'resize', function() { self._resizeHandler(); } );

		// keyboard navigation events
		document.addEventListener( 'keydown', function( ev ) {
			if ( self.isSlideshowVisible ) {
				var keyCode = ev.keyCode || ev.which;

				switch (keyCode) {
					case 27:
						self._closeSlideshow();
						break;
				}
			}
		} );

		// trick to prevent scrolling when slideshow is visible
		var previousScrollTop=0;
		window.addEventListener( 'scroll', function(e) {
			if ( self.isSlideshowVisible ) {
				$(window).scrollTop(previousScrollTop); 
			}

			previousScrollTop = $(window).scrollTop();
		});
	};

	CBPGridGallery.prototype._openSlideshow = function() {
		this.isSlideshowVisible = true;

		if(this.isContainerPushed) {
			$('.slideshow').css('top', window.pageYOffset);
			$('.slideshow').css('height', '100vh');
			$('.slideshow').css('background', 'rgba(0,0,0,0.6)');
			$('.slideshow nav span.nav-close').css('position', 'absolute');
		}

		classie.addClass( this.el, 'slideshow-open' );
	};

	CBPGridGallery.prototype._navigate = function( dir ) {
		if( this.isAnimating ) return;

		// reset viewport items
		this._setViewportItems();

		// remove class animatable from the slideshow grid (if it has already)
		classie.removeClass( self.slideshow, 'animatable' );
	}

	CBPGridGallery.prototype._closeSlideshow = function( pos ) {
		// reset any changes done by pushed
		$('.slideshow').css('top',0);
		$('.slideshow').css('height', '100%');
		$('.slideshow nav span.nav-close').css('position', 'fixed');
		// remove class slideshow-open from the grid gallery elem
		classie.removeClass( this.el, 'slideshow-open' );
		// remove class animatable from the slideshow grid
		classie.removeClass( this.slideshow, 'animatable' );

		$('.slideshow ul').html("");

		var self = this,
			onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target.tagName.toLowerCase() !== 'ul' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				
				self.isSlideshowVisible = false;
			};

		if( support.transitions ) {
			this.el.addEventListener( transEndEventName, onEndTransitionFn );
		}
		else {
			onEndTransitionFn();
		}

	};

	// taken from https://github.com/desandro/vanilla-masonry/blob/master/masonry.js by David DeSandro
	// original debounce by John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	CBPGridGallery.prototype._resizeHandler = function() {
		var self = this;
		function delayed() {
			self._resize();
			self._resizeTimeout = null;
		}
		if ( this._resizeTimeout ) {
			clearTimeout( this._resizeTimeout );
		}
		this._resizeTimeout = setTimeout( delayed, 50 );
	}

	CBPGridGallery.prototype._resize = function() {
		if ( this.isSlideshowVisible ) {
			// update width value
			if( this.prevItem ) {
				var translateVal = Number( -1 * ( getViewportW() / 2 + this.prevItem.offsetWidth / 2 ) );
				setTransform( this.prevItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
			}
			if( this.nextItem ) {
				var translateVal = Number( getViewportW() / 2 + this.nextItem.offsetWidth / 2 );
				setTransform( this.nextItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
			}
		}
	}

	/*************************************************************
									UPDATED
	*************************************************************/
	// creates the grid event listener to allow slideshow to be opened
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
	CBPGridGallery.prototype.resetGrid = function(li) {
		this.grid.innerHTML='<li class="grid-sizer"></li>';
		this.gridItems=[];	
	}

	CBPGridGallery.prototype.appendGrid = function(li) {
		var self=this;

		li.forEach(function(e,i,a) {
			self.grid.appendChild(e);
		});

		$(li).hide().fadeIn(1000);
		this.gridItems=this.gridItems.concat(li);
		this.itemsCount = this.gridItems.length;

		this._initMasonry();
		this._initGridEventListener();
	}

	CBPGridGallery.prototype.appendSlideshow = function(li) {
		this.slideshow.appendChild(li);
	}

	// add to global namespace
	window.CBPGridGallery = CBPGridGallery;

})( window );
