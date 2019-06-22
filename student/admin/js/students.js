function viewProfile(name, username, course, fee, remain, time, hr_time) {
    $("#profileModal h4").text(`${name} (${username})`);
    $("#profileModal #stu_name").text(name);
    $("#profileModal #stu_username").text(username);
    $("#profileModal #stu_course").text(`${course == 1 ? 'Crash Course in Digital Marketing' : course == 2 ? 'Executive Digital Marketing Course' : 'Advanced Digital Marketing Course'}`);
    $("#profileModal #stu_fee").text(`${fee}`);
    $("#profileModal #stu_remain").text(`${remain}`);
    $("#profileModal #stu_joined").text(`${time}`);
    $("#profileModal #stu_time").text(`${hr_time}`);
    $("#profileModal").modal("open");
}

function editProfile(sid, name, username, course, fee, time) {
    $("#editModal #student_id").val(sid);
    $("#editModal #set_s_name").val(name);
    $("#editModal #set_s_username").val(username);
    $("#editModal #set_s_fee").val(fee);

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
