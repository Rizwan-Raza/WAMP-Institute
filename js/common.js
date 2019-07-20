$(document).ready(function () {
    992 >= window.innerWidth && $(".sidenav").removeClass("hide"), $(".sidenav").sidenav();

    $(".modal").modal();
    $(".tooltipped").tooltip();

    $("#signupModal form").submit(e => {
        e.preventDefault();
        // console.log($(e.target).serialize());
        // if ($("#partitioned").val().trim() * 2 - 100000 != sessionStorage.getItem("userHash")) {
        //     M.toast({
        //         html: "OTP mismatched, try again"
        //     });
        //     return;
        // }
        // sessionStorage.removeItem("userHash");

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
    setTimeout(() => {
        $("#congratsModal").modal("open");
    }, 2 * 60 * 1000);
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

function sendOTP() {

    if ($("#c_name").val().length == 0 || $("#c_email").val().length == 0) {
        M.toast({
            html: "Fill each fields first"
        });
        return;
    }
    if ($("#c_number").val().length < 10) {
        M.toast({
            html: "Enter valid number"
        });
        $("#c_number").get(0).focus();
        return;
    }
    var otp = Math.floor(100000 + Math.random() * 900000);
    sessionStorage.setItem("userHash", otp * 2 - 100000);
    $.ajax({
        url: "services/send-otp.php",
        method: "POST",
        data: {
            number: $("#c_number").val().trim(),
            otp: otp,
        },
        beforeSend: () => {
            $("#signupModal .progress-holder, #signupModal .prevent-overlay").removeClass("hide");
        },
        success: (data, status) => {
            console.log(data, status);
            var object = JSON.parse(data);
            if (object.status == "OK") {
                M.toast({
                    html: "OTP Send Successfully"
                });
                $("#c_name").attr("readonly", "readonly");
                $("#c_email").attr("readonly", "readonly");
                $("#c_numner~button").text("Send OTP again");
                $("#otp-field").removeClass("hide");
                $("#signupModal button[type='submit']").removeAttr("disabled");
            } else {
                M.toast({
                    html: data.message
                });
            }
            // var object = JSON.parse(data);
            // M.toast({
            //     html: object.message
            // });

            // if (object.status == "success") {
            //     $("#signupModal h4").text("Thanks for requesting a demo");
            //     $("#signupModal p").html("Expect to hear from us shortly to schedule your Demo. <br /><br />In the meantime, check out the <a href='https://blog.wampinstitute.in'>WAMP Institute Blog</a> for in-depth marketing tips, knowledge and insights");
            //     $("#signupModal form").remove();
            //     $("#signupModal p").after("<button class='btn modal-close waves-effect waves-light bg-primary right my-2'>Close</button>");
            // }
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
}

function rewardsRedirect() {
    $("#congratsModal").modal("close");
    $("#signupModal").modal("open");
}