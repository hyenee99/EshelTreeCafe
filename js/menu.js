import beverages from '../data/beverages.js';
import others from '../data/others.js';

//음료 사진 추가하는 부분
const beverageEl= document.querySelector('.menu_page .beverage')
let count=0;
let menu_list;
beverages.forEach(function(beverage) {
  if(count===0||count%4===0) {
    menu_list= document.createElement('div');
    menu_list.classList.add('menu_list');
    beverageEl.appendChild(menu_list);
  }
  menu_list.classList.add(`${beverage.line}`); //변수 사용할 때 => `` 백틱 사용 !!!!!!!
  const itemEl=document.createElement('div');
  itemEl.classList.add('menu_type');
  itemEl.innerHTML = `
     <img src="${beverage.thumbnail}" alt="${beverage.name}" />
     <p>${beverage.name}</p>
     <p class="name_eng"> ${beverage.name_eng} </p>
     <p> ${beverage.price} 원 </p>
  `
  const now_menu=document.querySelector(`.${beverage.line}`); //클래스 앞에 .을 안붙여서 계속 오류남 ㅜㅜ 
  now_menu.appendChild(itemEl);
  count++;
})

// 음료 외 사진 추가하는 부분
const othersEl= document.querySelector('.others .menu_list');
others.forEach(function(other) {
  const itemEl=document.createElement('div');
  itemEl.classList.add('menu_type');
  itemEl.innerHTML = `
     <img src="${other.thumbnail}" alt="${other.name}" />
     <p>${other.name}</p>
     <p class="name_eng"> ${other.name_eng} </p>
     <p> ${other.price} 원 </p>
  `
  othersEl.appendChild(itemEl);
})


// 메뉴 부분 누르면 장바구니 나오게 
const menu= document.querySelectorAll(".menu_type");
const menuWithBasket = document.querySelector("#menuWithBasket");
let isBasket=false; //장바구니가 있는지 없는지 

for(let i=0;i<menu.length;i++) { 
  menu[i].addEventListener('click', function() {
    if(!isBasket){ // 장바구니가 없을 때만 (계속 생기지 않게)
      isBasket=true;
      menuWithBasket.style.display="flex";
      
      const basket = document.createElement("div");
      basket.id="basket";
      basket.innerHTML='<p>🛒장바구니<p>';
      menuWithBasket.appendChild(basket);
    } 
  }); 
}
// 현재 년도 가져오기 
const thisYear = document.querySelector('.this-year');
thisYear.textContent=new Date().getFullYear();