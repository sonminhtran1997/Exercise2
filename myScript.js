function deleteSelect () {
	// body... 
	var allBox = document.getElementsByClassName("check");
	var rowIndex = 0;
	for (var i = 0; i < allBox.length; i++) {
		if (allBox[i].checked) {
			rowIndex = allBox[i].parentElement.parentElement.rowIndex;
			document.getElementById("table").deleteRow(rowIndex);
			i=-1;
		}
	}
	update();

}
function save() {
	// body... 
	var fnameRec = document.getElementsByClassName("fname");
	var lnameRec = document.getElementsByClassName("lname");
	var factor = document.getElementsByClassName("factor");
	var total = calculateTotal();
	var html = 'List of User <br> <table>\ ';
	html += '<tr>\ ' + '<th>Order</td>\ ' + '<th>First Name: </th>\ ' + '<th>Last Name: </th>\ ' + 
			'<th>Điểm: </th>\ ' + '<th>Hệ Số: </th>\ ' + '<th>Tổng Điểm</th>\ ' +'</tr>\ ';
	for (var i = 0; i < fnameRec.length; i++) {
		if (fnameRec[i].value != "" && lnameRec[i].value != "") {
			var score = document.getElementById("score" + (i+1));
			html += '<tr>\ <td align="center">' + (i + 1) + '</td>\ ' + '<td align="center">' + fnameRec[i].value + 
			'</td>\ ' + '<td align="center">' + lnameRec[i].value + '</td>\ ' +
			'<td align="center">' + score.value + '</td>\ '  +
			'<td align="center">' + parseFloat(factor[i].value).toLocaleString() + '</td>\ ' +
			'<td align="center">' + document.getElementsByClassName("total")[i].textContent + '</td>\ '
			+ '</tr>';
		}
	}
	html += '</table>';
	html += 'Total Score:' + total.toLocaleString();
	document.getElementById("output").innerHTML = html;
}
function checkAll () {
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
	// body...
	document.getElementById("table").deleteRow(x);
	update();
}

function calculateScore(current) {
	var index = current.parentElement.parentElement.rowIndex;
	var score = document.getElementById("score" + index);
	var factor = document.getElementsByClassName("factor");
	var total = score.value * factor[index-1].value;
	document.getElementsByClassName("total")[index-1].innerHTML = total.toLocaleString();
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
	var table = document.getElementById("table");
	var order = table.rows.length;
	var parser=new DOMParser();
	var html = 
	'<tr ' + 'id = "row' + order +'"' + '>\
	<td align="center"><input type="checkbox" class="check"></td>\
	<td align="right">' + order + '</td>\
	<td align="center"><input type="text"  class="fname"></td>\
	<td align="center"><input type="text" class="lname"></td>\
	<td align="center">\
	<select dir="rtl" onchange="calculateScore(this)" align="right" class="score" id="score' + order + '">\
	<option value="0">0</option>\
	<option value="1">1</option>\
	<option value="2">2</option>\
	<option value="3">3</option>\
	<option value="4">4</option>\
	<option value="5">5</option>\
	<option value="6">6</option>\
	<option value="7">7</option>\
	<option value="8">8</option>\
	<option value="9">9</option>\
	<option value="10">10</option>\
	</select>\
	</td>\
	<td align="center"><input type="number" min="0" class="factor" style="text-align: right" onchange="calculateScore(this)" onkeyup="calculateScore(this)"></td>\
	</td>\
	<td>\
	<div class="total" style="text-align: right"></div>\
	<td align="center"><button class="delOne" onclick="deleteOne(this.parentElement.parentElement.rowIndex)"></button></td>\
	</tr>';
	var dom = htmlToElement(html);
	table.appendChild(dom);
}
function htmlToElement(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}