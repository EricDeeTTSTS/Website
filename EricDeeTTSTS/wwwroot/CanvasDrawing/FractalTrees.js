const TreeCanvasLeftTop = document.querySelector('.TreeCanvasLeftTop');
TreeCanvasLeftTop.width = 360;
TreeCanvasLeftTop.height = 360;
const Context_TreeCanvasLeftTop = TreeCanvasLeftTop.getContext('2d');

function DrawTreeLeftTop(startX, startY, length, angle, branchWidth, color1, color2) {
    Context_TreeCanvasLeftTop.beginPath();
    Context_TreeCanvasLeftTop.save();
    Context_TreeCanvasLeftTop.strokeStyle = color1;
    Context_TreeCanvasLeftTop.fillStyle = color2;
    Context_TreeCanvasLeftTop.lineWidth = branchWidth;
    Context_TreeCanvasLeftTop.translate(startX, startY);
    Context_TreeCanvasLeftTop.rotate(angle * Math.PI / 180);
    Context_TreeCanvasLeftTop.moveTo(0, 0);
    Context_TreeCanvasLeftTop.lineTo(0, -length);
    Context_TreeCanvasLeftTop.stroke();

    if (length < 10) {
        Context_TreeCanvasLeftTop.restore();
        return;
    }

    // Branch right
    DrawTreeLeftTop(0, -length, length * 0.75, angle + 5, branchWidth);
    // Branch left
    DrawTreeLeftTop(0, -length, length * 0.75, angle - 5, branchWidth);

    // Restore canvas context to upright
    Context_TreeCanvasLeftTop.restore();
}

const TreeCanvasRightTop = document.querySelector('.TreeCanvasRightTop');
TreeCanvasRightTop.width = 360;
TreeCanvasRightTop.height = 360;
const Context_TreeCanvasRightTop = TreeCanvasRightTop.getContext('2d');

function DrawTreeRightTop(startX, startY, length, angle, branchWidth, color1, color2) {
    Context_TreeCanvasRightTop.beginPath();
    Context_TreeCanvasRightTop.save();
    Context_TreeCanvasRightTop.strokeStyle = color1;
    Context_TreeCanvasRightTop.fillStyle = color2;
    Context_TreeCanvasRightTop.shadowBlur = 18;
    Context_TreeCanvasRightTop.shadowColor = '#123123';
    Context_TreeCanvasRightTop.lineWidth = branchWidth;
    Context_TreeCanvasRightTop.translate(startX, startY);
    Context_TreeCanvasRightTop.rotate(angle * Math.PI / 180);
    Context_TreeCanvasRightTop.moveTo(0, 0);
    // Context_TreeCanvasRightTop.lineTo(0, -length);
    if (angle > 0) {
        Context_TreeCanvasRightTop.bezierCurveTo(10, -length / 2, 10, -length / 2, 0, -length)

    }
    else {
        Context_TreeCanvasRightTop.bezierCurveTo(10, -length / 2, -10, -length / 2, 0, -length)
    }
    Context_TreeCanvasRightTop.stroke();

    if (length < 10) {
        Context_TreeCanvasRightTop.beginPath();
        Context_TreeCanvasRightTop.arc(0, -length, 10, 0, Math.PI / 2);
        Context_TreeCanvasRightTop.fill();
        Context_TreeCanvasRightTop.restore();
        return;
    }

    // Branch right
    DrawTreeRightTop(0, -length, length * 0.75, angle + 5, branchWidth * 0.5);
    // Branch left
    DrawTreeRightTop(0, -length, length * 0.75, angle - 5, branchWidth * 0.5);

    // Restore canvas context to upright
    Context_TreeCanvasRightTop.restore();
}

/* For Random left */

function DrawTreeLeftTopRandom(startX, startY, length, angle, branchWidth, color1, color2) {

    let curve = (Math.random() * 10) + 10;

    Context_TreeCanvasLeftTop.beginPath();
    Context_TreeCanvasLeftTop.save();
    Context_TreeCanvasLeftTop.strokeStyle = color1;
    Context_TreeCanvasLeftTop.fillStyle = color2;
    Context_TreeCanvasLeftTop.shadowBlur = 18;
    Context_TreeCanvasLeftTop.shadowColor = '#369369';
    Context_TreeCanvasLeftTop.lineWidth = branchWidth;
    Context_TreeCanvasLeftTop.translate(startX, startY);
    Context_TreeCanvasLeftTop.rotate(angle * Math.PI / 180);
    Context_TreeCanvasLeftTop.moveTo(0, 0);
    // Context_TreeCanvasRightTop.lineTo(0, -length);
    if (angle > 0) {
        Context_TreeCanvasLeftTop.bezierCurveTo(curve + Math.random(), -length / 2, curve + Math.random(), -length / 2, 0, -length)

    }
    else {
        Context_TreeCanvasLeftTop.bezierCurveTo(curve + Math.random(), -length / 2, -curve - Math.random(), -length / 2, 0, -length)
    }
    Context_TreeCanvasLeftTop.stroke();

    if (length < 9) {
        Context_TreeCanvasLeftTop.beginPath();
        Context_TreeCanvasLeftTop.arc(0, -length, 10, 0, Math.PI / 2);
        Context_TreeCanvasLeftTop.fill();
        Context_TreeCanvasLeftTop.restore();
        return;
    }

    // Branch right
    DrawTreeLeftTopRandom(0, -length, length * 0.75, angle + curve + Math.random(), branchWidth * 0.5);
    // Branch left
    DrawTreeLeftTopRandom(0, -length, length * 0.75, angle - curve + Math.random(), branchWidth * 0.5);

    // Restore canvas context to upright
    Context_TreeCanvasLeftTop.restore();
}

/* Tree Generate Button */

const TreeButton = document.querySelector('.GenerateTreeButton');

DrawTreeLeftTop(TreeCanvasLeftTop.width / 2, (TreeCanvasLeftTop.height - 9), 72, 0, 2, 'brown', 'green');
DrawTreeRightTop(TreeCanvasRightTop.width / 2, (TreeCanvasRightTop.height - 9), 90, 0, 27, 'brown', 'green');

function GenerateRandomTreeLeft() {
    Context_TreeCanvasLeftTop.clearRect(0, 0, TreeCanvasLeftTop.width, TreeCanvasLeftTop.height);
    let centerPointX = TreeCanvasLeftTop.width / 2;
    let length = Math.floor((Math.random() * 9) + 72);
    let angle = Math.random();
    let branchWidth = (Math.random() * 30) + 9;
    let color1 = 'rgb(' + Math.random() * 180 + ',' + Math.random() * 180 + ',' + Math.random() * 180 + ')';
    let color2 = 'rgb(' + Math.random() * 180 + ',' + Math.random() * 180 + ',' + Math.random() * 180 + ')';
    curve = (Math.random() * 10) + 10;
    DrawTreeLeftTopRandom(centerPointX, TreeCanvasLeftTop.height - Math.random(), length, angle, branchWidth, color1, color2);
    TreeButton.style.background = color1;
}

TreeButton.addEventListener('click', GenerateRandomTreeLeft);