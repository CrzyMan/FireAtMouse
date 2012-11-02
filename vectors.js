/*
 
y
|     z
|   /
| /
*---------x


*/

var Vector2d = function(x,y){
	
	this.x = x || 0;
	this.y = y || 0;
	
	this.add_self = function(vec){
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}
	this.add = function(vec){
		return new Vector2d(this.x + vec.x, this.y + vec.y);
	}
	
	this.distance = function(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	
	this.distanceFrom = function(vec){
		return this.add(vec.scale(-1)).distance();
	}
	
	this.norm_self = function(){
		var sum = Math.abs(this.x) + Math.abs(this.y);
		this.x = this.x / sum;
		this.y = this.y / sum;
	}
	this.norm = function(){
		var sum = Math.abs(this.x) + Math.abs(this.y);
		return new Vector2d(this.x / sum, this.y / sum);
	}
	this.angle = function(){
		return Math.atan2(this.y, this.x);
	}
	/*
	this.vector_from_angle = function(a){
		return new Vector2d(Math.cos(a), Math.sin(a));
	}
	*/
	this.set_from_angle = function(a){
		var v = this.vector_from_angle(a);
		this.x = v.x;
		this.y = v.y;
	}
	this.scale = function(s){
		return new Vector2d(this.x*s, this.y*s);
	}
	this.scale_self = function(s){
		this.x *= s;
		this.y *= s;
	}
}
Vector2d.prototype.vector_from_angle = function(a){
	return new Vector2d(Math.cos(a), Math.sin(a));
}

var Vector3d = function(x,y,z){
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	
	this.add_self = function(vec){
		this.x += vec.x;
		this.y += vec.y;
		this.z += vec.z;
	}
	this.add = function(vec){
		return new Vector3d(this.x + vec.x, this.y + vec.y, this.z + vec.z);
	}
	this.distanceFrom = function(vec){
		var a2 = Math.pow(this.x - vec.x, 2);
		var b2 = Math.pow(this.y - vec.y, 2);
		var c2 = Math.pow(this.z - vec.z, 2);
		var c = Math.sqrt(a2 + b2 + c2);
		return c;
	}
	this.norm_self = function(){
		var s = Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
		this.x = this.x / s;
		this.y = this.y / s;
		this.z = this.z / s;
	}
	this.norm = function(){
		var s = Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
		return new Vector3d(this.x / s, this.y / s, this.z / s);
	}
}