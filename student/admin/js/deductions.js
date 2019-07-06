function getParam(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}
if (getParam("sid")) {
    $("#studId option").removeAttr("selected");
    $("#studId option[value='" + getParam("sid") + "']").attr("selected", "selected");
    $("#studId input").val($("#studId option[value='" + getParam("sid") + "']").text());
}

function editSign(_pid, amount, time) {
    $("#editSignModal #payment_id").val(_pid);
    $("#editSignModal #set_p_amount").val(amount);
    $("#editSignModal .datepicker").val(time);
    $('#editSignModal .datepicker').datepicker({
        format: "yyyy-mm-dd",
        defaultDate: new Date(time),
        setDefaultDate: true
    });
    $("#editSignModal").modal("open");
}

function deletePayment(_pid, elem) {
    let answer = confirm("Are you sure, you want to rollback this payment?");
    if (answer) {
        elem = $(elem).closest("tr");
        $.ajax({
            url: "admin/services/delete-payment.php",
            method: "POST",
            data: {
                _pid: _pid
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

$(() => {
    $("#studId").change(() => {
        if ($("#studId").val() != "*") {
            window.location.href = '/admin/deductions?sid=' + $("#studId").val();
        } else {
            window.location.href = '/admin/deductions';
        }
    });

    $("#editPaymentForm").submit(e => {
        e.preventDefault();
        $.ajax({
            url: "admin/services/edit-payment.php",
            method: "POST",
            data: $(e.target).serialize(),
            beforeSend: () => {
                $("#editSignModal .progress-holder, #editSignModal .prevent-overlay").removeClass("hide");
            },
            success: (data, status) => {
                var object = JSON.parse(data);
                M.toast({
                    html: object.message
                });

                if (object.status == "username_error") {
                    e.target.username.focus();
                    return;
                } else if (object.status == "success") {
                    e.target.reset();
                    $("#editSignModal").modal("close");
                    M.toast({
                        html: "Refreshing Payment Datatable in 3s"
                    });
                    setTimeout(() => {
                        M.toast({
                            html: "Refreshing Payment Datatable in 2s"
                        });
                        setTimeout(() => {
                            M.toast({
                                html: "Refreshing Payment Datatable in 1s"
                            });
                            setTimeout(() => {
                                document.location.reload();
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }
            },
            error: (data, status) => {
                console.log(data, status);
            },
            complete: () => {
                $("#editSignModal .progress-holder, #editSignModal .prevent-overlay").addClass("hide");
            }
        });
    });

});