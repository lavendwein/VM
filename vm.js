let fs = require('fs');
let ram = new Array();
let arg = process.argv;
let i = 0;
let ip = 0;
let m = 0;

let progText = fs.readFileSync(arg[2]).toString();

ram = progText.split(/\s+/); //разбитие строки по пробелам и переносам строки
//for (let i = 0; i < ram.length; i++)
//	console.log(i, ram[i]);


while(ram[ip] != "exit"){
	switch(ram[ip]){
		case "input": //ввод данных из консоли
			let inputData = require('readline-sync');
			ram[ram[ip + 1]] = inputData.questionInt("Enter value:");
			ip += 2;
			break;
		
		case "set": //адрес ячейки, куда сохранять значение, используется для значений, которые не надо вводить
			ram[ram[ip + 1]] = parseInt([ram[ip + 2]]);
			ip += 3;
			break;
		
		case "add": //+
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) + parseInt(ram[ram[ip + 2]]);
			//console.log(ram[ram[ip + 3]]);
			ip += 4;
			break;
		
		case "mul": //*
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) * parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		
		case "del":	//:
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) / parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		
		case "min": //-
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) - parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		
		case "mark": //метка
			ip += 2;
			break;
			
		case "compare": //сравнение
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
			//console.log(ram[ip + 1].slice(0, ram[ip + 1].length));
			ip = findMark(ram, ram[ip + 1]) + 1;
			//console.log(ip);
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
				//console.log(ip);
			}else{
				ip += 2;
			}
			break;
		
		case "jumpm": //jump more
			if (m == 1){
				ip = findMark(ram, ram[ip + 1]) + 1;
				//console.log(ip);
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
			//console.log(j);
			return j;
		}
	}
}