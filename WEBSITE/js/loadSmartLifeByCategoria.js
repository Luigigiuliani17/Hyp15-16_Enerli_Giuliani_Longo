$(document).ready(ready);
function ready(){

    /* Voglio caricare da database tutti gli smart life di una data categoria */

    /* devo caricare le immagini anteprima large, i nomi, la descrizione in breve, se sono in promo o no */

    /* ritrovo nell'url il valore del parametro */
    var cat_id = getLocationValue("cat_id");
    console.log(cat_id);
    // carica da database il nome e l'icona della categoria
    getCatFromDB(cat_id);

    // carica gli smart life di quella categoria
    getSmartFromDB(cat_id);

}

/* funzione per caricare la categoria da database */
function getCatFromDB(cat){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {categoria:cat},
        url: "http://tiim.altervista.org/php/getCategoriaSL.php",
        success: function(response) {

            var categoria = JSON.parse(response);
            // nome della pagina
            $('#title').html('TIIM - ' + categoria[0].nome_cat);
            // costruisco dinamicamente il path
            $("#path").html('<a href="smartLifeTutti.html">> Smart Life</a> <a href="categorie.html?type=2"> > Categorie</a> > ' + categoria[0].nome_cat);
            // introduzione: riquadro della categoria con icona e titolo
            $("#icon-cat").attr("src", "images/categorie/" + categoria[0].icon);
            $("#nome-cat").html(categoria[0].nome_cat + ' ('+categoria[0].num_smart + ')');
            $("#des-cat").html(categoria[0].descrizione_cat);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}

/* funzione per caricare le categorie da database */
function getSmartFromDB(cat){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {categoria:cat},
        url: "http://tiim.altervista.org/php/getSmartLifeByCategoria.php",
        success: function(response) {
            // in categoria dovrebbe esserci un vettore di elementi smart life di una categoria.
            var smartlife = JSON.parse(response);
            // creo la variabile result per contenere il contenuto dinamico della pagina.
            var res = "";

            /*
             <div class= "col-sm-12">


                        <img src="images/smart_life/anteprima_large/tim-reading.jpg" alt='Grand Canyon', class="img-responsive">
                        <div class="smart_large_text_area">
                            <h1 id=smart_title>Titolo</h1>
                            <h2 id=smart_subtitle>Scopri il servizio sciallo ballo ciana town</h2>

                        </div>
                        <a class="blueScopri" href="promo.html?type=1" >Scopri</a>


                    </div>
            */


            // raccolta dei smart life
            for (var i = 0; i < smartlife.length; i++) {
                // costruisco  un col-sm-12 per ogni smart life
                res += ' <div class= "col-sm-12">';

                res += 		'<img src="images/smart_life/anteprima_large/'+ smartlife[i].anteprima_big + '" alt="Image not available, sorry." class="img-responsive">';
                if (smartlife[i].isPromo == 1) {
                    res += '<span class="over-img">';
                    res +=      '<img src="images/offerte/promo.png" alt="Image not available, sorry." class="img-responsive"/>';
                    res += '</span>';
                }
                res +=       '<div class="smart_large_text_area">';
                res += 		       '<h1 id=smart_title>'+ smartlife[i].nome_smart_life +'</h1>';
                res += 		       '<h2 id=smart_subtitle>' + smartlife[i].descrizione_breve + '</h2>';
                res += 	     '</div>';
                res +=       '<a class="blueScopri" href="smartLife.html?id=' + smartlife[i].smart_life_id +'" >Scopri</a>';

                res += '</div>';
            }

            $("#dynamic_content").html(res);

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
