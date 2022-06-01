"use strict";

//
// draw the gradient colors of the main/primary color picker
let primary = document.getElementById("primary");
let p_ctx = primary.getContext("2d");
const STOP = 1 / 6;
let gradient = p_ctx.createLinearGradient(0, 0, 0, primary.height);

function drawPrimGradient() {
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

//
// update the desired primary color based on mouse click. Uses three Event Listeners to detect mousedown, drag, and release
let y_prim = 0;
let primaryColor = "rgb(255, 0, 0, 1)";
let primaryData;
let pixelPrimary;
let mouseDownPrimary = false;
primary.addEventListener("mousedown", function(event) {
    mouseDownPrimary = true;
    y_prim = event.offsetY;
    drawPrimGradient();
    primaryData = p_ctx.getImageData(1, y_prim, 1, 1);
    pixelPrimary = primaryData.data;
    primaryColor = `rgba(${pixelPrimary[0]}, ${pixelPrimary[1]}, ${pixelPrimary[2]}, ${pixelPrimary[3] / 255})`;

    drawPrimGradient();
    findColor(x_hue, y_hue, primaryColor);
    drawPrimGuide(y_prim);

});
primary.addEventListener("mousemove", function(event) {
    if (mouseDownPrimary) {
        drawPrimGradient();
        y_prim = event.offsetY;
        primaryData = p_ctx.getImageData(1, y_prim, 1, 1);
        pixelPrimary = primaryData.data;
        primaryColor = `rgba(${pixelPrimary[0]}, ${pixelPrimary[1]}, ${pixelPrimary[2]}, ${pixelPrimary[3] / 255})`;

        findColor(x_hue, y_hue, primaryColor);
        drawPrimGuide(y_prim);
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
let hueData;
let pixelHue;
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

// draw the guide lines showing location of hue selected
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
// updates the actual desired color variable
let pickedColor = document.getElementById("chosen-color");
let picked_ctx = pickedColor.getContext("2d");
function pickColor(pixelHue) {
    picked_ctx.fillStyle = `rgba(${pixelHue[0]}, ${pixelHue[1]}, ${pixelHue[2]}, ${pixelHue[3]})`;
    picked_ctx.fillRect(0, 0, pickedColor.width, pickedColor.height);
    chosenColor = pixelHue;
}

function findColor(x, y, primary) {
    // build hue box
    makeHue(primary);
    // get chosen hue based on current pos
    hueData = h_ctx.getImageData(x_hue, y_hue, 1, 1);
    pixelHue = hueData.data;
    pixelHue[3] /= 255;
    // update chosen color box
    pickColor(pixelHue);
    // redraw guidelines
    drawGuide(x, y);
}

findColor(hue.width, hue.height, 'rgba(255, 0, 0, 1');