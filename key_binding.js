/*
 * possible option is to make Key_binding a function and call
 * --- new Binding('w', up);
 * or something along those lines.
 * would require universal dictionary for easy calling to hold all functions 
 */

var KeyBinding = {
	
	keyFuncMap : {},

    getKeyCode : function(evt) {
        return (evt.which) ? evt.which : event.keyCode
    },

    CodeToKeyMap : {
        13: "enter", 32:" ", 33: "!", 34: '"', 35: "#", 36: "$", 37: "%", 38: "&", 39: "'", 40: "(", 41: ")", 42: "*", 43: "+", 44: ",", 45: "-",
		46: ".", 47: "/", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6" ,55: "7", 56: "8", 57: "9", 58: ":", 60: "<",
		61: "=", 62: ">", 63: "?", 64: "@", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G" ,72: "H", 73: "I", 74: "J",
		75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X",
		89: "Y", 90: "Z", 91: "[", 92: "\\", 93: "]", 94: "^", 95: "_", 96: "`", 97: "a", 98: "b", 99: "c", 100: "d", 101: "e",
		102: "f", 103: "g", 104: "h", 105: "i", 106: "j", 107: "k", 108: "l", 109: "m", 110: "n", 111: "o" ,112: "p", 113: "q",
		114: "r", 115: "s", 116: "t", 117: "u", 118: "v" ,119: "w", 120: "x", 121: "y", 122: "z", 123: "{", 124: "|", 125: "}", 126: "~"
    },
	
	KeyToCodeMap : {
		0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, ' ':32, '!': 33, '"': 34, '#': 35, '$': 36, '%': 37, '&': 38, "'": 39,
		'(': 40, ')': 41, '*': 42, '+': 43, ',': 44, '-': 45, '.': 46, ':': 58, '<': 60, '=': 61, '>': 62, '?': 63, '@': 64, 'A': 65,
		'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74, 'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80,
		'Q': 81, 'R': 82, 'S': 83, 'T': 84, 'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90, '\\': 92, ']': 93, '^': 94, '_': 95,
		'`': 96, 'a': 97, 'b': 98, 'c': 99, 'd': 100, 'e': 101, 'f': 102, 'g': 103, 'h': 104, 'i': 105, 'j': 106, 'k': 107, 'l': 108,
		'm': 109, 'n': 110, 'o': 111, 'p': 112, 'q': 113, 'r': 114, 's': 115, 't': 116, 'u': 117, 'v': 118, 'w': 119, 'x': 120,
		'y': 121, 'z': 122, '{': 123, '|': 124, '~': 126, "enter":13, 
	},
};
KeyBinding.bind_key = function(k, functions){
	// make so you can add on other functions
	KeyBinding.keyFuncMap[KeyBinding.KeyToCodeMap[k]] = [false, functions];
}
/* */
document.onkeydown = function(e){
	var code = KeyBinding.getKeyCode(e);
	if (KeyBinding.keyFuncMap[code]){
		
		KeyBinding.keyFuncMap[code][0] = true;
		
		if (KeyBinding.keyFuncMap[code][1].onkeydown){ 
			KeyBinding.keyFuncMap[code][1].onkeydown();
		}
	}	
}

document.onkeyup = function(e){
	var code = KeyBinding.getKeyCode(e);
	if (KeyBinding.keyFuncMap[code]){
		if (KeyBinding.keyFuncMap[code][1].onkeyup){
			KeyBinding.keyFuncMap[code][0] = false;
			KeyBinding.keyFuncMap[code][1].onkeyup();
		}
	}	
}

document.onkeypress = function(e){
	var code = KeyBinding.getKeyCode(e);
	if (KeyBinding.keyFuncMap[code]){
		if (KeyBinding.keyFuncMap[code][1].onkeypress){
			var daFunc = KeyBinding.keyFuncMap[code][1].onkeypress;
			KeyBinding.keyFuncMap[code][1].onkeypress();
			KeyBinding.keyFuncMap[code][0] = false;
		}
	}	
}

/* */