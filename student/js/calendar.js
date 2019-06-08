$(() => {

    $.get("/services/get-attendance.php", (data) => {
        var entries = [];
        data.forEach(element => {
            // console.log(element);
            entries.push({ start: element.time, title: "Present", allDay: true });
        });
        // console.log(entries);
        let d = new Date();
        let td = new Date(d.setDate(d.getDate() + 1));
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['dayGrid'],
            defaultView: 'dayGridMonth',
            validRange: {
                end: [td.getFullYear(), td.getMonth() + 1, td.getDate()].join("-")
            },
            events: entries

        });
        calendar.render();
    })
});
