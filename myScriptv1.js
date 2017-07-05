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
	var html = 'List of User <br> <table>\ ';
	html += '<tr>\ ' + '<th>Order</td>\ ' + '<th>First Name: </th>\ ' + '<th>Last Name: </th>\ ' + '</tr>\ ';
	for (var i = 0; i < fnameRec.length; i++) {
		if (fnameRec[i].value != "" && lnameRec[i].value != "") {
			html += '<tr>\ <td align="center">' + (i + 1) + '</td>\ ' + '<td align="center">' + fnameRec[i].value + 
				'</td>\ ' + '<td align="center">' + lnameRec[i].value + '</td>\ </tr>';
		}
	}
	html += '</table>';
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
function add(){
	var table = document.getElementById("table");
	var order = table.rows.length;
	var html = 
	'<tr' + 'id = "row' + order +'"' + '>\
	<td align="center"><input type="checkbox" class="check"></td>\
	<td align="center">' + order + '</td>\
	<td align="center"><input type="text"  class="fname"></td>\
	<td align="center"><input type="text" class="lname"></td>\
	<td align="center"><button class="delOne" onclick="deleteOne(this.parentElement.parentElement.rowIndex)"></button></td>\
	</tr>';
	table.innerHTML += html;
}