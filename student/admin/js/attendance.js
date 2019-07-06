var navDate = new Date();
var month = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

var usersArr = {};
var entriesArr = {};
$(() => {

    $.ajax({
        url: "admin/services/get.php",
        data: {
            what: "students",
            filter: "active",
            with: "1",
            time: new Date()
        },
        method: "GET",
        success: (data, status) => {
            data = JSON.parse(data);
            usersArr = data;
            $.ajax({
                url: "admin/services/get.php",
                method: "GET",
                data: {
                    what: "attendance",
                    time: new Date()
                },
                success: (data, status) => {
                    data = JSON.parse(data);
                    entriesArr = data;
                    $("#monthTitle").text(month[navDate.getMonth()] + ", " + navDate.getFullYear());
                    $(".loader").hide();
                    $("#listView").show();
                    getListView(navDate);
                },
                error: (data, status) => {
                    console.log(data, status);
                }
            });
        },
        error: (data, status) => {
            console.log(data, status);
        }
    });
});
function getListView(d) {
    let today = d.getDate();

    let col = `<tr><th class="pl-2">Users\\Date</th>`;
    for (let ci = 1; ci <= today; ci++) {
        col += `<th class="center">${ci}</th>`;
    }
    col += "</tr>";
    let rows = "";
    let odd = true;
    Object.keys(usersArr).forEach(key => {
        let user = usersArr[key];
        let entryRow = "";
        let userEntries = entriesArr.filter(entry => {
            return (entry._sid == user._sid) && (new Date(entry.time).getMonth() == d.getMonth());
        });
        rows += `<tr style="border:0"><td class="pl-2 fw-700 ${odd ? 'white' : 'grey lighten-3'}">${user.name.split(" ")[0]}</td>`;
        for (let ci = 1; ci <= today; ci++) {
            let tEntry = userEntries.filter(entry => {
                return new Date(entry.time).getDate() == ci;
            });
            if (tEntry.length > 0) {
                entryRow += `<td class="center present">${new Date(tEntry[0].time).getHours()}:${new Date(tEntry[0].time).getMinutes() < 10 ? "0" : ""}${new Date(tEntry[0].time).getMinutes()}</td>`;
            } else {
                entryRow += `<td class="center absent">AB</td>`;
            }
        }
        rows += entryRow;
        rows += `</tr>`;
        odd = !odd;
    });
    $("#listView table#forView tbody").html(col);
    $("#listView table#forView tbody").append(rows);
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
}


function getPrevious() {
    $("#listNav").find("button").removeAttr("disabled");
    $("#listNav").find("button[id] i").removeClass("grey-text");
    $("#listNav").find("button[id] i").addClass("black-text");

    navDate.setDate(1);
    navDate.setHours(-1);
    if (navDate.getFullYear() < new Date().getFullYear()) {
        navDate = new Date(new Date().getFullYear(), 0, 31);
        $("#prevBtn").attr("disabled", "");
        $("#prevBtn i").removeClass("black-text");
        $("#prevBtn i").addClass("grey-text");
    }
    let dObj = new Date(navDate);
    $("#monthTitle").text(month[dObj.getMonth()] + ", " + dObj.getFullYear());
    getListView(dObj);
}

function getNext() {
    $("#listNav").find("button").removeAttr("disabled");
    $("#listNav").find("button[id] i").removeClass("grey-text");
    $("#listNav").find("button[id] i").addClass("black-text");

    if (navDate.getTime() < Date.now()) {
        navDate = new Date(navDate.getFullYear(), navDate.getMonth() + 2, 0);
        if (navDate.getTime() > Date.now()) {
            navDate = new Date();
            $("#nextBtn").attr("disabled", "");
            $("#nextBtn i").removeClass("black-text");
            $("#nextBtn i").addClass("grey-text");
        }
        $("#monthTitle").text(month[navDate.getMonth()] + ", " + navDate.getFullYear());
        getListView(new Date(navDate));
    } else {
        $("#nextBtn").attr("disabled", "");
        $("#nextBtn i").removeClass("black-text");
        $("#nextBtn i").addClass("grey-text");
    }
}