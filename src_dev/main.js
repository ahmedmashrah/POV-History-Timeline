function show_nav(index) {
    var hash = void 0 != index ? index : parseInt(window.location.hash.replace(/^#/, ""));
    hash > 1 ? $("#main-navbar").addClass("show") : $("#main-navbar").removeClass("show");
}

function updateOncepagePagination() {
    var shift = $(".onepage-pagination").height() / 2;
    $(".onepage-pagination").css("margin-top", -1 * shift + "px");
}

function page_scroll() {
    for (var links = $("body").find(".page-scroll"), i = 0; i < links.length; i++) {
        var link = links[i], index = link.attributes.href.value.replace(/^#/, "");
        $(links[i]).attr("data-index", index);
    }
}

function buildTimeline() {
    var pov_timeline = "", content = "", menu = "", count = 1, section = "", points = "", point = "";
    $.getJSON("timeline.json", function(result) {
        if (result.sections.length > 0) {
            pov_timeline = '<section id="' + result.id + '" data-index="' + count++ + '" class="section main-point ' + result.id + '" style="background-image: url(\'' + result.bg_img + '\')"><div class="overlay"><div><img src="' + result.logo + '" class="img-responsive logo"></div><p id="tagline" class="text-center">' + result.sub_title + '</p><ul id="page-nav" class="pov-nav"></ul></div></section>';
            for (var a = 0; a < result.sections.length; a++) {
                section = result.sections[a], menu += '<li><a class="page-scroll ripple" href="#' + section.id + '" data-index="' + count + '">' + section.section_label + "</a></li>", 
                pov_timeline += '<section id="' + section.id + '" data-index="' + count + '" class="section main-point ' + section.id + '" style="background-image: url(\'' + section.bg_img + '\')"><div class="overlay"><a href="#' + section.id + '-1" data-index="' + ++count + '" class="page-scroll point-mark"><div class="ripple">' + section.section_label + '</div></a><p class="title">' + section.section_info + "</p></div></section>", 
                points = section.points;
                for (var b = 0; b < points.length; b++) {
                    if (point = points[b], "info" == point.type) {
                        var media = "";
                        void 0 != point.video ? (point.video.src += "?rel=0&amp;wmode=transparent&amp;autoplay=1&amp;showinfo=0", 
                        media = '<a class="modal-link video ' + point.video.type + '" href="' + point.video.src + '" target="_blank"><img src="' + point.video.cover_img + '"></a><div class="embed embed-' + point.video.aspect_ratio + '">\n                <iframe class="embed-item" src="' + point.video.src + '"></iframe>\n              </div>') : void 0 != point.image && (media = '<div class="image"><img src="' + point.image.src + '" class=""></div>'), 
                        content = '<div class="' + point.type + '"><h3 class="title">' + point.title + '</h3><p class="desc">' + point.desc + '</p><div class="media">' + media + "</div></div>";
                    } else "quotes" == point.type && (content = '<div class="' + point.type + '"><p class="quote">' + point.quote + '</p><div class="author-img img-circle text-center"><img src="' + point.author_img + '"></div><h3 class="text-center by-who">' + point.by_who + "</h3></div>");
                    pov_timeline += '<section id="' + section.id + "-" + (b + 1) + '" data-index="' + count + '" class="section point ' + section.id + '"><div class="overlay"><a href="#' + section.id + "-" + (b + 2) + '" data-index="' + ++count + '" class="page-scroll point-mark"><div class="ripple">' + point.year + '</div></a><div class="half"><div class="cover-bg" style="background-image: url(\'' + point.bg_img + "');\"></div><div>" + content + "</div></div></div></section>";
                }
            }
            $("#pov-timeline").html(pov_timeline), $("#main-nav, #page-nav").html(menu), $(".youtube").colorbox({
                opacity: .75,
                iframe: !0,
                innerWidth: 640,
                innerHeight: 390
            }), $(".sections").onepage_scroll({
                sectionContainer: "section",
                responsiveFallback: 768,
                loop: !1,
                updateURL: !0,
                beforeMove: function(page_index) {
                    show_nav(page_index);
                },
                afterMove: function(page_index) {
                    show_nav(page_index);
                }
            });
        }
    });
}

!function(window, $) {
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
}(window, jQuery), $(function() {
    $(document).on("click", "a.page-scroll", function(event) {
        var page_index = $(this).data("index"), $anchor = $(this);
        0 != $("body.disabled-onepage-scroll").length ? $("html, body").stop().animate({
            scrollTop: $($anchor.attr("href")).offset().top
        }, 1500, "easeInOutExpo", function() {
            window.location.hash = page_index;
        }) : (event.preventDefault(), window.location.hash = page_index, $(".sections").moveTo(page_index));
    }), buildTimeline(), show_nav(), setTimeout(function() {
        updateOncepagePagination();
    }, 500), $(document).on("mousewheel DOMMouseScroll MozMousePixelScroll", function() {
        show_nav();
    }), $("body").scrollspy({
        target: "#main-navbar"
    }), $(".navbar-collapse ul li a").click(function() {
        $(".navbar-toggle:visible").click();
    });
});