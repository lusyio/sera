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
            block: 'start',
        })
    })
}

// Modal

const modal = document.querySelector('.modal')
const benefits = document.querySelector('.benefits')
const closeBtn = document.querySelector('.modal__close')

window.addEventListener('scroll', function () {
    // document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px'

    // Расстояние от края окна
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    console.log(scrollTop)
    // Расстояние от края окна до элемента
    let distance = benefits.getBoundingClientRect()
    console.log(distance)

    if (scrollTop > distance) {
        modal.classList.add('show')
    } else {
        modal.classList.remove('show')
    }
})

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show')
})

// $(document).on('scroll', function () {
//     if ($(window).scrollTop() > $('.benefits').scrollTop()) {
//         $('.modal').show()
//     } else {
//         $('.modal').hide()
//     }
// })

// $('.modal__close').on('click', function (e) {
//     $('.modal').hide()
// })
