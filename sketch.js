let peices = []
let scl
let counter = 0;
turn = 0;
currentPeice = null;

function setup(){
	createCanvas(600,600);
	scl = width/8;
	peices.push(new Peice(0,0,0));
	peices.push(new Peice(0,1,0));
	peices.push(new Peice(1,1,1));
	peices.push(new Peice(1,0,1));
}

function draw(){
	drawBoard()
	for(let i = 0; i < peices.length; i++){
		peices[i].draw();
	}
}

function drawBoard(){
	let color
	strokeWeight(1);
	stroke(0);
	for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			if((j + i) % 2 == 1){
				color = 20
			} else {
				color = 200
			}
			fill(color);
			beginShape();
			vertex(j * scl, i * scl);
			vertex((j + 1) * scl, i * scl);
			vertex((j + 1) * scl, (i + 1) * scl);
			vertex(j * scl, (i + 1) * scl);
			endShape(CLOSE);
		}
	}
}

function findSquare(){
	for(let i = 0; i < 9; i++){
		for(let j = 0; j < 9; j++){
			if(j * scl >= mouseX && i * scl >= mouseY){
				return createVector(j - 1 , i - 1);
			}
		}
	}
	
}

function getPeiceIndex(pos){
	if(exists(pos)){
		for(let i = 0; i < peices.length; i++){
			if(pos.x == peices[i].pos.x && pos.y == peices[i].pos.y){
				return i;
			}
		}
	}
}

function mousePressed(){
	let pos = findSquare();
	let index;
	if(currentPeice == null){
		index = getPeiceIndex(pos);
		currentPeice = peices[index];
	}else{
		if(!exists(pos)){
			peices.push(new Peice(pos.x, pos.y, turn));
			peices.splice(index, 1);
			currentPeice = null;
			if(turn == 0){
				turn = 1;
			}else{
				turn = 0;
			}
		}
	}
}

function exists(pos){
	for(let i = 0; i < peices.length; i++){
		if(pos.x == peices[i].pos.x && pos.y == peices[i].pos.y){
			return true;
		}
	}
	return false
}
