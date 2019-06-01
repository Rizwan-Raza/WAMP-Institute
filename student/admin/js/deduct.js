var signed = false;
var signRequire = true;
$(() => {
    M.AutoInit();

    $("#deductFeeForm input[type='checkbox']").change(e => {
        signRequire = !e.target.checked;
        if (!signRequire) {
            $("#deductFeeForm button.modal-trigger").attr("disabled", "disabled");
        } else {
            $("#deductFeeForm button.modal-trigger").removeAttr("disabled");
        }
    });

    $("select[required]").css({
        display: "block",
        position: 'absolute',
        visibility: 'hidden'
    });
});

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
    $("#deductFeeForm #studId option").removeAttr("selected");
    $("#deductFeeForm #studId option[value='" + getParam("sid") + "']").attr("selected", "selected");
    $("#deductFeeForm #studId input").val($("#deductFeeForm #studId option[value='" + getParam("sid") + "']").text());
}
/////////////////////////////////////////////////////


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
    signed = true;
    var mycanvas = document.getElementById("canvasSimple"); //get your canvas
    $("#signatureField").val(mycanvas.toDataURL("image/png"));
    $("#signImg").attr("src", mycanvas.toDataURL("image/png"));
    $("#signImg").removeClass("hide");
    $("#deductFeeForm .btn.modal-trigger span").text("again?");
    $("#signatureModal").modal("close");
});

$("#deductFeeForm").submit(function (e) {
    e.preventDefault();
    if (e.target.stud_id.value.length == 0) {
        M.toast({
            html: "Please choose student."
        });
        return;
    }
    if (signRequire) {
        if (!signed) {
            M.toast({
                html: "Please make signature!"
            });
            return;
        }
    }
    $.ajax({
        url: "admin/services/deduct.php",
        method: "POST",
        data: $(e.target).serialize(),
        beforeSend: () => {
            $("#deductFee .progress-holder, #deductFee .prevent-overlay").removeClass("hide");
        },
        success: (data, status) => {
            // console.log(data, status);
            var object = JSON.parse(data);
            M.toast({
                html: object.message
            });

            // if (object.status == "username_error") {
            //     e.target.username.focus();
            //     return;
            // }
            $("#deductFeeForm .btn.modal-trigger span").text("signature");
            $("#signImg").addClass("hide");
            e.target.reset();
        },
        error: (data, status) => {
            console.log(data, status);
        },
        complete: () => {
            $("#deductFee .progress-holder, #deductFee .prevent-overlay").addClass("hide");
        }
    });
});

prepareSimpleCanvas();