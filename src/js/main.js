// Custom scripts

// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body');

  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active');
      burger.classList.add('active-burger');
      body.classList.add('hidden');
    } else {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('hidden');
    }
  });

  // Снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item');
  const menuItemBtn = document.querySelectorAll('.menu__item-btn');

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      if (item.classList.contains('menu__item-btn')) {
        setTimeout(() => {
          menu.classList.remove('active');
          burger.classList.remove('active-burger');
          body.classList.remove('hidden');
        }, 800);
      } else {
        menu.classList.remove('active');
        burger.classList.remove('active-burger');
        body.classList.remove('hidden');
      }
    });
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
    }
  });
}

burgerMenu();


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

function dateInputs() {
  // Получаем все элементы с атрибутом data-date-input
  const dateInputs = document.querySelectorAll('[data-mask-input]');

  if (!dateInputs) {
    return null
  }

  // Проходимся по каждому элементу и создаем для него экземпляр IMask
  dateInputs.forEach(dateInput => {
    IMask(dateInput, {
      mask: "+{7}(000)000-00-00",
    });
  });

}
dateInputs();


// validate////////////////////////////////////////////////////////////////////////////////////////////////////////

function validateForm() {
  let forms = document.querySelectorAll('.form__main');

  forms.forEach(form => {
    form.setAttribute('novalidate', true); // Disable native form validation

    let formInputs = form.querySelectorAll('.js-input');
    const inputEmail = form.querySelector('.js-input-email');
    const inputPhone = form.querySelector('.js-input-phone');

    function validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
      let re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      return re.test(String(phone));
    }

    form.onsubmit = function (event) {
      event.preventDefault();  // Prevent the default form submission

      let emailVal = inputEmail.value,
        phoneVal = inputPhone.value,
        isValid = true;

      formInputs.forEach(function (input) {
        if (input.value === '') {
          input.classList.add('error');
          console.log('input not filled');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });

      form.querySelectorAll('.form__select').forEach(function (select) {
        if (select.value === '' || select.value === 'Выберите услугу') {
          select.classList.add('error');
          console.log('select not valid');
          isValid = false;
        } else {
          select.classList.remove('error');
        }
      });

      if (!validateEmail(emailVal)) {
        console.log('email not valid');
        inputEmail.classList.add('error');
        isValid = false;
      } else {
        inputEmail.classList.remove('error');
      }

      if (!validatePhone(phoneVal)) {
        console.log('phone not valid');
        inputPhone.classList.add('error');
        isValid = false;
      } else {
        inputPhone.classList.remove('error');
      }

      if (isValid) {
        // Send form data to the server using AJAX
        const formData = new FormData(form);
        fetch('mail.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())
          .then(data => {
            console.log('Success:', data);

            // Clear form fields
            formInputs.forEach(input => {
              input.value = '';
            });

            form.querySelectorAll('.form__select').forEach(select => {
              select.value = '';
            });

            // Hide all modals
            document.querySelectorAll('.modal').forEach(modal => {
              modal.classList.remove('show');
            });

            // Show the complete modal
            const completeModal = document.querySelector('.modal-complete');
            completeModal.classList.add('show');
            document.body.classList.add('locked');

            // Hide the complete modal after 3 seconds
            setTimeout(() => {
              completeModal.classList.remove('show');

              // Check if any modals are still open
              if (!document.querySelector('.modal.show')) {
                document.body.classList.remove('locked');
              }
            }, 3000);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        console.log('form not valid');
      }
    };
  });
}

validateForm();
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const modals = document.querySelectorAll('.modal');
const body = document.querySelector('body');

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

    // Check if any modals are still open
    if (!document.querySelector('.modal.show')) {
      body.classList.remove('locked');
    }
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');

    // Check if any modals are still open
    if (!document.querySelector('.modal.show')) {
      body.classList.remove('locked');
    }
  }
});



customSelect('select');