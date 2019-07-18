var playing = false;
var nextVideo;
$(document).ready(function () {
    $('#testimonial .carousel').carousel({
        padding: 100,
        numVisible: 3,
        dist: 0
    });
    $("#about .carousel").carousel({
        numVisible: 3,
        dist: -200
    });

    $("#about .carousel .active").on("mouseenter", videoPlayed);
    $("#about .carousel").on("mouseenter", stopping);
    $("#about .carousel").on("mouseleave", starting);

    function stopping(e) {
        console.log("Scolling Stopped");
        clearTimeout(nextVideo);
    }
    function starting(e) {
        console.log("Scrolling Started");
        autoplay();
    }

    autoplay();
    autoplayTest();

    function autoplay() {
        if (!playing) {
            $('#about .carousel').carousel('next');
            nextVideo = setTimeout(autoplay, 4500);
        } else {
            clearTimeout(nextVideo);
        }
    }
    function videoPlayed() {
        playing = true;
        console.log("Played Video");
        clearTimeout(nextVideo);
    }

    function autoplayTest() {
        $('#testimonial .carousel').carousel('next');
        setTimeout(autoplayTest, 4500);
    }
});

function openReview(title, desc) {
    $("#reviewModal h4").text(title);
    $("#reviewModal p").html(desc);
    $("#reviewModal").modal("open");
}

var video_wrapper = $('.youtube-video-place');
//  Check to see if youtube wrapper exists
if (video_wrapper.length) {
    // If user clicks on the video wrapper load the video.
    $('.play-youtube-video, .play-icon').on('click', e => {
        /* Dynamically inject the iframe on demand of the user.
         Pull the youtube url from the data attribute on the wrapper element. */
        var video = $(e.target).closest(".youtube-video-place");
        video.html('<iframe allowfullscreen frameborder="0" class="yt-video" src="' + video.data('yt-url') + '"></iframe>');
        video.removeClass("yt-video");
    });
}

var b = [].slice.call(document.querySelectorAll(".lazy-background")); if ("IntersectionObserver" in window) { let g = new IntersectionObserver(function (h) { h.forEach(function (j) { j.isIntersecting && (j.target.classList.add("visible"), g.unobserve(j.target)) }) }); b.forEach(function (h) { g.observe(h) }) } var c = [].slice.call(document.querySelectorAll("img.lazy")); if ("IntersectionObserver" in window) { let g = new IntersectionObserver(function (h) { h.forEach(function (j) { if (j.isIntersecting) { let k = j.target; k.src = k.dataset.src, k.srcset = k.dataset.srcset, k.classList.remove("lazy"), g.unobserve(k) } }) }); c.forEach(function (h) { g.observe(h) }) } else;