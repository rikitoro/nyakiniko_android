//
const canvasWidth = 320;
const canvasHeight = 450;
//

//
var Nyanko = function(name, initX, initY, sittingImage, walkingImage) {
    this.name = name;
    this.x = initX;
    this.y = initY;
    this.image = sittingImage;
    //
    var _walkingImage = walkingImage;
    var _sittingImage = sittingImage;
    //
    var _destX = this.x;
    var _destY = this.y;
    var _drawer;
    //
    var _self = this;
    //
    this.setDrawer = function(drawer) {
	_drawer = drawer;
    }

    //
    this.moveTo = function(destX, destY) {
	_destX = destX;
	_destY = destY;
	_walk();
    }

    //
    function _walk() {
	var vecX = _destX - _self.x;
	var vecY = _destY - _self.y;
	var distance = Math.sqrt(vecX*vecX + vecY*vecY);
	if(distance > 15) {
	    _self.image = _walkingImage;
	    _self.x += 10 * vecX / distance;
	    _self.y += 10 * vecY / distance;
	    _update();
	    setTimeout(_walk, 50);
	} else {
	    _sit();
	};
    }

    //
    function _sit() {
	_self.image = _sittingImage;
	_update();
    }

    //
    function _update() {
	_drawer.update();
    }
};

//
var Drawer = function(name, canvas) {
    this.name = name;
    var _canvas = canvas;
    var _nyanko;
    var _self = this;
    //
    this.appendNyanko = function(nyanko) {
	nyanko.setDrawer(_self);
	_nyanko = nyanko;
    };
    //
    this.update = function() {
	var ctx = _canvas.getContext('2d');
	ctx.fillStyle = "rgb(190,240,190)";
	ctx.fillRect (0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(_nyanko.image, 
		      _nyanko.x - _nyanko.image.width/2, 
		      _nyanko.y - _nyanko.image.height/2);
    };
    
};

window.onload = function() {
    //

    var walkingImage = new Image();
    walkingImage.src = "nekoWalking.png";
    var sittingImage = new Image();
    sittingImage.src = "nekoSitting.png";
    var nyanko = new Nyanko("nyankosensei",
			    canvasWidth/2, canvasHeight/2, 
			    sittingImage, walkingImage);  
    
    //
    var canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.onmousedown = function(e) {
	nyanko.moveTo(e.offsetX, e.offsetY);
    };
    document.getElementById("nyakinekocanvas").appendChild(canvas);

    //
    var drawer = new Drawer("picaso", canvas);

    //    
    //nyanko.setDrawer(drawer);
    drawer.appendNyanko(nyanko);
    //
    nyanko.moveTo(canvasWidth/2, canvasHeight/2);
};
