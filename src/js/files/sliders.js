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
      spaceBetween: 35,
      slidesPerView: 4,
      navigation: {
        prevEl: ".s-res .slider-btn._prev",
        nextEl: ".s-res .slider-btn._next",
      },
    });
  }
}
