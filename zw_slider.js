/*
	进度滑块插件：
	版本：v1.0
	调用方式：$("xxxx").zwSlider({});
	为了显示百分比引用了loading插件
*/
(function($){
	$.fn.zwSlider = function(options){
		var opts = $.extend({},$.fn.zwSlider.methods,options);
		$(this).each(function(){
			opts.init($(this),opts);
		});
		
	};
	$.fn.zwSlider.methods = {
		init : function($dom,opts){
			this.template($dom);
			this._event($dom);
		},
		template : function($dom){
			$dom.addClass("zwui-slider zwui-slider-horizontal");
			$dom.append("<a class='zwui-slider-handle' href='javascript:void(0);'></a>");
		},
		_event : function($dom){
			var $fthis = this;
			/* 滑动形式 */
			var flag = false;
			$dom.find(".zwui-slider-handle").on("mousedown",function(e1){
				flag = true;
				var $this = $(this);
				var x1 = e1.clientX;//鼠标按下的位置
				var domWidth = $this.parent(".zwui-slider").width();//滑块轨道大小，用作边界判断
				var pleft = $this.position().left;//滑块当前定位的left
				$(document).on("mousemove",function(ev){
					if(flag){
						var x2 = ev.clientX;//鼠标移动时，鼠标的位置
						var _left = x2 - x1 + pleft;//滑块的定位计算
						//边界控制
						if(_left <= 0) _left = 0;
						if(_left >= domWidth) _left = domWidth;
						$this.css({left:_left});
						//显示百分比
						var percent = _left/domWidth;
						$fthis._percent(percent);
					}
				}).on("mouseup",function(){
					flag = false;
				});
			});
			/* 点击形式 */
			$(".zwui-slider").on("click",function(ec){
				var xc = ec.clientX;
				var xp = $(this).offset().left;
				var _left = xc-xp;
				$(this).find(".zwui-slider-handle").css({left:_left});
				//显示百分比
				var percent = _left / $(this).width();
				$fthis._percent(percent);
			});
		},
		_percent : function($num){
			var s = numToTwoDecimal($num);
			if(s == "100.00") s = "100";//如果100.00%，则显示100%
			s += "%";
			zwLoading({content:s,overlay:false,w:100,h:45});
		}
	}
})(jQuery)