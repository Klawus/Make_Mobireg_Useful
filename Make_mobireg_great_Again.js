const allDivTr = document.getElementById("markPlace").getElementsByTagName("TR");
const results = [];

for (let i = 2; i < allDivTr.length; i++) {

	const allTrTd = allDivTr[i].getElementsByTagName("TD");

	let Subject = allTrTd[0].textContent;

	const toFloat = [];
	const weights = [];
	for(j=0;j<allTrTd.length;j++){
		toFloat.push(parseFloat(allTrTd[j].textContent));
		if(allTrTd[j].textContent == toFloat[j] + "+"){
			toFloat[j] += 0.5;
		}
		if(allTrTd[j].textContent == toFloat[j] + "-"){
			toFloat[j] -= 0.1;
		}
		if(isNaN(parseFloat(allTrTd[j].textContent)) == false){
		weights.push(parseFloat(allTrTd[j].getAttribute("weigth")));
		}
	}

	const marks = toFloat.filter(x => x > 0);

	let weightSum = 0;
	for(j=0;j<weights.length;j++){
		weightSum+=weights[j];
	}

	let result = 0;
	for(j=0;j<marks.length;j++){
		result += marks[j]*weights[j];
	}

	result /= weightSum;

	result = result.toFixed(2);

	let html = allDivTr[i].getElementsByClassName("ocena_koncowa");

	if(isNaN(result)){
		html[0].innerHTML = "Brak danych";
		html[0].style.color = "#FF3300";
	}
	else {
		html[0].innerHTML = result;
		results.push(parseFloat(result));
		if(result>1.75){
			html[0].style.border = "solid 2px #006400";
			html[0].style.color = "black";
		}
		else{
			html[0].style.color = "#FF3300";
		}
	}
}

let last_result = 0;
for(i=0; i<results.length;i++){
	last_result += results[i];
}
last_result /= results.length;
last_result = last_result.toFixed(2);

const th = allDivTr[0].getElementsByTagName("TH");
th[1].innerHTML = "Ocena koncowa to: " + last_result;

