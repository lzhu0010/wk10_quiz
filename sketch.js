// Declare global variables
let sound, fft, amplitude; 
let r = 150; //define the inside circle radius
dr = 250; //define the outside circle radius
numberOfCircles = 15; // define the number of the rings

function preload() { 
    sound = loadSound('sample.mp3');   
}



function setup() {
    createCanvas(windowWidth, windowHeight); 
    fft = new p5.FFT();         
    amplitude = new p5.Amplitude();  

    fft.setInput(sound);       
    amplitude.setInput(sound);  

    sound.play();  
}

function draw() {
    background(0,50);
    centerCanvas();  // Position canvas to center
  
    drawAmplitudeEllipse();
    for (let i = 0; i < numberOfCircles; i++) {
        drawWaveformCircle(r + i * dr / numberOfCircles);
    }
}



// Translate the coordinate system to the center of the canvas
function centerCanvas() {
    translate(width/2, height/2);
}

function drawAmplitudeEllipse() {
    let ampLevel = amplitude.getLevel();
     // Using HSB color mode to easily manipulate hue based on amplitude
    colorMode(HSB);
    let hueValue = map(ampLevel, 0, 1, 0, 360);  // Map amplitude to a hue value (0-360)
    let satValue = 100;  // High saturation for vibrant color
    let brightValue = 90;  // High brightness for vibrancy

    fill(hueValue, satValue, brightValue);
    noStroke();
    ellipse(0, 0, 1200 * ampLevel, 1200 * ampLevel);

    // Switch back to default RGB mode after setting the fill
    colorMode(RGB);
}

// Modify the drawWaveformCircle function to pass the angle to setColorBasedOnPosition
function drawWaveformCircle(currentRadius) {
    let waveform = fft.waveform();


    for (let i = 0; i < waveform.length; i += 5) {
        let angle = i * TWO_PI / waveform.length;

        let x = currentRadius * cos(angle);
        let y = currentRadius * sin(angle);

        let a = map(waveform[i], -1, 1, currentRadius - dr / numberOfCircles, currentRadius + dr / numberOfCircles) * cos(angle);
        let b = map(waveform[i], -1, 1, currentRadius - dr / numberOfCircles, currentRadius + dr / numberOfCircles) * sin(angle);
        drawWaveformPoint(a, b);
    }

}

function drawWaveformPoint(a, b) {
   colorMode(HSB);
    let hueValue = map(mouseX, 0, windowWidth, 0, 200);  // Map amplitude     to a hue value (0-360)
   let satValue = 100;  // High saturation for vibrant color
  let brightValue = map(mouseY, 0, windowHeight, 20, 100);
    stroke(hueValue,satValue,brightValue);
    strokeWeight(2);
    point(a, b);
}
