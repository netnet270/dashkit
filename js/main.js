$(window).on('load', function(){
  
  menu();

})

  // sidebar-collapse

  function menu(){
    $('.js-navbar-link').on('click', function(){
      if($(this).hasClass('navbar-link--active')){

      }
      else{
        $('.js-submenu').slideUp();
      }
    })
  }
  