var slideBoxWidth;
var slideBackGround;
var slideFrames;
var slideFrame;
var buttonLeft;
var buttonRight;
var count = 0;
var slideTimer;
var dr;
var timerSeconds = 15000;

window.onload = window.onresize = function() {
  var slideBox = document.getElementsByClassName("slide-box")[0];
  slideFrames = document.getElementsByClassName("slide-frames")[0];
  slideFrame = document.getElementsByClassName("slide-frame");
  buttonLeft = document.getElementsByClassName("slide-button")[0];
  buttonRight = document.getElementsByClassName("slide-button")[1];
  slideBackGround = document.getElementsByClassName("home-back-slide")[0];
  var st = slideBox.currentStyle || window.getComputedStyle(slideBox);
  slideBoxWidth = parseInt(st.width.substring(0, (st.width.length - 2)))
  for(var i=0; i<slideFrame.length; i++){
    slideFrame[i].style.width = slideBoxWidth + "px";
  }
  slideFrames.style.marginLeft = "-" + (count * slideBoxWidth) + "px";
  changeBack();
  lockButton();
  clearInterval(slideTimer);
  slideTimer = setInterval(timer, timerSeconds);
}

function next(i, resetTimer){
  if(i == 1){
    if(count < slideFrame.length - 1 && count >= 0){
      count++;
      slideFrames.style.marginLeft = "-" + (slideBoxWidth * count) + "px";
      changeBack();
    }
  }else{
    if(count <= slideFrame.length && count > 0){
      count--;
      slideFrames.style.marginLeft = "-" + (slideBoxWidth * count) + "px";
      changeBack();
    }
  }
  lockButton();
  if(resetTimer){
    clearInterval(slideTimer);
    slideTimer = setInterval(timer, timerSeconds);
  }
}

function lockButton(){
  if (count == 0){
    buttonLeft.style.color = "rgba(255,255,255, 0.3)";
  }else{
    buttonLeft.style.color = "white";
  }

  if (count == (slideFrame.length - 1)){
    buttonRight.style.color = "rgba(255,255,255, 0.3)";
  }else{
    buttonRight.style.color = "white";
  }
}

function changeBack(){
  st = slideFrame[count].currentStyle || window.getComputedStyle(slideFrame[count]);
  var bg = st.backgroundImage;
  var bg2 = bg.substring(bg.lastIndexOf("/"));
  var url = bg2.substring(0, bg2.length - 2);
  slideBackGround.style.backgroundImage = 'url("WEB/slideshow/' + url + '")';
}

function timer(){
  if (count == 0){
    dr = 1;
  }
  if (count == slideFrame.length - 1){
    dr = 0;
  }
  next(dr, false);
}

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const carouselContainer = document.querySelector('.carousel-container');
  
  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000; // Time between slides in milliseconds (5000 = 5 seconds)

  // Core function to change the active slide
  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  // Logic to calculate the next/prev slide indexes
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; 
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Timer functions
  function startSlideShow() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Next Arrow Click
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopSlideShow(); // Stop and restart timer so it doesn't double-skip
      startSlideShow();
    });
  }

  // Previous Arrow Click
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopSlideShow();
      startSlideShow();
    });
  }

  // Pause the slideshow when the user's mouse is over the image
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopSlideShow);
    carouselContainer.addEventListener('mouseleave', startSlideShow);
  }

  // Kick off the slideshow when the page loads
  startSlideShow();
});

document.addEventListener('DOMContentLoaded', () => {
  // --- CAROUSEL ARROW LOGIC (Keep your existing hero carousel JS above this) ---
  
  // --- CARD SLIDER LOGIC ---
  const cardSlider = document.getElementById('card-slider');
  const nextCardBtn = document.querySelector('.next-card-btn');
  const prevCardBtn = document.querySelector('.prev-card-btn');

  if (cardSlider && nextCardBtn && prevCardBtn) {
    nextCardBtn.addEventListener('click', () => {
      // Scroll right by the exact width of the visible container
      cardSlider.scrollBy({ left: cardSlider.clientWidth, behavior: 'smooth' });
    });

    prevCardBtn.addEventListener('click', () => {
      // Scroll left by the exact width of the visible container
      cardSlider.scrollBy({ left: -cardSlider.clientWidth, behavior: 'smooth' });
    });
  }
});