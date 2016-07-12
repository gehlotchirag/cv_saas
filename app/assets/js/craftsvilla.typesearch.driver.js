window.onload = function(){
	//document load function goes here 
	init();
}

function init(){
	var typesearch_obj = new Typesearch({
		el : '#searchterm',
		delay: 10000,
		trending : false , 
		cache : false,
		minLength : 1
	});
}