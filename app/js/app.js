// Slider
const mySwiper = new Swiper('.swiper-container', {
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    effect: 'fade',
})

// Scroll
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// Modal
$(document).on('scroll', function () {
    if ($(window).scrollTop() > $('.benefits').scrollTop()) {
        $('.modal').show()
    } else {
        $('.modal').hide()
    }
})

$('.modal__close').on('click', function (e) {
    $('.modal').hide()
})