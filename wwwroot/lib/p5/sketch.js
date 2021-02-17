var Canvas1
var Width;
var Height;

function setup() {
    Canvas1 = createCanvas(windowWidth, 720, WEBGL);
    Canvas1.position(0, 72);
    Canvas1.style('z-index', '-1');
    angleMode(DEGREES);
}

function windowResized() {
    Canvas1 = createCanvas(windowWidth, 720, WEBGL);
    Canvas1.position(0, 72);
    Canvas1.style('z-index', '-1');
    angleMode(DEGREES);
}

var Count = 0;
var MousePress = false;

function draw() {

    MainFlow();

    Count++;

    if (Count === 30) {
        MousePress = false;
    }
}

function MainFlow() {
    if (!MousePress) {
        background(255, 255, 255, 0);

        rotateX(72);

        noFill();
        stroke(90);

        for (var track = 0; track < 72; track++) {

            var red = map(sin(frameCount / 2), -1, 1, 90, 180);
            var green = map(track, 30, 60, 90, 180);
            var blue = map(cos(frameCount), -1, 1, 180, 180);

            stroke(red, green, blue);

            beginShape()
            for (var sector = 0; sector < 360; sector += 10) {
                var radius = track * 3;
                var x = radius * cos(sector);
                var y = radius * sin(sector) + 360;
                var z = sin(frameCount * 2 + track * 10) * 50 + 270;

                vertex(x, y, z);
            }
            endShape(CLOSE);
        }
    }
}