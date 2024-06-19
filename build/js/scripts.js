// Custom Scripts
// Custom scripts

// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)


function btnAnimation() {
  let btns = document.querySelectorAll('.btn');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('animation');

      setTimeout(() => {
        btn.classList.remove('animation');
      }, 1500); // 1000 миллисекунд = 1 секунда
    });
  });
}

btnAnimation();




document.addEventListener('DOMContentLoaded', function () {

  const container = document.querySelector('.nums');

  if (!container) {
    return null
  }

  const counters = document.querySelectorAll('.nums__item-num');
  const speed = 100; // Скорость анимации

  const options = {
    threshold: 0.5 // Порог видимости (50%)
  };

  function animateCountUp(element) {
    const targetStr = element.getAttribute('data-target');
    const hasPlus = targetStr.includes('+');
    const target = parseInt(targetStr.replace('+', ''), 10);
    const increment = target / speed;

    function updateCount() {
      const current = parseInt(element.innerText.replace('+', ''), 10);
      if (current < target) {
        element.innerText = Math.ceil(current + increment) + (hasPlus ? '+' : '');
        requestAnimationFrame(updateCount);
      } else {
        element.innerText = target + (hasPlus ? '+' : '');
      }
    }

    updateCount();
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCountUp(counter);
        observer.unobserve(counter);
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
  });
});

function reviewsSlider() {
  const container = document.querySelector('.reviews');

  if (!container) {
    return null
  }

  const swiper = new Swiper(".reviews__slider", {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".reviews__slider-arrow--next",
      prevEl: ".reviews__slider-arrow--prev",
    },
    pagination: {
      el: ".reviews__slider-pagination",
      type: "fraction",
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        centeredSlides: true,
        slidesPerView: 1,
      },

      // when window width is >= 767
      767: {
        spaceBetween: 0,
        autoHeight: true,
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },

        pagination: {
          el: ".reviews__slider-pagination",
          type: "bullets",
        },
      }
    }
  });
}

reviewsSlider();



function projectsSlider() {
  const swiper = new Swiper(".projects__main", {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".projects__arrow--next",
      prevEl: ".projects__arrow--prev",
    },
    pagination: {
      el: ".projects__scrollbar",
      type: "fraction",
    },
    mousewheel: {
      sensitivity: 1,
      forceToAxis: true,
    },
    breakpoints: {
      320: {
        centeredSlides: true,
        slidesPerView: 1,
      },
      767: {
        spaceBetween: 20,
        grabCursor: true,
        centeredSlides: false,
        slidesPerView: 2,
        direction: "horizontal",
        scrollbar: {
          el: '.projects__scrollbar',
          draggable: true,
          snapOnRelease: true,
          dragSize: 'auto',
        },
      },
      991: {
        spaceBetween: 20,
        grabCursor: true,
        centeredSlides: false,
        slidesPerView: 3,
        direction: "horizontal",
        scrollbar: {
          el: '.projects__scrollbar',
          draggable: true,
          snapOnRelease: true,
          dragSize: 'auto',
        },
      }
    },
    on: {
      reachEnd: function () {
        // Разрешить скроллинг страницы, когда пользователь доскроллил до конца слайдера
        document.body.classList.remove('hidden');
      },
      slideChange: function () {
        if (!swiper.isEnd) {
          // Запретить скроллинг страницы, когда слайдер в движении
          document.body.classList.add('hidden');
        }
      }
    }
  });

  const projectsSection = document.querySelector('.projects');
  let isScrolling = false;
  let hasHiddenClassBeenAdded = false;
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const sectionTop = projectsSection.getBoundingClientRect().top;
    const sectionBottom = projectsSection.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    const sectionMidpoint = (sectionTop + sectionBottom) / 2;
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      // Скролл вниз
      if (!hasHiddenClassBeenAdded && sectionMidpoint < viewportHeight / 2 && sectionMidpoint > 0) {
        // Если середина секции находится в середине экрана, заблокировать скроллинг страницы
        document.body.classList.add('hidden');
        hasHiddenClassBeenAdded = true;
      }
    } else {
      // Скролл вверх
      if (hasHiddenClassBeenAdded && (sectionBottom <= 0 || sectionTop >= viewportHeight)) {
        // Разрешить скроллинг страницы, если пользователь вышел из секции проектов
        document.body.classList.remove('hidden');
        hasHiddenClassBeenAdded = false;
      }
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Не позволяем lastScrollTop быть отрицательным
  });

  // Добавить управление слайдами при скролле
  window.addEventListener('wheel', function (e) {
    if (document.body.classList.contains('hidden') && !isScrolling) {
      isScrolling = true;
      if (e.deltaY > 0) {
        swiper.slideNext();
      } else {
        swiper.slidePrev();
      }
      setTimeout(() => { isScrolling = false; }, 600); // Задержка для завершения анимации слайда
    }
  });
}

projectsSlider();




function clientsSlider() {
  const swiper = new Swiper(".clients__slider", {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".clients__arrow--next",
      prevEl: ".clients__arrow--prev",
    },
    pagination: {
      el: ".clients__scrollbar",
      type: "fraction",
    },
    mousewheel: {
      sensitivity: 1,
      forceToAxis: true,
    },
    breakpoints: {
      320: {
        centeredSlides: true,
        slidesPerView: 1,
      },
      767: {
        spaceBetween: 20,
        grabCursor: true,
        centeredSlides: false,
        slidesPerView: 6,
        direction: "horizontal",
        scrollbar: {
          el: '.clients__scrollbar',
          draggable: true,
          snapOnRelease: true,
          dragSize: 'auto',
        },
      }
    },
  });

}

clientsSlider();


const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const modals = document.querySelectorAll('.modal');
const body = document.querySelector('body')

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modalId;
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    body.classList.add('locked');
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
    body.classList.remove('locked');
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
    body.classList.remove('locked');
  }
});


customSelect('select');
