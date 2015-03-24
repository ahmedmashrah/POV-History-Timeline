// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {

	// scroll to secrion when the a.page-scroll is clicked
	$(document).on('click', 'a.page-scroll', function(event) {
		//event.preventDefault();
		var page_index = $(this).data("index");
		var $anchor = $(this);
		if($('body.disabled-onepage-scroll').length!=0){
			 $('html, body').stop().animate({
			 	scrollTop: $($anchor.attr('href')).offset().top
			 }, 1500, 'easeInOutExpo', function(){
			 	window.location.hash = page_index;
			 });
		}else{
			event.preventDefault();
			window.location.hash = page_index;
			$(".sections").moveTo(page_index);
		}
	});
	buildTimeline();
	show_nav();
	setTimeout(function(){
		updateOncepagePagination();
		// page_scroll();
	}, 500);

	$(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(){show_nav();});


	// Highlight the nav as scrolling occurs
	$('body').scrollspy({target: '#main-navbar'});

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
			$('.navbar-toggle:visible').click();
	});
});