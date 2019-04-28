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
    $("#reviewModal p").text(desc);
    $("#reviewModal").modal("open");
}