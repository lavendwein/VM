let fs = require('fs');
let ram = new Array();
let arg = process.argv;
let i = 0;
let ip = 0;
let m = 0;

let progText = fs.readFileSync(arg[2]).toString();

ram = progText.split(/\s+/);

while(ram[ip] != "exit"){
	switch(ram[ip]){
		case "input":
			let inputData = require('readline-sync');
			ram[ram[ip + 1]] = inputData.questionInt("Enter value:");
			ip += 2;
			break;
		
		case "set": 
			ram[ram[ip + 1]] = parseInt([ram[ip + 2]]);
			ip += 3;
			break;
		
		case "add":
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) + parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		
		case "mul": 
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) * parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		
		case "del":
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) / parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		
		case "min": 
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) - parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		
		case "mark": 
			ip += 2;
			break;
			
		case "compare": 
			let value = parseInt(ram[ram[ip + 1]]) - parseInt(ram[ram[ip + 2]]); 
			if (value == 0){
				m = 0;
			}	
			else if (value < 0){
				m = -1;	
			}
			else if (value > 0){
				m = 1;
			}
			ip += 3;
			break;
			
		case "jump":
			ip = findMark(ram, ram[ip + 1]) + 1;
			break;

		case "jumpe": //jump equal
			if (m == 0){
				ip = findMark(ram, ram[ip + 1]) + 1;
			}else{
				ip += 2;
			}
			break;

		case "jumpl": //jump less
			if (m == -1){
				ip = findMark(ram, ram[ip + 1]) + 1;
			}else{
				ip += 2;
			}
			break;
		
		case "jumpm": //jump more
			if (m == 1){
				ip = findMark(ram, ram[ip + 1]) + 1;
			}else{
				ip += 2;
			}
			break;
		
		case "output":
			console.log(ram[ram[ip + 1]]);
			ip += 2;
			break;
			
		case "exit":
			break;
	}
}
function findMark(ram, nameMark){ //findMark(ip)
	for (let j = 0; j < ram.length; j++){
		if (ram[j] === nameMark.slice(0, nameMark.length) && ram[j - 1] === "mark"){
			return j;
		}
	}
}
