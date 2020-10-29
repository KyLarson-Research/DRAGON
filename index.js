// Filename: index.js
// Author: Kyle Larson, 10-21-20
// Purpose: to handle fractal builders and interractivity

const div = document.getElementById('bodyDiv');

function gap(p1, p2){
	var g = Math.sqrt( Math.pow(p1[0]-p2[0], 2) + Math.pow((p1[1]-p2[1]), 2) );
	return g;
}

function gridPrint(str, gridcontainer){
	for(let i = 0; i<str.length; i++){
		const newDiv = document.createElement('div');
		newDiv.className = 'grid-item';
		newDiv.innerHTML = str[i];
		gridcontainer.appendChild(newDiv);
	}		
}
/*
//Half space between and half right/left
function hsbar(A, B){
	var g = gap(A,B);
	D = [0.5*(Ax-Bx)+Bx, 0.5*(Ay-By)+By];
	console.log(D);
	if((Ay-By)!==0){var slope = (Ax-Bx)/(Ay-By);}
	else{ 
		var C =  [D[0], (D[1]-0.5*g)]; 
		return C;
	}
	ycept = D[1] + D[0]*slope;
	console.log(ycept);
	b = -2*D[0]+2*(ycept-D[1])*slope;
	console.log(b);
	a = (1+slope*slope);
	console.log(a);
	c = D[0]*D[0]+(ycept-D[1])*(ycept-D[1])-0.25*g*g;
	console.log(c);
	var C = [ (-b + Math.sqrt(b*b-4*a*c))/(2*a) ];
	C.push( -slope * C[0] + ycept );
	return C;
}

function hsbal(a, b){
	var gap = gap(a,b);
	var c = [ (Ax + 0.5*gap), (Ay + 0.5*gap) ];
	return c;
}

//splice points in order where jth is an even number
function spio(jth, pair){
		if((jth/2)%2===0){//even
			pair.splice( 1, 0, hsbar(pair[0], pair[1]) );
		}//right left between successive pairs
		else{
			pair.splice( 1, 0, hsbal(pair[0], pair[1]) );
		}
		return;
}*/
//A and B are expected to each be real integer cartesian points of the form A = [Ay, Ay] B = [Bx, By]
function halfsplitright(Ax, Ay, Bx, By){
	//case I
	if(Ay===By){
		if(Ax<Bx){//i
			var X = Ax + (Bx - Ax)/2;
			var Y = Ay - (Bx - Ax)/2;
		}
		else if(Ax>Bx){//ii
			var X = Bx + (Ax - Bx)/2;
			var Y = By + (Ax - Bx)/2;
		}
		//console.log("RCI");
	}
	//case III
	else if(By<Ay){
		if(Bx>Ax){//i
			var X = Ax;
			var Y = By;
		}
		else if(Ax>Bx){//ii
			var X = Bx;
			var Y = Ay;
		}
		else if(Ax===Bx){//ii
			var Y = By + (Ay - By)/2;
			var X = Bx - (Ay - By)/2;
		}
		//console.log("RCIII");
	}
	//case IV
	else if(By>Ay){
		if(Ax<Bx){//i
			var X = Bx;
			var Y = Ay;
		}
		else if(Ax>Bx){//ii
			var X = Ax;
			var Y = By;
		}
		else if(Ax===Bx){//iii
			var Y = Ay + (By - Ay)/2;
			var X = Ax + (By - Ay)/2;
		}
		//console.log("RCIV");
	}
	return [X, Y];
}
//A and B are expected to each be real integer cartesian points of the form A = [Ay, Ay] B = [Bx, By]
function halfsplitleft(Ax, Ay, Bx, By){
	//case I
	if(Ay===By){
		if(Ax <Bx){//i
			var X = Ax + (Bx - Ax)/2;
			var Y = Ay + (Bx - Ax)/2;
		}
		else if(Ax>Bx){//ii
			var X = Bx + (Ax-Bx)/2;
			var Y = By - (Ax-Bx)/2; 
		}
		//console.log("LCI");
	}
	//case III
	else if(By<Ay){
		if(Bx>Ax){//i
			var X = Bx;
			var Y = Ay;
		}
		else if(Bx<Ax){//ii
			var X = Ax;
			var Y = By;
		}
		else if(Ax===Bx){//ii
			var Y = By + (Ay - By)/2;
			var X = Bx + (Ay - By)/2;
		}
		//console.log("LCIII");
	}
	//case IV
	else if(By>Ay){
		if(Bx>Ax){//i
			var X = Ax;
			var Y = By;
		}
		else if(Bx<Ax){//ii
			var X = Bx;
			var Y = Ay;
		}
		if(Ax===Bx){//i
			var Y = Ay + (By - Ay)/2;
			var X = Ax - (By - Ay)/2;
		}
		//console.log("LCIV");
	}
	return [X, Y];
}

