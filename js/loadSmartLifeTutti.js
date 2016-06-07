$(document).ready(ready);
function ready(){

    /* Voglio caricare da database tutti gli smart life ordinandoli per categoria */

    /* devo caricare le immagini anteprima, i nomi, le descrizioni brevi degli smart life */

    // carica da database tutti gli smart life
    getFromDB();

}


/* funzione per caricare le categorie da database */
function getFromDB(){
    // creo la variabile result per contenere il contenuto dinamico della pagina.
    $.ajax({
        method: "GET",
        crossDomain: true,
        url: "http://tiim.altervista.org/php/getSmartLifeTutti.php",
        success: function(response) {
            var res = "";
            // in smart life dovrebbe esserci un vettore di elementi smart life di tutte le categorie.
            var smart_life = JSON.parse(response);
            console.log(smart_life);
            for (var cat = 6; cat <= 9; cat ++) {
                console.log(cat);
                // per ogni categoria creo un nuovo vettore di prodotti
                var smartLifeByCat = [];
                console.log(smartLifeByCat);
                console.log("lunghezza smart life = " + smart_life.length)
                for (var smart = 0; smart < smart_life.length; smart++) {
                    if (smart_life[smart].categoria == cat) {
                        smartLifeByCat.push(smart_life[smart]);
                    }
                }
                console.log("lunghezza smart life by cat: " + smartLifeByCat.length)

                // se c'è almeno uno smart life per quella categoria:
                if (smartLifeByCat.length > 0) {
                    // creo l'introduzione
                    res += '<div class="container marketing">';
                    res +=    '<div class="jumbotron">';
                    res +=      '<p class="smart_cat_name">' + smartLifeByCat[0].nome_cat + '</p>'
                    res +=      '<p class="smart_cat_des">' + smartLifeByCat[0].descrizione + '</p>'
                    res +=   '</div>'
                    // inizia la riga degli smart life:
                    res +=  '<div class="row">'
                    // raccolta degli smart life
                    for (var i = 0; i < smartLifeByCat.length; i++) {
                        // costruisco iun thumbnail per ogni smart life
                        res += '<div class="col-xs-12 col-sm-6 col-md-4">';
                        res += 	'<div class="thumbnail">';
                        res += 		'<img src="/images/smart_life/anteprime/TV_Entertainment/'+ smartLifeByCat[i].thumbnail + '" alt="Image not available, sorry." class="img-responsive">';
                        res +=          '<div class="smart_txt_div">';
                        res +=             '<p class="smart_title">' + smartLifeByCat[i].nome_smart_life + '</p>';
                        res +=             '<p class="smart_txt">' + smartLifeByCat[i].descrizione_breve + '</p>';
                        res +=       '</div>';
                        res +=       '<p class="hbtn"><a href="#" class="button">Scopri</a></p>';
                        //chiudo thumbnail
                        res +=  '</div>';
                        //chiudo col-xs-12...
                        res += '</div>';


                    }
                    // chiudo il container della categoria
                    res += '</div>';
                    //ciudo il market
                    res += '</div>';
                }
                console.log(res)
            }
            $("#smart_life_all").html(res);
        },//chiude success
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}
