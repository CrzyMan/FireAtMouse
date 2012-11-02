/** DEPENDENCIES
 * vectors
 * arrays+
 */
var Mouse_tracker = {
    position : new Vector2d()
};

if (typeof(canvas)==undefined) var canvas;

Mouse_tracker.init = function(_canvas){
	// TODO: don't add _canvas if canvas exists
    if (_canvas==undefined){
	_canvas = document.createElement('canvas');
	_canvas.id = 'canvas';
	
	if (document.body!=undefined){
	    var c = document.createElement('center');
	    c.appendChild(_canvas);
	    document.body.appendChild(c);
	}
	_canvas.height = 480;
	_canvas.width = 640;
    }
    
    _canvas.onmousemove = Mouse_tracker.set_mouse_pos;
    if (canvas==undefined) canvas=_canvas;
}

Mouse_tracker.set_mouse_pos = function(e){
    Mouse_tracker.position = Mouse_tracker.get_mouse_pos(e);
    //document.title = ""+Mouse_tracker.position.x+","+Mouse_tracker.position.y;
}


Mouse_tracker.get_mouse_pos = function(e){
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) 	{
	    posx = e.pageX;
	    posy = e.pageY;
    }
    else if (e.clientX || e.clientY) 	{
	    posx = e.clientX + document.body.scrollLeft
		    + document.documentElement.scrollLeft;
	    posy = e.clientY + document.body.scrollTop
		    + document.documentElement.scrollTop;
    }
    
    // compensate for position of canvas
    posx -= canvas.offsetLeft;
    posy -= canvas.offsetTop;
    
    // offset for middle of canvas being origin
    posx -= canvas.width/2;
    posy -= canvas.height/2;
    
    return new Vector2d(posx, posy);
}