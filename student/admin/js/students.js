function viewProfile(name, username, course, fee, gst, pay_amount, remain, time, hr_time) {
    $("#profileModal h4").text(`${name} (${username})`);
    $("#profileModal #stu_name").text(name);
    $("#profileModal #stu_username").text(username);
    $("#profileModal #stu_course").text(`${course == 1 ? 'Crash Course in Digital Marketing' : course == 2 ? 'Executive Digital Marketing Course' : 'Advanced Digital Marketing Course'}`);
    $("#profileModal #stu_fee").text(`${fee}`);
    $("#profileModal #stu_gst").text(`${gst}`);
    $("#profileModal #stu_pm").text(`${pay_amount}`);
    $("#profileModal #stu_remain").text(`${remain}`);
    $("#profileModal #stu_joined").text(`${time}`);
    $("#profileModal #stu_time").text(`${hr_time}`);
    $("#profileModal").modal("open");
}

function editProfile(sid, name, username, course, fee, gst, pay_amount, time) {
    $("#editModal #student_id").val(sid);
    $("#editModal #set_s_name").val(name);
    $("#editModal #set_s_username").val(username);
    $("#editModal #set_s_fee").val(fee);

    $("#editModal #feeArea select option").removeAttr("selected");
    $("#editModal #feeArea select option[value='" + gst + "']").attr("selected", "selected");
    $("#editModal #feeArea .select-wrapper input").val($("#editModal #feeArea select option[value='" + gst + "']").text());

    $("#editModal #feeArea .helper-text span").text(pay_amount);
    $("#editModal #feeArea input[name='pay_amount']").val(pay_amount);

    $("#editModal #courseSelect option").removeAttr("selected");
    $("#editModal #courseSelect option[value='" + course + "']").attr("selected", "selected");
    $("#editModal #courseSelect input").val($("#editModal #courseSelect option[value='" + course + "']").text());

    $("#editModal .datepicker").val(time);
    $('#editModal .datepicker').datepicker({
        format: "yyyy-mm-dd",
        defaultDate: new Date(time),
        setDefaultDate: true
    });
    $("#editModal").modal("open");
}
function updateAmount(e) {
    let fee = +$("#set_s_fee").val();
    let gstAdded = ((fee * $("#feeArea select").val()) / 100) + fee;
    $("#feeArea .helper-text").html("Payable Amount: <b> &#8377; " + gstAdded + "</b>");
    $("#feeArea input[name='pay_amount']").val(gstAdded);

}

function deleteUser(_sid, elem) {
    let answer = confirm("Are you sure, you want to delete this student?");
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
$(() => {
    $("#feeArea select").change(updateAmount);
    $("#feeArea #set_s_fee").keyup(updateAmount);

    $("#editModal form").submit(e => {
        e.preventDefault();
        $.ajax({
            url: "admin/services/edit-student.php",
            method: "POST",
            data: $(e.target).serialize(),
            beforeSend: () => {
                $("#editModal .progress-holder, #editModal .prevent-overlay").removeClass("hide");
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
                    $("#editModal").modal("close");
                    M.toast({
                        html: "Refreshing Student Datatable in 3s"
                    });
                    setTimeout(() => {
                        M.toast({
                            html: "Refreshing Student Datatable in 2s"
                        });
                        setTimeout(() => {
                            M.toast({
                                html: "Refreshing Student Datatable in 1s"
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
                $("#editModal .progress-holder, #editModal .prevent-overlay").addClass("hide");
            }
        });
    });
});