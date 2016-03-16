"use strict";
var refreshCount=0;

$(document).ready(function(){
 
	 $("main button").click(function(){
		$("main button").attr("disabled","disabled").html("Recherche");
		
		$.ajax( {
			type: "GET",
			async: true,
			url: "metier.xml",
			dataType: "xml",
			success: function(xml) {
				var nbMetierTotal=$(xml).find("metier").size();
				var nbRandomMetier=Math.round(Math.random()*nbMetierTotal);
				var randomMetier=$(xml).find("metier").get(nbRandomMetier);
				$("header h1>span").html("Métier trouvé !");
				$("main h2").html("Votre métier est <strong>"+randomMetier.children[0].innerHTML+"</strong> !");
				$("#button").attr("href",randomMetier.children[1].innerHTML).attr("target","_blank");
				$("main button").removeAttr("disabled").html("Découvrir ce métier").off("click");
				$("main p").show();
				$("#tweet").attr("href","https://twitter.com/intent/tweet?text=Mon%20m%C3%A9tier%20est%20"+encodeURIComponent(randomMetier.children[0].innerHTML)+"%20:&tw_p=tweetbutton&url=http%3A%2F%2Fdav.li%2Fm%C3%A9tierAuHasard%2F&via=DavidLibeau");
				$("#refresh").click(refresh);
			}
		});
	 });
 
 });
 
 function refresh() {
	refreshCount++;
	
	if(refreshCount==1){
		$("header h1>span").html("Autre métier trouvé !");
	} else if(refreshCount==2){
		$("header h1>span").html("Encore un autre métier trouvé !");
	} else if(refreshCount>2 && refreshCount<20){
		$("header h1>span").html(refreshCount+"e autre métier trouvé");
	} else if(refreshCount>=20 && refreshCount<35){
		$("header h1>span").html(refreshCount+"e autre métier trouvé<br/>(il faudrait peut-être penser à arrêter là)");
	} else if(refreshCount>=35 && refreshCount<42){
		$("header h1>span").html(refreshCount+"e autre métier trouvé<br/>(pas la peine de continuer à cliquer, il n'y a pas d'autre message)");
	} else if(refreshCount==42){
		$("header h1>span").html(refreshCount);
	} else if(refreshCount>42){
		$("header h1>span").html(refreshCount+"e autre métier trouvé");
	}
	
	$.ajax( {
		type: "GET",
		async: true,
		url: "metier.xml",
		dataType: "xml",
		success: function(xml) {
			var nbMetierTotal=$(xml).find("metier").size();
			var nbRandomMetier=Math.round(Math.random()*nbMetierTotal);
			var randomMetier=$(xml).find("metier").get(nbRandomMetier);
			$("main h2").html("Votre métier est <strong>"+randomMetier.children[0].innerHTML+"</strong> !");
			$("#button").attr("href",randomMetier.children[1].innerHTML).attr("target","_blank");
			$("main button").removeAttr("disabled").html("Découvrir ce métier").off("click");
			$("#tweet").attr("href","https://twitter.com/intent/tweet?text=Mon%20m%C3%A9tier%20est%20"+encodeURIComponent(randomMetier.children[0].innerHTML)+"%20:&tw_p=tweetbutton&url=http%3A%2F%2Fdav.li%2Fm%C3%A9tierAuHasard%2F&via=DavidLibeau");
		}
	});
 }
