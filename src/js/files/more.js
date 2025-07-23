export default function more() {
  const containers = document.querySelectorAll(".container-more");

  if (containers.length) {
    containers.forEach((container) => {
      const btn = container.querySelector("[data-more-btn]");
      const count = +container.dataset.countShow;
      const lengthItems = container.querySelectorAll("[data-more-item]").length;

      if (count >= lengthItems && btn) btn.remove()

      btn.addEventListener("click", () => {
        const items = container.querySelectorAll("[data-more-item]");
        const hideItems = Array.from(items).filter(
          (item) => window.getComputedStyle(item).display === "none"
        );

        hideItems.splice(0, count).forEach((item) => {
          item.style.display = "block";

          setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = "translateY(0)";
          });
        });

        if (hideItems.length <= 0) btn.remove();
      });
    });
  }
}
