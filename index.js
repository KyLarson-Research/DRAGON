// Filename: index.js
// Author: Kyle Larson, 10-21-20
// Purpose: to handle fractal builders and interractivity

// useful code notes
// //Add click event for any child div of div = grid
// $(document).ready(function(){
    // $('.grid').on('click', 'div', function(e){
          // GetGridElementsPosition($(this).index()); //Pass in the index of the clicked div
    // //Relevant to its siblings, in other words if this is the 5th div in the div = grid
    // });
// });

// function GetGridElementsPosition(index){
    // //Get the css attribute grid-template-columns from the css of class grid
    // //split on whitespace and get the length, this will give you how many columns
    // const colCount = $('.grid').css('grid-template-columns').split(' ').length;

    // const rowPosition = Math.floor(index / colCount);
    // const colPosition = index % colCount;

    // //Return an object with properties row and column
    // return { row: rowPosition, column: colPosition } ;
// }

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
		console.log("RCI");
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
		console.log("RCIII");
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
		console.log("RCIV");
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
		console.log("LCI");
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
		console.log("LCIII");
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
		console.log("LCIV");
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
				//startarray.push(j);
				//console.log(startarray[j*2][0],startarray[j*2][1], startarray[j*2+1][0], startarray[j*2+1][1]);
			}
			else{
				nextarray.splice((j*2+1), 0, halfsplitleft(startarray[j*2][0], startarray[j*2][1], startarray[(j*2)+1][0], startarray[(j*2)+1][1]) );
				//startarray.push(j);
				//console.log(startarray[j*2][0],startarray[j*2][1], startarray[j*2+1][0], startarray[j*2+1][1]);
			}
			startarray = nextarray;
		}
	}
	return nextarray;
}

function main(){
	var P1= [-1, 1];
	var P2= [1, 1];
	var array = [P1, P2];
	//console.log(array[0][0], array[1][0]);
	array = buildfractal(8, array);
	array.forEach( function(item, index) {
		console.log( item);
	});
	/*
	array.splice(1,0, halfsplitright(P1[0], P1[1], P2[0], P2[1]));
	console.log(array);
	array.splice(1,0, halfsplitright(array[0][0],array[0][1], array[1][0], array[1][1]));
	console.log(array);
	array.splice(3,0, halfsplitleft(array[2][0],array[2][1], array[3][0], array[3][1]));
	array.splice(1,0, halfsplitright(array[0][0],array[0][1], array[1][0], array[1][1]));
	array.splice(3,0, halfsplitleft(array[2][0],array[2][1], array[3][0], array[3][1]));
	array.splice(5,0, halfsplitright(array[4][0],array[4][1], array[5][0], array[5][1]));
	array.splice(7,0, halfsplitleft(array[6][0], array[6][1], array[7][0], array[7][1]));
	array.splice(1,0, halfsplitright(array[0][0],array[0][1], array[1][0], array[1][1]));
	array.splice(3,0, halfsplitleft(array[2][0],array[2][1], array[3][0], array[3][1]));
	array.splice(5,0, halfsplitright(array[4][0],array[4][1], array[5][0], array[5][1]));
	array.splice(7,0, halfsplitleft(array[6][0], array[6][1], array[7][0], array[7][1]));
	array.splice(9,0, halfsplitright(array[8][0], array[8][1], array[9][0], array[9][1]));
	array.splice(11,0, halfsplitleft(array[10][0],array[10][1], array[11][0], array[11][1]));
	array.splice(13,0, halfsplitright(array[12][0], array[12][1], array[13][0], array[13][1]));
	array.splice(15,0, halfsplitleft(array[14][0], array[14][1], array[15][0], array[15][1]));

	array.forEach( function(item, index) {
		console.log( item);
	});*/
	return;
}
main();

/*for(let i=0; i<array.length; i++){
	array[i][0]=array[i][0]*2;
	array[i][1]=array[i][1]*2;
}*/


/*var currentarray = [P1, P2];
var startarray = [];
	for(let k=0; k<currentarray.length; k++){
		console.log(halfsplitright(currentarray[0], currentarray[1]) );
	}
*/

/*

pa1 = [p1, p2];
spio(6, pa1);
console.log(pa1);
*/

//let j = 0;
//var s;

// . 0 . 2 . 4 . 6 .    

//start with the first point
/*var p1 =[-1, 1];
var p2 = [1, 1];

var cd = [p1, p2];
spio(0, cd);

var ce = [cd[0], cd[1]];
var cf = [cd[1], cd[2]];
spio(0, ce);
spio(2, cf);

var cg = [ce[0], ce[1]];
var ch = [cd[1], cd[2]];
var ci = [cf[0], cf[1]];
var cj = [cf[1], cf[2]];
spio(0, cg);
spio(0, ch);
spio(0, ci);
spio(0, cj);
//coalesc
c = [];
c.push(cg[0], cg[1], cg[2], ch[0], ch[1], ch[2], ci[0], ci[1], ci[2], cj[0], cj[1], cj[2]);
*/

//var degree = 6;
//{	//s = coordinates.length;
	//j = 0;
	//do{
		//spio(j, [cd[j], cd[j+1]]);
		//j=j+2;
	//}
	//while(j < degree );//Math.pow(2, degree-1)
	//console.log(cd);
//	i++;
//}while(i < degree-1)//loop 


/*
function buildFractal(degree, p1, p2){

	if(degree === 0){ 
		if(i%2===0){//even
						
		}
		else{//odd
			coordinates.splice(i+1, 0,
					hsbal(coordinates[i], coordinates[i+1])
			);
		}
	else{
		degree --;
		buildFractal(degree; coordinates[i], coordinates[i+1]);
	}
		
		return coordinates;	
	
}*/
	// if(degree !== 0){
		// return buildFractal(degree, pt1, p2, colornumber);
	// }
	// else
		


gridPrint('0<#<100', div);
var defaultstr = 'enter number here';

var x = document.createElement("FORM");
  x.setAttribute("id", "myForm");
  div.appendChild(x);

  var y = document.createElement("INPUT");
  y.setAttribute("type", "text");
  y.setAttribute("value", defaultstr);
  y.setAttribute("mAy", 3);
  document.getElementById("myForm").appendChild(y);
  
  
  var z = document.getElementById("myForm").action
  y.addEventListener("input", function(){
		  //gridPrint(y.value, div);
	} );
	
