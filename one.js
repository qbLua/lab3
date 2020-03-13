document.getElementById('add').onclick = add;
document.getElementById('table2').onclick = summary;
document.getElementById('show_year').onclick = year;
document.getElementById('show_year_more').onclick = year_more;
document.getElementById('show_table_supp_20-80').onclick = supp20_80;
document.getElementById('show_table_supp_10-100').onclick = supp10_100;
let table2080 = document.getElementById("result_20-80");
let table10100 = document.getElementById("result_10-100");
let year_start = 2020;
let elem;
let check2080 = true;

function add() {
		let flag_2080 = false;
		let flag_10100 = false;
		let but2080 = document.getElementById('show_table_supp_20-80');
		let but10100 = document.getElementById('show_table_supp_10-100');
		let add = document.createElement("TH");
		add.textContent = year_start;
		let flag = true;
		let value;
		let month
		let row
	for (let i = 1; i <= 12; i++) {
		month = 'month' + i;
		row = 'row' + i;
		value = (document.getElementById(month).value).replace(/\s/g, '');
		if ((isNaN(value)) || !value) {
			flag = false;
		}
	}
	if (flag) {
	for (let i = 1; i <= 12; i++) {	
		month = 'month' + i;
		row = 'row' + i;	
		let data = document.createElement("TD");
		value = (document.getElementById(month).value).replace(/\s/g, '');
		data.innerHTML = value;
		add.appendChild(data);
		document.getElementById(row).appendChild(data);
		if (but2080.disabled) {
			flag_2080 = true;
		}
		if (but10100.disabled) {
			flag_10100 = true;
		}
		document.getElementById(month).value = '';
		}

	document.getElementById('years').appendChild(add);
	year_start++;
	if (flag_2080) {
		supp20_80(1);
	}	
	if (flag_10100) {
		supp10_100(1);
	}
	return year_start;
	} else {
		alert('Введите значения корректно!')
	}
}		

function summary() {
	document.getElementById('table_sum').innerHTML = '';
	let max_r = document.createElement("TR");
	let min_r = document.createElement("TR");
	let sum_r = document.createElement("TR");
	let avg_r = document.createElement("TR");
	let dry_r = document.createElement("TR");
	let max_v = document.createElement("TD");
	let min_v = document.createElement("TD");
	let sum_v = document.createElement("TD");
	let avg_v = document.createElement("TD");
	let dry_v = document.createElement("TD");

	max_r.appendChild(max_v)
	min_r.appendChild(min_v)
	sum_r.appendChild(sum_v)
	dry_r.appendChild(dry_v)
	avg_r.appendChild(avg_v)
	let max = 0;
	let min = Infinity;
	let sum = 0;
	let dry = 0;
	let avg = 0;
	let count = year_start - 2017;
	let elem_array = [];
	years_list = [];
	for (let j = 0; j < count; j++) {
		for (let i = 1; i <= 12; i++) {
		let month = 'row' + i;
		let month_s = document.getElementById(month);
		elem = month_s.innerHTML.replace(/<td>/g, '').split('</td>');
		elem = elem.filter(el => !isNaN(el)).map(el => el.replace(/\s/g, '')).filter(el => el);
		elem_array[i] = elem;
		if ((max - elem[j]) < 0) {
			max = elem[j];
			}
		if (min > elem[j]) {
			min = elem[j];
		}
		if (elem[j] < 10) {
			dry++;
		}
		sum = sum- -elem[j];
		}
	}
	avg = sum / 12 / count;
	max_v.textContent = 'Максимальное количество осадков: ' + max;
	min_v.textContent = 'Минимальное количество осадков: ' + min;
	sum_v.textContent = 'Сумарное количество осадков: ' + sum;
	dry_v.textContent = 'Количество засушливых месяцев: ' + dry;
	avg_v.textContent = 'Среднее количество осадков за месяц: ' + avg.toFixed(2);
	document.getElementById('table_sum').appendChild(max_r);
	document.getElementById('table_sum').appendChild(min_r);
	document.getElementById('table_sum').appendChild(sum_r);
	document.getElementById('table_sum').appendChild(dry_r);
	document.getElementById('table_sum').appendChild(avg_r);
}

