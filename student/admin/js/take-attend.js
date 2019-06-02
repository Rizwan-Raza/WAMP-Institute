$('#globalCheckbox').click(function () {
    // console.log($(this).closest(".tooltipped"));
    if ($(this).prop("checked")) {
        $('td input[type="checkbox"]').prop("checked", true);
        $('tbody tr').addClass('active-table-row');
        $('.tool-bar').removeClass("scale-out");
        $('.tool-bar').addClass("scale-in");
        $(this).closest(".tooltipped").attr("data-tooltip", "Select None");
    } else {
        $('td input[type="checkbox"]').prop("checked", false);
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
    if ($("td input:checkbox:checked").length > 0) {
        $('.tool-bar').removeClass("scale-out");
        $('.tool-bar').addClass("scale-in");
    } else {
        $('.tool-bar').removeClass("scale-in");
        $('.tool-bar').addClass("scale-out");
    }
});

function takeAttendance() {

}