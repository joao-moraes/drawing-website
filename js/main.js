// draw the gradient colors of the main/primary color picker
let primary = document.getElementById("primary");
let p_ctx = primary.getContext("2d");
const STOP = 1 / 6;
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

//primary.addEventListener("mousedown")