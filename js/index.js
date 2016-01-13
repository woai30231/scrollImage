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
		this.leftBtn = this.wrap.getElementsByClassName("left")[0];
		this.rightBtn = this.wrap.getElementsByClassName("right")[0];
		//li标签的个数
		this.liLength = this.navList.length;
		this.wrapWidth.apply(_that);
		//每一张图片滚动一个版面所需要的的时间，单位是ms
		this.durationTime = 1000;
		//每个时段版面的left值，初始为0
		this.leftPos = 0;
		//版面滚动的最大left值
		this.maxLeftPos = (this.liLength-1) * this.navListWidth;
		this.clearIntervalId = setInterval(function(){
			_that.LeftInScroll();
		},1500);
		//定义一个方法用来获取左边按钮点击方法
		this._leftInScroll = function(){return _that.leftInScroll.apply(_that);};
		//定义一个方法用来获取右边按钮点击方法
		this._rightInScroll = function(){return _that.rightInScroll.apply(_that);};
		//定义一个变量用来判别当前是不是处于运动状态,初始值为0
		this.distinguishMove = 0;
		this.wrap.onmouseover = function(){
			clearInterval(_that.clearIntervalId);
		};
		this.wrap.onmouseout = function(){
			_that.clearIntervalId = setInterval(function(){ 
				_that.leftInScroll();
			},1500);
		};
		this.addEvent("click",_that.leftBtn,this._leftInScroll);
		this.addEvent("click",this.rightBtn,this._rightInScroll);
	},
	leftInScroll:function(){
		this.leftPos  += this.navListWidth;
		var _that = this;
		if(_that.leftPos <= this.maxLeftPos && _that.leftPos >=0){
			_that.nav.style.left = -_that.leftPos + 'px';
		}else{
			_that.leftPos = 0;
			_that.nav.style.left = 0+ 'px';
		};
	},
	rightInScroll:function(){
		var _that = this;
		_that.leftPos -= _that.navListWidth;
		if(_that.leftPos<= this.maxLeftPos && _that.leftPos >=0){
			_that.nav.style.left = -_that.leftPos + 'px';
		}else{
			_that.leftPos = _that.maxLeftPos;
			_that.nav.style.left = -_that.maxLeftPos + 'px';
		};
	},
	wrapWidth:function(){
		var _that = this;
		this.nav.style.width = (this.navListWidth * this.navList.length) + 'px';
	},
	addEvent:function(type,dom,handler){
		return dom.addEventListener?dom.addEventListener(type,handler,false):dom.attachEvent("on"+type,handler);
	},
	moveFun:function(distance){
		console.log("moveFun");
		var _that = this;
		//定义一个变量用来存储单位时间需要走动的距离
		var changePos = distance/this.durationTime;
		this.nav.style.left = changePos + 'px';
		var moveIntervalId = setInterval(arguments.callee,1);
	}
};
