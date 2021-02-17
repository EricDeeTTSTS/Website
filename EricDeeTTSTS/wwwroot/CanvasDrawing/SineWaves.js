const SineCanvasTop = document.querySelector('.SineCanvasTop');
SineCanvasTop.width = innerWidth;
SineCanvasTop.height = 270;
const Context_SineCanvasTop = SineCanvasTop.getContext('2d');

let OriginX = SineCanvasTop.width / 3;
let OriginY = SineCanvasTop.height / 2;

let T = 0;

let Wave = [];

let Count = 0;

function DrawSineTop() {

	Count++;

	let LastX = OriginX;
	let LastY = OriginY;

	let X = OriginX;
	let Y = OriginY;

	let a = 10;
	let r = 36;

	Context_SineCanvasTop.fillStyle = 'white';
	Context_SineCanvasTop.fillRect(0, 0, SineCanvasTop.width, SineCanvasTop.height);

	for (let i = 0; i < a; i++) {

		let n = (i * 2) + 1;
		let radius = r * (3 / (n * Math.PI));

		X += radius * Math.cos(n * T);
		Y += radius * Math.sin(n * T);

		// *** Drawing lines ***

		Context_SineCanvasTop.beginPath();
		Context_SineCanvasTop.strokeStyle = 'black';
		Context_SineCanvasTop.lineJoin = 'round';
		Context_SineCanvasTop.lineCap = 'round';
		Context_SineCanvasTop.fillStyle = 'white';
		Context_SineCanvasTop.moveTo(LastX, LastY);
		Context_SineCanvasTop.lineTo(X, Y);
		Context_SineCanvasTop.stroke();
		LastX = X;
		LastY = Y;

		// *** Drawing circles ***

		Context_SineCanvasTop.beginPath(); /* TRY REMOVING THIS */
		Context_SineCanvasTop.strokeStyle = 'rgba(30, 60, 90, 30)'
		Context_SineCanvasTop.arc(LastX, LastY, radius, 0, Math.PI * 2);
		Context_SineCanvasTop.stroke();
		LastX = X;
		LastY = Y;

		// *** Drawing dots at the ends of the line ***

		Context_SineCanvasTop.beginPath(); /* TRY REMOVING THIS */
		Context_SineCanvasTop.fillStyle = 'rgba(30, 60, 90, 60)'
		Context_SineCanvasTop.arc(X, Y, 3, 0, Math.PI * 2);
		LastX = X;
		LastY = Y;

	}
	Wave.unshift(Y);

	// Drawing line to wave form from function
	Context_SineCanvasTop.beginPath();
	Context_SineCanvasTop.strokeStyle = 'black';
	Context_SineCanvasTop.lineJoin = 'round';
	Context_SineCanvasTop.lineCap = 'round';
	Context_SineCanvasTop.fillStyle = 'white';
	Context_SineCanvasTop.moveTo(X, Y);
	Context_SineCanvasTop.lineTo(OriginX + OriginX / 6.666, Wave[0]);
	Context_SineCanvasTop.stroke();

	// Drawing wave
	Context_SineCanvasTop.beginPath();
	Context_SineCanvasTop.strokeStyle = '#123123';
	Context_SineCanvasTop.lineJoin = 'round';
	Context_SineCanvasTop.lineCap = 'round';
	Context_SineCanvasTop.fillStyle = 'white';
	Context_SineCanvasTop.moveTo(OriginX + OriginX / 6.666, Wave[0]);

	for (let index = 0; index < SineCanvasTop.width / 3.333; index++) {

		Context_SineCanvasTop.lineTo(OriginX + OriginX / 6.666 + index, Wave[index]);
	}

	Context_SineCanvasTop.stroke();

	T += .36;
}

// DrawBackgroundTop();
setInterval(() => DrawSineTop(), 27);

window.addEventListener("resize", function () {
	SineCanvasTop.width = innerWidth;
	SineCanvasTop.height = 270;
});