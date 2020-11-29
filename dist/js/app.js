
// Simple pure JavaScript plugin to rotate text snippets as if they were being typed.
// http://schier.co/post/simple-vanilla-javascript-typing-carousel

var TxtRotate = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 300 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName('txt-rotate');
	for (var i=0; i<elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-rotate');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
		new TxtRotate(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
	document.body.appendChild(css);
};


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );

const renderer = new THREE.WebGLRenderer( { alpha: true } ); // init like this
renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.body.appendChild( renderer.domElement );

// Make sure the project is responsive based on window resizing
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth/2 ,window.innerHeight/2 );
	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();
})

const geometry = new THREE.BoxGeometry();
var cubeMaterials = [ 
    new THREE.MeshBasicMaterial({color:0xcaffbf, transparent:true, opacity:0.9, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0x9bf6ff, transparent:true, opacity:0.9, side: THREE.DoubleSide}), 
    new THREE.MeshBasicMaterial({color:0x457b9d, transparent:true, opacity:0.9, side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({color:0xbdb2ff, transparent:true, opacity:0.9, side: THREE.DoubleSide}), 
    new THREE.MeshBasicMaterial({color:0xffc6ff, transparent:true, opacity:0.9, side: THREE.DoubleSide}), 
    new THREE.MeshBasicMaterial({color:0xfffffc, transparent:true, opacity:0.9, side: THREE.DoubleSide}), 
]; 

const cube = new THREE.Mesh( geometry, cubeMaterials );
scene.add( cube );
scene.background ;

camera.position.z = 2;

const animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.02;

	renderer.render( scene, camera );
};

animate();