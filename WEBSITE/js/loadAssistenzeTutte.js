$(document).ready(ready);
function ready(){


    getFromDB();

}


/* funzione per caricare le categorie da database */
function getFromDB(){
    // creo la variabile result per contenere il contenuto dinamico della pagina.
    $.ajax({
        method: "GET",
        crossDomain: true,
        url: "http://tiim.altervista.org/php/getAssistenzaTutti.php",
        success: function(response) {
            var res = "";
            // in assistenze dovrebbe esserci un vettore di elementi prodotti di tutte le categorie.
            var assistenze = JSON.parse(response);
            console.log(assistenze);
            for (var cat = 10; cat <= 13; cat ++) {
                // per ogni categoria creo un nuovo vettore di prodotti
                var assByCat = [];

                for (var ass = 0; ass < assistenze.length; ass++) {
                    if (assistenze[ass].cat_id == (cat)) {
                        assByCat.push(assistenze[ass]);

                    }
                }


                // se c'è almeno un prodotto per quella categoria:
                if (assByCat.length > 0) {
                    // creo l'introduzione
                    res += '<div class="container marketing">';
                    res +=  '<div class="row ass-title">';
                    res +=      '<img src="images/categorie/' + assByCat[0].icon_cat + '"/>';
                    res +=      ' ' + '<a href="assistenzaPerCategoria.html?cat_id=' +assByCat[0].cat_id+ '">' + assByCat[0].nome_cat + ' (' + assByCat.length +')</a>';
                    res +=  '</div>';
                    // inizia la riga delle assistenze:
                    res +=  '<div class="row">';

                    // inizio la lista delle assistenze
                    for (var i = 0; i < assByCat.length; i++) {

                    if(assByCat[i].promo === "0"){
                        // costruisco la lista
                        console.log(assByCat[i].ass_id);
                        res += '<ul id="lista" type=”disc”>';
                        res += 	'<li><a href="assistenza.html?id=' + assByCat[i].ass_id + '">' + assByCat[i].nome_ass + '</a></li>';
                        res += '</ul>';
                    }

                     if(assByCat[i].promo == "1"){
                        // costruisco la lista
                        console.log(assByCat[i].ass_id);
                        res += '<ul id="lista_promo" type=”disc”>';
                        res += 	'<li><a href="assistenza.html?id=' + assByCat[i].ass_id + '">' + assByCat[i].nome_ass + '</a></li>';
                        res += '</ul>';
                    }
                    }

                    // chiudo il container della categoria
                    res +=  '</div>';
                    res += '</div>';
                }

            }


            $("#all-ass").html(res);
        },//chiude success
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}
