function checkNavHeight(scroll) {
    scroll = void 0 != scroll ? scroll : $(window).scrollTop();
    var pov_nav_move = -55, height = $("#page-nav").offset().top;
    return scroll > height && (pov_nav_move = height + Math.abs(pov_nav_move) > scroll ? pov_nav_move + 1 : 0), 
    pov_nav_move;
}

$(function() {
    function stickyNav() {
        $(this).scrollTop();
        $("#main-navbar").css({
            "margin-top": checkNavHeight() + "px"
        });
    }
    $(document).on("click", "a.page-scroll", function(event) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: $($anchor.attr("href")).offset().top
        }, 1500, "easeInOutExpo", function() {}), event.preventDefault();
    }), stickyNav(), $(window).on("scroll", function() {
        stickyNav();
    }), $("body").scrollspy({
        target: "#main-navbar"
    }), setTimeout(function() {
        $(".pbs-cleanslate").length > 0 && $("nav.navbar").css({
            "margin-top": checkNavHeight() + "px"
        });
    }, 1e3), $(".ajax").colorbox(), $(".youtube").colorbox({
        opacity: .75,
        iframe: !0,
        innerWidth: "64%",
        innerHeight: "64%"
    }), $(".vimeo").colorbox({
        opacity: .75,
        iframe: !0,
        innerWidth: 500,
        innerHeight: 409
    }), $(".iframe").colorbox({
        opacity: .75,
        iframe: !0,
        width: "80%",
        height: "80%"
    });
}), $(".navbar-collapse ul li a").click(function() {
    $(".navbar-toggle:visible").click();
}), function(window, $) {
    $(function() {
        $(".ripple").on("click", function(event) {
            event.preventDefault();
            var $div = $("<div/>"), btnOffset = $(this).offset(), xPos = event.pageX - btnOffset.left, yPos = event.pageY - btnOffset.top;
            $div.addClass("ripple-effect");
            var $ripple = $(".ripple-effect");
            $ripple.css("height", $(this).height()), $ripple.css("width", $(this).height()), 
            $div.css({
                top: yPos - $ripple.height() / 2,
                left: xPos - $ripple.width() / 2,
                background: $(this).data("ripple-color")
            }).appendTo($(this)), window.setTimeout(function() {
                $div.remove();
            }, 1e3);
        });
    });
}(window, jQuery);