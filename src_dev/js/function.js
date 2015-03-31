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

function show_footer (index){
  var hash = (index!=undefined) ? index : parseInt(window.location.hash.replace(/^#/, ''));
  var count = $('#pov-timeline').children().length;
  if(hash>=count){
    $('#footer').addClass('show');
  }else{
    $('#footer').removeClass('show');
  }
}


function json_to_css(el, style){
  var css = '';
  
  for (var prop in style) {
    if(style.hasOwnProperty(prop)){
      css += "\t"+ prop + ": " + style[prop] + ";\n";
    }
  }
  
  return el + "{\n" + css + "\n}\n";
}

function buildTimeline () {
  var pov_timeline = '';
  var content = '';
  var menu = '';
  var count = 1;
  var section = '';
  var sub_sections = '';
  var sub_section = '';
  var css_style = '';

  $.getJSON('timeline.json', function(result){
    if(result.sections.length>0){

      var main = $('#pov-timeline');

      var home = document.createElement('section');
      $(home)
        .attr({
          'id': result.id, 
          'data-index': count++,
          'class': 'section main-point '+result.id
        })
        .appendTo(main)
      ;
      css_style += json_to_css('.sections .section.'+result.id, result.style.section);

      var home_overlay = document.createElement('div');
      $(home_overlay)
        .attr({'class': 'overlay'})
        .html(
          '<div>'+
            '<img src="'+result.logo+'" class="img-responsive logo">'+
          '</div>'+
          '<p id="tagline" class="text-center">'+result.sub_title+'</p>'+
          '<ul id="page-nav" class="pov-nav"></ul>'
        )
        .appendTo(home)
      ;
      css_style += json_to_css('.sections .section.'+result.id+' .overlay', {'background-color': result.style.overlay});

      for (var a=0; a<result.sections.length; a++){
        section = result.sections[a];
        menu += '<li><a class="page-scroll ripple" href="#'+section.id+'" data-index="'+(count)+'">'+section.title+'</a></li>';

        var main_point = document.createElement('section');
        $(main_point)
          .attr({
            'id': section.id,
            'data-index': count,
            'class': 'section main-point '+section.id
          })
          .appendTo(main)
        ;
        css_style += json_to_css('.sections .section.'+section.id, section.style.section);

        var main_point_line = document.createElement('div');
        $(main_point_line)
          .attr({
            'class': 'vertical-line' 
          })
          .appendTo(main_point)
        ;
        css_style += json_to_css('.sections .section.'+section.id+' .vertical-line', {'background-color': section.style.vertical_line});

        var main_point_overlay = document.createElement('div');
        $(main_point_overlay)
          .attr({'class': 'overlay'})
          .html(
            '<a href="#'+section.id+'-1" data-index="'+(++count)+'" class="page-scroll point-mark">'+
              '<div class="ripple">'+section.title+'</div>'+
            '</a>'+
            '<p class="title">'+section.desc+'</p>'
          )
          .appendTo(main_point)
        ;
        css_style += json_to_css('.sections .section.'+section.id+' .overlay', {'background-color': ((section.style.overlay!=undefined) ? section.style.overlay : "")});
        css_style += json_to_css('.sections .section.'+section.id+' .point-mark > div', section.style.point_mark);
        css_style += json_to_css('.sections .section.'+section.id+' .half > div:nth-child(odd)', {"background-color": section.style.odd_background_color});
        css_style += json_to_css('.sections .section.'+section.id+' .half, .sections .section.'+section.id+' .half > div:nth-child(even)', {"background-color": section.style.even_background_color});
        
        // sub_sections from main section
        sub_sections = section.sub_sections;
        for (var b=0; b<sub_sections.length; b++){
          sub_section = sub_sections[b];

          // add different types of content
          if(sub_section.type=='info'){
            var media = '';
            if(sub_section.video!=undefined && sub_section.video.src!=undefined && sub_section.video.src!=''){
              sub_section.video.src += '?rel=0&amp;wmode=transparent&amp;showinfo=0';
              media = '<a class="modal-link video '+sub_section.video.type+'" href="'+sub_section.video.src+'&amp;autoplay=1" target="_blank">'+
                '<img src="'+sub_section.video.cover_img+'" alt="">'+
              '</a>'+
              '<div class="embed embed-'+sub_section.video.aspect_ratio+'">
                <iframe class="embed-item" src="'+sub_section.video.src+'&amp;autoplay=0"></iframe>
              </div>';
            }else if(sub_section.image!=undefined && sub_section.image.src!=undefined && sub_section.image.src!=''){
              media = '<div class="image">'+
                '<img src="'+sub_section.image.src+'" alt="">'+
              '</div>';
            }
            content = '<div class="'+sub_section.type+'">'+
              '<h3 class="title">'+sub_section.title+'</h3>'+
              '<p class="desc">'+sub_section.desc+'</p>'+
              '<div class="media">'+media+'</div>'+
            '</div>';
          }
          else if(sub_section.type=='quotes'){
            content = '<div class="'+sub_section.type+'">'+
              '<p class="quote">'+sub_section.quote+'</p>'+
              '<div class="author-img img-circle text-center">'+
                '<img src="'+sub_section.author_img+'">'+
              '</div>'+
              '<h3 class="text-center by-who">'+sub_section.by_who+'</h3>'+
            '</div>';
          }

          var sub_point = document.createElement('section');
          $(sub_point)
            .attr({
              'id': section.id+'-'+(b+1),
              'data-index': count,
              'class': 'section point '+section.id
            })
            .appendTo(main)
          ;
          var sub_point_line = document.createElement('div');
          $(sub_point_line)
            .attr({
              'class': 'vertical-line' 
            })
            .appendTo(sub_point)
          ;

          var sub_point_overlay = document.createElement('div');
          var href = '';
          if((b+1)>=sub_sections.length){
            href = (a+1<result.sections.length) ? result.sections[a+1].id : section.id;
          }else{
            href = section.id+'-'+(b+2);
          }
          $(sub_point_overlay)
            .attr({'class': 'overlay'})
            .html(
              '<a href="#'+href+'" data-index="'+(++count)+'" class="page-scroll point-mark">'+
                '<div class="ripple">'+sub_section.year+'</div>'+
              '</a>'+
              '<div class="half">'+
                '<div class="cover-bg"></div>'+
                '<div>'+content+'</div>'+
              '</div>'
            )
            .appendTo(sub_point)
          ;
          css_style += json_to_css('.sections .section#'+section.id+'-'+(b+1)+' .half .cover-bg', {"background-image": "url('"+sub_section.bg_img+"')"});
        };
      };
      //$('#pov-timeline').html(pov_timeline);
      $('#main-nav, #page-nav').html(menu);
      $('<style></style>').html(css_style).appendTo('head');
      
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
          show_footer(page_index);
        },
        afterMove: function(page_index){
          show_nav(page_index);
          show_footer(page_index);
        }
      });
    }
  });
}