// function getCookie(key) {
//     // 要从cookie中获取内容 首先要得到当前的cookie字符串
//     var cookie = document.cookie.replace(/\s+/g, "");
//     // 1 把cookie按照;分割
//     var arr = cookie.split(";");
//     // console.log(arr);
//     // 2 根据=将每一个数组中的key=value对分割
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i].split("=")[0] === key) {
//             return arr[i].split("=")[1];
//         }
//     }
// }




function getCookie(key){
	var arr = document.cookie.split("; ");
	for(var i=0;i<arr.length;i++){
		if(arr[i].split("=")[0] == key){
			return arr[i].split("=")[1];
		}
	}
	return "";
}


function removeCookie(key,options){
	options = options || {};
	setCookie(key,null,{
		expires:-1,
		path:options.path
	})
}


function setCookie(key,val,options){
	options = options || {};
	var p = options.path ? ";path="+options.path : "";
	var e = "";
	if(options.expires){
		var d = new Date();
		d.setDate(d.getDate()+options.expires)
		e = ";expires="+d;
	}
	document.cookie = key+"="+ val + e + p;
}
