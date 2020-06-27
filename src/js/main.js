let $slider;

function buildSliderConfiguration() {
    let windowWidth = $(window).width(),
        numberOfVisibleSlides;
    if (windowWidth < 768) {
        numberOfVisibleSlides = 1;
    }
    else if (windowWidth < 1300) {
        numberOfVisibleSlides = 2;
    } else {
        numberOfVisibleSlides = 3;
    }
    return {
        auto: true,
        slideWidth: 370,
        slideMargin: 15,
        moveSlides: 1,
        slideSelector: '.newsslide',
        keyboardEnabled: true,
        controls: false,
        minSlides: numberOfVisibleSlides,
        maxSlides: numberOfVisibleSlides
    };
}
function configureSlider() {
    let config = buildSliderConfiguration();

    if ($slider && $slider.reloadSlider) {
        $slider.reloadSlider(config);
    } else {
        $slider = $('#news_slider').bxSlider(config);
    }
}

let lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});

lightbox.option({
    wrapAround: true
});

$('a[href*=\\#]').on('click', function (event) {
    event.preventDefault();
    $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 800);
});

$(document).ready(function () {

    $('.nav-burger').click(function (e) {
        e.preventDefault();
        $('.nav-burger, .navbar').toggleClass('active_on_touch');
    });

    $('.nav-item a').click(function (e) {
        e.preventDefault();
        $('.nav-burger').click();
    });
    $(window).resize(function () {
        if ($(window).width() > 969 && $('.navbar').css("display") == "none") {
            $('.navbar').removeAttr("style");
        }
    });

    let map = L.map('map', {
        scrollWheelZoom: false
    }).setView([40.664213, -73.945472], 13);

    let myFilter = [
        'grayscale:90%',
        'contrast:70%',
        'brightness:110%'
    ];

    L.tileLayer = L.tileLayer.colorFilter('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        filter: myFilter
    }).addTo(map);

    L.marker([40.691212, -73.939777]).addTo(map).bindPopup("Lorem ipsum");

    $('#head_slider').bxSlider({
        mode: 'vertical',
        keyboardEnabled: true,
        controls: false
    });

    $(window).on("load", function () {
        $("a[rel='m_PageScroll2id']").mPageScroll2id({
            scrollSpeed: 800,
            scrollingEasing: "easeInOutQuint",
            autoScrollSpeed: false,
            offset: "#nav",
            highlightClass: "nav-active",
        });
    });
});

let nav = $('#nav'),
    sticky = nav.offset().top;

function navScroll() {
    if (window.pageYOffset > sticky) {
        nav.addClass('sticky');
    } else {
        nav.removeClass('sticky');
    }
}
$(window).scroll(function () {
    navScroll();
});

$(window).on("orientationchange resize", configureSlider);
configureSlider();

$('#gonext').click(function () {
    $slider.goToNextSlide();
    return false;
});

$('#goprev').click(function () {
    $slider.goToPrevSlide();
    return false;
}); 