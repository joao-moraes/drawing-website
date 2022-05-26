let canvas = document.getElementById("tutorial");
let context = canvas.getContext("2d");

// make 2 rectangles
context.fillStyle = "rgb(200, 0, 0)";
context.fillRect(10,10, 50, 50);

context.fillStyle = "rgba(0, 0, 200, 0.5)";
context.fillRect(30, 30, 50, 50);


// this code draws the colors of the main/primary color picker
let primary = document.getElementById("primary");
let p_ctx = primary.getContext("2d");

let red = 255;
let green = 0;
let blue = 0;
p_ctx.lineWidth = 1.5;

for (i = 0; i < 30; i++) {
    green += i / 2;
    p_ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
    p_ctx.beginPath();
    p_ctx.moveTo(0, i);
    p_ctx.lineTo(50, i);
    p_ctx.stroke();
}
for (i = 0; i < 30; i++) {
    red -= i / 2;
    p_ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
    p_ctx.beginPath();
    p_ctx.moveTo(0, i + 30);
    p_ctx.lineTo(50, i + 30);
    p_ctx.stroke();
}
for (i = 0; i < 30; i++) {
    blue += i / 2;
    p_ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
    p_ctx.beginPath();
    p_ctx.moveTo(0, i + 60);
    p_ctx.lineTo(50, i + 60);
    p_ctx.stroke();
}
for (i = 0; i < 30; i++) {
    green -= i / 2;
    p_ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
    p_ctx.beginPath();
    p_ctx.moveTo(0, i + 90);
    p_ctx.lineTo(50, i + 90);
    p_ctx.stroke();
}
for (i = 0; i < 30; i++) {
    red += i / 2;
    p_ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
    p_ctx.beginPath();
    p_ctx.moveTo(0, i + 120);
    p_ctx.lineTo(50, i + 120);
    p_ctx.stroke();
}
for (i = 0; i < 30; i++) {
    blue -= i / 2;
    p_ctx.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
    p_ctx.beginPath();
    p_ctx.moveTo(0, i + 150);
    p_ctx.lineTo(50, i + 150);
    p_ctx.stroke();
}
// up to here for the main-color picker

primary.addEventListener("mousedown")