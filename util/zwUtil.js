/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * eg: 
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 
 * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 
 * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1,
		// 月份
		"d+": this.getDate(),
		// 日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
		// 小时
		"H+": this.getHours(),
		// 小时
		"m+": this.getMinutes(),
		// 分
		"s+": this.getSeconds(),
		// 秒
		"q+": Math.floor((this.getMonth() + 3) / 3),
		// 季度
		"S": this.getMilliseconds() // 毫秒
	};
	var week = {
		"0": "/u65e5",
		"1": "/u4e00",
		"2": "/u4e8c",
		"3": "/u4e09",
		"4": "/u56db",
		"5": "/u4e94",
		"6": "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f": "/u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};

/**
	将日期转换成中文对应的格式
	getTimeFormat(new Date())---一秒前
*/
function getTimeFormat(startTime){
	var startTimeMills = startTime.getTime();
	var endTimeMills = new Date().getTime();
	var diff = parseInt((endTimeMills - startTimeMills)/1000);//秒
	var day_diff = parseInt(Math.floor(diff/86400));//天
	var buffer = Array();
	if(day_diff<0){
		return "[error],时间越界...";
	}else{
		if(day_diff==0 && diff<60){
			if(diff<=0)diff=1;
			buffer.push(diff+"秒前");
		}else if(day_diff==0 && diff<120){
			buffer.push("1 分钟前");
		}else if(day_diff==0 && diff<3600){
			buffer.push(Math.round(Math.floor(diff/60))+"分钟前");
		}else if(day_diff==0 && diff<7200){
			buffer.push("1小时前");
		}else if(day_diff==0 && diff<86400){
			buffer.push(Math.round(Math.floor(diff/3600))+"小时前");
		}else if(day_diff==1){
			buffer.push("1天前");
		}else if(day_diff<7){
			buffer.push(day_diff+"天前");
		}else if(day_diff <=30){
			buffer.push(Math.round(Math.ceil( day_diff / 7 )-1) + " 星期前");
		}else if(day_diff >30 && day_diff<=179 ){
			buffer.push(Math.round(Math.ceil( day_diff / 30 )-1) + "月前");
		}else if(day_diff >=180 && day_diff<365){
			buffer.push("半年前");
		}else if(day_diff>=365){
			buffer.push(Math.round(Math.ceil( day_diff /30/12)-1)+"年前");
		}
	}
	return buffer.toString();
};

/* 随机获取颜色值*/
function getRandomColor(){
	return '#' + (function(h) {
	return new Array(7 - h.length).join("0") + h
	})((Math.random() * 0x1000000 << 0).toString(16))	
}

/* 文件大小转换为MB GB KB格式 */
function tm_countFileSize(size) {
    var fsize = parseFloat(size, 2);
    var fileSizeString;
    if (fsize < 1024) {
        fileSizeString = fsize.toFixed(2) + "B";
    } else if (fsize < 1048576) {
        fileSizeString = (fsize / 1024).toFixed(2) + "KB";
    } else if (fsize < 1073741824) {
        fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
    } else if (fsize < 1024 * 1024 * 1024) {
        fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
    } else {
        fileSizeString = "0B";
    }
    return fileSizeString;
};


/**
 * 判断非空
 * @param val
 * @returns {Boolean}
 */
function isEmpty(val) {
    if (val == null) return true;
    if (val == undefined || val == 'undefined') return true;
    if (val == "") return true;
    if (val.length == 0) return true;
    if (!/[^(^\s*)|(\s*$)]/.test(val)) return true;
    return false;
};

function isNotEmpty(val) {
    return ! isEmpty(val);
};



/**
 * 将数字转换成对应的中文 
 * 将阿拉伯数字翻译成中文的大写数字
 * @param {Object}
 * num 比如:1对应一 11：十一 101:一百零一
 * @return {TypeName}
 */
function tm_NumberToChinese(num) {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
        case 0:
            re = BB[7] + re;
            break;
        case 4:
            if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re;
            break;
        case 8:
            re = BB[5] + re;
            BB[7] = BB[5];
            k = 0;
            break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    if (re == '一十') re = "十";
    if (re.match(/^一/) && re.length == 3) re = re.replace("一", "");
    return re;
};


/** ******************json*************** */
function jsonToString(obj) {
    var THIS = this;
    switch (typeof(obj)) {
    case 'string':
        return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
    case 'array':
        return '[' + obj.map(THIS.jsonToString).join(',') + ']';
    case 'object':
        if (obj instanceof Array) {
            var strArr = [];
            var len = obj.length;
            for (var i = 0; i < len; i++) {
                strArr.push(THIS.jsonToString(obj[i]));
            }
            return '[' + strArr.join(',') + ']';
        } else if (obj == null) {
            return 'null';

        } else {
            var string = [];
            for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));
            return '{' + string.join(',') + '}';
        }
    case 'number':
        return obj;
    case false:
        return obj;
    }
};

