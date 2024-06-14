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

function projectsSlider() {
  const swiper = new Swiper(".projects__main", {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 20,
    direction: "vertical",
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
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        centeredSlides: true,
        slidesPerView: 1,
      },

      // when window width is >= 767
      767: {
        spaceBetween: 20,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        direction: "horizontal",

        pagination: {
          el: ".projects__scrollbar",
          type: "progressbar",
          hide: true,
        },


      }
    }
  });
}
projectsSlider();


// document.addEventListener('DOMContentLoaded', function () {
//   const projectsList = document.querySelector('.projects__list');
//   const scrollBtn = document.querySelector('.scroll__btn');
//   const scrollLine = document.querySelector('.scroll__line');
//   const projects = document.querySelectorAll('.projects__item');
//   const totalProjects = projects.length;
//   const visibleProjects = 3; // Number of visible projects initially
//   const projectWidth = projects[0].offsetWidth;
//   const maxScroll = projectWidth * (totalProjects - visibleProjects);

//   let currentScroll = 0;

//   scrollBtn.addEventListener('mousedown', function (event) {
//     const startX = event.pageX;
//     const startScroll = currentScroll;

//     function onMouseMove(event) {
//       const deltaX = event.pageX - startX;
//       currentScroll = Math.min(maxScroll, Math.max(0, startScroll + deltaX));
//       projectsList.style.transform = `translateX(-${currentScroll}px)`;
//       scrollBtn.style.left = `${(currentScroll / maxScroll) * 100}%`;
//     }

//     function onMouseUp() {
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//     }

//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
//   });

//   // Optional: Enable mouse wheel and swipe scrolling
//   let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

//   function handleScroll(event) {
//     event.preventDefault();
//     const delta = isTouchDevice ? event.touches[0].clientX - startX : event.deltaY;
//     currentScroll = Math.min(maxScroll, Math.max(0, currentScroll + delta));
//     projectsList.style.transform = `translateX(-${currentScroll}px)`;
//     scrollBtn.style.left = `${(currentScroll / maxScroll) * 100}%`;
//   }

//   if (isTouchDevice) {
//     let startX;
//     projectsList.addEventListener('touchstart', function (event) {
//       startX = event.touches[0].clientX;
//     });
//     projectsList.addEventListener('touchmove', handleScroll);
//   } else {
//     projectsList.addEventListener('wheel', handleScroll);
//   }
// });


customSelect('select');