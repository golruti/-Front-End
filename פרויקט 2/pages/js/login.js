function ready(){

	$('.input').on("focus", function() {
		$(".login-form").addClass("focused");
	});

	$('.input-btn').on('click', function(e){
		e.preventDefault();
		$(".login-form").removeClass("focused").addClass("loading");
	});
};

var canvas = document.getElementById('tutorial'),
		context = canvas.getContext('2d'),
		w = canvas.width = window.innerWidth,
		h = canvas.height = window.innerHeight,
		area = w * h,
		particleNum = 300,
		ANIMATION,
		particleStartX = w / 2,
		particleStartY = h / 2,
    particles = [],
    audioIndex = 0,
    audio = [];

const
  audioIndexMax = 10,
  frequency = 25; // The lesser the number the more frequent the explosion.

for ( i = 0; i < audioIndexMax; i++) {
  audio[i] = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/387354/explosion.mp3');
}



// Particle constructor
function Particle(i) {
	this.id = i;
	this.hue = rand(360,0, 1);
	this.active = false;
}

Particle.prototype.build = function(parX, parY) {
	// 	window center
	this.x =  parX;
	this.y =  parY;
	// random
	this.r = rand(7, 2, 1);
	this.vx = Math.random() * 10 - 5;
	this.vy = Math.random() * 10 - 5;
	this.gravity = .01;
	this.opacity = Math.random() + .5;
	this.active = true;
	
	context.beginPath();
	context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	context.fillStyle ="hsla(" + this.hue + ",100%,50%,1)";
	context.fill();
};

Particle.prototype.draw = function() {
	this.active = true;
	this.x += this.vx;
	this.y += this.vy;
	this.vy += this.gravity;
	this.hue -= 0.5;
	this.r = Math.abs(this.r - 0.05);
	
	context.beginPath();
	context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	context.fillStyle = "hsla(" + this.hue + ", 100%, 50%, 1)";
	context.fill();
	
	if(this.r <= 0.5) {
		this.active = false;
	}
	
}



(function init() {
	initCanvas();
	window.addEventListener('resize', initCanvas, false);
	document.addEventListener('mousemove', function(e) {
		if(e.pageY <= 10 || e.pageY > window.innerHeight || e.pageX <= 10 || e.pageX > window.innerWidth ) {
			console.log('out');
			particleStartY = h / 2;
			particleStartX = w / 2;
		} else {
			particleStartX = e.pageX;
			particleStartY = e.pageY;
		}

	});
})();

// Helper Functions

function rand(max, min, _int) {
	var max = (max === 0 || max) ? max: 1,
			min = min || 0,
			gen = min + (max -min) * Math.random();
	return (_int) ? Math.round(gen) : gen;
}
