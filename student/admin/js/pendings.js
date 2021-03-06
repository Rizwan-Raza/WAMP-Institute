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


/****************************************************************************** Simple Canvas */

var simpleStrokes = new Array();

var redoStrokes = new Array();

var paint_simple;
var canvas_simple;
var context_simple;
var canvasWidth = window.innerWidth, canvasHeight = window.innerHeight - 70;
var strokeWidth = 5;
var strokeColor = "#303f9f";
/**
* Creates a canvas element.
*/
function prepareSimpleCanvas() {
    // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
    var canvasDiv = document.getElementById('canvasSimpleDiv');
    canvas_simple = document.createElement('canvas');
    canvas_simple.setAttribute('width', canvasWidth);
    canvas_simple.setAttribute('height', canvasHeight);
    canvas_simple.setAttribute('id', 'canvasSimple');
    canvasDiv.appendChild(canvas_simple);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas_simple = G_vmlCanvasManager.initElement(canvas_simple);
    }
    context_simple = canvas_simple.getContext("2d");

    // Add mouse events
    // ----------------
    $('#canvasSimple').mousedown(function (e) {
        // Mouse down location
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint_simple = true;
        addClickSimple(mouseX, mouseY, false);
        redrawSimple();
    });

    $('#canvasSimple').mousemove(function (e) {
        if (paint_simple) {
            addClickSimple(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redrawSimple();
        }
    });

    $('#canvasSimple').mouseup(function (e) {
        paint_simple = false;
        redrawSimple();
    });

    $('#canvasSimple').mouseleave(function (e) {
        paint_simple = false;
    });

    $('#clearCanvasSimple').mousedown(function (e) {
        simpleStrokes = new Array();
        clearCanvas_simple();
    });

    // Add touch event listeners to canvas element
    canvas_simple.addEventListener("touchstart", function (e) {
        // Mouse down location
        var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
            mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

        paint_simple = true;
        addClickSimple(mouseX, mouseY, false);
        redrawSimple();
    }, false);
    canvas_simple.addEventListener("touchmove", function (e) {

        var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
            mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

        if (paint_simple) {
            addClickSimple(mouseX, mouseY, true);
            redrawSimple();
        }
        e.preventDefault()
    }, false);
    canvas_simple.addEventListener("touchend", function (e) {
        paint_simple = false;
        redrawSimple();
    }, false);
    canvas_simple.addEventListener("touchcancel", function (e) {
        paint_simple = false;
    }, false);
}

function addClickSimple(x, y, dragging) {
    simpleStrokes.push({ x: x, y: y, drag: dragging, color: strokeColor, width: strokeWidth });
}

function clearCanvas_simple() {
    context_simple.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redrawSimple() {
    clearCanvas_simple();

    context_simple.lineJoin = context_simple.lineCap = "round";
    for (var i = 0; i < simpleStrokes.length; i++) {
        context_simple.beginPath();
        if (simpleStrokes[i].drag && i) {
            context_simple.moveTo(simpleStrokes[i - 1].x, simpleStrokes[i - 1].y);
        } else {
            context_simple.moveTo(simpleStrokes[i].x - 1, simpleStrokes[i].y);
        }
        context_simple.lineTo(simpleStrokes[i].x, simpleStrokes[i].y);
        context_simple.closePath();
        context_simple.strokeStyle = simpleStrokes[i].color;
        context_simple.lineWidth = simpleStrokes[i].width;
        context_simple.stroke();
    }
}

function lastIndexOf(list, value) {
    for (index = list.length - 1; index >= 0; index--) {
        if (list[index].drag == value) {
            return index;
        }
    }
}

$('#undoCanvas').click(function () {
    let remIndex = lastIndexOf(simpleStrokes, false);
    redoStrokes = [...redoStrokes, ...simpleStrokes.slice(remIndex)];
    simpleStrokes = simpleStrokes.slice(0, remIndex);

    redrawSimple();
});

$('#redoCanvas').click(function () {
    let remIndex = lastIndexOf(redoStrokes, false);
    simpleStrokes = [...simpleStrokes, ...redoStrokes.slice(remIndex)];
    redoStrokes = redoStrokes.slice(0, remIndex);
    redrawSimple();
});

$('.sizeHolder').click(function (e) {
    var elem;
    if ($(e.target).hasClass("size")) {
        elem = $(e.target);
    } else {
        elem = $(e.target).find(".size");
    }
    elem.parent().siblings().removeClass("active");
    elem.parent().addClass("active");
    strokeWidth = elem.data("size");
});

$('.colorHolder').click(function (e) {
    var elem;
    if ($(e.target).hasClass("color")) {
        elem = $(e.target);
    } else {
        elem = $(e.target).find(".color");
    }
    elem.parent().siblings().removeClass("active");
    elem.parent().addClass("active");
    strokeColor = elem.data("color");
});


function toggleSizePanel() {
    $(".sizes").toggleClass("shrink");
    $(".colors").addClass("shrink");
}
function toggleColorPanel() {
    $(".colors").toggleClass("shrink");
    $(".sizes").addClass("shrink");
}

$("#doneBtn").click(function (e) {
    var mycanvas = document.getElementById("canvasSimple"); //get your canvas
    $("#signatureField").val(mycanvas.toDataURL("image/png"));
    $("#signImg").attr("src", mycanvas.toDataURL("image/png"));
    $("#signImg").removeClass("hide");
    $(".btn.modal-trigger[data-target='signatureModal'] span").text("again?");
    $(".btn.modal-trigger[data-target='signatureModal']").addClass("right");
    $(".btn.modal-trigger[data-target='signatureModal']").removeClass("pulse");
    $("#signatureApplyForm .btn[type='submit']").removeClass("hide");
    $("#signatureApplyForm .btn[type='submit']").addClass("pulse");
    $("#signatureModal").modal("close");
});

$("#signatureApplyForm").submit(function (e) {
    var elem = $(e.target).closest("tr");
    console.log(elem.length);
    console.log(elem.get(0));
    e.preventDefault();
    $.ajax({
        url: "admin/services/approve.php",
        method: "POST",
        data: $(e.target).serialize(),
        beforeSend: () => {
            elem.css("opacity", 0.5);
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
});

prepareSimpleCanvas();