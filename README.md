# plugin
JavaScript Plugin

#### zw-loading 加载等待插件
###### 调用方式
1. 引入zw-loading.js 和 jquery.js 文件
2. zwLoading({content:"请耐心等待",mark:"slideUp",time:10,overlay:true,w:200,h:60});  
   or  
	 new zw_loading({content:"请耐心等待，正在为您努力加载中..."});

###### 参数
	content：必选项，提示内容  
	mark：可选项，提示进出时的效果  
	time：可选项，提示消失时间  
	overlay：可选项，是否添加遮罩层，默认为否  
	w：可选项，提示宽度。默认<=320px  
	h：可选项，提示高度。默认为auto  

#### zw-slider 滑块插件
###### 调用方式
1. 引入zw-slider.js、zw-loading.js和 jquery.js 文件（滑块显示百分比引用了loading插件）
2. $("xxxx").zwSlider({});
