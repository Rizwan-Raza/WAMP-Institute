$(() => {
    $("#register").submit(e => {
        e.preventDefault();
        $.ajax({
            url: "admin/services/register.php",
            method: "POST",
            data: $(e.target).serialize(),
            beforeSend: () => {
                $("#addNewStudent .progress-holder, #addNewStudent .prevent-overlay").removeClass("hide");
            },
            success: (data, status) => {
                // console.log(data, status);
                var object = JSON.parse(data);
                M.toast({
                    html: object.message
                });

                if (object.status == "username_error") {
                    e.target.username.focus();
                    return;
                }
                e.target.reset();
            },
            error: (data, status) => {
                console.log(data, status);
            },
            complete: () => {
                $("#addNewStudent .progress-holder, #addNewStudent .prevent-overlay").addClass("hide");
            }
        });
    });

    $("#feeArea select").change(updateAmount);
    $("#feeArea #add_s_fee").keyup(updateAmount);

});

function updateAmount(e) {
    let fee = +$("#add_s_fee").val();
    let gstAdded = ((fee * $("#feeArea select").val()) / 100) + fee;
    $("#feeArea .helper-text").html("Payable Amount: <b> &#8377; " + gstAdded + "</b>");
    $("#feeArea input[name='pay_amount']").val(gstAdded);

}