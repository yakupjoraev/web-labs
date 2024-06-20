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

function updateVideoSource() {
  const video = document.getElementById('hero-video');
  const source = document.getElementById('video-source');
  const mobileVideoSrc = './video/hero-earn-mobile.mp4';
  const desktopVideoSrc = './video/hero-earn.mp4';

  if (window.innerWidth < 767) {
    if (source.src !== mobileVideoSrc) {
      source.src = mobileVideoSrc;
      video.load();  // Перезагрузить видео с новым источником
    }
  } else {
    if (source.src !== desktopVideoSrc) {
      source.src = desktopVideoSrc;
      video.load();  // Перезагрузить видео с новым источником
    }
  }
}

// Начальная установка
updateVideoSource();

// Обновление при изменении размера окна
window.addEventListener('resize', updateVideoSource);



document.addEventListener('DOMContentLoaded', function () {

  const container = document.querySelector('.nums');

  if (!container) {
    return;
  }

  const counters = document.querySelectorAll('.nums__item-num');
  if (counters.length === 0) {
    return;
  }

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
        setTimeout(updateCount, 20); // Задержка 20мс между обновлениями
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
