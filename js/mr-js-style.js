// JavaScript Document

// header fixer
$(window).scroll(function() {
    if ($(this).scrollTop() > 110) {
        $('header').addClass('header_fixer');

    } else {
        $('header').removeClass('header_fixer');

    }


});




//**************owl-slider********************


$(document).ready(function() {
    var owl = $('.loop');
    owl.owlCarousel({
        stagePadding: 0,
        margin: 10,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<span class='icon-angle-right sbtn prev'></span>", "<span class='icon-angle-left sbtn next'></span>"],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },

            600: {
                items: 2
            },
            768: {
                items: 3
            },
            980: {
                items: 3
            },
            1152: {
                items: 3
            },
            1240: {
                items: 4
            }
        }
    })
});


$(document).ready(function() {
    var owl = $('.loop2');
    owl.owlCarousel({
        stagePadding: 0,
        margin: 30,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<span class='icon-angle-right sbtn prev'></span>", "<span class='icon-angle-left sbtn next'></span>"],
        responsive: {
            0: {
                items: 1
            },

            600: {
                items: 1
            },
            768: {
                items: 2
            },
            980: {
                items: 4
            },
            1152: {
                items: 4
            },
            1240: {
                items: 4
            }
        }
    })
});


$(document).ready(function() {
    var owl = $('.loop3');
    owl.owlCarousel({
        stagePadding: 0,
        margin: 30,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: false,
        responsive: {
            0: {
                items: 1
            },

            600: {
                items: 1
            },
            768: {
                items: 1
            },
            980: {
                items: 1
            },
            1152: {
                items: 1
            },
            1240: {
                items: 1
            }
        }
    })
});



// back to top scroller
$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });
    $('#back-top a').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


});