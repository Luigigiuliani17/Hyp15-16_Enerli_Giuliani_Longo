$(document).ready(ready);
function ready(){

    /* Voglio caricare da database tutti gli oggetti in promozione di un certo tipo */

    /* ritrovo nell'url il valore del parametro */
    var type_promo = getLocationValue("type");
    // a seconda del tipo, chiamo una funzione che carica i prodotti o i servizi o le assistenze

    switch (parseInt(type_promo)) {
        case 1:
            getProdPromo(type_promo);
            break;
        case 2:
            getSLPromo(type_promo);
            break;
        case 3:
            getAssPromo(type_promo);
            break;
        default:
            console.log("not able to retrieve this");
    }
}

/* funzione per caricare i prodotti in promozione da database */
function getProdPromo(tipo){
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {type:tipo},
        url: "http://tiim.altervista.org/php/getPromo.php",
        success: function(response) {

            var prodotti = JSON.parse(response);
            // carico il css adatto
            $("#css-link").attr('href', "css/prodotti.css");
            //carico il titolo della pagina e il banner
            $("#title").html("TIIM - Prodotti in promozione");
            $("#path").html('<a href="prodottiTutti.html">> Prodotti</a> > Promozione');
            $("#banner").attr('src', "images/offerte/banner_prod_promo.png");

            // creo la variabile result per contenere il contenuto dinamico della pagina.
            var res = "";

            // raccolta dei prodotti
            for (var i = 0; i < prodotti.length; i++) {
                // costruisco iun thumbnail per ogni prodotto
                res += '<div class="col-xs-12 col-sm-6 col-md-3">';
                res += 	'<div class="thumbnail over">';
                res += 		'<img src="images/prodotti/anteprime/'+ prodotti[i].thumbnail + '" alt="Image not available, sorry." class="img-responsive">';
                if (prodotti[i].promo == 1) {
                    res += '<span class="over-img">';
                    res +=      '<img src="images/offerte/promo.png" alt="Image not available, sorry." class="img-responsive"/>';
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
            $("#content").html(res);

        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}


// FUNZIONE CHE CARICA DA DB I SERVIZI SMARTLIFE IN PROMOZIONE
function getSLPromo(tipo) {
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {type:tipo},
        url: "http://tiim.altervista.org/php/getPromo.php",
        success: function(response) {

            var smartlife = JSON.parse(response);
            // carico il css adatto
            $("#css-link").attr('href', "css/smart_life.css");
            //carico il titolo della pagina e il banner
            $("#title").html("TIIM - Smart Life in promozione");
            $("#path").html('<a href="smartLifeTutti.html">> SmartLife</a> > Promozione');
            $("#banner").attr('src', "images/offerte/banner_sl_promo.png");

            // creo la variabile result per contenere il contenuto dinamico della pagina.
            var res = "";

            // raccolta dei prodotti
            for (var i = 0; i < smartlife.length; i++) {

                // costruisco iun thumbnail per ogni smart life
                res += '<div class="col-xs-12 col-sm-6 col-md-4">';
                res += 	'<div class="thumbnail">';
                res += 		'<img src="images/smart_life/anteprime/'+ smartlife[i].thumbnail + '" alt="Image not available, sorry." class="img-responsive">';

                //if it is promo
                if (smartlife[i].isPromo == 1) {
                    res += '<span class="over-img">';
                    res +=      '<img src="images/offerte/promo.png" alt="Image not available, sorry." class="img-responsive"/>';
                    res += '</span>';
                }

                res +=          '<div class="smart_txt_div">';
                res +=             '<p class="smart_title">' + smartlife[i].nome + '</p>';
                res +=             '<p class="smart_txt">' + smartlife[i].descrizione_breve + '</p>';
                res +=       '</div>';
                res +=       '<p class="hbtn"><a href="smartLife.html?id=' + smartlife[i].smart_life_id +'" class="button buttonTutti">Scopri</a></p>';
                //chiudo thumbnail
                res +=  '</div>';
                //chiudo col-xs-12...
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


// FUNZIONE CHE CARICA DA SB I SERVIZI DI ASSISTENZA IN EVIDENZA
function getAssPromo(tipo) {
    $.ajax({
        method: "POST",
        crossDomain: true,
        data: {type:tipo},
        url: "http://tiim.altervista.org/php/getPromo.php",
        success: function(response) {

            var assistenza = JSON.parse(response);
            // carico il css adatto
            $("#css-link").attr('href', "css/assistenza.css");
            //carico il titolo della pagina e il banner
            $("#title").html("TIIM - Assistenza in evidenza");
            $("#path").html('<a href="assistenzaTutti.html">> Assistenza</a> > In evidenza');
            $("#banner").attr('src', "images/offerte/banner_ass_evi.png");

            // creo la variabile result per contenere il contenuto dinamico della pagina.
            var res = '<div class="row">';

            // SVILUPPO DEL CONTENUTO DINAMICO

            // inizio la lista delle assistenze
            for (var i = 0; i < assistenza.length; i++) {
                // costruisco la lista
                res += '<ul id="lista_promo" type=”disc”>';
                res += 	'<li><a href="assistenza.html?id=' + assistenza[i].ass_id + '">' + assistenza[i].nome + '</a></li>';
                res += '</ul>';
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
