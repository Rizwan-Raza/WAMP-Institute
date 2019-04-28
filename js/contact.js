$("#contact_form").submit(e => {
    e.preventDefault();
    // console.log($(e.target).serialize());

    $.ajax({
        url: "services/contact.php",
        method: "POST",
        data: $(e.target).serialize(),
        beforeSend: () => {
            $("#contact_form .progress-holder, #contact_form .prevent-overlay").removeClass("hide");
        },
        success: (data, status) => {
            console.log(data, status);
            var object = JSON.parse(data);
            M.toast({
                html: object.message
            });
        },
        error: (data, status) => {
            M.toast({
                html: data
            });
            console.log(data, status);
        },
        complete: () => {
            $("#contact_form .progress-holder, #contact_form .prevent-overlay").addClass("hide");
        }
    });
});