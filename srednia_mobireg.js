const allDivTr = document.getElementById("markPlace").getElementsByTagName("TR");
const results = [];
let last_result = 0;

for (let j = 2; j < allDivTr.length;j++){
	const spans = allDivTr[j].getElementsByTagName("SPAN");

	const toFloat = [];
	for(i=0;i<spans.length;i++){
		toFloat.push(parseFloat(spans[i].textContent));

		if(spans[i].textContent == toFloat[i] + "+"){
			toFloat[i] += 0.5;
		}
		if(spans[i].textContent == toFloat[i] + "-"){
			toFloat[i] -= 0.1;
		}
	}

	const rate = toFloat.filter(x => x > 0);

	let result = 0;
	for(i=0;i<rate.length;i++){
		result += rate[i];
	}
	result /= rate.length;

	result = result.toFixed(2);

	let k = allDivTr[j].getElementsByClassName("ocena_koncowa");

	if(isNaN(result)){
		k[0].innerHTML = "Brak danych";
		k[0].style.color = "#FF3300";
	}
	else {
		k[0].innerHTML = result;
		results.push(parseFloat(result));
		if(result>1.75){
			k[0].style.border = "solid 2px #006400";
			k[0].style.color = "black";
		}
		else{
			k[0].style.color = "#FF3300";
		}
	}
}

for(i=0; i<results.length;i++){
	last_result += results[i];
}
last_result /= results.length;
last_result = last_result.toFixed(2);

const th = allDivTr[0].getElementsByTagName("TH");
th[1].innerHTML = "Ocena koncowa to: " + last_result;


