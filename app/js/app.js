// Slider
const mySwiper = new Swiper(".swiper-container", {
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  effect: "fade",
});

// Scroll
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// Modal

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close");
let canOpened = true;

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 500 && canOpened) {
    modal.classList.add("show");
  } else if (scrollTop < 500 && canOpened) {
    modal.classList.remove("show");
  } else if (!canOpened) {
    modal.classList.remove("show");
  }
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  canOpened = false;
});
