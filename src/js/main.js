'use strict';


// rotate burger menu button and open navigation
const burgerMenuBtn = document.querySelector('.menu__burger');
const navigation = document.querySelector('.navigation');
burgerMenuBtn.addEventListener('click', () => {
  if (burgerMenuBtn) {
    burgerMenuBtn.classList.toggle('_active');
    navigation.classList.toggle('_active');
    document.body.classList.toggle('_lock');
  }
});