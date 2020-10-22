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

function gridPrint(str, gridcontainer){
	for(let i = 0; i<str.length; i++){
		const newDiv = document.createElement('div');
		newDiv.className = 'grid-item';
		newDiv.innerHTML = str[i];
		gridcontainer.appendChild(newDiv);
	}		
}
//Half space between and half right/left
function hsbar(p1, p2){
	var gap = Math.sqrt( Math.pow(p1[0]-p2[0], 2) + Math.pow((p1[1]-p2[1]), 2) );
	var p3 = [ (p1[0] + 0.5*gap), (p1[0] - 0.5*gap) ];
	return p3;
}

function hsbal(p1, p2){
	var gap = Math.sqrt( Math.pow(p1[0]-p2[0], 2) + Math.pow((p1[1]-p2[1]), 2) );
	var p3 = [ (p1[0] + 0.5*gap), (p1[0] + 0.5*gap) ];
	return p3;
}


function buildFractal(degree, p1, p2){
	var coordinates = [p1, p2];
	if(degree!==0){
		if(degree%2==0){//even
			coordinates.push(
				buildFractal(
					degree-1, 
					hsbar(coordinates[coordinates.length-2], coordinates[coordinates.length-1]), 
					coordinates[coordinates.length-2]
					)
			);
		}
		else{//odd
			coordinates.push(
				buildFractal(
					degree-1, 
					hsbal(coordinates[coordinates.length-2], coordinates[coordinates.length-1]), 
					coordinates[coordinates.length-2]
					)
			);
		}
		degree--;
	}
	else{
		return coordinates;	
	}
}
	// if(degree !== 0){
		// return buildFractal(degree, pt1, p2, colornumber);
	// }
	// else
		
}


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
	
