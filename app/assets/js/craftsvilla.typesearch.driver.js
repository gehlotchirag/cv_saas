window.onload = function(){
	//document load function goes here 
	init();
}

function init(){
	var typesearch_obj = new Typesearch({
		el : '#searchval',
		delay: 1000,
		trending : false , 
		cache : true,
		minLength : 1
	});
}