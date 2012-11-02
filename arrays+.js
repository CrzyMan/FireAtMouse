Array.prototype.sum = function(startIndex, endIndex){
	if(this.length==0){
		return 0;
	}
	
	// make indexes valid, > 0, < this.length, start before end, if not, it's 0 and 0
	startIndex = startIndex==null ? 0 : startIndex;
	endIndex = endIndex==null ? this.length - 1 : endIndex;
	
	startIndex = startIndex>=this.length||startIndex<0||startIndex>endIndex ? 0 : startIndex;
	endIndex = endIndex>=this.length||endIndex<0 ? this.length - 1 : endIndex;
	
	var _sum =0;
	for (var i = startIndex; i <= endIndex; i++){
		var _subLength = this[i].length || 0;
		if (_subLength==0){
			_sum += parseFloat(this[i]) || 0;
		}
		else{
			_sum += this[i].sum();
		}
	}
	return _sum;
}

Array.prototype.columnSum = function(column, startIndex, endIndex){
	
	var _sum = 0;
	
	// make error traps for start and end index, implement for how far down to start and go to
	
	// set column=0 if column doesn't exist, is too high or too low; otherwise it keeps it's value
	column = column==null||column>=this.length||column<0 ? 0 : column;
	
	for (var i = 0; i < this.length; i++){
		_sum += parseFloat(this[i][column]) || 0;
	}
	
	return _sum;
}

/* *
Array.prototype.indexOf = function (_value){
	var ctr = "";
	for (var i in this){
		if (this[i] === _value) return i;
	}
	return ctr;
}
*/

Array.prototype.getElementById = function (id){
	var ctr = "";
	for (var i in this){
		if (this[i].id == id) return this[i];
	}
	return ctr;
}

Array.prototype.removeElement = function(elem){
	for (var i=0; i<this.length ;i++){
		if (this[i] === elem) {
			return this.splice(i,1);
		}
	}
	throw "Element not found in array";
	return null;
}