(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    $(".spoller__button").click((function() {
        const el = $(this);
        const show = el.attr("data-show");
        if (1 == show) {
            el.attr("data-show", 0);
            el.next(".spoller__content").slideUp(300);
        } else {
            el.attr("data-show", 1);
            el.next(".spoller__content").slideDown(300);
        }
    }));
    $(document).ready((function() {
        AOS.init();
    }));
    $(".icon-menu").click((function() {
        $("html").toggleClass("lock menu-open");
    }));
    $("body").on("click", ".popup__open-button", (function() {
        const popupId = $("#" + $(this).attr("rel"));
        $(popupId).addClass("popup--show");
        $("html").addClass("lock");
    }));
    $("body").on("click", ".popup__overlay, .popup__close, .popup__close-button", (function() {
        $(this).closest(".popup").removeClass("popup--show");
        if (!$(".popup").hasClass("popup--show")) $("html").removeClass("lock");
    }));
    $("body").on("click", ".menu__overlay", (function() {
        $("html").removeClass("lock menu-open");
    }));
    $(document).keyup((function(e) {
        if (27 == e.keyCode) {
            $("html").removeClass("menu-open");
            if ($(".popup--secondary").hasClass("popup--show")) $(".popup--secondary").removeClass("popup--show"); else $(".popup").removeClass("popup--show");
            if (!$(".popup").hasClass("popup--show")) $("html").removeClass("lock");
        }
    }));
    new Swiper(".benefits__slider", {
        slidesPerView: 1,
        spaceBetween: 12,
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 16
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 24
            }
        },
        loop: true,
        autoplay: {
            delay: 2500
        }
    });
    new Swiper("._page-slider", {
        slidesPerView: 1,
        spaceBetween: 12,
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 16
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 24
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        },
        loop: true,
        autoplay: {
            delay: 2500
        }
    });
    new Swiper(".partners__slider", {
        spaceBetween: 0,
        centeredSlides: true,
        speed: 6e3,
        autoplay: {
            delay: 1
        },
        loop: true,
        slidesPerView: "auto",
        allowTouchMove: false,
        disableOnInteraction: true
    });
    new Swiper(".reviews__slider", {
        slidesPerView: 1,
        spaceBetween: 12,
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 16
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24
            }
        },
        loop: true,
        autoplay: {
            delay: 4e3
        }
    });
    window["FLS"] = true;
    isWebp();
})();