function year() {
	year = document.getElementById('show_year_value').value;
	if ((isNaN(year)) || !year || (year > year_start)) {
			alert(`Введите год в диапазоне от 2017 до ${year_start - 1}`)
	} else {
		year -= 2017;
	
	document.getElementById('table_sum').innerHTML = '';
	let max_r = document.createElement("TR");
	let min_r = document.createElement("TR");
	let sum_r = document.createElement("TR");
	let avg_r = document.createElement("TR");
	let dry_r = document.createElement("TR");
	let max_v = document.createElement("TD");
	let min_v = document.createElement("TD");
	let sum_v = document.createElement("TD");
	let avg_v = document.createElement("TD");
	let dry_v = document.createElement("TD");

	console.log(year)
	max_r.appendChild(max_v)
	min_r.appendChild(min_v)
	sum_r.appendChild(sum_v)
	dry_r.appendChild(dry_v)
	avg_r.appendChild(avg_v)
	let max = 0;
	let min = Infinity;
	let sum = 0;
	let dry = 0;
	let avg = 0;

	let count = year_start - 2017;
	let elem_array = [];
	years_list = [];
		for (let i = 1; i <= 12; i++) {
		let month = 'row' + i;
		let month_s = document.getElementById(month);
		elem = month_s.innerHTML.replace(/<td>/g, '').split('</td>');
		elem = elem.filter(el => !isNaN(el)).map(el => el.replace(/\s/g, '')).filter(el => el);
		elem_array[i] = elem;
		if ((max - elem[year]) < 0) {
			max = elem[year];
			}
		if (min > elem[year]) {
			min = elem[year];
		}
		if (elem[year] < 10) {
			dry++;
		}
		sum = sum- -elem[year];
		}
	avg = sum / 12;
	max_v.textContent = 'Максимальное количество осадков: ' + max;
	min_v.textContent = 'Минимальное количество осадков: ' + min;
	sum_v.textContent = 'Сумарное количество осадков: ' + sum;
	dry_v.textContent = 'Количество засушливых месяцев: ' + dry;
	avg_v.textContent = 'Среднее количество осадков за месяц: ' + avg.toFixed(2);
	document.getElementById('table_sum').appendChild(max_r);
	document.getElementById('table_sum').appendChild(min_r);
	document.getElementById('table_sum').appendChild(sum_r);
	document.getElementById('table_sum').appendChild(dry_r);
	document.getElementById('table_sum').appendChild(avg_r);
}
}

function year_more() {
		year = document.getElementById('show_year_value').value;
	if ((isNaN(year)) || !year || (year > year_start)) {
			alert(`Введите год в диапазоне от 2017 до ${year_start - 1}`)
	} else {
		year -= 2017;
	
	document.getElementById('table_sum').innerHTML = '';
	let max_r = document.createElement("TR");
	let min_r = document.createElement("TR");
	let sum_r = document.createElement("TR");
	let avg_r = document.createElement("TR");
	let dry_r = document.createElement("TR");
	let c20_80_r = document.createElement("TR");
	let c10_100_r = document.createElement("TR");
	let c20_80_v = document.createElement("TD");
	let c10_100_v = document.createElement("TD");
	let max_v = document.createElement("TD");
	let min_v = document.createElement("TD");
	let sum_v = document.createElement("TD");
	let avg_v = document.createElement("TD");
	let dry_v = document.createElement("TD");

	console.log(year)
	max_r.appendChild(max_v)
	min_r.appendChild(min_v)
	sum_r.appendChild(sum_v)
	dry_r.appendChild(dry_v)
	avg_r.appendChild(avg_v)
	c20_80_r.appendChild(c20_80_v)
	c10_100_r.appendChild(c10_100_v)
	let max = 0;
	let min = Infinity;
	let sum = 0;
	let dry = 0;
	let avg = 0;
	let c20_80 = 0;
	let c10_100 = 0;
	let count = year_start - 2017;
	let elem_array = [];
	years_list = [];
		for (let i = 1; i <= 12; i++) {
		let month = 'row' + i;
		let month_s = document.getElementById(month);
		elem = month_s.innerHTML.replace(/<td>/g, '').split('</td>');
		elem = elem.filter(el => !isNaN(el)).map(el => el.replace(/\s/g, '')).filter(el => el);
		elem_array[i] = elem;
		if ((max - elem[year]) < 0) {
			max = elem[year];
			}
		if (min > elem[year]) {
			min = elem[year];
		}
		if (elem[year] < 10) {
			dry++;
		}
		if ((elem[year] > 20) && (elem[year] < 80)) {
			c20_80++;
		}
		if ((elem[year] < 10) || (elem[year] > 100)) {
			c10_100++;
		}
		sum = sum- -elem[year];
		}
	avg = sum / 12;
	max_v.textContent = 'Максимальное количество осадков: ' + max;
	min_v.textContent = 'Минимальное количество осадков: ' + min;
	sum_v.textContent = 'Сумарное количество осадков: ' + sum;
	dry_v.textContent = 'Количество засушливых месяцев: ' + dry;
	avg_v.textContent = 'Среднее количество осадков за месяц: ' + avg.toFixed(2);
	c20_80_v.textContent = 'Количество месяцев в пределах нормы: ' + c20_80;
	c10_100_v.textContent = 'Количество месяцев вне нормы: ' + c10_100;
	document.getElementById('table_sum').appendChild(max_r);
	document.getElementById('table_sum').appendChild(min_r);
	document.getElementById('table_sum').appendChild(sum_r);
	document.getElementById('table_sum').appendChild(dry_r);
	document.getElementById('table_sum').appendChild(avg_r);
	document.getElementById('table_sum').appendChild(c20_80_r);
	document.getElementById('table_sum').appendChild(c10_100_r);
}
}

