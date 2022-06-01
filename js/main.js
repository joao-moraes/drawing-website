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

// update the desired primary color based on mouse click
primary.addEventListener("mousedown", function(event) {
    let y = event.offsetY;
    primaryData = p_ctx.getImageData(1, y, 1, 1);
    pixelColor = primaryData.data;

    const rgb = `rgba(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]}, ${pixelColor[3] / 255})`;
    makeHue(rgb);
});

// draw and update the hue picker. This function is called when the primary color is selected/changed in the primary color block
function makeHue(currentColor) {
    let hue = document.getElementById("hue-sat");
    let h_ctx = hue.getContext("2d");

    // x-axis gradient
    let gradientX = h_ctx.createLinearGradient(hue.width, 0, 0, 0);
    gradientX.addColorStop(0, currentColor);
    gradientX.addColorStop(1, `rgb(255, 255, 255)`);
    h_ctx.fillStyle = gradientX;
    h_ctx.fillRect(0, 0, hue.width, hue.height);
    
    // y-axis gradient
    let gradientY = h_ctx.createLinearGradient(hue.width, 0, hue.width, hue.height);
    gradientY.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradientY.addColorStop(1, `rgba(0, 0, 0, 1)`);
    h_ctx.fillStyle = gradientY;
    h_ctx.fillRect(0, 0, hue.width, hue.height);
}