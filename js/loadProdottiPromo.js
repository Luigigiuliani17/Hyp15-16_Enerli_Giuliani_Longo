$(document).ready(ready);
function ready(){

    /* Voglio caricare da database tutti i prodotti in promozione*/
    getProdFromDB(1);

}

/* funzione per caricare i prodotti da database */
function getProdFromDB(tipo){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {type:tipo},
        url: "http://tiim.altervista.org/php/getPromo.php",
        success: function(response) {

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
                res += 		       '<a href="prodotto.html?id=' + prodotti[i].prod_id + '"><h4>' + prodotti[i].nome +'</h4></a>';
                res += 		       '<h5>' + prodotti[i].prezzo + ' &euro;</h5>'
                res += 		       '<a href="prodotto.html?id=' + prodotti[i].prod_id + '" class="button buttonDB">Dettagli</a>';
                res += 	     '</div>';
                res +=  '</div>';
                res += '</div>';
            }
            $("#promo-prod").html(res);

        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}
