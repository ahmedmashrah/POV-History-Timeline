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

function show_nav (index) {
  var hash = (index!=undefined) ? index : parseInt(window.location.hash.replace(/^#/, ''));
  if(hash>1){
    $('#main-navbar').addClass('show');
  }else{
    $('#main-navbar').removeClass('show');
  }
}
function updateOncepagePagination () {
  var shift = $('.onepage-pagination').height()/2;
  $('.onepage-pagination').css('margin-top', (shift*-1)+"px");
}

// add data-index to all page-scroll
function page_scroll () {
  var links = $('body').find('.page-scroll');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var index = link.attributes['href']['value'].replace(/^#/, '');
    $(links[i]).attr('data-index', index);
  };
}


function buildTimeline () {
  var pov_timeline = '';
  var content = '';
  var menu = '';
  var count = 1;
  var section = '';
  var points = '';
  var point = '';

  $.getJSON('timeline.json', function(result){
    if(result.sections.length>0){

      // build home section
      pov_timeline = '<section id="'+result.id+'" data-index="'+(count++)+'" class="section main-point '+result.id+'" style="background-image: url(\''+result.bg_img+'\')">'+
        '<div class="overlay">'+
          '<div>'+
            '<img src="'+result.logo+'" class="img-responsive logo">'+
          '</div>'+
          '<p id="tagline" class="text-center">'+result.sub_title+'</p>'+
          '<ul id="page-nav" class="pov-nav"></ul>'+
        '</div>'+
      '</section>';

      for (var a=0; a<result.sections.length; a++){
        section = result.sections[a];
        menu += '<li><a class="page-scroll ripple" href="#'+section.id+'" data-index="'+(count)+'">'+section.section_label+'</a></li>';
        // every main section
        pov_timeline += '<section id="'+section.id+'" data-index="'+(count)+'" class="section main-point '+section.id+'" style="background-image: url(\''+section.bg_img+'\')">'+
          '<div class="overlay">'+
            '<a href="#'+section.id+'-1" data-index="'+(++count)+'" class="page-scroll point-mark">'+
              '<div class="ripple">'+section.section_label+'</div>'+
            '</a>'+
            '<p class="title">'+section.section_info+'</p>'+
          '</div>'+
        '</section>';
        
        // points from main section
        points = section.points;
        for (var b=0; b<points.length; b++){
          point = points[b];

          // add different types of content
          if(point.type=='info'){
            var media = '';
            if(point.video!=undefined){
              point.video.src += '?rel=0&amp;wmode=transparent&amp;autoplay=1&amp;showinfo=0';
              media = '<a class="modal-link video '+point.video.type+'" href="'+point.video.src+'" target="_blank">'+
                '<img src="'+point.video.cover_img+'">'+
              '</a>'+
              '<div class="embed embed-'+point.video.aspect_ratio+'">
                <iframe class="embed-item" src="'+point.video.src+'"></iframe>
              </div>';
            }else if(point.image!=undefined){
              media = '<div class="image">'+
                '<img src="'+point.image.src+'" class="">'+
              '</div>';
            }
            content = '<div class="'+point.type+'">'+
              '<h3 class="title">'+point.title+'</h3>'+
              '<p class="desc">'+point.desc+'</p>'+
              '<div class="media">'+media+'</div>'+
            '</div>';
          }else if(point.type=='quotes'){
            content = '<div class="'+point.type+'">'+
              '<p class="quote">'+point.quote+'</p>'+
              '<div class="author-img img-circle text-center">'+
                '<img src="'+point.author_img+'">'+
              '</div>'+
              '<h3 class="text-center by-who">'+point.by_who+'</h3>'+
            '</div>';
          }        

          // build the section
          pov_timeline += '<section id="'+section.id+'-'+(b+1)+'" data-index="'+(count)+'" class="section point '+section.id+'">'+
            '<div class="overlay">'+
              '<a href="#'+section.id+'-'+(b+2)+'" data-index="'+(++count)+'" class="page-scroll point-mark">'+
                '<div class="ripple">'+point.year+'</div>'+
              '</a>'+
              '<div class="half">'+
                '<div class="cover-bg" style="background-image: url(\''+point.bg_img+'\');"></div>'+
                '<div>'+content+'</div>'+
              '</div>'+
            '</div>'+
          '</section>';
        };
      };
      $('#pov-timeline').html(pov_timeline);
      $('#main-nav, #page-nav').html(menu);
      
      // colorbox plugin
      $(".youtube").colorbox({opacity: 0.75, iframe:true, innerWidth:640, innerHeight:390});

      // once page scroll for snap affect
      $(".sections").onepage_scroll({
        sectionContainer: "section",
        responsiveFallback: 768,
        loop: false,
        updateURL: true,
        beforeMove: function(page_index){
          show_nav(page_index);
        },
        afterMove: function(page_index){
          show_nav(page_index);
        }
      });
    }
  });
}