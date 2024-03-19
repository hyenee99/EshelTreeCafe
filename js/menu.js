import beverages from '../data/beverages.js';
import others from '../data/others.js';

//음료 사진 추가하는 부분
const beverageEl = document.querySelector('.menu_page .beverage')
let count = 0;
let menu_list;
beverages.forEach(function (beverage) {
  if (count === 0 || count % 4 === 0) {
    menu_list = document.createElement('div');
    menu_list.classList.add('menu_list');
    beverageEl.appendChild(menu_list);
  }
  menu_list.classList.add(`${beverage.line}`); //변수 사용할 때 => `` 백틱 사용 !!!!!!!
  const itemEl = document.createElement('div');
  itemEl.classList.add('menu_type');
  itemEl.innerHTML = `
     <img src="${beverage.thumbnail}" alt="${beverage.name}" />
     <p class="name">${beverage.name}</p>
     <p class="name_eng"> ${beverage.name_eng} </p>
     <p class="price"> ${beverage.price}</p>
  `
  const now_menu = document.querySelector(`.${beverage.line}`); //클래스 앞에 .을 안붙여서 계속 오류남 ㅜㅜ 
  now_menu.appendChild(itemEl);
  count++;
})

// 음료 외 사진 추가하는 부분
const othersEl = document.querySelector('.others .menu_list');
others.forEach(function (other) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('menu_type');
  itemEl.innerHTML = `
     <img src="${other.thumbnail}" alt="${other.name}" />
     <p class="name">${other.name}</p>
     <p class="name_eng"> ${other.name_eng} </p>
     <p class="price"> ${other.price}</p>
  `
  othersEl.appendChild(itemEl);
})
// 메뉴 부분 누르면 장바구니 나오게 
const menu = document.querySelectorAll(".menu_type");
const menuWithBasket = document.querySelector("#menuWithBasket");
const basket = document.querySelector("#basket");

let now_item;
let cartNum = 0; //카트 번호 (카트에 들어간 순서)
let disappearedNum = 0; //사라진 것들의 개수 
let isDisappeared = false; // 장바구니의 사라짐 여부를 저장하는 변수 

const addedmenu = new Array(menu.length).fill(0); //추가된 메뉴를 확인하는 배열 
let num = new Array(menu.length).fill(0); //해당 메뉴의 카트번호를 저장하는 배열

for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener('click', function () {
    menuWithBasket.style.display = "flex";
    basket.style.display = "block"; // 장바구니를 display:none 에서 보이게 변경
    now_item = menu[i];

    if (addedmenu[i] < 1) { // 클릭한 메뉴가 추가된 적이 없는 경우 
      handleEmptyBasket();
      cart(i);
      num[i] = cartNum; //해당 메뉴가 카트에 몇 번째로 들어갔는지 저장 
      cartNum++;
    }
    else { //이전에 추가된 적이 있는 경우
      handleEmptyBasket();
      amount(num[i]);
    }
    addedmenu[i]++; //해당 메뉴 추가 횟수 증가 
    totalPrice();
  });
}
// 장바구니를 제어하는 함수 
function handleEmptyBasket() {
  if (isDisappeared) { //사라진 적이 있으면 
    menuWithBasket.style.display = "flex"; // 다시 장바구니 보이게 변경
    isDisappeared = false; // 장바구니 사라짐 여부 변경 
    basket.style.display = "block";
  }
}
// 메뉴를 장바구니에 추가하는 함수 (메뉴 이름, 가격, 수량 화면 나오게)
function cart(menu_index) {
  const cart = document.querySelector('.cart');
  const addToCart = document.createElement("div");
  addToCart.classList.add('addToCart');

  const menu_price = document.createElement("div");
  menu_price.classList.add('menu_price');

  const amount = document.createElement("div");
  amount.classList.add('amount');

  const nameParagraph = now_item.querySelector('.name');
  const priceParagraph = now_item.querySelector('.price');

  if (nameParagraph) {
    menu_price.innerHTML = `
      <li class="cartMenu">${nameParagraph.textContent}</li>
      <p class="cartPrice">${priceParagraph.textContent}</p>
      `;
    amount.innerHTML = `
      <button class="minusButton" id="${menu_index}"> ➖ </button>
      <p class="cartAmount">1</p>
      <button class="plusButton"> ➕ </button>
      `;

    cart.appendChild(addToCart);
    addToCart.appendChild(menu_price);
    addToCart.appendChild(amount);
  } else {
    console.log('클래스 "name"을 가진 <p> 태그가 존재하지 않습니다.');
  }
}
// 장바구니에 이벤트 위임 설정
menuWithBasket.addEventListener('click', function (event) {
  const target = event.target;

  // 마이너스 버튼 클릭 시 수량 감소
  if (target.classList.contains('minusButton')) {
    const amountElement = target.parentNode.querySelector('.cartAmount');
    const minusButtonId = target.parentNode.querySelector('.minusButton').id; //minus 버튼의 id 가져오기 => menu_index
    const parentElement = amountElement.parentNode.parentNode; //addToCart 부분 

    amountElement.textContent = parseInt(amountElement.textContent) - 1;
    totalPrice();

    if (parseInt(amountElement.textContent) === 0) { //개수가 0이면 
      parentElement.style.display = 'none'; // 화면에서 안보이게 하기
      disappearedNum++; // 사라진 것들의 개수 증가 
      addedmenu[minusButtonId] = 0; // 해당 메뉴가 추가된 적 있는지를 다시 0으로 변경

      if (cartNum === disappearedNum) { // 카트에 들어간 것들의 개수와 사라진 것들의 개수가 같으면 
        menuWithBasket.style.display = "block"; //flex를 block 요소로 바꾸기
        basket.style.display = "none"; // 장바구니 안보이게
        isDisappeared = true; // 장바구니 사라짐 
      }
    }
  }

  // 플러스 버튼 클릭 시 수량 증가
  if (target.classList.contains('plusButton')) {
    const amountElement = target.parentNode.querySelector('.cartAmount');
    amountElement.textContent = parseInt(amountElement.textContent) + 1;
    totalPrice();
  }
});

//카트번호를 매개변수로 받아서 수량을 변경하는 함수(메뉴에 해당하는 카트번호의 수량을 변경) => 메뉴를 클릭했을 때 변경
function amount(number) {
  const currentAddToCart = document.querySelectorAll('.addToCart')[number]; // 현재 추가된 요소에 대한 참조
  const currentAmountParagraph = currentAddToCart.querySelector('.amount p'); // 현재 추가된 요소 내의 수량 요소에 대한 참조
  currentAmountParagraph.textContent++; // 수량 업데이트 
}

// 총 결제할 금액을 출력하는 함수 
function totalPrice() {
  let total_price = 0;
  const total = document.querySelector('.total_price');
  const cart = document.querySelectorAll('.addToCart');

  for (let i = 0; i < cart.length; i++) {
    //요소 찾기
    const numEl = cart[i].querySelector('.amount .cartAmount');
    const priceEl = cart[i].querySelector('.menu_price .cartPrice');

    //값 가져오기 
    const quantity = parseInt(numEl.textContent);
    const price = parseInt(priceEl.textContent);
    total_price += quantity * price;
  }
  total.innerHTML = `
    <p>💸결제 금액 </p>
    <p> ${total_price} 원 </p>
  `
}

// 현재 년도 가져오기 
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

