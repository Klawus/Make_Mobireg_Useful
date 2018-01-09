const allDivTr = document.getElementById("markPlace").getElementsByTagName("TR");
const results = [];

document.getElementsByClassName('studentMark')[0].setAttribute('style', 'width: 820px;');

for (let i = 2; i < allDivTr.length; i++) {

	const allTrTd = allDivTr[i].getElementsByTagName("TD");

	if(allTrTd.length==18){
		const toFloat = [];
		const weights = [];
		for(let j=0;j<allTrTd.length-1;j++){
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

		let ctd = document.createElement('td');
		ctd.setAttribute('class','ocena_koncowa');
		allDivTr[i].appendChild(ctd);

		if(isNaN(result)){
			ctd.innerHTML = "Brak danych";
			ctd.style.color = "#FF3300";
		}
		else {
			ctd.innerHTML = result;
			results.push(parseFloat(result));
			if(result>1.75){
				ctd.style.border = "solid 2px #006400";
				ctd.style.color = "black";
			}
			else{
				ctd.style.color = "#FF3300";
			}
		}
	}

}

let last_result = 0;
for(i=0; i<results.length;i++){
	last_result += results[i];
}

last_result /= results.length;
last_result = last_result.toFixed(2);

let ntr = document.createElement('tr');
ntr.innerHTML = "Srednia ze srednich: " + last_result;
document.getElementById("markPlace").appendChild(ntr);

const zach = allDivTr[1].getElementsByTagName("TD");

const pkt = [];

for(let i=0;i<zach.length-1;i++){
	pkt.push(parseFloat(zach[i].textContent));
}

const pktdod = pkt.filter(x => x > 0);
const pktujm = pkt.filter(x => x < 0);

let pktogl = 0;

for(let i=0;i<pktdod.length;i++){
	pktogl += pktdod[i];
}
for(let i=0;i<pktujm.length;i++){
	pktogl += pktujm[i];
}

let ntd = document.createElement('td');
ntd.setAttribute('class', 'ocena_koncowa');
allDivTr[1].appendChild(ntd);

ntd.innerHTML = pktogl;

let ocenzach = document.createElement('td');
ocenzach.setAttribute('class', 'ocena_koncowa');
allDivTr[1].appendChild(ocenzach);
ocenzach.style.color = "black";
if(pktogl > 100){
	ocenzach.innerHTML = "Wzorowe";
}
if(pktogl >= 71 && pktogl < 100){
	ocenzach.innerHTML = "Bardzo dobre";
}
if(pktogl >= 26 && pktogl <= 70){
	ocenzach.innerHTML = "Dobre";
}
if(pktogl >= 0 && pktogl <= 25){
	ocenzach.innerHTML = "Poprawne";
}
if(pktogl <= -50 && pktogl >= -1){
	ocenzach.innerHTML = "Nieodpowiednie";
}
if(pktogl < -50){
	ocenzach.innerHTML = "Naganne";
}

if(pktogl > 26){
	ntd.style.border = "solid 2px #006400";
	ocenzach.style.border = "solid 2px #006400";
	ntd.style.color = "black";
	ocenzach.style.color = "black";
}