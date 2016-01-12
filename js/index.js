function ScrollImage(){
	this.init.apply(this,arguments);
};
ScrollImage.prototype = {
	init:function(id){
		var _that = this;
		this.wrap = (typeof id == "string")?document.getElementById(id):id;
		this.nav = this.wrap.getElementsByTagName("ul")[0];
		this.navList = this.nav.getElementsByTagName("li");
		this.navListWidth = this.navList[0].offsetWidth;
		this.wrapWidth();
		this.durationTime = 1000;
		this.speed = 0;
		this.changeSpeed = this.navListWidth/this.durationTime;
		this.clearIntervalId = setInterval(function(){
			_that.inScroll();
		},1);
		this.wrap.onmouseover = function(){
			clearInterval(_that.clearIntervalId);
		};
		this.wrap.onmouseout = function(){
			_that.clearIntervalId = setInterval(function(){
				_that.inScroll();
			},1);
		};
	},
	inScroll:function(){
		var _that = this;
		if(this.speed<=(this.navListWidth * (this.navList.length-1))){
			this.nav.style.left = -this.speed + 'px';
		}else{
			this.speed = 0;
			this.nav.style.left = 0+ 'px';
		};
		this.speed  += this.changeSpeed;
	},
	wrapWidth:function(){
		var _that = this;
		this.nav.style.width = (this.navListWidth * this.navList.length) + 'px';
	}
};
