var navDate = new Date();
var month = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

var usersArr = {};
var entriesArr = {};
$.ajax({
    url: "admin/services/get.php",
    data: {
        what: "students",
    },
    method: "GET",
    success: (data, status) => {
        usersArr = data;
        console.log(data, status);
    },
    error: (data, status) => {
        console.log(data, status);
    },
    complete: () => {
        $.ajax({
            url: "admin/services/get.php",
            method: "GET",
            data: {
                what: "attendance",
            },
            success: (data, status) => {
                entriesArr = data;
                // console.log(data, status);
            },
            error: (data, status) => {
                console.log(data, status);
            },
            complete: () => {
                console.log("Done");
            }
        });
    }
});

function getListView(d) {
    let today = d.getDate();

    let col = `<tr><th colspan="2" class="pl-2">Users\\Date</th>`;
    for (let ci = 1; ci <= today; ci++) {
        col += `<th class="center">${ci}</th>`;
    }
    col += "</tr>";
    let rows = "";
    let odd = true;
    Object.keys(usersArr).forEach(user => {
        let entryRow = "";
        let exitRow = "";
        let monthMs = 0;
        let userEntries = entriesArr.filter(entry => {
            return (entry.user == key) && (new Date(entry.start).getMonth() == d.getMonth());
        });
        let briefUp = 0;
        rows += `<tr style="border:0"><td class="pl-2 fw-700 ${odd ? 'white' : 'grey lighten-3'}">${user.name.split(" ")[0]}</td><td class="center ${odd ? 'white' : 'grey lighten-3'}">Entry</td>`;
        for (let ci = 1; ci <= today; ci++) {
            briefUp++;
            let tEntry = userEntries.filter(entry => {
                return new Date(entry.start).getDate() == ci;
            });
            if (tEntry.length > 0) {
                entryRow += `<td class="center present">${new Date(tEntry[0].start).getHours()}:${new Date(tEntry[0].start).getMinutes() < 10 ? "0" : ""}${new Date(tEntry[0].start).getMinutes()}</td>`;
                if (tEntry.length > 1) {
                    monthMs += new Date(tEntry[1].start).getTime() - new Date(tEntry[0].start).getTime();
                    exitRow += `<td class="center present">${new Date(tEntry[1].start).getHours()}:${new Date(tEntry[1].start).getMinutes() < 10 ? "0" : ""}${new Date(tEntry[1].start).getMinutes()}</td>`;
                } else {
                    let tStart = new Date(tEntry[0].start);
                    let tDate = d;
                    if (tStart.toLocaleDateString() == tDate.toLocaleDateString()) {
                        monthMs += tDate.getTime() - tStart.getTime();
                    }
                    exitRow += `<td class="center attending">-</td>`;
                }
            } else {
                entryRow += `<td class="center absent" rowspan="2">AB</td>`;
            }
        }
        rows += entryRow;
        rows += `</tr>`;
        rows += `<tr><td class="${odd ? 'white' : 'grey lighten-3'}"><button class="btn-floating btn-small btn-flat transparent waves-effect center lh-0" style="margin:-8px auto" onclick="openInfo(${monthMs}, '${user.name}', '${Math.ceil(userEntries.length / 2) + "/" + briefUp}', ${user.leaves})"><i class="material-icons black-text lh-0">launch</i></button></td><td class="center ${odd ? 'white' : 'grey lighten-3'}">Exit</td>${exitRow}</tr>`;
        odd = !odd;
    });
    $("#listView table#forView tbody").html(col);
    $("#listView table#forView tbody").append(rows);


    // For Export
    col = `<tr><th class="pl-2">Users</th><th>Date</th>`;
    for (let ci = 1; ci <= today; ci++) {
        col += `<th>${ci}</th>`;
    }
    col += "<th>Worked Hrs</th><th>Pending Leaves</th>"
    col += "</tr>";
    rows = "";
    Object.keys(usersArr).forEach(key => {
        let user = usersArr[key];
        let entryRow = "";
        let exitRow = "";
        let monthMs = 0;
        let userEntries = entriesArr.filter(entry => {
            return entry.extraParams.user == key;
        });
        let brief = Math.ceil(userEntries.length / 2) + "/" + today;
        rows += `<tr><td>${user.name}</td><td>Entry</td>`;
        for (let ci = 1; ci <= today; ci++) {
            let tEntry = userEntries.filter(entry => {
                return new Date(entry.start).getDate() == ci;
            });
            if (tEntry.length > 0) {
                entryRow += `<td>${new Date(tEntry[0].start).getHours()}:${new Date(tEntry[0].start).getMinutes() < 10 ? "0" : ""}${new Date(tEntry[0].start).getMinutes()}</td>`;
                if (tEntry.length > 1) {
                    monthMs += new Date(tEntry[1].start).getTime() - new Date(tEntry[0].start).getTime();

                    exitRow += `<td>${new Date(tEntry[1].start).getHours()}:${new Date(tEntry[1].start).getMinutes() < 10 ? "0" : ""}${new Date(tEntry[1].start).getMinutes()}</td>`;
                } else {
                    let tStart = new Date(tEntry[0].start);
                    let tDate = d;
                    if (tStart.toLocaleDateString() == tDate.toLocaleDateString()) {
                        monthMs += tDate.getTime() - tStart.getTime();
                    }
                    exitRow += `<td>-</td>`;
                }
            } else {
                entryRow += `<td>AB</td>`;
                exitRow += `<td>-</td>`;
            }

        }
        rows += `${entryRow}<td>${Math.floor(monthMs / 3.6e+6)} Hours, ${Math.floor((monthMs % 3.6e+6) / 60000)} Minutes</td><td>${user.leaves}</td></tr><tr><td>-</td><td>Exit</td>${exitRow}<td>-</td><td>-</td></tr>`;
    });
    $("#listView table#monthly-attendance tbody").html(col);
    $("#listView table#monthly-attendance tbody").append(rows);

    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
    $("#monthly-attendance").tableExport({
        formats: ['xlsx', 'xls', 'csv', 'txt'],
        filename: month[navDate.getMonth()] + "-Attendence"
    });
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