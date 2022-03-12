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

// swiper on page 'about'
const aboutSwiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 12,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: false,
  },
});

// swiper on page 'onenews'
const oneNewsSwiper = new Swiper('.onenews', {
  slidesPerView: 'auto',
  spaceBetween: 26,
  breakpoints: {
    1024: {
      spaceBetween: 40
    }
  },
});

// go to 'one-project' page when click on div with its image
const projects = document.querySelectorAll('.projects__project');
if (projects) {
  projects.forEach(project => project.addEventListener('click', () => {
    window.open(project.dataset.url)
  }));
}

// preloader
function changeLoadPercentage() {
  let preloader = document.querySelector('.preloader');
  let percentage = document.querySelector('#percentage');
  if (percentage) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      percentage.textContent = '30%';
    }, 500);
    setTimeout(() => {
      percentage.textContent = '100%';
    }, 1000);
    setTimeout(() => {
      percentage.textContent = '';
      document.querySelector('#preloader-static').textContent = 'HILIGHT';
    }, 1500);
    setTimeout(() => {
      document.body.classList.add('loaded_hiding');
    }, 2000);
    setTimeout(() => {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
      document.body.style.overflow = 'auto';
    }, 2500);
  }
}

window.addEventListener('load', changeLoadPercentage);