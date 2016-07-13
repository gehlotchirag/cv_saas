/***
This is used for search bar/ search form working.
Options:

trending: true/false - fetch trending results on focus or 0 length input at search bar
cache: true/false - cache results locally
delay(in ms): delay before an HTTP request
minLength: minimum length of input before an HTTP request

***/

(function() {
	
	var Typesearch = function(options){
		this.dictionary = {};
		this.options = options || {};
		this.init();
	}

	Typesearch.prototype.init = function() {
		_this = this;
		console.log(JSON.stringify(_this.options));
		$(this.options.el).keyup( function() {
			setTimeout(_this.verifyInput(), _this.options.delay);
		});
		$(this.options.el).blur(function(){
			$("").empty();
		});
	}

	Typesearch.prototype.verifyInput = function(){
		this.term = $(this.options.el).val();
		//console.log('term: ' + this.term);
		if(this.term.length >= _this.options.minLength){
			console.log('verified: ' + this.term);
			this.getData(this.term);
		}
	}

	Typesearch.prototype.getData = function(term){
		this.term = term;
		$("#tsresponse").empty();
		//this.data = {};
		
		//console.log('dictionary: ' + JSON.stringify(this.dictionary));	
		this.data = this.dictionary[this.term];
		
		
		if(this.data && this.options.cache){
			console.log('data cache - HIT');
			this.parseData(this.data); 
			return;
		}

		if(this.request && this.request.readyState!=4) {
			this.request.abort();
			console.log('last XHReq aborted.'); 
		}
		
		console.log('data cache - MISS');
		this.url = "http://www.craftsvilla.com/v1/getAutosuggestion?term=" + this.term;
		//console.log('_url: ' + this.url);
		_this = this;

		this.request = $.get(this.url, function( _data ){
			//console.log('_data: ' + JSON.stringify(_data));
			//_this.data = _data;
			//console.log('_dictionary: ' + JSON.stringify(_this.dictionary));
			_this.dictionary[_this.term] = _data;
			//console.log('data added in dictionary');
			//console.log('_dictionary_: ' + JSON.stringify(_this.dictionary));
			_this.parseData(_data);

		});
	}

	Typesearch.prototype.parseData = function(response) {
		this.response = response;
		//console.log('data: ' + JSON.stringify(this.response));
		this.success = this.response.success;
		this.message = this.response.message;
		this.data = this.response.data;

		this.data.forEach(function(el,index){
			this.type = el.type;
			this.content = el.content;
			if(this.type == "CATEGORY"){
				$("#tsresponse").append('<li><a href="' + this.content.url_path + '"><span>' + this.content.text + '</span><span>' + this.type + '</span></a></li>');
			}else if(this.type == "product"){
				$("#tsresponse").append('<li><img src="' + this.content.images + '"/><a href="' + this.content.url_path + '"><span>' + this.content.text + '</span><span>' + this.type + '</span></a></li>');
			}else if(this.type == "seller"){
				$("#tsresponse").append('<li><img src="' + this.content.images + '"/><a href="' + this.content.url_path + '"><span>' + this.content.text + '</span><span>' + this.type + '</span></a></li>');
			}else{
				//do nothing
			}

		});
	};
	

	window.Typesearch = Typesearch;
	 
})();