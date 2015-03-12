(function (window, $) {
  $(function() {
  // add show grid toggle
  $('body').append('<div id="bs-grid-toggle">'+
    '<div><strong>Toggle Grid</strong></div>'+
    '<div>'+
      '<input type="radio" name="bs" value="none" id="bs-grid-1" checked>'+
      '<label for="bs-grid-1">Off</label>'+
    '</div>'+
    '<div>'+
      '<input type="radio" name="bs" value="fixed" id="bs-grid-2">'+
      '<label for="bs-grid-2">Fixed Grid</label>'+
    '</div>'+
    '<div>'+
      '<input type="radio" name="bs" value="fluid" id="bs-grid-3">'+
      '<label for="bs-grid-3">Fluid Grid</label>'+
    '</div>'+
  '</div>');

  $(document).on('change','#bs-grid-toggle input[type="radio"]',function(){
    var 
      $val = $(this).val(),
      $cls = ''
    ;
    console.log($val);
    $cls = ($val=='fluid') ? 'container-fluid' : 'container';

    if($('#bs-grid').length==0){
      $('body').append('<div id="bs-grid"><div class=""><div class="row"><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div><div class="span1 col-xs-1"></div></div></div></div>');
    }
    if($val!='none'){
      $('#bs-grid>div').removeAttr('class').addClass($cls);
      $('#bs-grid').removeClass('hidden');
    }else{
      $('#bs-grid').addClass('hidden');
    }
  });

  });
})(window, jQuery);