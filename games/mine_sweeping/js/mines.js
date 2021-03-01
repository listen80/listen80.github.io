var mines = function(){

	var config = {
		width: 40,
		height: 20,
		mines: 140
	}

	var game_arr = [];
	var gameStatus = 0;
	var w, h, mines, flags, space, isFirst, initStatus;
	var game;

	function start(_) {
		setConfig(_)
		if(!initStatus) {
			initStatus = true;
			bindDom();
		}

		w = config.width,
		h = config.height,
		mines = config.mines;

		game_arr = [];
		gameStatus = 0;
		space = w * h;
		flags = mines;

		isFirst = 1;
		if(!(mines < w * h)) {
			w = 40,
			h = 20,
			mines = 80;
		}

		setInfo();
		createDom();
		createArr();
	}

	function setConfig(_config) {
		if(typeof _config === "object") {
			var w = _config.width || _config.w || config.width,
			h = _config.height || _config.h || config.height,
			mines = _config.mines || _config.m || config.mines;

			if(!(mines < w * h) || !(mines > 0)) {
				return '配置错误';
			}
		} else if(typeof _config === "number") {
			var w = config.width,
			h = config.height,
			mines = _config;
			if(!(mines < w * h) || !(mines > 0)) {
				return '配置错误';
			}
		} else {
			return config;
		}
		return config = {
			width: w,
			height: h,
			mines: mines
		}
	}

	function createDom() {
		game.innerHTML = '';
		var lis = game.getElementsByTagName('li');
		var len = lis.length
		if(len) {
			for(var x = 0; x < len; x++) {
				lis.removeAttribute('className');
			}
		} else {
			var div = document.createDocumentFragment();
			for (var j = 0; j < h; j++) {
				var ul = document.createElement('ul');
				for (var i = 0; i < w; i++) {
					var li = document.createElement('li');
					li.x = i;
					li.y = j;
					ul.appendChild(li);
				}
				div.appendChild(ul);
			}
			game.appendChild(div);
		}


	}

	function createArr() {
		game_arr = [];
		for (var j = 0; j < h; j++) {
			var arr = [];
			for (var i = 0; i < w; i++) {
				arr.push({})
			}
			game_arr.push(arr);
		}
	}

	function createMap(y, x) {
		var _mines = mines;
		while(true) {
			var _h = rand(h);
			var _w = rand(w);
			if(_h === y && _w === x) {
				continue;
			}
			var el = game_arr[_h][_w]
			if(typeof el.num === 'undefined') {
				el.num = -1;
				_mines--;
				if(_mines === 0) {
					break;
				}
			}
		}
		for (var j = 0; j < h; j++) {
			for (var i = 0; i < w; i++) {
				var el = game_arr[j][i];
				if(typeof el.num === 'undefined') {
					el.num = getNum(j, i);
				}
			}
		}
	}

	function rand(n) {
		return Math.floor(Math.random() * n);
	}

	function exist(y, x) {
		return y >= 0 && y < h && x >= 0 && x < w;
	}

	function getMines(y, x) {
		if(exist(y, x)) {
			if(game_arr[y][x].num === -1) {
				return 1;
			}
		}
		return 0;
	}

	function getNum(y, x) {
		var count =
			getMines(y + 1, x + 1) +
			getMines(y, x + 1) +
			getMines(y - 1, x + 1) +
			getMines(y + 1, x - 1) +
			getMines(y, x - 1) +
			getMines(y - 1, x - 1) +
			getMines(y - 1, x) +
			getMines(y + 1, x);
		return count;
	}

	function setInfo() {
		document.querySelector('#start').innerHTML = '剩' + flags + '雷';
	}

	function setEl(y, x, cl) {
		game.childNodes[y].childNodes[x].className = cl;
	}

	var winTimer;
	var delayed;
	function setWinHide() {
		delayed = 0;
		document.querySelector('#win').className = 'hide';
	}

	function setMsg(win) {
		setTimeout(function(){
			delayed = 1;
		}, 1000);
		winTimer = setTimeout(setWinHide, 3333);
		document.querySelector('#win').style.display = 'table';
		document.querySelector('#result').src = 'images/' + (win ? 'win.jpg' : 'lose.jpg');
	}

	function searchBlank(y, x, time) {
		time = time || 33;
		if(exist(y, x)) {
			var el = game_arr[y][x];
			if(!el.open && !el.flag) {
				el.open = 1;
				space--;
				var num = el.num;
				setEl(y, x, 'num' + num);

				if(space === flags) {
					gameStatus = 1;
					setMsg(1);
					return false;
				}
				if(num === 0) {
					setTimeout(function(){
						searchBlank(y + 1, x + 1, time);
						searchBlank(y, x + 1, time);
						searchBlank(y - 1, x + 1, time);

						searchBlank(y + 1, x - 1, time);
						searchBlank(y, x - 1, time);
						searchBlank(y - 1, x - 1, time);

						searchBlank(y - 1, x, time);
						searchBlank(y + 1, x, time);
					}, time);
				}
			}
		} else {
			return false;
		}
	}

	function searchBoom(y, x, time) {
		time = time || 50;
		if(exist(y, x)) {
			var el = game_arr[y][x];
			var num = el.num;
			if(!el.boom) {
				el.boom = 1;
				if(el.flag) {
					if(num === -1) {
						setEl(y, x, 'mine_right');
					} else {
						setEl(y, x, 'mine_wrong');
					}
				} else if(num === -1){
					setEl(y, x, 'mine');
				}
				if(time > 30) {
					time -= 3;
				}
				setTimeout(function(){
					searchBoom(y + 1, x + 1, time);
					searchBoom(y, x + 1, time);
					searchBoom(y - 1, x + 1, time);

					searchBoom(y + 1, x - 1, time);
					searchBoom(y, x - 1, time);
					searchBoom(y - 1, x - 1, time);

					searchBoom(y - 1, x, time);
					searchBoom(y + 1, x, time);
				}, time);
			}
		} else {
			return false;
		}
	}

	function getFlag(y, x) {
		if(exist(y, x)) {
			if(game_arr[y][x].flag) {
				return 1;
			}
		}
		return 0;
	}

	function getFlags(y, x) {
		var count =
			getFlag(y + 1, x + 1) +
			getFlag(y, x + 1) +
			getFlag(y - 1, x + 1) +
			getFlag(y + 1, x - 1) +
			getFlag(y, x - 1) +
			getFlag(y - 1, x - 1) +
			getFlag(y - 1, x) +
			getFlag(y + 1, x);
		return count;
	}

	function click(y, x) {
		if(exist(y, x)) {
			var el = game_arr[y][x];
			if(!el.open && !el.flag) {
				var num = el.num;
				if(num === -1) {
					gameStatus = -1;
					setMsg();
					searchBoom(y, x);
				} else if(num === 0) {
					searchBlank(y, x);
				} else {
					setEl(y, x, 'num' + num);
					el.open = 1;
					space--;

					if(space === flags) {
						gameStatus = 1;
						setMsg(1);
					}
				}
			}
		}
	}

	function dblclick(y, x) {
		var el = game_arr[y][x];
		var num = el.num;
		if(num > 0) {
			var flags = getFlags(y, x);
			if(num === flags) {
				click(y + 1, x + 1);
				click(y, x + 1);
				click(y - 1, x + 1);
				click(y + 1, x - 1);
				click(y, x - 1);
				click(y - 1, x - 1);
				click(y - 1, x);
				click(y + 1, x);
			}
		}
	}

	function contextmenu(y, x) {
		var el = game_arr[y][x];
		if(!el.open) {
			if(el.flag) {
				flags++;
				space++;
				delete el.flag;
				setEl(y, x, '');
			} else if(flags){
				flags--;
				space--;
				el.flag = 1;
				setEl(y, x, 'flag');
			}
		}
	}

	function bindDom() {

		document.querySelector('#win').onclick = function(){
			if(delayed) {
				clearTimeout(winTimer);
				setWinHide();
			}
		}

		document.querySelector('#win').addEventListener("transitionend", function(){
			this.removeAttribute('style');
			this.removeAttribute('class');
			document.querySelector('#start').innerHTML = '点击开始';
			document.querySelector('#start').className = 'colorful';
		})

		document.querySelector('#start').onclick = function(){
			this.removeAttribute('class');
			start();
		}

		document.body.onselectstart = function(){
			return false;
		}

		game = document.querySelector('#game');

		game.ondblclick = function(event){
			if(!gameStatus) {
				var target = event.target;
				if(target.tagName === 'LI') {
					var y = target.y, x = target.x;
					dblclick(y, x);
				}
				if(space === flags) {
					gameStatus = 1;
					setMsg(1);
				}
				setInfo();
			}
			return false;
		}

		game.onclick = function(event){
			if(!gameStatus) {
				var target = event.target;
				if(target.tagName === 'LI') {
					var y = target.y, x = target.x;
					if(isFirst) {
						createMap(y, x);
						isFirst = 0;
					}
					click(y, x);
				}
			}
			return false;
		}

		game.oncontextmenu = function() {
			if(!gameStatus) {
				var target = event.target;
				if(target.tagName === 'LI') {
					var y = target.y, x = target.x;
					contextmenu(y, x)
				}
				setInfo();
			}
			return false;
		}

	}

	return {
		start: start
	}
}();

mines.start();