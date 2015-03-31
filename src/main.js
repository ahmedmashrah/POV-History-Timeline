function show_nav(a){var b=void 0!=a?a:parseInt(window.location.hash.replace(/^#/,""));b>1?$("#main-navbar").addClass("show"):$("#main-navbar").removeClass("show")}function show_footer(a){var b=void 0!=a?a:parseInt(window.location.hash.replace(/^#/,"")),c=$("#pov-timeline").children().length;b>=c?$("#footer").addClass("show"):$("#footer").removeClass("show")}function json_to_css(a,b){var c="";for(var d in b)b.hasOwnProperty(d)&&(c+="	"+d+": "+b[d]+";\n");return a+"{\n"+c+"\n}\n"}function buildTimeline(){var a="",b="",c=1,d="",e="",f="",g="";$.getJSON("timeline.json",function(h){if(h.sections.length>0){var i=$("#pov-timeline"),j=document.createElement("section");$(j).attr({id:h.id,"data-index":c++,"class":"section main-point "+h.id}).appendTo(i),g+=json_to_css(".sections .section."+h.id,h.style.section);var k=document.createElement("div");$(k).attr({"class":"overlay"}).html('<div><img src="'+h.logo+'" class="img-responsive logo"></div><p id="tagline" class="text-center">'+h.sub_title+'</p><ul id="page-nav" class="pov-nav"></ul>').appendTo(j),g+=json_to_css(".sections .section."+h.id+" .overlay",{"background-color":h.style.overlay});for(var l=0;l<h.sections.length;l++){d=h.sections[l],b+='<li><a class="page-scroll ripple" href="#'+d.id+'" data-index="'+c+'">'+d.title+"</a></li>";var m=document.createElement("section");$(m).attr({id:d.id,"data-index":c,"class":"section main-point "+d.id}).appendTo(i),g+=json_to_css(".sections .section."+d.id,d.style.section);var n=document.createElement("div");$(n).attr({"class":"vertical-line"}).appendTo(m),g+=json_to_css(".sections .section."+d.id+" .vertical-line",{"background-color":d.style.vertical_line});var o=document.createElement("div");$(o).attr({"class":"overlay"}).html('<a href="#'+d.id+'-1" data-index="'+ ++c+'" class="page-scroll point-mark"><div class="ripple">'+d.title+'</div></a><p class="title">'+d.desc+"</p>").appendTo(m),g+=json_to_css(".sections .section."+d.id+" .overlay",{"background-color":void 0!=d.style.overlay?d.style.overlay:""}),g+=json_to_css(".sections .section."+d.id+" .point-mark > div",d.style.point_mark),g+=json_to_css(".sections .section."+d.id+" .half > div:nth-child(odd)",{"background-color":d.style.odd_background_color}),g+=json_to_css(".sections .section."+d.id+" .half, .sections .section."+d.id+" .half > div:nth-child(even)",{"background-color":d.style.even_background_color}),e=d.sub_sections;for(var p=0;p<e.length;p++){if(f=e[p],"info"==f.type){var q="";void 0!=f.video&&void 0!=f.video.src&&""!=f.video.src?(f.video.src+="?rel=0&amp;wmode=transparent&amp;showinfo=0",q='<a class="modal-link video '+f.video.type+'" href="'+f.video.src+'&amp;autoplay=1" target="_blank"><img src="'+f.video.cover_img+'" alt=""></a><div class="embed embed-'+f.video.aspect_ratio+'">\n                <iframe class="embed-item" src="'+f.video.src+'&amp;autoplay=0"></iframe>\n              </div>'):void 0!=f.image&&void 0!=f.image.src&&""!=f.image.src&&(q='<div class="image"><img src="'+f.image.src+'" alt=""></div>'),a='<div class="'+f.type+'"><h3 class="title">'+f.title+'</h3><p class="desc">'+f.desc+'</p><div class="media">'+q+"</div></div>"}else"quotes"==f.type&&(a='<div class="'+f.type+'"><p class="quote">'+f.quote+'</p><div class="author-img img-circle text-center"><img src="'+f.author_img+'"></div><h3 class="text-center by-who">'+f.by_who+"</h3></div>");var r=document.createElement("section");$(r).attr({id:d.id+"-"+(p+1),"data-index":c,"class":"section point "+d.id}).appendTo(i);var s=document.createElement("div");$(s).attr({"class":"vertical-line"}).appendTo(r);var t=document.createElement("div"),u="";u=p+1>=e.length?l+1<h.sections.length?h.sections[l+1].id:d.id:d.id+"-"+(p+2),$(t).attr({"class":"overlay"}).html('<a href="#'+u+'" data-index="'+ ++c+'" class="page-scroll point-mark"><div class="ripple">'+f.year+'</div></a><div class="half"><div class="cover-bg"></div><div>'+a+"</div></div>").appendTo(r),g+=json_to_css(".sections .section#"+d.id+"-"+(p+1)+" .half .cover-bg",{"background-image":"url('"+f.bg_img+"')"})}}$("#main-nav, #page-nav").html(b),$("<style></style>").html(g).appendTo("head"),$(".youtube").colorbox({opacity:.75,iframe:!0,innerWidth:640,innerHeight:390}),$(".sections").onepage_scroll({sectionContainer:"section",responsiveFallback:768,loop:!1,updateURL:!0,beforeMove:function(a){show_nav(a),show_footer(a)},afterMove:function(a){show_nav(a),show_footer(a)}})}})}!function(a,b){b(function(){b(".ripple").on("click",function(c){c.preventDefault();var d=b("<div/>"),e=b(this).offset(),f=c.pageX-e.left,g=c.pageY-e.top;d.addClass("ripple-effect");var h=b(".ripple-effect");h.css("height",b(this).height()),h.css("width",b(this).height()),d.css({top:g-h.height()/2,left:f-h.width()/2,background:b(this).data("ripple-color")}).appendTo(b(this)),a.setTimeout(function(){d.remove()},1e3)})})}(window,jQuery),$(function(){$(document).on("click","a.page-scroll",function(a){var b=$(this).data("index"),c=$(this);0!=$("body.disabled-onepage-scroll").length?($("#menu-toggle").attr("checked",!1),$("html, body").stop().animate({scrollTop:$(c.attr("href")).offset().top},1500,"easeInOutExpo",function(){window.location.hash=b})):(a.preventDefault(),window.location.hash=b,$(".sections").moveTo(b))}),buildTimeline(),show_nav(),$("body").scrollspy({target:"#main-navbar"}),$(".navbar-collapse ul li a").click(function(){$(".navbar-toggle:visible").click()})});