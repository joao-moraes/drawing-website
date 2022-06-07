"use strict";

//
// draw the gradient colors of the main/primary color picker
let primary = document.getElementById("primary");
let p_ctx = primary.getContext("2d");
const STOP = 1 / 6;

function drawPrimGradient() {
    let gradient = p_ctx.createLinearGradient(0, 0, 0, primary.height);
    gradient.addColorStop(0, 'rgb(255, 0, 0)');
    gradient.addColorStop(STOP, 'rgb(255, 255, 0)');
    gradient.addColorStop(2 * STOP, 'rgb(0, 255, 0)');
    gradient.addColorStop(3 * STOP, 'rgb(0, 255, 255)');
    gradient.addColorStop(4 * STOP, 'rgb(0, 0, 255)');
    gradient.addColorStop(5 * STOP, 'rgb(255, 0, 255)');
    gradient.addColorStop(6 * STOP, 'rgb(255, 0, 0)');
    p_ctx.fillStyle = gradient;
    p_ctx.fillRect(0, 0, primary.width, primary.height);
}

function drawPrimGuide(y_prim) {
    if (y_prim % 1 == 0) {
        y_prim += 0.5;
    }
    p_ctx.beginPath();
    p_ctx.moveTo(0, y_prim);
    p_ctx.lineTo(primary.width, y_prim);
    p_ctx.stroke();
}

// redraw the primary picker to obtain the clicked color without the guideline blocking it
function findPrimary(y) {
    drawPrimGradient();
    let primaryData = p_ctx.getImageData(1, y, 1, 1);
    let pixelPrimary = primaryData.data;
    return `rgba(${pixelPrimary[0]}, ${pixelPrimary[1]}, ${pixelPrimary[2]}, ${pixelPrimary[3] / 255})`;
}
//
// update the desired primary color based on mouse click. Uses three Event Listeners to detect mousedown, drag, and release
let primaryColor = "rgb(255, 0, 0, 1)";
let mouseDownPrimary = false;
primary.addEventListener("mousedown", function(event) {
    mouseDownPrimary = true;
    let y = event.offsetY;

    primaryColor = findPrimary(y)
    drawPrimGradient();
    findColor(x_hue, y_hue, primaryColor);
    drawPrimGuide(y);
});
primary.addEventListener("mousemove", function(event) {
    if (mouseDownPrimary) {
        let y = event.offsetY;
        if (y == primary.height) {
            y = primary.height - 1;
        }

        primaryColor = findPrimary(y)
        drawPrimGradient();
        findColor(x_hue, y_hue, primaryColor);
        drawPrimGuide(y);
    }
});
document.addEventListener("mouseup", function(event) {
    mouseDownPrimary = false;
});

//
// draw and update the hue picker. This function is called when the primary color is selected/changed in the primary color block
let hue = document.getElementById("hue-sat");
let h_ctx = hue.getContext("2d");

function makeHue(currentColor) {
    // x-axis gradient
    let gradientX = h_ctx.createLinearGradient(hue.width, 0, 0, 0);
    gradientX.addColorStop(0, currentColor);
    gradientX.addColorStop(1, `rgb(255, 255, 255)`);
    h_ctx.fillStyle = gradientX;
    h_ctx.fillRect(0, 0, hue.width, hue.height);

    // y-axis gradient
    let gradientY = h_ctx.createLinearGradient(0, 0, 0, hue.height);
    gradientY.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradientY.addColorStop(1, `rgba(0, 0, 0, 1)`);
    h_ctx.fillStyle = gradientY;
    h_ctx.fillRect(0, 0, hue.width, hue.height);
}

//
// select the desired color on the hue box
let mouseDownHue = false;
let x_hue = hue.width;
let y_hue = 0;
let chosenColor;

