
cacheBestScoreDate = new Date(2050,12,31,0,0,0);

function cacheBestScore(bestScore){
	document.cookie = "bestScore="+encodeURI(bestScore)+";expires="+cacheBestScoreDate.toGMTString();

}
function readBestScore(){
	var cookie = document.cookie;
	var first = cookie.indexOf('bestScore=');

	if(first >= 0){
		var str = cookie.substring(first,cookie.length);

		var last = str.indexOf(';');

		if(last < 0) last = str.length;



		str = str.substring(0,last).split('=');

		return decodeURI(str[1]);
	}
	else{
		return null;
	}

}