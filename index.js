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
	if(A[1]===B[1]){
		var X = (B[0] - A[0])/2 + A[0];
		var Y = A[1] - (B[0] - A[0])/2;
		console.log("RCI");
	}
	//case II
	else if(A[0]===B[0]){
		var Y = (B[1] - A[1])/2 + A[1];
		var X = A[0] - (B[1] - A[1])/2;
		console.log("RCII");
	}
	//case III
	else if(B[1]<A[1]){
		var X = A[0];
		var Y = B[1];
		console.log("RCIII");
	}
	//case IV
	else if(B[1]>A[1]){
		var X = B[0];
		var Y = A[1];
		console.log("RCIV");
	}
	return [X, Y];
}
//A and B are expected to each be real integer cartesian points of the form A = [Ax, Ay] B = [Bx, By]
function halfsplitleft(A, B){
	//case I
	if(A[1]===B[1]){
		var X = (B[0] - A[0])/2 + A[0];
		var Y = A[1] + (B[0] - A[0])/2;
		console.log("LCI");
	}
	//case II
	else if(A[0]===B[0]){
		var Y = (B[1] - A[1])/2 + A[1];
		var X = A[0] + (B[1] - A[1])/2;
		console.log("LCII");
	}
	//case III
	else if(B[1]<A[1]){
		var X = B[0];
		var Y = A[1];
		console.log("LCIII");
	}
	//case IV
	else if(B[1]>A[1]){
		var X = A[0];
		var Y = B[1];
		console.log("LCIV");
	}
	return [X, Y];
}
/*
//splice points in order where jth is an even number
function buildfractal(degree, p1, p2, previousarray){
	var currentarray = [p1, p2];
	//for(let i=0; i<degree; i++){
	//	var inserts = Math.pow(2, i);
		for(let j=1; j<inserts; j++){
			var nextarray = [];
			for(let k=1; k<j; k++){
				nextarray.push(currentarray[k]);
			}
			if(j%2===0){
				//nextarray.push(halfsplitright(currentarray[j-1], currentarray[j]) );
				nextarray.push(j);
				console.log(currentarray);
			}
			else{
				//nextarray.push(halfsplitleft(currentarray[j-1], currentarray[j]) );
				nextarray.push(j);
				console.log(currentarray);
			}
			for(let k=j+1; k<currentarray.length; k++){
				nextarray.push(currentarray[k]);
			}
			currentarray = nextarray.map((x) => x);
	//	}
	//}
	return currentarray;
}
*/
var P1= [-1, 1];
var P2= [1, 1];
var array = [P1, P2];

array.splice(1,0, halfsplitright(P1, P2));
array.splice(1,0, halfsplitright(array[0], array[1]));
array.splice(3,0, halfsplitleft(array[2], array[3]));
array.splice(1,0, halfsplitright(array[0], array[1]));
array.splice(3,0, halfsplitleft(array[2], array[3]));
array.splice(5,0, halfsplitright(array[4], array[5]));
array.splice(7,0, halfsplitleft(array[6], array[7]));
array.splice(1,0, halfsplitright(array[0], array[1]));
array.splice(3,0, halfsplitleft(array[2], array[3]));
array.splice(5,0, halfsplitright(array[4], array[5]));
array.splice(7,0, halfsplitleft(array[6], array[7]));
array.splice(9,0, halfsplitright(array[8], array[9]));
array.splice(11,0, halfsplitleft(array[10], array[11]));
array.splice(13,0, halfsplitright(array[12], array[13]));
array.splice(15,0, halfsplitleft(array[14], array[15]));



/*for(let i=0; i<array.length; i++){
	array[i][0]=array[i][0]*2;
	array[i][1]=array[i][1]*2;
}*/
console.log(array);

/*var currentarray = [P1, P2];
var nextarray = [];
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
  y.setAttribute("max", 3);
  document.getElementById("myForm").appendChild(y);
  
  
  var z = document.getElementById("myForm").action
  y.addEventListener("input", function(){
		  //gridPrint(y.value, div);
	} );
	
