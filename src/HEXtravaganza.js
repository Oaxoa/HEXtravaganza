(function() {

	var HEXtravaganza=(function() {
		function parse(color) {
			var r=/#([0-9a-fA-F]{1,8})/g;

			if(!r.test(color)) {
				var e=new Error('Bad argument format');
				throw(e);
				return false;
			} else {
				out=toTransformedColor(toColorCouple(color));
				return out; 
			}

		}
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
					alphaHEX='FF';
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
					alphaHEX='FF';
					color=plainArg;
					break;
				case 2:
					alphaHEX=multiplyHEX(plainArg.substr(0,1));
					color=multiplyHEX(plainArg.substr(1,1),3);
					break;
				case 1:
					alphaHEX='FF';
					color=multiplyHEX(plainArg.substr(0,1),3);
					break;
			}
			alpha=parseInt((parseInt(alphaHEX, 16)/255)*100)/100;
			return {color:color, alpha:alpha};
		}
		function toTransformedColor(cc) {
			if(cc.alpha===1) {
				return '#'+cc.color;
			} else {
				return toRGBString(cc.color, cc.alpha);
			}
		}
		function toRGBA(hex, alpha) {
			var r,g,b,a,r1,b1,g1,a1;
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
			a=alpha;

			var out={r:r,g:g,b:b,a:a};
			return out;
		}
		function toRGBString(hex, alpha) {
			var o=toRGBA(hex, alpha);
			var out='rgba('+o.r+','+o.g+','+o.b+','+o.a+')';
			return out;
		}
		function toNumber(arg) {
			return parseInt('0x'+arg);
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

	