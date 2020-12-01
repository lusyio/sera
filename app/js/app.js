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

// const modal = document.querySelector(".modal");
// const closeBtn = document.querySelector(".modal__close");
// let canOpened = true;

// window.addEventListener("scroll", function () {
//     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop > 500 && canOpened) {
//         modal.classList.add("show");
//     } else if (scrollTop < 500 && canOpened) {
//         modal.classList.remove("show");
//     } else if (!canOpened) {
//         modal.classList.remove("show");
//     }
// });

// closeBtn.addEventListener("click", () => {
//     modal.classList.remove("show");
//     canOpened = false;
// });


const successMessage = document.querySelector('.success-message');
const successMessageClose = document.querySelector('.success-message-close');
const errorMessage = document.querySelector('.error-message');
const errorMessageClose = document.querySelector('.error-message-close');

successMessageClose.addEventListener('click', () => {
    successMessage.classList.remove('show');
})

errorMessageClose.addEventListener('click', () => {
    errorMessage.classList.remove('show');
})


jQuery(($) => {
    $("#phone").mask("+9 (999) 999-9999");
    const $form = $('#feedbackSubmit')
    $form.on('submit', (e) => {
        e.preventDefault()
        const data = {
            action: 'offer'
        }
        $form.serializeArray().map((item) => {
            data[item.name] = item.value
        })
        $.ajax({
            type: "POST",
            url: '/ajax.php',
            data,
            success: data => {
                $form[0].reset()
                successMessage.classList.add('show')
            },
            error: e => {
                errorMessage.classList.add('show')
            }
        });
    })
})
