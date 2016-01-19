function initCanvas(){

	var ctx = document.getElementById('777').getContext('2d');
	var cW = ctx.canvas.width;
	var cH = ctx.canvas.height;
	var y = 0;
	
	function animate() {
		ctx.save();
		ctx.clearRect(0, 0, cW, cH);
		// Draw here
		ctx.fillStyle = 'magenta';
		ctx.fillRect(0,y,50,50);
		//y++;
		ctx.restore();
	}
	
	var animateInt = setInterval(animate, 30);
	
}

window.addEventListener('load', function (event) {
	initCanvas();
})