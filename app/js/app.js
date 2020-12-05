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

function bindModal(modalSelector, closeSelector) {

    const modal = document.querySelector(modalSelector);
    const closeBtn = document.querySelector(closeSelector);
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
}

bindModal(".modal", ".modal__close");


function showSubmitMessage(messageSelector, closeSelector) {

    const message = document.querySelector(messageSelector);
    const close = document.querySelectorAll(closeSelector);

    message.classList.add('show');

    close.forEach(item => {
        item.addEventListener('click', () => {
            message.classList.remove('show')
        })
    })
}

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
                showSubmitMessage('.success-message', '.message-close')
            },
            error: e => {
                showSubmitMessage('.error-message', '.message-close')
            }
        });
    })
})

var wow = new WOW(
    {
      boxClass:     'wow',
      animateClass: 'animate__animated',
      offset:       150,
      mobile:       false,
    }
);
wow.init();