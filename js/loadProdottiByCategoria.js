$(document).ready(ready);
function ready(){

    /* Voglio caricare da database tutti i prodotti di una data categoria */

    /* devo caricare le immagini anteprima, i nomi, i prezzi dei prodotti */

    /* ritrovo nell'url il valore del parametro */
    var cat_id = getLocationValue("cat_id");
    console.log(cat_id);
    // carica da database il nome e l'icona della categoria
    getCatFromDB(cat_id);

    // carica i prodotti di quella categoria
    getProdFromDB(cat_id);

}

/* funzione per caricare la categoria da database */
function getCatFromDB(cat){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {categoria:cat},
        url: "http://tiim.altervista.org/php/getCategoria.php",
        success: function(response) {

            var categoria = JSON.parse(response);
            // nome della pagina
            $('#title').html('TIIM - ' + categoria[0].nome_cat);
            // costruisco dinamicamente il path
            $("#path").html('<a href="prodottiTutti.html">> Prodotti</a> <a href="categorie.html?type=1"> > Categorie</a> > ' + categoria[0].nome_cat);
            // introduzione: riquadro della categoria con icona e titolo
            $("#icon-cat").attr("src", "/images/categorie/" + categoria[0].icon);
            $("#nome-cat").html(categoria[0].nome_cat + ' ('+categoria[0].num_prod + ')');
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}

/* funzione per caricare le categorie da database */
function getProdFromDB(cat){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {categoria:cat},
        url: "http://tiim.altervista.org/php/getProdottiByCategoria.php",
        success: function(response) {
            // in prodotti dovrebbe esserci un vettore di elementi prodotti di una categoria.
            var prodotti = JSON.parse(response);
            // creo la variabile result per contenere il contenuto dinamico della pagina.
            var res = "";

            // raccolta dei prodotti
            for (var i = 0; i < prodotti.length; i++) {
                // costruisco iun thumbnail per ogni prodotto
                res += '<div class="col-xs-12 col-sm-6 col-md-3">';
                res += 	'<div class="thumbnail over">';
                res += 		'<img src="/images/prodotti/anteprime/'+ prodotti[i].thumbnail + '" alt="Image not available, sorry." class="img-responsive">';
                if (prodotti[i].promo == 1) {
                    res += '<span class="over-img">';
                    res +=      '<img src="/images/offerte/promo.png" alt="Image not available, sorry." class="img-responsive"/>';
                    res += '</span>';
                }
                res +=       '<div class="caption">';
                res += 		       '<a href="prodotto.html?id=' + prodotti[i].prod_id + '"><h4>' + prodotti[i].nome_prod +'</h4></a>';
                res += 		       '<h5>' + prodotti[i].prezzo + ' &euro;</h5>'
                res += 		       '<a href="prodotto.html?id=' + prodotti[i].prod_id + '" class="button buttonDB">Dettagli</a>';
                res += 	     '</div>';
                res +=  '</div>';
                res += '</div>';
            }
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
