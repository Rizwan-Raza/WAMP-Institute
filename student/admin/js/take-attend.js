$(() => {

    $('#globalCheckbox').click(function () {
        // console.log($(this).closest(".tooltipped"));
        if ($(this).prop("checked")) {
            $('td input[type="checkbox"]:not(:disabled)').prop("checked", true);
            $('tbody tr').addClass('active-table-row');
            $('.tool-bar').removeClass("scale-out");
            $('.tool-bar').addClass("scale-in");
            $(this).closest(".tooltipped").attr("data-tooltip", "Select None");
        } else {
            $('td input[type="checkbox"]:not(:disabled)').prop("checked", false);
            $('tbody tr').removeClass('active-table-row');
            $('.tool-bar').removeClass("scale-in");
            $('.tool-bar').addClass("scale-out");
            $(this).closest(".tooltipped").attr("data-tooltip", "Select All");
        }
    });

    $('td input[type="checkbox"]').click(function () {
        /* === Table row Background */
        if ($(this).is(":checked")) {
            $(this).closest('tr').addClass('active-table-row');
        }
        else if ($(this).is(":not(:checked)")) {
            $(this).closest('tr').removeClass('active-table-row');
        }
        /* === Toolbar Toggle */
        if ($("td input:checkbox:checked:not(:disabled)").length > 0) {
            $('.tool-bar').removeClass("scale-out");
            $('.tool-bar').addClass("scale-in");
        } else {
            $('.tool-bar').removeClass("scale-in");
            $('.tool-bar').addClass("scale-out");
        }
    });

    $("#attendanceForm").submit(e => {
        e.preventDefault();
        // console.log($(e.target).serialize());
        $.ajax({
            url: "admin/services/take-attend.php",
            method: "POST",
            data: $(e.target).serialize(),
            beforeSend: () => {
                $(".preloader-wrapper").removeClass("hide");
                $(".tool-bar").addClass("disabled");
                // $("#addNewStudent .progress-holder, #addNewStudent .prevent-overlay").removeClass("hide");
            },
            success: (data, status) => {
                // console.log(data, status);
                var object = JSON.parse(data);
                M.toast({
                    html: object.message
                });
                $("td input:checked:not(:disabled)").attr("disabled", "disabled").closest("tr").addClass("present");
                $("th input:checked").prop("checked", false);
                // if (object.status == "username_error") {
                //     e.target.username.focus();
                //     return;
                // }
                // e.target.reset();
            },
            error: (data, status) => {
                console.log(data, status);
            },
            complete: () => {
                $(".preloader-wrapper").addClass("hide");
                $(".tool-bar").removeClass("disabled");
                // $("#addNewStudent .progress-holder, #addNewStudent .prevent-overlay").addClass("hide");
            }
        });
    });
});

function markAbsense(atId, elem) {
    elem = $(elem).closest("tr");
    $.ajax({
        url: "admin/services/mark-absense.php",
        method: "POST",
        data: {
            at_id: atId
        },
        beforeSend: () => {
            elem.css("opacity", 0.5);
            // $("#addNewStudent .progress-holder, #addNewStudent .prevent-overlay").removeClass("hide");
        },
        success: (data, status) => {
            // console.log(data, status);
            var object = JSON.parse(data);
            M.toast({
                html: object.message
            });
            if (object.status == "success") {
                elem.removeClass("present").find("input:checked:disabled").removeAttr("disabled").removeAttr("checked");
            }
            // if (object.status == "username_error") {
            //     e.target.username.focus();
            //     return;
            // }
            // e.target.reset();
        },
        error: (data, status) => {
            console.log(data, status);
        },
        complete: () => {
            elem.css("opacity", 1);
            // $("#addNewStudent .progress-holder, #addNewStudent .prevent-overlay").addClass("hide");
        }
    });
}