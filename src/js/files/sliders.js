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
}
