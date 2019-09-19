var error = function() {

	var imgs, len, width, θ, delta, angle, timer, content;

	function round() {
		for (var i = 0; i < len; i++) {
			imgs[i].style.zIndex = Math.round(Math.sin(angle * i + θ) * 100);
			imgs[i].style.height = Math.round(width * 10 / (19 - 9 * Math.sin(angle * i + θ))) + "px";
			imgs[i].style.left = content.x + Math.round(content.x * .7 * Math.cos(angle * i + θ)) + "px";
			imgs[i].style.top = content.y + Math.round(content.y * .2 * Math.sin(angle * i + θ)) + "px";
		}
		θ += delta;
		timer = setTimeout(round, 16);
	}

	function resize() {
		content = {};
		content.height = document.documentElement.clientHeight;
		content.width = document.documentElement.clientWidth;
		content.y = Math.floor((content.height - width) / 2);
		content.x = Math.floor((content.width - width) / 2);
	}

	function wheel(e) {
		if (e.wheelDelta && e.wheelDelta > 0) {
			delta += 0.01;
		} else {
			delta -= 0.01;
		}
	}

	function init() {
		imgs = document.getElementById("ppt").getElementsByTagName("img");
		len = imgs.length;
		width = 130;
		θ = 0;
		delta = 0.015;
		angle = 2 * Math.PI / len;
		resize();
		window.onresize = resize;
		window.onwheel = wheel;
		document.onselectstart = function() {
			return false;
		};
		document.ondragstart = function() {
			return false;
		};
		return this;
	}

	function stop() {
		clearTimeout(timer);
		return this;
	}

	return {
		init: init,
		round: round,
		stop: stop
	};
}();

window.onload = function() {
	document.getElementById('loading').style.display = "none";
	document.getElementById('ppt').style.display = "block";
	error.init().round();
}