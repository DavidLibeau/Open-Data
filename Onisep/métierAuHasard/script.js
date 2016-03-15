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
				$("header h1>span").html("Trouvé !");
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
