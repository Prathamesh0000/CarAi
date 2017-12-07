
$(document).ready(function(){

var tick = setInterval(function(){
	movetick();
	checkSensor("sensor_1");
	checkSensor("sensor_2");
	checkSensor("sensor_3");
	checkCollision()
	moveCar()
},40)

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

function moveCar(){
	if(sensorData.sensor_1){
		if(sensorData.sensor_2){
			if(sensorData.sensor_3){
				moveDown();
			}
			else{
				moveDown();
			}
		}
		else{
			moveDown();
		}
	}
	else{
		if(sensorData.sensor_3){
				moveUp()
			}		
		else{
			if(sensorData.sensor_2){
				
			}
			else{
				
			}
		}
	}
}

function moveUp(){
	if(carPos>0){
		carPos-=25
	}else{
		carPos+=roadHeight-50
	}
	//console.log(carPos)
	$('#car').css("margin-top",carPos);
}
function moveDown(){
	if(carPos+75<=400){
		carPos+=25;
	}else{
		carPos=0;
	}
	//console.log(carPos)
	$('#car').css("margin-top",carPos);
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
		if(collisionTemp){
			collision++;
			console.log(collision);
		}
		blockPosUpLeft=Math.random()*300;
		$('#block_1').css("margin-top",blockPosUpLeft);
		$('#block_1').css("right",now);
		
	}
clearSensor()
$('#car').css("background-color","white");
}
function clearSensor(){
		$('#sensor_1').css("background-color","white");
		$('#sensor_2').css("background-color","white");
		$('#sensor_3').css("background-color","white");
		sensorData={
			"sensor_1":false,
			"sensor_2":false,
			"sensor_3":false,
		}
}
function checkSensor(sensorName){

	var sensorTop=parseInt($('#car').css("margin-top").slice(0, -2))+parseInt($('#'+sensorName).css("top").slice(0, -2))-50; 
	//console.log(sensorTop)
	var posRightBlock=parseInt($('#block_1').css("left").slice(0, -2));
	//console.log("Right :"+posRightBlock+"sensorTop :"+sensorTop+" Blocklupleft :"+blockPosUpLeft);
	if (posRightBlock<=700&&
	(sensorTop>blockPosUpLeft-50&&sensorTop<blockPosUpLeft+50)
	){
		$('#'+sensorName).css("background-color","red");
		//Triggered sensor_1
		sensorData[sensorName]=true;
		
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