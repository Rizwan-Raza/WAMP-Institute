var approveUserRow;
function approveUser(_sid, elem) {
    $("#approveModal #stu_id").val(_sid);
    $("#approveModal").modal("open");
    approveUserRow = elem;
}

$(() => {
    M.AutoInit();
    $("#approveModal form").submit(e => {
        $("#approveModal").modal("close");
        let elem = $(approveUserRow).closest("tr");
        e.preventDefault();
        $.ajax({
            url: "admin/services/approve-user.php",
            method: "POST",
            data: $(e.target).serialize(),
            beforeSend: () => {
                elem.css("opacity", 0.5);
                // $("#progress, .prevent-overlay").removeClass("hide");
            },
            success: (data, status) => {
                // console.log(data, status);
                var object = JSON.parse(data);
                M.toast({
                    html: object.message
                });
                if (object.status == "server_error") {
                    elem.css("opacity", 1);
                    return;
                } else if (object.status == "success") {
                    elem.slideUp();
                }
            },
            error: (data, status) => {
                console.log(data, status);
                elem.css("opacity", 1);
            },
            complete: () => {
                elem.css("opacity", 1);
                // $("#progress, .prevent-overlay").addClass("hide");
            }
        });

    });
    $("#feeArea select").change(updateAmount);
    $("#feeArea #feetopay").keyup(updateAmount);

});

function updateAmount(e) {
    let fee = +$("#feetopay").val();
    let gstAdded = ((fee * $("#feeArea select").val()) / 100) + fee;
    $("#feeArea .helper-text").html("Payable Amount: <b> &#8377; " + gstAdded + "</b>");
    $("#feeArea input[name='pay_amount']").val(gstAdded);

}

function deleteUser(_sid, elem) {
    let answer = confirm("Are you sure, you want to delete this request?");
    if (answer) {
        elem = $(elem).closest("tr");
        $.ajax({
            url: "admin/services/delete-user.php",
            method: "POST",
            data: {
                _sid: _sid
            },
            beforeSend: () => {
                elem.css("opacity", 0.5);
                // $("#progress, .prevent-overlay").removeClass("hide");
            },
            success: (data, status) => {
                // console.log(data, status);
                var object = JSON.parse(data);
                M.toast({
                    html: object.message
                });
                if (object.status == "success") {
                    elem.slideUp();
                }
            },
            error: (data, status) => {
                console.log(data, status);
            },
            complete: () => {
                elem.css("opacity", 1);
                // $("#progress, .prevent-overlay").addClass("hide");
            }
        });
    }
}
