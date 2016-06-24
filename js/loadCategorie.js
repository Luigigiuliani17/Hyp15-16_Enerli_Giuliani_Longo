$(document).ready(ready);
function ready(){

    /* Voglio caricare da database le categorie di un certo tipo a seconda di ciò che viene richiesto: categorie sono parametrizza su prodotti, smartlife, assistenza */

    /* devo caricare le immagini delle categorie, i nomi, la descrizione generale del tipo delle categorie */
    //get the parameter from the url
    var type = getLocationValue("type");
    console.log(type);

    // ora carica da database le categorie relative a quel type
    getFromDB(type);

}


/* funzione che analizza l'url alla ricerca del nome del parametro e restitiuisce il valore di quel parametro
type = nome del parametro [prodotti, smartlife, assistenza]*/
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
        for(; pos < loc.length && loc.charAt(pos) != '&' && loc.charAt(pos)!= undefined ; pos++){
            store = store.concat(loc.charAt(pos));
        }
        return unescape(store);
    }
}




/* funzione per caricare le categorie da database */
function getFromDB(type){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/getCategorie.php", //Relative or absolute path to file.php file
        data: {categorie_tipo:type},
        success: function(response) {
            // in categorie dovrebbe esserci un vettore di elementi categoria
            var categorie = JSON.parse(response);
            // path dinamico
            var path = "";
			// costruisco il path a seconda del tipo di categorie:
            switch (parseInt(categorie[0].tipo)) {
            	case 1:
                	path += '<a  href="prodottiTutti.html">> Prodotti</a> > Categorie';
                    break;
                case 2:
                	path += '<a  href="smartLifeTutti.html">> Smart Life</a> > Categorie';
                    break;
                case 3:
                	path += '<a  href="assistenzaTutti.html">> Assistenza</a> > Categorie';
                  	break;
                default:
                	path += 'lol something wrong';
            }
            // creo una variabile stringa per contenere la somma delle singole descrizioni
            var desc = "";
            // creo una seconda variabile stringa per contenere il risultato contenitore delle immagini
            var res = "";
			for (var i = 0; i < categorie.length; i++) {
            	// costruisco la descrizione
                desc = desc + categorie[i].descrizione;
                // costruisco il risultato a seconda del tipo della categoria che è stata selezionata
                switch (parseInt(categorie[i].tipo)) {
                case 1:
                    res += '<div class="col-xs-12 col-sm-4 col-md-15 col-lg-15">';
                    res += 	'<div>';
                    res += 		'<section class="hsquare">';
                    res += 			'<img src="/images/categorie/' + categorie[i].img + '" alt="Image not available, sorry." class="img-responsive">';
                    res += 			'<p class="htxt">'+ categorie[i].nome + '</p>';
                    res += 			'<p class="hbtn"><a href="prodottiPerCategoria.html?cat_id=' + categorie[i].cat_id + '" class="button buttonSB">Scopri</a></p>';
                    res += 		'</section>';
                    res += 	'</div>';
                    res += '</div>';
                    break;
                case 2:
                    res += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">';
                    res += 	'<div>';
                    res += 		'<section class="hsquare">';
                    res += 			'<img src="/images/categorie/' + categorie[i].img + '" alt="Image not available, sorry." class="img-responsive">';
                    res += 			'<p class="htxt">'+ categorie[i].nome + '</p>';
                    res += 			'<p class="hbtn"><a href="smartLifePerCategoria.html?cat_id=' + categorie[i].cat_id + '" class="button buttonSB">Scopri</a></p>';
                    res += 		'</section>';
                    res += 	'</div>';
                    res += '</div>';
                    break;
                case 3:
                    res += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">';
                    res += 	'<div>';
                    res += 		'<section class="hsquare">';
                    res += 			'<img src="/images/categorie/' + categorie[i].img + '" alt="Image not available, sorry." class="img-responsive">';
                    res += 			'<p class="htxt">'+ categorie[i].nome + '</p>';
                    res += 			'<p class="hbtn"><a href="assistenzaPerCategoria.html?cat_id=' + categorie[i].cat_id + '" class="button buttonSB">Scopri</a></p>';
                    res += 		'</section>';
                    res += 	'</div>';
                    res += '</div>';
                    break;
                default:
                    res += "WTF";
                    break;
                }
            }
            $("#path").html(path);
            $("#description").html(desc);
            $("#categories").html(res);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}
