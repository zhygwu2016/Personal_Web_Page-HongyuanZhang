// 1. When we click the button, run a function
// 2. Inside the function, add/remove the class of open
// 3. Make sure our link doesn't jump the page to the top

$('.menu-toggle img').on('click', function(){
  $('.menu').toggleClass('open');
  return false;
});
