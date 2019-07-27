var video_wrapper = $('.youtube-video-place');
//  Check to see if youtube wrapper exists
if (video_wrapper.length) {
    // If user clicks on the video wrapper load the video.
    $('.play-youtube-video, .play-icon').on('click', e => {
        /* Dynamically inject the iframe on demand of the user.
         Pull the youtube url from the data attribute on the wrapper element. */
        var video = $(e.target).closest(".youtube-video-place");
        video.html('<iframe allowfullscreen frameborder="0" class="yt-video full" src="' + video.data('yt-url') + '"></iframe>');
        video.removeClass("yt-video");
    });
}
var playing = false;
$(() => {
    $(".carousel").carousel();
    $('select').formSelect();

    $('.dropdown-trigger').dropdown({ constrainWidth: false });

    $("#reviews .carousel .active").on("mouseenter", videoPlayed);
    $("#reviews .carousel").on("mouseenter", stopping);
    $("#reviews .carousel").on("mouseleave", starting);

    $("#testimonial .carousel").on("mouseenter", stoppingT);
    $("#testimonial .carousel").on("mouseleave", startingT);

    function stopping(e) {
        // console.log("Scolling Stopped");
        clearTimeout(nextVideo);
    }
    function starting(e) {
        // console.log("Scrolling Started");
        autoplay();
    }
    function stoppingT(e) {
        // console.log("Scolling Stopped");
        clearTimeout(testimonialTimeout);
    }
    function startingT(e) {
        // console.log("Scrolling Started");
        autoplayTest();
    }

    autoplay();
    autoplayTest();

    function autoplay() {
        if (!playing) {
            $('#reviews .carousel').carousel('next');
            nextVideo = setTimeout(autoplay, 4500);
        } else {
            clearTimeout(nextVideo);
        }
    }


    function autoplayTest() {
        $('#testimonial .carousel').carousel('next');
        testimonialTimeout = setTimeout(autoplayTest, 8000);
    }

    function videoPlayed() {
        playing = true;
        // console.log("Played Video");
        clearTimeout(nextVideo);
    }




    var onRight = false;
    if (window.innerWidth > 720) {
        $(document).scroll((e) => {

            if ($(e.target).scrollTop() > 50) {
                if (!onRight) {
                    $("#phoneDisplay").animate({
                        "left": window.innerWidth > 992 ? "300px" : "42px"
                    }, 200);
                    onRight = true;
                }
            } else if (0 < $(e.target).scrollTop() <= 50) {
                if (onRight) {
                    $("#phoneDisplay").animate({
                        "left": "0px"
                    }, 200);
                    onRight = false;
                }
            }
        });
    } else {
        M.toast({
            html: '<span><i class="material-icons left">phone</i>Call Us: <a href="tel:+91-11-47020038" class="fw-500">+91-11-47020038, <br />+91 9990067806</a></span><button class="btn-flat toast-action" onclick="M.Toast.dismissAll();"><i class="material-icons">close</i></button>',
            displayLength: Infinity,
            classes: 'border-radius-0'
        });
    }

    var b = [].slice.call(document.querySelectorAll(".lazy-background"));
    if ("IntersectionObserver" in window) {
        let g = new IntersectionObserver(function (h) {
            h.forEach(function (j) {
                j.isIntersecting && (j.target.classList.add("visible"), g.unobserve(j.target))
            })
        });
        b.forEach(function (h) {
            g.observe(h)
        })
    }
    var c = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
        let g = new IntersectionObserver(function (h) {
            h.forEach(function (j) {
                if (j.isIntersecting) {
                    let k = j.target;
                    k.src = k.dataset.src, k.srcset = k.dataset.srcset, k.classList.remove("lazy"), g.unobserve(k)
                }
            })
        });
        c.forEach(function (h) {
            g.observe(h)
        })
    } else;

    $(".home-banner form").submit(e => {
        e.preventDefault();
        console.log(e.target);
    });

    $(".home-banner form").submit(e => {
        e.preventDefault();
        // console.log($(e.target).serialize());
        // if ($(".home-banner #partitioned").val().trim() * 2 - 100000 != sessionStorage.getItem("userHash")) {
        //     M.toast({
        //         html: "OTP mismatched, try again"
        //     });
        //     return;
        // }
        // sessionStorage.removeItem("userHash");

        $.ajax({
            url: "services/xquery.php",
            method: "POST",
            data: $(e.target).serialize(),
            beforeSend: () => {
                $(".home-banner .progress-holder, .home-banner .prevent-overlay").removeClass("hide");
            },
            success: (data, status) => {
                console.log(data, status);
                var object = JSON.parse(data);
                M.toast({
                    html: object.message
                });

                if (object.status == "success") {
                    $(".home-banner form").get(0).reset();
                }
            },
            error: (data, status) => {
                M.toast({
                    html: data
                });
                console.log(data, status);
            },
            complete: () => {
                $(".home-banner .progress-holder, .home-banner .prevent-overlay").addClass("hide");
            }
        });
    });
    // var obj = document.getElementById('partitioned');
    // obj.addEventListener('keydown', stopCarret);
    // obj.addEventListener('keyup', stopCarret);

    // function stopCarret() {
    //     if (obj.value.length > 5) {
    //         setCaretPosition(obj, 5);
    //     }
    // }

    // function setCaretPosition(elem, caretPos) {
    //     if (elem != null) {
    //         if (elem.createTextRange) {
    //             var range = elem.createTextRange();
    //             range.move('character', caretPos);
    //             range.select();
    //         }
    //         else {
    //             if (elem.selectionStart) {
    //                 elem.focus();
    //                 elem.setSelectionRange(caretPos, caretPos);
    //             }
    //             else
    //                 elem.focus();
    //         }
    //     }
    // }

});

