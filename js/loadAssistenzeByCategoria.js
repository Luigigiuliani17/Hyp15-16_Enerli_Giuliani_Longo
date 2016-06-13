$(document).ready(ready);
function ready(){

    /* Voglio caricare da database tutte le assistenze di una data categoria */

    /* ritrovo nell'url il valore del parametro */
    var cat_id = getLocationValue("cat_id");
    console.log(cat_id);
    // carica da database il nome e l'icona della categoria
    getCatFromDB(cat_id);

    // carica l'assistenza di quella categoria
    getAssFromDB(cat_id);

}

/* funzione per caricare la categoria da database */
function getCatFromDB(cat){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {categoria:cat},
        url: "http://tiim.altervista.org/php/getCategoriaAss.php",
        success: function(response) {
            var categoria = JSON.parse(response);

            console.log(categoria[0].nome_cat);
            // nome della pagina
            $('#title').html('TIIM - ' + categoria[0].nome_cat);
            // costruisco dinamicamente il path
            $("#path").html('<a href="assistenzaTutti.html">> Assistenza </a> <a href="categorie.html?type=3"> > Categorie</a> > ' + categoria[0].nome_cat);
            // introduzione: riquadro della categoria con icona e titolo
            $("#icon-cat").attr("src", "/images/categorie/" + categoria[0].icon);
            $("#nome-cat").html(categoria[0].nome_cat + ' ('+categoria[0].num_ass + ')');

        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}

/* funzione per caricare le categorie da database */
function getAssFromDB(cat){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {categoria:cat},
        url: "http://tiim.altervista.org/php/getAssistenzaByCategoria.php",
        success: function(response) {
            // in prodotti dovrebbe esserci un vettore di elementi prodotti di una categoria.
            var assistenza = JSON.parse(response);
            // creo la variabile result per contenere il contenuto dinamico della pagina.
            var res = "";

           res +=  '<div class="row">';

                    // inizio la lista delle assistenze
                    for (var i = 0; i < assistenza.length; i++) {

                    if(assistenza[i].promo === "0"){
                        // costruisco la lista
                        res += '<ul id="lista" type=”disc”>';
                        res += 	'<li><a href="assistenza.html?id=' + assistenza[i].ass_id + '">' + assistenza[i].nome_ass + '</a></li>';
                        res += '</ul>';
                    }

                     if(assistenza[i].promo == "1"){
                        // costruisco la lista
                        res += '<ul id="lista_promo" type=”disc”>';
                        res += 	'<li><a href="assistenza.html?id=' + assistenza[i].ass_id + '">' + assistenza[i].nome_ass + '</a></li>';
                        res += '</ul>';
                    }
                    }

                    // chiudo il container della categoria
                    res +=  '</div>';

            $("#content").html(res);

        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}

/* funzione che analizza l'url alla ricerca del nome del parametro e restitiuisce il valore di quel parametro */
function getLocationValue(string){
    // variabile stringa per contenere l'url della pagina.
    var loc = document.location.toString()+"";
    // variabile posizione per capire in che posizione si trova il '?'
    var pos;
    if (loc.indexOf("?") == -1) {
        return "";
    }else{
        pos = loc.indexOf("&"+string+"=");
        if(pos == -1){
            pos = loc.indexOf("?"+string+"=")
        }
        if(pos == -1){
            return "";
        }
        pos+=2+(string.length);
        // variabile store per contenere il valore del parametro
        var store = "";
        // finche non finisce l'url o non si trova un altro parametro, salva i caratteri in store
        for(; pos < loc.length && loc.charAt(pos) != '&' && loc.charAt(pos)!= undefined ; pos++){
            store = store.concat(loc.charAt(pos));
        }
        return unescape(store);
    }
}
