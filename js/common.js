$(document).ready(function () {
    $(".sidenav").sidenav();
    $(".modal").modal();

    $("#signupModal form").submit(e => {
        e.preventDefault();
        // console.log($(e.target).serialize());

        $.ajax({
            url: "services/demo.php",
            method: "POST",
            data: $(e.target).serialize(),
            beforeSend: () => {
                $("#signupModal .progress-holder, #signupModal .prevent-overlay").removeClass("hide");
            },
            success: (data, status) => {
                console.log(data, status);
                var object = JSON.parse(data);
                M.toast({
                    html: object.message
                });

                if (object.status == "success") {
                    $("#signupModal h4").text("Thanks for requesting a demo");
                    $("#signupModal p").html("Expect to hear from us shortly to schedule your Demo. <br /><br />In the meantime, check out the <a href='https://blog.wampinstitute.in'>WAMP Institute Blog</a> for in-depth marketing tips, knowledge and insights");
                    $("#signupModal form").remove();
                    $("#signupModal p").after("<button class='btn modal-close waves-effect waves-light bg-primary right my-2'>Close</button>");
                }
            },
            error: (data, status) => {
                M.toast({
                    html: data
                });
                console.log(data, status);
            },
            complete: () => {
                $("#signupModal .progress-holder, #signupModal .prevent-overlay").addClass("hide");
            }
        });
    });
});

function scrollToTop() {
    var body = $("html, body");

    body.stop().animate({
        scrollTop: 0
    }, body.get(0).scrollHeight / 10, 'swing');
}

function popOut(elem) {
    let element = $(elem).find(".small-drop");
    if (element.css("height") == 0 || element.css("height") == "0px") {
        element.animate({
            height: "144px",
            opacity: "1"
        },
            200
        );
    } else {
        element.animate({
            height: "0",
            opacity: "0"
        },
            200
        );
    }
}