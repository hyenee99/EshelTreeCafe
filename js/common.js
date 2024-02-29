var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 3000); // 3초마다 이미지가 체인지됩니다.
}

new Swiper('.top_menu .swiper-container',{
  slidesPerView: 3, //한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 2000
  },
  pagination:{
    el:'.top_menu .swiper-pagination', //페이지 번호 요소 선택자 
    clickable:true 
  },
  navigation:{
    prevEl:'.top_menu .swiper-button-prev',
    nextEl:'.top_menu .swiper-button-next'
  }
});