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


// sticky header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY >= 1) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});