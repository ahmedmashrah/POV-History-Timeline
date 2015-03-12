
// check if the pbs header is loaded. and move the pov nav base on scroll
function checkNavHeight(scroll){
	scroll = (scroll!=undefined) ? scroll : $(window).scrollTop();
	var pov_nav_move = -55;
	var height = $('#page-nav').offset().top;
	if(scroll>height){
		pov_nav_move = (height+Math.abs(pov_nav_move)>scroll) ? pov_nav_move+1 : 0;
	}else{
	}
	return pov_nav_move;
}

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {

	// scroll to secrion when the a.page-scroll is clicked
	$(document).on('click', 'a.page-scroll', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo', function(){
			//$('')
		});
		event.preventDefault();
	});

	function stickyNav(){
		var scroll = $(this).scrollTop();
		$('#main-navbar').css({"margin-top": checkNavHeight()+"px"});
	}
	// call stickyNav when document is loaded
	stickyNav();

	// when user is scrolling do some work
	$(window).on('scroll', function(){
		stickyNav();
	});

	// Highlight the top nav as scrolling occurs
	$('body').scrollspy({target: '#main-navbar'});

	setTimeout(function(){
		if($('.pbs-cleanslate').length>0){
			$('nav.navbar').css({'margin-top':checkNavHeight()+'px'});
		}
	}, 1000);

	// Fire the colorbox plugin
	$(".ajax").colorbox();
	$(".youtube").colorbox({opacity: 0.75, iframe:true, innerWidth:"64%", innerHeight:"64%"});
	$(".vimeo").colorbox({opacity: 0.75, iframe:true, innerWidth:500, innerHeight:409});
	$(".iframe").colorbox({opacity: 0.75, iframe:true, width:"80%", height:"80%"});

});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
		$('.navbar-toggle:visible').click();
});



/* Ripple effect */
(function (window, $) {
  $(function() {
    $('.ripple').on('click', function (event) {
      event.preventDefault();
      
      var 
      	$div = $('<div/>'),
        btnOffset = $(this).offset(),
    		xPos = event.pageX - btnOffset.left,
    		yPos = event.pageY - btnOffset.top
    	;
      
      $div.addClass('ripple-effect');
      var $ripple = $(".ripple-effect");
      
      $ripple.css("height", $(this).height());
      $ripple.css("width", $(this).height());
      $div
        .css({
          top: yPos - ($ripple.height()/2),
          left: xPos - ($ripple.width()/2),
          background: $(this).data("ripple-color")
        }) 
        .appendTo($(this));

      window.setTimeout(function(){
        $div.remove();
      }, 1000);
    });
  });
})(window, jQuery);