function supp20_80(addPlus) {
	let current_year = 2017;
	let count = year_start - 2017;
	if (addPlus == 1) {
		console.log(year_start - 1)
		addPlus = count - 1;
		current_year = year_start - 1;
	} else {
		addPlus = 0;
	}
	let but = document.getElementById('show_table_supp_20-80');
	table2080.style.display = 'block';
	but.disabled = true;
	
	
	let elem_array = [];
	for (let i = 1; i <= 12; i++) {
		let month = 'row' + i;
		let month_s = document.getElementById(month);
		elem = month_s.innerHTML.replace(/<td>/g, '').split('</td>');
		elem = elem.filter(el => !isNaN(el)).map(el => el.replace(/\s/g, '')).filter(el => el);
		elem_array[i] = elem;
	}
	console.log(elem_array[5][2])
	for (let j = addPlus; j < count; j++) {
		let add = document.createElement("TH");	
		add.textContent = current_year;
		document.getElementById('years_s_20-80').appendChild(add);
		current_year++;
		for (let i = 1; i <= 12; i++) {
		let row = 's20-80_row' + i;
		let data = document.createElement("TD");
		if ((elem_array[i][j] > 20)&&(elem_array[i][j] < 80)) {
			data.innerHTML = 1;
		} else {
			data.innerHTML = 0;
		}
		
		add.appendChild(data);
		//document.getElementById(row).innerHTML = '';
		document.getElementById(row).appendChild(data);
		}
	}	
}

function supp10_100(addPlus) {
	let but = document.getElementById('show_table_supp_10-100');
	table10100.style.display = 'block';
	but.disabled = true;
	let count = year_start - 2017;
	let current_year = 2017;
	let elem_array = [];
	if (addPlus == 1) {
		console.log(year_start - 1)
		addPlus = count - 1;
		current_year = year_start - 1;
	} else {
		addPlus = 0;
	}
	for (let i = 1; i <= 12; i++) {
		let month = 'row' + i;
		let month_s = document.getElementById(month);
		elem = month_s.innerHTML.replace(/<td>/g, '').split('</td>');
		elem = elem.filter(el => !isNaN(el)).map(el => el.replace(/\s/g, '')).filter(el => el);
		elem_array[i] = elem;
	}
	console.log(elem_array[5][2])
	for (let j = addPlus; j < count; j++) {
		let add = document.createElement("TH");	
		add.textContent = current_year;
		document.getElementById('years_s_10-100').appendChild(add);
		current_year++;
		for (let i = 1; i <= 12; i++) {
		let row = 's10-100_row' + i;
		let data = document.createElement("TD");
		if ((elem_array[i][j] > 100)||(elem_array[i][j] < 10)) {
			data.innerHTML = 1;
		} else {
			data.innerHTML = 0;
		}
		add.appendChild(data);
		//document.getElementById(row).innerHTML = '';
		document.getElementById(row).appendChild(data);
		}
	}	
}
