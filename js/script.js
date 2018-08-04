// Simple Auto-Playing Slideshow
// https://css-tricks.com/snippets/jquery/simple-auto-playing-slideshow/
$("#home-background > div:gt(0)").hide();
setInterval(function() {
  $('#home-background > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#home-background');
}, 5000);

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

$('.back-to-home,.back-to-top').on('click', function(){
  const href = '#home';
  console.log(href);
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
// $(function() {...} means $(document).ready(function(){...}) 页面载入后即执行
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
  $('.click-for-more').css("top", slideshowResHeight+36 + "px");

  var currentSlide = 0;
  var totalSlides = $('.holder div').length;
  var slideNumber = currentSlide + 1;
  $('.steps').text(slideNumber + ' / ' + totalSlides);

  // ↓↓↓ THE KEY FUNCTION: moveSlide
  var moveSlide = function(slide){
    // "modulo" to create infinite loop
    // e.g. when we slide to “7th” slide position, grap the 1th slide,
    // move to the 7th position, so we can the 1st div after 6th div
    var moduloSlideNum = slide % totalSlides;
    var modSlide = $(".holder div").eq(moduloSlideNum);
    modSlide.css("position", "absolute");
    modSlide.css("left", slide * slideshowWidth + "px");

    // move the holder, so that wa can see the slideshow animation
    var leftPosition = (- slide * slideshowWidth) + 'px';
    $('.holder').css('left',leftPosition);

    var slideNumber = (slide % totalSlides) + 1 ;
      // when we use previousSlide, 'slideNumber' might be negative
      if (slideNumber<=0){
        slideNumber = slideNumber + totalSlides;
      }
    $('.steps').text(slideNumber + ' / ' + totalSlides);
  };
  // ↑↑↑ THE KEY FUNCTION: moveSlide


  var nextSlide = function(){
    currentSlide = currentSlide + 1;
    // if(currentSlide >= totalSlides){
    //   currentSlide = 0;
    // }
    moveSlide(currentSlide);
  };

  var previousSlide = function(){
    currentSlide = currentSlide - 1;
    // if(currentSlide<0){
    //   currentSlide = totalSlides - 1;
    // }
    moveSlide(currentSlide);
  };

  var autoSlide = setInterval(function(){
    nextSlide();
  },4000); //every 4s

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
    $('.click-for-more').css("top", slideshowResHeight+36 + "px");
  });

});
