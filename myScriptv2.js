var totalRow = 0;
function deleteSelect() {
	var allBox = document.getElementsByClassName("check");
	var rowIndex = 0;
	for (var i = 0; i < allBox.length; i++) {
		if (allBox[i].checked) {
			rowIndex = i+1;
			document.getElementById("table").deleteRow(rowIndex);
			i=-1;
		}
	}
	update();

}
function save() {
	// body... 
	var total;
	var fnameRec = document.getElementsByClassName("fname");
	var lnameRec = document.getElementsByClassName("lname");
	var factor = document.getElementsByClassName("factor");
	var totalEach =  document.getElementsByClassName("total");
	var score = document.getElementsByClassName("score");
	var date = document.getElementsByClassName("datepicker");
	total = calculateTotal();
	var html = 'List of User <br> <table>\ ';
	html += '<tr>\ ' + '<th>Order</td>\ ' + '<th>First Name: </th>\ ' + '<th>Last Name: </th>\ ' + 
	'<th>Điểm: </th>\ ' + '<th>Hệ Số: </th>\ ' + '<th>Ngày Thi</th>\ ' +'<th>Tổng Điểm</th>\ ' +'</tr>\ ';
	for (var i = 0; i < fnameRec.length; i++) {
		if (fnameRec[i].value != "" && lnameRec[i].value != "") {
			html += '<tr>\ <td align="center">' + (i + 1) + '</td>\ ' + '<td align="center">' + fnameRec[i].value + 
			'</td>\ ' + '<td align="center">' + lnameRec[i].value + '</td>\ ' +
			'<td align="center">' + score[i].selectedIndex+ '</td>\ '  +
			'<td align="center">' + numberWithCommas(parseFloat(factor[i].value)) + '</td>\ ' +
			'<td align="center">' + date[i].value + '</td>\ ' +
			'<td align="center">' + totalEach[i].textContent + '</td>\ '
			+ '</tr>';
		}
	}
	html += '</table>';
	html += 'Total Score:' + numberWithCommas(total);
	document.getElementById("output").innerHTML = html;
}
function checkAll() {
	var boxAll = document.getElementById("checkAll")
	var allBox = document.getElementsByClassName("check");
	for (var i = 0; i < allBox.length; i++) {
		if (boxAll.checked) {
			allBox[i].checked = true;
		}
		else{
			allBox[i].checked = false;
		}
	}
}
function update(){
	var rows = document.getElementById("table").rows; 
	for (var i = 1; i < rows.length; i++) {
		var current = rows[i].cells[1];
		current.innerHTML = i;
	}
}

function deleteOne (x) {
	document.getElementById("row" + x).remove();
	update();
}

function calculateScore(x) {
	var total = 0;
	var score = document.getElementById("score" + x).value;
	var factor = document.getElementById("factor" + x).value;
	if (factor < 0 || factor > 100) {
		alert("invalid He So");
		total = 0;
	}
	else{
		var total = score * factor;
		console.log(total);
	}
	document.getElementById("total" + x).innerHTML = total;
}

function calculateTotal(){
	var sum = 0;
	var total = document.getElementsByClassName("total");
	for (var i = 0; i < total.length; i++) {
		console.log(total[i].textContent.replace(",", ""));
		sum += parseFloat(total[i].textContent.replace(/,/g, ''));
	}
	return sum;
}

function add(){
	totalRow++;
	var table = document.getElementById("table");
	var order = table.rows.length;
	var row = table.insertRow(order);
	row.id = "row" + totalRow;
	var htmlOption ="";
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell3 = row.insertCell(2);
	cell4 = row.insertCell(3);
	cell5 = row.insertCell(4);
	cell6 = row.insertCell(5);
	cell7 = row.insertCell(6)
	cell8 = row.insertCell(7);
	cell9 = row.insertCell(8);


	cell1.align="center";
	cell1.innerHTML = '<input type="checkbox" class="check">';

	cell2.innerHTML = order;
	cell2.align="right";

	cell3.innerHTML = '<input type="text"  class="fname">';
	cell3.align="center";

	cell4.innerHTML = '<input type="text"  class="lname">';
	cell4.align="center";

	select = document.createElement("select");
	select.dir="rtl";
	select.setAttribute("onchange", "calculateScore(" + totalRow + ")");
	select.align="right";
	select.setAttribute("class", "score");
	select.id = "score" + totalRow;
	for (var i = 0; i < 11; i++) {
		htmlOption += '<option value="' + i +'">' + i + '</option>';
	}
	select.innerHTML = htmlOption;
	cell5.appendChild(select);
	cell5.align="center";

	cell6.align="center";
	cell6.innerHTML = '<input class = "factor" type="number" min="0" max="100" id="factor' + totalRow + '" style="text-align: right" onchange="calculateScore('+ totalRow + ')" onkeyup="calculateScore('+ totalRow + ')">';

	cell8.innerHTML = '<div class="total" id="total' + totalRow + '" style="text-align: right"></div>';

	cell7.innerHTML = '<input type="text" class="datepicker" id="datepicker' + totalRow + '">';
	cell9.align="center";
	cell9.innerHTML= '<button class="delOne" onclick="deleteOne(' + totalRow + ')"></button>';
	$(".datepicker").datepicker();

}
function htmlToElement(html) {
	var template = document.createElement('template');
	template.innerHTML = html;
	return template.content;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}	