//splice points in order where jth is an even number
function buildfractal(degree, startarray){
	var nextarray = [startarray[0], startarray[1]];
	for(let i=0; i<degree; i++){
		var spots = Math.pow(2, i);
		for(let j=0; j<spots; j++){
			if(j%2===0){
				nextarray.splice((j*2+1), 0, halfsplitright(nextarray[j*2][0], startarray[j*2][1], startarray[(j*2)+1][0], startarray[(j*2)+1][1]) );
			}
			else{
				nextarray.splice((j*2+1), 0, halfsplitleft(startarray[j*2][0], startarray[j*2][1], startarray[(j*2)+1][0], startarray[(j*2)+1][1]) );
			}
			startarray = nextarray;
		}
	}
	return nextarray;
}

//-------------Setup Form and Labels in the Top Left
gridPrint('1<#<9', div);
var defaultstr = 'enter number here';

var x = document.createElement("FORM");
x.setAttribute("id", "myForm");
div.appendChild(x);

var y = document.createElement("INPUT");
y.setAttribute("type", "text");
y.setAttribute("value", defaultstr);
y.setAttribute("mAy", 3);
document.getElementById("myForm").appendChild(y);
  
/*----------- Uncomment this block to view a 12th degree dragon fractal
		var chars =40000;
		var rootchars =Math.sqrt(chars);
		var gridchars = chars;
		var scale = 64;
		var offset = (rootchars - scale)/2;
		var P1 = [offset-scale/2, scale*2];
		var P2 = [offset+scale/2, scale*2];
		var array = [P1, P2];
		var z = document.getElementById("myForm").action
		array = buildfractal(12, array);
		var str = '';

		var flag = false;
		for(let k=0; k<gridchars; k++){
			array.forEach( function(item, index) {
				if((gridchars-item[1]*rootchars)+item[0]-1 === k){
					str = str.slice(0, str.length-1); 
					str = str+ '-';	
					flag = true;
				}
				else{ flag = false;}
			});
			if(flag===false){
				str+='_';
			}
		}

		gridPrint(str, div);
*/
// ---------------interractivity		
y.addEventListener("input", function(){
		var chars =40000;
		var rootchars =Math.sqrt(chars);
		var gridchars = chars;
		var scale = 64;
		var offset = (rootchars - scale)/2;
		var P1 = [offset-scale/2, scale*2.5];
		var P2 = [offset+scale/2, scale*2.5];
		var array = [P1, P2];
		var z = document.getElementById("myForm").action
		array = buildfractal(y.value, array);
		var str = '';

		var flag = false;
		for(let k=0; k<gridchars; k++){
			array.forEach( function(item, index) {
				if((gridchars-item[1]*rootchars)+item[0]-1 === k){
					str = str.slice(0, str.length-1); 
					str = str+ '0';	
					flag = true;
				}
				else{ flag = false;}
			});
			if(flag===false){
				str+=' ';
			}
		}

		gridPrint(str, div);
	} );

//--------------

//build a string to print from an array generated by buildfractal


	
