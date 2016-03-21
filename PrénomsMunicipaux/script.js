"use strict";
var prenomsArray = [];
 
 $(document).ready(function(){

	$("#btnrefresh").click(refresh);
	$("#form label, #form select option").click(refresh);

    $.ajax({
        type: "GET",
        url: "prenoms.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j].replace (/\"/g, ""));
            }
            prenomsArray.push(tarr);
        }
    }
}
 
 function refresh() {
	var formArray = $("form").serializeArray();
	
	var resultat=prenomsArray;
	
	for(var i = 0; i < formArray.length; i++){
		if(formArray[i]["name"]=="sex" && formArray[i]["value"]!=""){
			resultat=filtreParSex(resultat, formArray[i]["value"]);
		}
		if(formArray[i]["name"]=="lettre" && formArray[i]["value"]!=""){
			resultat=filtreParLettre(resultat, formArray[i]["value"]);
		}
		if(formArray[i]["name"]=="taille" && formArray[i]["value"]!=""){
			resultat=filtreParTaille(resultat, formArray[i]["value"]);
		}
		if(formArray[i]["name"]=="conseiller_municipal" && formArray[i]["value"]!=""){
			resultat=filtreParPopularite(resultat, formArray[i]["value"]);
		}
		if(formArray[i]["name"]=="nom_compose" && formArray[i]["value"]!=""){
			resultat=filtreNomCompose(resultat);
		}
	}
	
	createTable(resultat);
	
	$("input:checked").parent("label").children("label").css("opacity","0.5");
	
	$("#resultats").css("box-shadow", "0px 8px 17px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0px rgba(0, 0, 0, 0.19)");
	setTimeout(function(){$("#resultats").css("box-shadow", "0px 2px 5px 0px rgba(0, 0, 0, 0.16), 0px 2px 10px 0px rgba(0, 0, 0, 0.12)")}, 600);
 }

 
 
function filtreParSex(array, value){
	if(value=="M" || value=="F"){
		var filtered = [];
		
		for(var i = 0; i < array.length; i++){
			var obj = array[i];
			if(obj[1] == value){
				filtered.push(obj);
			}
		}    
		return filtered;
	} else {
		return array;
	}

}


function filtreParLettre(array, value){
    var filtered = [];
	
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
		if(obj[0][0] == value.toUpperCase()){
			filtered.push(obj);
		}
    }    
    return filtered;
}

function filtreParTaille(array, value){
    var filtered = [];
	
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
		if(value=="petit" && obj[0].length<=5){
			filtered.push(obj);
		} else if(value=="grand" && obj[0].length>=8){
			filtered.push(obj);
		}
    }    
    return filtered;
}

function filtreParPopularite(array, value){
    var filtered = [];
	
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
		if(value=="true" && parseInt(obj[2])>20){
			filtered.push(obj);
		} else if(value=="false" && parseInt(obj[2])<=20){
			filtered.push(obj);
		}
    }
	
	/*if(filtered.length){
		filtered=array;
	}*/
	
	if(value=="false"){
		return filtered.reverse();
	} else {
		return filtered;
	}
}

function filtreNomCompose(array){
    var filtered = [];
	
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
		for(var j=0; j<obj[0].length; j++){
			if(obj[0][j]=="-"){
				filtered.push(obj);
			}
		}
		
    }    
    return filtered;
}


function createTable(array) {
	var tableBody = document.createElement('tbody');

	array.forEach(function(rowData) {
	var row = document.createElement('tr');

	rowData.forEach(function(cellData) {
	  var cell = document.createElement('td');
	  cell.appendChild(document.createTextNode(cellData));
	  row.appendChild(cell);
	});

	tableBody.appendChild(row);
	});

	$("#resultats table tbody").remove();
	$("#resultats table").append(tableBody);
	
	if(array.length>1){
		$("#resultats h2").html(array.length+" résultats");
	} else if(array.length==1){
		$("#resultats h2").html("Un seul résultat");
	} else if(array.length<1){
		$("#resultats h2").html("Aucun résultat :(");
		$("#resultats table tbody").html("<tr><td>-</td><td>-</td><td>-</td></tr>");
	} 
	
}