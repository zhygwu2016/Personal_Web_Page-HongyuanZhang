// 1. When we click the button, run a function
// 2. Inside the function, add/remove the class of open
// 3. Make sure our link doesn't jump the page to the top
$('.menu-toggle img').on('click', function(){
  $('.menu').toggleClass('open');
  return false;
});

$('.menu-link').on('click', function(){
  $('.menu').toggleClass('open');
  const href = $(this).attr('href');
  document.querySelector(href).scrollIntoView({
    behavior: 'smooth'
  });
  return false;
});

// get the window width every time when we change window size!
$(function(){
  $(window).resize(function(){
      const windowWidth = $(window).width();
      const responsiveHeight = windowWidth*2/3-3;
      //console.log(responsiveHeight);
      $('.home').css("height",responsiveHeight + "px");
  }).resize();
});

// 1. whenever we click a .js-scroll link, we want to run a function
// 2. we want to stop the link from jumping straight to our section (its default behaviour)
// 3. we want to find out the href attribute, and then grab that element
// 4. then scroll to it using scrollIntoView
// const scrollLinks = document.querySelectorAll('.js-scroll');
// scrollLinks.forEach(link => {
//   link.addEventListener('click', (event)=>{
//     // this is equivalent to return false in jQuery
//     // it will block the default browser behaviour of the link jumping to the href attribute
//     event.preventDefault();
//     // here we grab the href attribute from our link
//     const href = link.getAttribute('href');
//     //console.log(href);
//     document.querySelector(href).scrollIntoView({
//       behavior: 'smooth'
//     });
//   });
// });
// ↓↓↓ jQuery way:
$('.js-scroll').on('click',function(){
  const href = $(this).attr('href');
  //console.log(href);
  document.querySelector(href).scrollIntoView({
    behavior: 'smooth'
  });
  return false;
});

// here we grab all our images we want to fade in
// we add the visible class which toggles the opacity
// inView('.fade')
//   .on('enter', img => img.classList.add('visible'))
//   .on('exit', img => img.classList.remove('visible'));

inView('.fade')
  .on('enter', el => {
    el.classList.add('visible');
  })
  .on('exit', el => {
    el.classList.remove('visible');
});
