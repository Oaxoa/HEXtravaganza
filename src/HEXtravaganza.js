(function() {

	var HEXtravaganza=(function() {



	})();
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = HEXtravaganza;
	} else {
		window.HEXtravaganza = HEXtravaganza;
	}
})();

function HEXtravaganza(arg) {
		var r=/#([0-9a-fA-F]{1,8})/g, r2;

		var hex, hexes=[], ends=[], res, out=arg;
		while(res=r.exec(out)) {
			hexes.push(res[1]);
		}
		for(j=0; j<hexes.length; j++) {
			r=new RegExp('#('+hexes[j]+')([ ;])','g');
			out=out.replace(r, toTransformedColor(toColorCouple(hexes[j]))+'$2');
		}
		return out;
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
		switch(arg.length) {
			case 8:
				alphaHEX=arg.substr(0,2);
				color=arg.substr(2,6);
				break;
			case 7:
				alphaHEX=multiplyHEX(arg.substr(0,1));
				color=arg.substr(1,6);
				break;
			case 6:
				alphaHEX='FF';
				color=arg.substr(0,6);
				break;
			case 5:
				alphaHEX=arg.substr(0,2);
				color=arg.substr(2,3);
				break;
			case 4:
				alphaHEX=multiplyHEX(arg.substr(0,1));
				color=arg.substr(1,3);
				break;
			case 3:
				alphaHEX='FF';
				color=arg;
				break;
			case 2:
				alphaHEX=multiplyHEX(arg.substr(0,1));
				color=multiplyHEX(arg.substr(1,1),3);
				break;
			case 1:
				alphaHEX='FF';
				color=multiplyHEX(arg.substr(0,1),3);
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