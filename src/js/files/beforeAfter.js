export default function beforeAfter() {
  const containers = document.querySelectorAll(".s-res__slide-gallery");

  if (containers.length) {
    containers.forEach((container) => {
      const range = container.querySelector(".s-res__slide-range");
      const imgBefore = container.querySelector(".s-res__slide-before");
      const toggle = container.querySelector(".s-res__slide-toggle");

      range.addEventListener("input", (e) => {
        const value = +e.target.value;

        imgBefore.style.width = `${value}%`;
        toggle.style.left = `${value}%`;
      });
      range.addEventListener("mousedown", () => {
        range.style.cursor = "grabbing";
      });
      range.addEventListener("mouseup", () => {
        range.style.cursor = "grab";
      });
    });
  }
}
