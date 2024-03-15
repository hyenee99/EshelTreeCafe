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
     <p class="price"> ${beverage.price} 원 </p>
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
     <p class="price"> ${other.price} 원 </p>
  `
  othersEl.appendChild(itemEl);
})


// 메뉴 부분 누르면 장바구니 나오게 
const menu = document.querySelectorAll(".menu_type");
const menuWithBasket = document.querySelector("#menuWithBasket");
let isBasket = false; //장바구니가 있는지 없는지 
let now_item;
let basket;
let cartNum=0; //카트 번호 (카트에 들어간 순서)

const addedmenu = new Array(menu.length).fill(0); //추가된 메뉴를 확인하는 배열 
let num = new Array(menu.length).fill(0); //해당 메뉴의 카트번호를 저장하는 배열

for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener('click', function () {
    now_item = menu[i];

    if (!isBasket) { // 장바구니가 없을 때만 (계속 생기지 않게)
      isBasket = true;
      menuWithBasket.style.display = "flex";

      basket = document.createElement("div");
      basket.id = "basket";
      basket.innerHTML = '<p class="title">🛒장바구니<p>';
      menuWithBasket.appendChild(basket);

      cart();
      num[i]=cartNum; //해당 메뉴가 카트에 몇 번째로 들어갔는지 저장
      addedmenu[i]++;
    }
    else if (isBasket) {
      if(addedmenu[i]<1){ // 장바구니는 이미 만들어진 상태인데, 클릭한 메뉴가 추가된 적이 없는 경우 
        cart();
        cartNum++;
        num[i]=cartNum; //해당 메뉴가 카트에 몇 번째로 들어갔는지 저장 
      }
      else { //이전에 추가된 적이 있는 경우
         amount(num[i]);
      }
      addedmenu[i]++; //해당 메뉴 추가 횟수 증가 
    }
  });
}
// 메뉴를 장바구니에 추가하는 함수 (메뉴 이름, 가격, 수량 화면 나오게)
function cart() {
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
      <button class="minusButton"> ➖ </button>
      <p class="cartAmount">1</p>
      <button class="plusButton"> ➕ </button>
      `;
    
    basket.appendChild(addToCart);
    addToCart.appendChild(menu_price);
    addToCart.appendChild(amount);
  } else {
    console.log('클래스 "name"을 가진 <p> 태그가 존재하지 않습니다.');
  }
}

//카트번호를 매개변수로 받아서 수량을 변경하는 함수(메뉴에 해당하는 카트번호의 수량을 변경) => 메뉴를 클릭했을 때 변경
function amount(number){
  const currentAddToCart = document.querySelectorAll('.addToCart')[number]; // 현재 추가된 요소에 대한 참조
  const currentAmountParagraph = currentAddToCart.querySelector('.amount p'); // 현재 추가된 요소 내의 수량 요소에 대한 참조
  currentAmountParagraph.textContent++; // 수량 업데이트
}

// 현재 년도 가져오기 
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();