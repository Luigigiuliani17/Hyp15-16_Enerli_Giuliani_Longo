$(document).ready(ready);
function ready(){

    /* Voglio caricare da database tutti i prodotti ordinandoli per categoria */

    /* devo caricare le immagini anteprima, i nomi, i prezzi dei prodotti */

    // carica da database tutti i prodotti
    getFromDB(1);

}


/* funzione per caricare le categorie da database */
function getFromDB(cat){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {categoria:ncat},
        url: "http://tiim.altervista.org/php/getProdottiByCategoria.php",
        success: function(response) {
            // in prodotti dovrebbe esserci un vettore di elementi prodotti di una categoria.
            var prodotti = JSON.parse(response);
            // creo la variabile result per contenere il contenuto dinamico della pagina.
            var res = "";
            // introduzione: riquadro della categoria con icona e titolo
            res += '<div class="container marketing">';
            res +=  '<div class="row prod-title">';
            res +=      '<img src="/images/categorie/' + prodotti[0].icon_cat + '"/>';
            res +=      prodotti[0].nome_cat + '(' + prodotti.length +')';
            res +=  '</div>';
            // inizia la riga dei prodotti:
            res +=  '<div class="row">'
            // raccolta dei prodotti
            for (var i = 0; i < prodotti.length; i++) {
                // costruisco iun thumbnail per ogni prodotto
                res += '<div class="col-xs-12 col-sm-6 col-md-3">';
                res += 	'<div class="thumbnail">';
                res += 		'<img src="/images/prodotti/anteprime/'+ prodotti[i].thumbnail + '" alt="Image not available, sorry." class="img-responsive">';
                res +=          '<div class="caption">';
                res += 		       '<a href="prodotto.html?id=' + prodotti[i].prod_id + '"><h4>' + prodotti[i].nome_prod +'</h4></a>';
                res += 		       '<h5>' + prodotti[i].prezzo + '</h5>'
                res += 		       '<a href="#" class="button buttonDB">Dettagli</a>';
                res += 	        '</div>';
                res +=  '</div>';
                res += '</div>';
            }
            res +=  '</div>';
            res += '</div>';
            $("#all-prod").html(res);

        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}
