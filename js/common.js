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

const fatigue=document.querySelector("#fatigue");
const cold=document.querySelector("#cold");
const indigestion=document.querySelector("#indigestion");
const beauty=document.querySelector("#beauty");

const img_1=document.querySelector("#change_1");
const img_2=document.querySelector("#change_2");
const img_3=document.querySelector("#change_3");

fatigue.addEventListener("click",()=> { //피로해소 버튼 눌렀을 때
  img_1.src="./images/jamong.png";
  img_2.src="./images/maesil.png";
  img_3.src="./images/jujube.png";
});

cold.addEventListener("click",()=> { //감기 버튼 눌렀을 때
  img_1.src="./images/ginger.png";
  img_2.src="./images/jujube.png";
  img_3.src="./images/yuja.png";
});

indigestion.addEventListener("click",()=> { //소화불량 버튼 눌렀을 때 
  img_1.src="./images/maesil.png";
  img_2.src="./images/appleCin.png";
  img_3.src="./images/lemon.png";
});

beauty.addEventListener("click",()=> { //미용 버튼 눌렀을 때 
  img_1.src="./images/lemon.png";
  img_2.src="./images/jamong.png";
  img_3.src="./images/tangerine.png";
});

// 현재 년도 가져오기 
const thisYear = document.querySelector('.this-year');
thisYear.textContent=new Date().getFullYear();