// function sendOTP_top() {
//     if ($("#xq_f_name").val().length == 0 || $("#xq_email").val().length == 0) {
//         M.toast({
//             html: "Fill each fields first"
//         });
//         return;
//     }
//     if ($("#xq_number").val().length < 10) {
//         M.toast({
//             html: "Enter valid number"
//         });
//         $("#xq_number").get(0).focus();
//         return;
//     }
//     var otp = Math.floor(100000 + Math.random() * 900000);
//     sessionStorage.setItem("userHash", otp * 2 - 100000);
//     $.ajax({
//         url: "services/send-otp.php",
//         method: "POST",
//         data: {
//             number: $("#xq_number").val().trim(),
//             otp: otp,
//         },
//         beforeSend: () => {
//             $(".home-banner .progress-holder, .home-banner .prevent-overlay").removeClass("hide");
//         },
//         success: (data, status) => {
//             console.log(data, status);
//             var object = JSON.parse(data);
//             if (object.status == "OK") {
//                 M.toast({
//                     html: "OTP Send Successfully"
//                 });
//                 $("#xq_f_name").attr("readonly", "readonly");
//                 $("#xq_l_name").attr("readonly", "readonly");
//                 $("#xq_email").attr("readonly", "readonly");
//                 $("#xq-otp-field").removeClass("hide");
//                 $("#xq_numner~button").attr("disabled", "disabled");

//                 $(".home-banner button[type='submit']").removeAttr("disabled");

//                 let seconds = 59;
//                 var timer = setInterval(() => {
//                     $("#xq_numner~button").text("00:" + ("0" + seconds--).slice(-2) + "s");
//                     if (seconds < 0) {
//                         clearInterval(timer);
//                         $("#xq_numner~button").removeAttr("disabled");
//                         $("#xq_numner~button").text("Send OTP again");
//                     }
//                 }, 1000);
//             } else {
//                 M.toast({
//                     html: data.message
//                 });
//             }

//         },
//         error: (data, status) => {
//             M.toast({
//                 html: data
//             });
//             console.log(data, status);
//         },
//         complete: () => {
//             $(".home-banner .progress-holder, .home-banner .prevent-overlay").addClass("hide");
//         }
//     });
// }
function openReview(title, desc) {
    $("#reviewModal h4").text(title);
    $("#reviewModal p").html(desc);
    $("#reviewModal").modal("open");
}
