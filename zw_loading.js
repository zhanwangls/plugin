/*  
	loading提示框插件：
	版本：v1.0
	调用方式：
	1、zwLoading({content:"请耐心等待",mark:"slideUp",time:10,overlay:true,w:200,h:60});，
	2、new zw_loading({content:"请耐心等待，正在为您努力加载中..."});
	参数：
	content：必选项，提示内容
	mark：可选项，提示进出时的效果
	time：可选项，提示消失时间
	overlay：可选项，是否添加遮罩层，默认为否
	w：可选项，提示宽度。默认<=320px
	h：可选项，提示高度。默认为auto
*/

var zw_loading = function(options){
	var opts = $.extend({},options);
	this.init(opts);
};

zw_loading.prototype = {
	init : function(opts){
		var $dom = this.template(opts);
		this._position($dom);
		this._event(opts,$dom);
		this._timer(opts,$dom);
	},
	template : function(opts){
		var $loading = $("#zwui-loading");
		var html = "";
		var overlay = "";
		// 有层存在时，更改文字，没有层存在时，弹出层。防止上一个层没关闭用户就点击了下一次操作，同时弹出一个以上的层
		if($loading.length == 0){
			html = "<div id='zwui-loading'>"
						+"<div id='zwui-loading-cnt'>"+opts.content+"</div>"
					+"</div>";
			$("body").append(html);
		}else{
			$loading.find("#zwui-loading-cnt").html(opts.content);
		}
		$loading = $("#zwui-loading");
		// 是否添加阴影层
		if(opts.overlay){
			overlay = "<div id='zwui-loading-overlay'></div>";
			$loading.append(overlay);
		}
		// 文字宽度<320时，使用自动宽度，>320时，使用固定宽度320px，换行。
		var $ctnWidth = $("#zwui-loading-cnt").width();
		if($ctnWidth>320){
			$loading.width(320+50);
		}else{
			$loading.width($ctnWidth);
			
		}
		// 用户可以输入固定宽度
		if(opts.w || opts.h){
			$loading.css({width:opts.w-10,height:opts.h-12,"line-height":"opts.h"-12});
		}
		return $loading;
	},
	_position : function($dom){
		var $width = $dom.width();
		var $height = $dom.height();
		var clientWidth = $(window).width();
		var clientHeight = $(window).height();
		var _left = (clientWidth - $width)/2;
		var _top = (clientHeight - $height)/2;
		$dom.css({left:_left,top:_top});
		return $dom;
	},
	_event : function(opts,$dom){
		$dom.click(function(){
			animates($dom,opts.mark);
		});
	},
	_timer : function(opts,$dom){
		var timer = null;
		if(opts.time > 0){
			clearTimeout(timer);
			timer = setTimeout(function(){
				$dom.trigger("click");
			},opts.time*1000);
		}
	}
};
/* 不用new的方式 */
var zwLoading = function(opts){
	new zw_loading(opts);
};