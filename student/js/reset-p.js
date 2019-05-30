$(() => {
    $("#resetPassword form").submit(e => {
        e.preventDefault();
        //  console.log($(e.target).serialize());
        if (e.target.password.value != e.target.c_password.value) {
            M.toast({
                html: "Password Mismatch"
            });
            e.target.password.focus();
            return;
        }

        $.ajax({
            url: "services/reset-p.php",
            method: "POST",
            data: $(e.target).serialize(),
            beforeSend: () => {
                $(".progress-holder, .prevent-overlay").removeClass("hide");
            },
            success: (data, status) => {
                var object = JSON.parse(data);
                M.toast({
                    html: object.message
                });

                if (object.status == "password_error") {
                    $("#n_password").get(0).focus();
                } else if (object.status == "success") {
                    M.toast({
                        html: "Redirecting to Signin"
                    });
                    e.target.reset();
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                }
            },
            error: (data, status) => {
                console.log(data, status);
            },
            complete: () => {
                $(".progress-holder, .prevent-overlay").addClass("hide");
            }
        });
    });

});