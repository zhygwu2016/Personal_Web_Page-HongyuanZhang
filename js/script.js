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


const windowWidth = $(window).width();
const responsiveHeight = windowWidth*2/3-3;
//console.log(responsiveHeight);
$('.home').css("height",responsiveHeight + "px");
// get the window width every time when we change window size!
$(window).resize(function(){
    const windowWidth = $(window).width();
    const responsiveHeight = windowWidth*2/3-3;
    //console.log(responsiveHeight);
    $('.home').css("height",responsiveHeight + "px");
});


// 1. whenever we click a .js-scroll link, we want to run a function
// 2. we want to stop the link from jumping straight to our section (its default behaviour)
// 3. we want to find out the href attribute, and then grab that element
// 4. then scroll to it using scrollIntoView
// ↓↓↓ jQuery way:
$('.js-scroll').on('click',function(){
  const href = $(this).attr('href');
  //console.log(href);
  document.querySelector(href).scrollIntoView({
    behavior: 'smooth'
  });
  return false;
});
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


// inView function
inView('.fade-inview')
  .on('enter', el => {
    el.classList.add('visible');
  })
  .on('exit', el => {
    el.classList.remove('visible');
});


// ↓↓↓ .slideshow responsive (resize) function
$(function(){
  let windowWidth = $(window).width(); // set .slide-pic width and height
  let slideshowWidth = $('.slideshow').width();
  let slideshowHeight = $('.slideshow').height();
  let slideshowResHeight = slideshowWidth*2/3;
  let stepsBottom = slideshowHeight - slideshowResHeight;

  $('.slide-pic').css("width", slideshowWidth + "px");
  $('.slide-pic').css("height", slideshowResHeight + "px");
  $('.steps').css("bottom", stepsBottom + "px"); //make the position of 'steps' responsive!
  // $('.dot').css("bottom", stepsBottom + "px");
  $('.prev').css("top", 0.5 * slideshowResHeight + "px");
  $('.next').css("top", 0.5 * slideshowResHeight + "px");

  var currentSlide = 0;
  var totalSlides = $('.holder div').length;
  var slideNumber = currentSlide + 1;
  $('.steps').text(slideNumber + ' / ' + totalSlides);

  var moveSlide = function(slide){
    var leftPosition = (- slide * slideshowWidth) + 'px';
    $('.holder').css('left',leftPosition);
    var slideNumber = slide + 1;
    $('.steps').text(slideNumber + ' / ' + totalSlides);
  };

  var nextSlide = function(){
    currentSlide = currentSlide + 1;
    if(currentSlide >= totalSlides){
      currentSlide = 0;
    }
    moveSlide(currentSlide);
  };

  var previousSlide = function(){
    currentSlide = currentSlide - 1;
    if(currentSlide<0){
      currentSlide = totalSlides - 1;
    }
    moveSlide(currentSlide);
  };

  var autoSlide = setInterval(function(){
    nextSlide();
  },3000); //every 3s (3000 ms)

  $('.next').on('click', function(){
    // this is going to cancel our autoSlide interval function
    // when user has taken over control of the slidesow
    clearInterval(autoSlide);
    nextSlide();
  });

  $('.prev').on('click', function(){
    clearInterval(autoSlide);
    previousSlide();
  });

  $('body').on('keydown', function(event){
    var keyCode = event.keyCode;
    if(keyCode == 37 ){ // 37 is keycode of left arrow
      clearInterval(autoSlide);
      previousSlide();
    }
    if(keyCode == 39 ){
      clearInterval(autoSlide);
      nextSlide();
    }
  });


  $(window).resize(function(){
    windowWidth = $(window).width(); // set .slide-pic width and height
    slideshowWidth = $('.slideshow').width();
    slideshowHeight = $('.slideshow').height();
    slideshowResHeight = slideshowWidth*2/3;
    stepsBottom = slideshowHeight - slideshowResHeight;

    $('.slide-pic').css("width", slideshowWidth + "px");
    $('.slide-pic').css("height", slideshowResHeight + "px");
    $('.steps').css("bottom", stepsBottom + "px"); //make the position of 'steps' responsive!
    // $('.dot').css("bottom", stepsBottom + "px");
    $('.prev').css("top", 0.5 * slideshowResHeight + "px");
    $('.next').css("top", 0.5 * slideshowResHeight + "px");
  });

});
