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
const addedmenu = new Array(menu.length).fill(0); //추가된 메뉴를 확인하는 배열 

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
      addedmenu[i]++;
    }
    else if (isBasket) {
      if(addedmenu[i]<1)
        cart();
      addedmenu[i]++;
    }
    console.log(i, addedmenu[i]);
  });
}
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
        <button> ➖ </button>
        <p class="cartAmount">아직못함</p>
        <button> ➕ </button>
        `;
      basket.appendChild(addToCart);
      addToCart.appendChild(menu_price);
      addToCart.appendChild(amount);
    } else {
      console.log('클래스 "name"을 가진 <p> 태그가 존재하지 않습니다.');
    }
}

// 현재 년도 가져오기 
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();