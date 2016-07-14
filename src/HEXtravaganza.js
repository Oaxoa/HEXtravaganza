(function() {

	var HEXtravaganza=(function() {

		var ALPHA_MAX='FF';
		var STRING_BAD_FORMAT='Bad argument format';

		/**
		 * Receive an HEXtravaganza color string and return the best representation, being it hex or rgba
		 * @param  {string} color The input color parameter
		 * @return {string}       [description]
		 */
		function parse(color) {
			var r=/#([0-9a-fA-F]{1,8})/g;

			if(!r.test(color)) {
				var e=new Error(STRING_BAD_FORMAT);
				throw(e);
				return false;
			} else {
				return toTransformedColor(toColorCouple(color)); 
			}
		}
		/**
		 * Expand an hex string to an hex string made of n times every char
		 * @param  {string} arg The input char
		 * @param  {number} n   output character count
		 * @return {string}
		 */
		function multiplyHEX(arg, n) {
			n=n||2;
			var out='', i, j, c;
			for(i=0; i<arg.length; i++) {
				c=arg.substr(i,1);
				for(j=0; j<n; j++) {
					out+=c;
				}
			}
			return out;
		}
		/**
		 * Parse and separates the HEXtravaganza color format into color and alpha
		 * @param  {string} arg The input color
		 * @return {Object}
		 */
		function toColorCouple(arg) {
			var color, alpha, alphaHEX;
			var plainArg=arg.substr(1);
			switch(plainArg.length) {
				case 8:
					alphaHEX=plainArg.substr(0,2);
					color=plainArg.substr(2,6);
					break;
				case 7:
					alphaHEX=multiplyHEX(plainArg.substr(0,1));
					color=plainArg.substr(1,6);
					break;
				case 6:
					alphaHEX=ALPHA_MAX;
					color=plainArg.substr(0,6);
					break;
				case 5:
					alphaHEX=plainArg.substr(0,2);
					color=plainArg.substr(2,3);
					break;
				case 4:
					alphaHEX=multiplyHEX(plainArg.substr(0,1));
					color=plainArg.substr(1,3);
					break;
				case 3:
					alphaHEX=ALPHA_MAX;
					color=plainArg;
					break;
				case 2:
					alphaHEX=multiplyHEX(plainArg.substr(0,1));
					color=multiplyHEX(plainArg.substr(1,1),3);
					break;
				case 1:
					alphaHEX=ALPHA_MAX;
					color=multiplyHEX(plainArg.substr(0,1),3);
					break;
			}
			alpha=parseInt((parseInt(alphaHEX, 16)/255)*100, 10)/100;
			return {color:color, alpha:alpha};
		}
		/**
		 * Returns a hex or rgba color format according to the alpha value
		 * @param  {Object} cc the input color couple
		 * @return {String}
		 */
		function toTransformedColor(cc) {
			if(cc.alpha===1) {
				return '#'+cc.color;
			} else {
				return toRGBString(cc.color, cc.alpha);
			}
		}
		/**
		 * Separate the color string and the alpha into an object with four properties (r, g, b, a)
		 * @param  {string} hex   The hex color input
		 * @param  {number} alpha The alpha input value
		 * @return {Object}
		 */
		function toRGBA(hex, alpha) {
			var r,g,b,r1,g1,b1;
			switch(hex.length) {
				case 3:
					r1=hex.substr(0,1);
					g1=hex.substr(1,1);
					b1=hex.substr(2,1);
					r=r1+r1;
					g=g1+g1;
					b=b1+b1;
					break;
				case 6:
					r=hex.substr(0,2);
					g=hex.substr(2,2);
					b=hex.substr(4,2);
					break;
			}
			r=parseInt(r, 16);
			g=parseInt(g, 16);
			b=parseInt(b, 16);

			return {r:r,g:g,b:b,a:alpha};
		}
		/**
		 * Return a rgba string based on hex and alpha value
		 * @param  {string} hex   The hex color input
		 * @param  {number} alpha The alpha input value
		 * @return {String}
		 */
		function toRGBString(hex, alpha) {
			var o=toRGBA(hex, alpha);
			return 'rgba('+o.r+','+o.g+','+o.b+','+o.a+')';
		}
		
		// PUBLIC API
		
		return {
			parse:parse
		}

	})();
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = HEXtravaganza;
	} else {
		window.HEXtravaganza = HEXtravaganza;
	}
})();

	