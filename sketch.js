function setup() {
  // Creates an 800x800 pixel canvas
  createCanvas(800, 800);
}

// Cloud data for animation - position and speed
let clouds = [
  {x: 100, y: 100, speed: 0.3},
  {x: 300, y: 50, speed: 0.2},
  {x: 500, y: 120, speed: 0.4},
  {x: 700, y: 80, speed: 0.25}
];

function draw() {
  // Draw blue sky background
  background(135,206,235);
  
  // Draw yellow sun in top-right corner
  fill('yellow');
  circle(800,0,300);
  
  // Draw and animate clouds
  updateAndDrawClouds();
  
  // --- BUILDING STRUCTURE ---
  
  // Draw main building sections (fill only)
  noStroke();
  fill(223, 227, 202); // Light tan color
  quad(0,395,0,800,150,800,150,400);    // Left wing
  quad(150,250,150,800,600,800,600,250); // Center section
  quad(600,405,600,800,800,800,800,395); // Right wing
  
  // Draw curved top cutout in sky color
  fill(135,206,235);
  noStroke();
  arc(375, 250, 450, 50, 0, PI);
  
  // --- BUILDING OUTLINES ---
  
  // Set outline style
  stroke(80);
  strokeWeight(2);
  noFill();
  
  // Draw left wing outline
  quad(0,395,0,800,150,800,150,400); 
  line(0,395,150,400); // Top of left wing
  
  // Draw center section outline (without top line)
  line(150, 250, 150, 800); // Left vertical line
  line(150, 800, 600, 800); // Bottom line
  line(600, 250, 600, 800); // Right vertical line
  
  // Draw right wing outline
  quad(600,405,600,800,800,800,800,395);
  line(600,405,800,395); // Top of right wing
  
  // Draw curved top outline
  noFill();
  arc(375, 250, 450, 50, 0, PI);
  
  // Add stone pattern details
  drawStonework();
  
  // --- LEFT WINDOW ---
  fill(28, 61, 117); // Dark blue
  strokeWeight(2);
  stroke(0);
  quad(75,435,75,775,120,775,120,435);
  
  // Left window details
  fill(17, 40, 79); // Darker blue
  rect(75,500,45); // Upper detail
  rect(75,650,45); // Lower detail
  line(97,695,97,775); // Vertical divider
  line(75,737,120,737); // Horizontal divider
  
  // --- RIGHT WINDOW ---
  fill(28, 61, 117); // Dark blue
  quad(625,435,625,780,670,780,670,435);
  
  // Right window details
  fill(17, 40, 79); // Darker blue
  rect(625,500,45); // Upper detail
  rect(625,650,45); // Lower detail
  line(647,695,647,780); // Vertical divider
  line(625,738,670,738); // Horizontal divider
  
  // --- CENTER ENTRANCE ---
  fill(17, 40, 79); // Darker blue
  strokeWeight(2);
  quad(290,500,290,800,490,800,490,500);
  
  // Door frame and panels
  drawEntranceDetails();
  
  // Entrance side windows
  fill(223, 227, 202); // Light tan color
  rect(295,500,45,300); // Left window
  arc(317, 500, 45, 10, 0, PI, CHORD); // Left window arc
  rect(440,500,45,300); // Right window
  arc(462, 500, 45, 10, 0, PI, CHORD); // Right window arc
  
  // Door windows
  fill(28, 61, 117); // Dark blue
  rect(390,550,40,200); // Right door window
  rect(345,550,40,200); // Left door window
  line(365,550,365,750); // Left vertical divider
  line(410,550,410,750); // Right vertical divider
  line(345,650,385,650); // Left horizontal divider
  line(390,650,430,650); // Right horizontal divider
  
  // Draw entrance steps
  drawStairs();
  
  // Add library sign
  drawLibraryName();
}

function updateAndDrawClouds() {
  // Loop through each cloud
  for (let i = 0; i < clouds.length; i++) {
    // Draw cloud at current position
    makeCloud(clouds[i].x, clouds[i].y);
    
    // Move cloud to the right
    clouds[i].x += clouds[i].speed;
    
    // Reset position when cloud moves off screen
    if (clouds[i].x > width + 100) {
      clouds[i].x = -100;
    }
  }
}

function makeCloud(cloudx, cloudy) {
  // Draw white fluffy cloud using overlapping circles
  fill(250);
  noStroke();
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx + 10, cloudy + 10, 70, 50);
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
  ellipse(cloudx + 30, cloudy, 60, 40);
  ellipse(cloudx - 10, cloudy - 10, 50, 40);
}

function drawStonework() {
  // Set stone line style
  stroke(200);
  strokeWeight(1);
  
  // Draw horizontal stone lines
  // Center section 
  for (let y = 250; y < 800; y += 50) {
    if (y > 260) { // Skip top line near curve
      line(150, y, 600, y);
    }
  }
  
  // Left wing horizontal lines
  for (let y = 400; y < 800; y += 50) {
    line(0, y, 150, y);
  }
  
  // Right wing horizontal lines
  for (let y = 405; y < 800; y += 50) {
    line(600, y, 800, y);
  }
  
  // Draw vertical stone lines
  // Center section
  for (let x = 175; x < 575; x += 25) {
    let startY = 250;
    
    // Adjust for curved top
    if (x > 200 && x < 550) {
      let distFromCenter = abs(x - 375);
      let curveAdjust = map(distFromCenter, 0, 175, 0, 25);
      startY += curveAdjust;
    }
    
    line(x, startY, x, 800);
  }
  
  // Left wing vertical lines
  for (let x = 25; x < 150; x += 25) {
    line(x, 395, x, 800);
  }
  
  // Right wing vertical lines
  for (let x = 625; x < 800; x += 25) {
    line(x, 405, x, 800);
  }
  
  // Reset stroke style
  stroke(0);
  strokeWeight(2);
}

function drawEntranceDetails() {
  // Door header
  stroke(0);
  strokeWeight(2);
  fill(223, 227, 202); // Light tan color
  rect(285, 495, 210, 10);
  
  // Door panels - arranged in grid
  fill(28, 61, 117); // Dark blue
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 6; y++) {
      rect(345 + x*15, 560 + y*30, 10, 20); // Left door panels
      rect(390 + x*15, 560 + y*30, 10, 20); // Right door panels
    }
  }
  
  // Gold door handles
  fill(218, 165, 32); // Gold color
  ellipse(382, 650, 8, 8); // Left door handle
  ellipse(427, 650, 8, 8); // Right door handle
}

function drawStairs() {
  // Light gray steps
  fill(200, 200, 190);
  stroke(150);
  strokeWeight(1);
  
  // Draw 5 steps
  for (let i = 0; i < 5; i++) {
    rect(290, 800 - i*10, 200, 10);
  }
  
  // Step side edges
  stroke(100);
  line(290, 750, 290, 800); // Left edge
  line(490, 750, 490, 800); // Right edge
}

function drawLibraryName() {
  // Dark text for library sign
  fill(50);
  noStroke();
  textAlign(CENTER);
  textSize(25);
  textStyle(BOLD);
  text("Brooklyn Public Library", 390, 460);
}
