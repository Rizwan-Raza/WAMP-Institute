$("#s_signin form#signinForm").submit(e => {
    e.preventDefault();
    //  console.log($(e.target).serialize());

    $.ajax({
        url: "services/signin.php",
        method: "POST",
        data: $(e.target).serialize(),
        beforeSend: () => {
            $(".progress-holder, .prevent-overlay").removeClass("hide");
        },
        success: (data, status) => {
            console.log(data, status);
            var object = JSON.parse(data);
            M.toast({
                html: object.message
            });
            if (object.status == "pass_error") {
                e.target.password.focus();
                return;
            } else if (object.status == "server_error") {
                return;
            } else if (object.status == "success") {
                e.target.reset();
                // Get ??
                let params = (new URL(document.location)).searchParams;
                let name = params.get("redirect_to");
                window.location.href = name ? name : "/";
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

$("#s_signin form#requestForm").submit(e => {
    e.preventDefault();
    //  console.log($(e.target).serialize());

    $.ajax({
        url: "services/request.php",
        method: "POST",
        data: $(e.target).serialize(),
        beforeSend: () => {
            $(".progress-holder, .prevent-overlay").removeClass("hide");
        },
        success: (data, status) => {
            console.log(data, status);
            var object = JSON.parse(data);
            M.toast({
                html: object.message
            });
        },
        error: (data, status) => {
            console.log(data, status);
        },
        complete: () => {
            $(".progress-holder, .prevent-overlay").addClass("hide");
        }
    });
});

function togglePanels() {
    $(".card-panel.border-radius-8").toggleClass("hide");
}