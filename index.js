
var tickInt=5	;
//<--choice(to)-->
var database =[[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],		//<--carNow?(from)
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]]

$(document).ready(function(){
var tick = setInterval(function(){
	movetick();
	checkSensor("sensor_1");
	checkSensor("sensor_2");
	checkSensor("sensor_3");
	checkCollision()
	//moveCar()

	move().car()
},tickInt)

});

var sensorData={
	"sensor_1":false,
	"sensor_2":false,
	"sensor_3":false,
}
var collision = 0;
var blockPosUpLeft=0;
var carPos=parseInt($('#car').css("margin-top").slice(0, -2)) ;
var roadHeight="400";
var now=parseInt($('#block_1').css("right").slice(0, -2));
var collisionTemp=false;
var moveObj=move();
var posFrom=positionNow()
var posTo=positionNow()
var moved=false;

function MaxInArray(temp){
	var index = 0;
	var value = temp[0];
	var indArray=[0];
	for (var i = 1; i < temp.length; i++) {
  	if (temp[i] > value) {
			indArray=[];
			indArray.push(i)
    	value = temp[i];
    	index = i;
  	}
		else if(temp[i] == value){
			indArray.push(i);
		}
	}
	return indArray;
}
function positionNow(){
	return Math.floor(carPos/50)
}

function moveCar(){
	if(sensorData.sensor_1){
		if(sensorData.sensor_2){
			if(sensorData.sensor_3){
				moveObj.blockDown();
			}
			else{
				moveObj.blockDown();
			}
		}
		else{
			moveObj.blockDown();
		}
	}
	else{
		if(sensorData.sensor_3){
			moveObj.blockUp()
			}
		else{
			if(sensorData.sensor_2){

			}
			else{

			}
		}
	}
}

function move() {
var moveBy=2;
var moveToBlock=50/moveBy;

	function car(){
		if((sensorData.sensor_1||sensorData.sensor_2||sensorData.sensor_3)){
			if(!moved){
			heuMove()
			moved=true;
			}
		}
	}
	function heuMove(){
		var leastInd=MaxInArray(database[positionNow()])
		var now=positionNow()
		var minDistance=1000;
		var minDistanceInd;
		leastInd.forEach(function(val){
			var modDistance=Math.abs(val-now)
			if(minDistance>modDistance){
				minDistance=modDistance	
				minDistanceInd=val;
				
			}
		})

		position(minDistanceInd)
	}
	function position(y){
		var x = positionNow()
		posFrom=x;
		posTo=y;

		if(x<y){
			for(var i=x;i<y;i++){
				blockDown()
			}
		}
		else if(x>y){
			for(var i=y;i<x;i++){
				blockUp()
			}
		}
	}
	function up(){
		if(carPos>0){
			carPos-=moveBy;
		}else{
			carPos+=roadHeight-50
		}
		//console.log(carPos)
		$('#car').css("margin-top",carPos);
	}
	function down(){
		if(carPos+50<=400){
			carPos+=moveBy;
		}else{
			carPos=0;
		}
		//console.log(carPos)
		$('#car').css("margin-top",carPos);
	}

	function blockUp(){
		if(carPos>0){
			for(var i=0;i<moveToBlock;i++){
					up()
			}
		}else{
			carPos+=roadHeight-50
		}
		$('#car').css("margin-top",carPos);
	}
	function blockDown(){

		if(carPos+75<=400){
			for(var i=0;i<moveToBlock;i++){
					down()
			}
		}else{
			carPos=0;
		}
		//console.log(carPos)
		$('#car').css("margin-top",carPos);
	}
	return {
		up:up,
		down:down,
		blockUp:blockUp,
		blockDown,blockDown,
		heuMove:heuMove,
		position:position,
		car:car

	}
}

//var change = setInterval(moveDown,100);



function movetick(){
	if($('#block_1').css("left").slice(0, -2)>0){
		now+=25
		$('#block_1').css("right",now);
}
	else{

		now=0;
		//moveUp()
		
		if(moved){
			if(collisionTemp){
				database[posFrom][posTo]-=1;
			}else{
				database[posFrom][posTo]+=1;
			}
		}
		moved=false;
		
		if(collisionTemp){
			collisionTemp=false;
			collision++;
			$('#collosion_count').html(collision);
		}
		blockPosUpLeft=Math.random()*300;
		$('#block_1').css("margin-top",blockPosUpLeft);
		$('#block_1').css("right",now);
		 posFrom=positionNow()
		 posTo=positionNow()

	}
clearSensor()
$('#car').css("background-color","white");
}
function clearSensor(){

	for(var i in sensorData){
		$("#"+i).css("background-color","white");
		sensorData[i]=false;
		$("#"+i+"_table").html("false").css("color","red");


	}

}
function checkSensor(sensorName){

	var sensorTop=parseInt($('#car').css("margin-top").slice(0, -2))+parseInt($('#'+sensorName).css("top").slice(0, -2))-50;
	//console.log(sensorTop)
	var posRightBlock=parseInt($('#block_1').css("left").slice(0, -2));
	//console.log("Right :"+posRightBlock+"sensorTop :"+sensorTop+" Blocklupleft :"+blockPosUpLeft);
	if (posRightBlock<=700&&
	(sensorTop>blockPosUpLeft-60&&sensorTop<blockPosUpLeft+50)
	){
		$('#'+sensorName).css("background-color","red");
		//Triggered sensor_1
		sensorData[sensorName]=true;

		$("#"+sensorName+"_table").html("true").css("color","green ");
	}
}
function checkCollision(){
	var carTop=parseInt($('#car').css("margin-top").slice(0, -2));
	var posRightBlock=parseInt($('#block_1').css("left").slice(0, -2));
	if((blockPosUpLeft+100>parseInt(carTop))&&(blockPosUpLeft<parseInt(carTop+50))
		&&posRightBlock<=100){
		//collision
		collisionTemp=true;
		$('#car').css("background-color","green");
	}
}