/*
	获取值的通用方法
    参数说明:id也可以是form元素的name
	2014/7/8
*/
function getValue(id){
	var objDom = document.getElementById(id);
	var flag = false;
	if(objDom==null){
		objDom = document.getElementsByName(id);
		flag = true;
	}
	if(flag && objDom.length==0){
		alert("您当前的"+id+"在页面中不存在!");
		return;
	}

	if(objDom!=null){
		var fieldValue = "";
		var tagName = "";
		if(flag){
			fieldValue = objDom[0].getAttribute("type")	
			tagName = objDom[0].tagName.toLowerCase();
		}else{
			fieldValue = objDom.getAttribute("type")
			tagName = objDom.tagName.toLowerCase();
		}
		if((tagName=="input" && (fieldValue=="text" || fieldValue=="password")) || tagName=="textarea"){
			if(flag){
				return objDom[0].value;						
			}else{
				return objDom.value;
			}
		}else if(tagName=="select"){
			var value = objDom.value;
			var selectedIndex = objDom.selectedIndex;
			var text = objDom.options[selectedIndex].text;
			return {"value":value,"text":text};
		}else if(tagName=="input" &&(fieldValue=="radio" || fieldValue=="checkbox")){
			var arr = [];
			for(var i=0;i<objDom.length;i++){
				if(objDom[i].checked){
					 arr.push(objDom[i].value);
				}
			}
			return arr.toString();
		}
	}else{
		alert("您当前的"+id+"在页面中不存在!");
	}
};

/* 禁止窗体选中 */
function forbiddenSelect() {
	$(document).bind("selectstart", function() {
		return false;
	});
	document.onselectstart = new Function("event.returnValue=false;");
	$("*").css({
		"-moz-user-select" : "none"
	});
}

/* 窗体允许选中 */
function autoSelect() {
	$(document).bind("selectstart", function() {
		return true;
	});
	document.onselectstart = new Function("event.returnValue=true;");
	$("*").css({
		"-moz-user-select" : ""
	});
}

/* 层居中 
 * $dialog：要居中的元素
 * 前提：页面中有一整页的内容
 */
function zw_center_dialog($dialog){
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var dialogWidth = $dialog.width();
	var dialogHeight = $dialog.height();
	var left = (windowWidth-dialogWidth)/2;
	var top =  (windowHeight-dialogHeight)/2;
	$dialog.css({left:left,top:top});
};

/**
 * 获取窗体可见度高度
 * 
 * @returns
 */
function getClientHeight() {
	var clientHeight = 0;
	if (document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight
				: document.documentElement.clientHeight;
	} else {
		clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight
				: document.documentElement.clientHeight;
	}
	return clientHeight;
}
/**
 * 获取窗体可见度宽度
 * 
 * @returns
 */
function getClientWidth() {
	var clientWidth = 0;
	if (document.body.clientWidth && document.documentElement.clientWidth) {
		clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth
				: document.documentElement.clientWidth;
	} else {
		clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth
				: document.documentElement.clientWidth;
	}
	return clientWidth;
}

function getScrollHeight() {
	return Math.max(getClientHeight(), document.body.scrollHeight,
			document.documentElement.scrollHeight);
}

function getScrollTop() {
	var scrollTop = 0;
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if (document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}

/* 获取鼠标的当前坐标----兼容写法
	(JQuery的clientX、clientY已经实现了下面的兼容效果)
*/
function getMouseXY(event){
	event = event || window.event;
	var mouseX = event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	var mouseY = event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	return {
		x : mouseX,
		y : mouseY
	}
}

/* 获取文件后缀 */
function getExt(fileName) {
	if (fileName.lastIndexOf(".") == -1)
		return fileName;
	var pos = fileName.lastIndexOf(".") + 1;
	return fileName.substring(pos, fileName.length).toLowerCase();
}

/* 获取文件名称 */
function getFileName(fileName) {
	var pos = fileName.lastIndexOf("/") + 1;
	if (pos == -1) {
		return fileName;
	} else {
		return fileName.substring(pos, fileName.length);
	}
}

/* 关键字高亮 */
function keyHighlighter(keyword){
	$("#tbody").find(".key").each(function(){
		$(this).html($(this).text().replace(keyword,"<label style='color:red'>"+keyword+"</label>"));
	});
};

/* 关闭动画 */
function animates($dom,mark){
	switch(mark){
		case "fadeOut":$dom.fadeOut("slow",function(){$(this).remove();});break;
		case "slideUp":$dom.slideUp("slow",function(){$(this).remove();});break;
		case "fadeIn":$dom.fadeIn("slow");break;
		case "slideDown":$dom.slideDown("slow");break;
	}
}

/* 将数字转换成两位小数，位数不足补0 */
function numToTwoDecimal($num){
	$num = Math.round($num * 10000)/100;
	$num = $num.toString();
	if($num.indexOf(".") == -1){//如果没有小数点，补0
		var small = ".";
		for(var i=0 ;i<2 ;i++){
			small += "0"; 
		}
		$num += small;
	}else{//如果没有小数点第二位，则补0
		var rs = $num.indexOf("."); 
		while ($num.length <= rs + 2) {
			$num += "0";
		} 
	}
	return $num;
}