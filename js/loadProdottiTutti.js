$(document).ready(ready);
function ready(){

    /* Voglio caricare da database tutti i prodotti ordinandoli per categoria */

    /* devo caricare le immagini anteprima, i nomi, i prezzi dei prodotti */

    // carica da database tutti i prodotti
    getFromDB();

}


/* funzione per caricare le categorie da database */
function getFromDB(){
    // creo la variabile result per contenere il contenuto dinamico della pagina.
    $.ajax({
        method: "GET",
        crossDomain: true,
        url: "http://tiim.altervista.org/php/getProdottiTutti.php",
        success: function(response) {
            var res = "";
            // in prodotti dovrebbe esserci un vettore di elementi prodotti di tutte le categorie.
            var prodotti = JSON.parse(response);
            console.log(prodotti);
            for (var cat = 1; cat <= 5; cat ++) {
                console.log(cat);
                // per ogni categoria creo un nuovo vettore di prodotti
                var prodByCat = [];
                console.log(prodByCat);
                for (var prod = 0; prod < prodotti.length; prod++) {
                    if (prodotti[prod].categoria == cat) {
                        prodByCat.push(prodotti[prod]);
                    }
                }
                // se c'è almeno un prodotto per quella categoria:
                if (prodByCat.length > 0) {
                    // creo l'introduzione
                    res += '<div class="container marketing">';
                    res +=  '<div class="row prod-title">';
                    res +=      '<img src="/images/categorie/' + prodByCat[0].icon_cat + '"/>';
                    res +=      ' ' + '<a href="prodottiPerCategoria.html?cat_id=' + prodByCat[0].categoria + '">' + prodByCat[0].nome_cat + ' (' + prodByCat.length +')</a>';
                    res +=  '</div>';
                    // inizia la riga dei prodotti:
                    res +=  '<div class="row">'
                    // raccolta dei prodotti
                    for (var i = 0; i < prodByCat.length; i++) {
                        // costruisco iun thumbnail per ogni prodotto
                        res += '<div class="col-xs-12 col-sm-6 col-md-3">';
                        res += 	'<div class="thumbnail">';
                        res += 		'<img src="/images/prodotti/anteprime/'+ prodByCat[i].thumbnail + '" alt="Image not available, sorry." class="img-responsive">';
                        res +=          '<div class="caption">';
                        res += 		       '<a href="prodotto.html?id=' + prodByCat[i].prod_id + '"><h4>' + prodByCat[i].nome_prod +'</h4></a>';
                        res += 		       '<h5>' + prodByCat[i].prezzo + ' &euro;</h5>'
                        res += 		       '<a href="prodotto.html?id=' + prodByCat[i].prod_id + '" class="button buttonDB">Dettagli</a>';
                        res += 	        '</div>';
                        res +=  '</div>';
                        res += '</div>';
                    }
                    // chiudo il container della categoria
                    res +=  '</div>';
                    res += '</div>';
                }
            }
            $("#all-prod").html(res);
        },//chiude success
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}
