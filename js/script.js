// 1. When we click the button, run a function
// 2. Inside the function, add/remove the class of open
// 3. Make sure our link doesn't jump the page to the top
$('.menu-toggle img').on('click', function(){
  $('.menu').toggleClass('open');
  return false;
});

// get the window width every time when we change window size!
$(function(){
  $(window).resize(function(){
      const windowWidth = $(window).width();
      const responsiveHeight = windowWidth*2/3;
      //console.log(responsiveHeight);
      $('.home').css("height",responsiveHeight + "px");
  }).resize();
});
