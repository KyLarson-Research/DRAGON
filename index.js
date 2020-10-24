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
	D = [0.5*(A[0]-B[0])+B[0], 0.5*(A[1]-B[1])+B[1]];
	console.log(D);
	if((A[1]-B[1])!==0){var slope = (A[0]-B[0])/(A[1]-B[1]);}
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
	var c = [ (a[0] + 0.5*gap), (a[1] + 0.5*gap) ];
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
//A and B are expected to each be real integer cartesian points of the form A = [Ax, Ay] B = [Bx, By]
function halfsplitright(A, B){
	//case I
	if(A[0]===B[0]){
		var X = (B[0] - A[0])/2 + A[0];
		var Y = A[1] - (B[0] - A[0])/2;
	}
	//case II
	if(A[1]===B[1]){
		var Y = (B[1] - A[1])/2 + A[1];
		var X = A[0] - (B[1] - A[1])/2;
	}
	//case III
	if(B[1]<A[1]){
		var X = A[0];
		var Y = B[1];
	}
	//case IV
	if(B[1]>A[1]){
		var X = B[0];
		var Y = A[1];
	}
	return [X, Y];
}
//A and B are expected to each be real integer cartesian points of the form A = [Ax, Ay] B = [Bx, By]
function halfsplitleft(A, B){
	//case I
	if(A[0]===B[0]){
		var X = (B[0] - A[0])/2 + A[0];
		var Y = A[1] + (B[0] - A[0])/2;
	}
	//case II
	if(A[1]===B[1]){
		var Y = (B[1] - A[1])/2 + A[1];
		var X = A[0] + (B[1] - A[1])/2;
	}
	//case III
	if(B[1]<A[1]){
		var X = B[0];
		var Y = A[1];
	}
	//case IV
	if(B[1]>A[1]){
		var X = A[0];
		var Y = B[1];
	}
	return [X, Y];
}

var p1= [-1,1];
var p2= [1,1];
var p3= [0,0];
console.log(halfsplitright(p1, p3));
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
  y.setAttribute("max", 3);
  document.getElementById("myForm").appendChild(y);
  
  
  var z = document.getElementById("myForm").action
  y.addEventListener("input", function(){
		  //gridPrint(y.value, div);
	} );
	
