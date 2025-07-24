export default function sliders() {
  const servicesNavSlider = document.querySelector(".s-services__nav-slider");

  if (servicesNavSlider) {
    const swiper = new Swiper(servicesNavSlider, {
      spaceBetween: 20,
      slidesPerView: "auto",
      navigation: {
        prevEl: ".s-services .slider-btn._prev",
        nextEl: ".s-services .slider-btn._next",
      },
      breakpoints: {
        768: {
          spaceBetween: 30,
          slidesPerView: "auto",
        },
      },
    });
  }

  const resSlider = document.querySelector(".s-res__slider");

  if (resSlider) {
    const swiper = new Swiper(resSlider, {
      speed: 800,
      spaceBetween: 20,
      slidesPerView: 1,
      navigation: {
        prevEl: ".s-res .slider-btn._prev",
        nextEl: ".s-res .slider-btn._next",
      },
      autoplay: {
        delay: 3500,
        disableOnInteraction: true,
      },
      allowTouchMove: false,
      breakpoints: {
        1100: {
          spaceBetween: 35,
          slidesPerView: 4,
          allowTouchMove: true,
        },
        768: {
          spaceBetween: 25,
          slidesPerView: 3,
          allowTouchMove: true,
        },
        480: {
          spaceBetween: 20,
          slidesPerView: 2,
          allowTouchMove: true,
        },
      },
    });
  }

  const gallerySlider = document.querySelector(".s-gallery__slider");

  if (gallerySlider) {
    const swiper = new Swiper(gallerySlider, {
      speed: 800,
      slidesPerView: "auto",
      spaceBetween: 20,
      navigation: {
        prevEl: ".s-gallery .slider-btn._prev",
        nextEl: ".s-gallery .slider-btn._next",
      },
      autoplay: {
        delay: 3500,
      },
    });
  }

  const teamSlider = document.querySelector(".s-team__slider");

  if (teamSlider) {
    const swiper = new Swiper(teamSlider, {
      speed: 800,
      slidesPerView: "auto",
      spaceBetween: 15,
      navigation: {
        prevEl: ".s-team .slider-btn._prev",
        nextEl: ".s-team .slider-btn._next",
      },
      autoplay: {
        delay: 3200,
      },
      breakpoints: {
        992: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
      },
    });
  }

  const socialSlider = document.querySelector(".s-social__slider");

  if (socialSlider) {
    const swiper = new Swiper(socialSlider, {
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        prevEl: ".s-social .slider-btn._prev",
        nextEl: ".s-social .slider-btn._next",
      },
      autoplay: {
        delay: 3200,
      },
      breakpoints: {
        992: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }
}