// event listeners for the hue selector
hue.addEventListener("mousedown", function(event) {

    mouseDownHue = true;
    x_hue = event.offsetX;
    y_hue = event.offsetY;
    
    findColor(x_hue, y_hue, primaryColor);
});
hue.addEventListener("mousemove", function(event) {
    if (mouseDownHue) {
        x_hue = event.offsetX;
        y_hue = event.offsetY;
        
        findColor(x_hue, y_hue, primaryColor);
    }
});
document.addEventListener("mouseup", function(event) {
    mouseDownHue = false;
});

// draw the guide lines showing location of selected hue
function drawGuide(x_hue, y_hue) {
    if (x_hue % 1 == 0) {
        x_hue += 0.5;
    }
    if (y_hue % 1 == 0) {
        y_hue += 0.5;
    }

    h_ctx.beginPath();
    h_ctx.moveTo(x_hue, 0);
    h_ctx.lineTo(x_hue, hue.height);
    h_ctx.closePath();
    h_ctx.stroke();
    h_ctx.beginPath();
    h_ctx.moveTo(0, y_hue);
    h_ctx.lineTo(hue.width, y_hue);
    h_ctx.closePath();
    h_ctx.stroke();
}

//
// updates the actual desired color variable
let pickedColor = document.getElementById("chosen-color");
let picked_ctx = pickedColor.getContext("2d");
function pickColor(pixelHue) {
    picked_ctx.fillStyle = `rgba(${pixelHue[0]}, ${pixelHue[1]}, ${pixelHue[2]}, ${pixelHue[3]})`;
    picked_ctx.fillRect(0, 0, pickedColor.width, pickedColor.height);
    chosenColor = pixelHue;
}

// 
function findColor(x, y, primary) {
    makeHue(primary);
    let hueData = h_ctx.getImageData(x, y, 1, 1);
    let pixelHue = hueData.data;
    pixelHue[3] /= 255;
    pickColor(pixelHue);
    drawGuide(x, y);
}

let h_width = hue.offsetWidth;
primary.setAttribute("height", h_width);
hue.setAttribute("width", h_width);
hue.setAttribute("height", h_width);

drawPrimGradient();
makeHue('rgba(255, 0, 0, 1');
pickColor([255, 0, 0 , 1]);


//
// creates two canvas contexts as the drawing board. The listener for drawing is based on the div containing the two canvases
let drawing_0 = document.getElementById("drawing-layer-0");
let drawing_0_ctx = drawing_0.getContext("2d");
drawing_0_ctx.fillStyle = "white";
drawing_0_ctx.fillRect(0, 0, drawing_0.width, drawing_0.height);

// get second layer of drawing_1 canvas
let drawing_1 = document.getElementById("drawing-layer-1");
let drawing_1_ctx = drawing_1.getContext("2d");
drawing_1_ctx.fillStyle = "rgba(180, 50, 50, 0.2)";
drawing_1_ctx.fillRect(0, 0, drawing_1.width, drawing_1.height);

// get canvas container element as event listener
let drawing_container = document.getElementsByClassName("drawing-container");
let active_layer = drawing_1_ctx;

// event listeners for drawing_0
let x_draw = 0;
let y_draw = 0;
let mouseDownDrawing = false;
drawing_container[0].addEventListener("mousedown", function(event) {
    x_draw = event.offsetX;
    y_draw = event.offsetY;
    drawLine(active_layer, x_draw, y_draw, event.offsetX, event.offsetY);
    mouseDownDrawing = true;
});
drawing_container[0].addEventListener("mousemove", function(event) {
    if (mouseDownDrawing) {
        drawLine(active_layer, x_draw, y_draw, event.offsetX, event.offsetY);
        x_draw = event.offsetX;
        y_draw = event.offsetY;
    }
});
document.addEventListener("mouseup", function(event) {
    if (mouseDownDrawing) {
        x_draw = 0;
        y_draw = 0;
        mouseDownDrawing = false;
    }
});

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = `rgba(${chosenColor[0]}, ${chosenColor[1]}, ${chosenColor[2]}, ${chosenColor[3]})`;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}


