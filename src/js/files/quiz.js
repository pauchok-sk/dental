export default function quiz() {
  const form = document.querySelector("#quiz-form");

  if (form) {
    const btnGet = document.querySelector("#quiz-get");
    const startSlide = document.querySelector("#quiz-start");
    const slides = form.querySelectorAll(".s-quiz__slide");
    const navigation = document.querySelector("#quiz-nav");
    const pagination = document.querySelector("#quiz-pagination");
    const quizEnd = document.querySelector("#quiz-end");

    const btnPrev = document.querySelector("#quiz-prev");
    const btnNext = document.querySelector("#quiz-next");

    let index = 0;

    btnGet.addEventListener("click", () => {
      hide(startSlide);

      show(slides[index]);
      show(navigation);
      show(form, "flex");
    });

    btnPrev.addEventListener("click", () => {
      if (index === 0) {
        show(startSlide);

        hide(slides[index]);
        hide(navigation);
        hide(form);
      } else {
        show(slides[index - 1]);
        hide(slides[index]);

        index = index - 1;
      }

      changePagination();
    });

    btnNext.addEventListener("click", () => {
      if (index + 1 === slides.length) {
        hide(navigation);
        hide(slides[index]);
        show(quizEnd);
      } else {
        hide(slides[index]);
        show(slides[index + 1]);
        index = index + 1;
      }

      changePagination();
    });

    // создание пагинации
    for (let i = 0; i < slides.length; i++) {
      const div = document.createElement("div");

      if (i === 0) div.classList.add("_active");

      div.addEventListener("click", () => {
        hide(slides[index]);
        show(slides[i]);

        index = i;

        changePagination();
      });

      pagination.appendChild(div);
    }

    function changePagination() {
      const items = pagination.querySelectorAll("div");
      items.forEach((d) => d.classList.remove("_active"));

      items[index].classList.add("_active");
    }

    function hide(el) {
      if (!el) return;

      el.style.opacity = 0;
      el.style.display = "none";
    }
    function show(el, showStyle) {
      if (!el) return;

      el.style.display = showStyle || "block";

      setTimeout(() => {
        el.style.opacity = 1;
      }, 10);
    }
  }
}
