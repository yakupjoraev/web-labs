// Custom Scripts
// Custom scripts


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

customSelect('select');
