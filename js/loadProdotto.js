$(document).ready(ready);
function ready(){

    //get the parameter from the url
    var id = getLocationValue("id");
    console.log(id);

    // ora carica da database il prodotto con quell'id
    getFromDB(id);

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
        for(; pos < loc.length && loc.charAt(pos) != '&' && loc.charAt(pos)!= undefined ; pos++){
            store = store.concat(loc.charAt(pos));
        }
        return unescape(store);
    }
}


/* funzione per caricare il prodotto da database */
function getFromDB(id){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/getProdotto.php", //Relative or absolute path to file.php file
        data: {prod_id:id},
        success: function(response) {
            // in prodotto dovrebbe esserci un elemento richiesto
            var res = JSON.parse(response);
            console.log(res);
            var prodotto = res[0];
            console.log(prodotto);
            // path
            var path =  '<a  href="prodottiTutti.html">> Prodotti</a>';
            path +=     '<a  href="categorie.html?type=1">> Categorie</a>';
            path +=     '<a  href="prodottiPerCategoria.html?cat_id='+ prodotto.cat_id +'">> ' + prodotto.nome_cat + '</a>';
            path +=     '> '+ prodotto.nome_prod;

            var prezzo = "";
            prezzo += prodotto.prezzo.toString();
            prezzo += " &euro;";
            // scrivo direttamente sull'html i componenti che possono essere scritti senza elaborazione
            $("#path").html(path);
            $("#nome").html(prodotto.nome_prod);
            $("#descrizione").html(prodotto.descrizione);
			$("#prezzaccio").html(prezzo);

            // inserisco le immagini nei tab se presenti
            var tab = '<li class="active col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im1" data-toggle="tab"><img src="images/prodotti/' + prodotto.img1 + '" alt="" class="img-responsive"/></a></li>'

            var image1 = '<img src="images/prodotti/' + prodotto.img1 + '" alt="" class="img-responsive"/>';
            var image2 = "";
            var image3 = "";

            if (prodotto.img2 != null) {
                tab += '<li class="active col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im1" data-toggle="tab"><img src="images/prodotti/' + prodotto.img2 + '" alt="" class="img-responsive"/></a></li>';
                image2 += '<img src="images/prodotti/' + prodotto.img2 + '" alt="" class="img-responsive"/>';
            }
            if (prodotto.img3 != null) {
                tab += '<li class="active col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im1" data-toggle="tab"><img src="images/prodotti/' + prodotto.img3 + '" alt="" class="img-responsive"/></a></li>';
                image3 += '<img src="images/prodotti/' + prodotto.img3 + '" alt="" class="img-responsive"/>';
            }

            // gestione delle caratteristiche nella presentazione
            var caratt_str = "";
            //parso le caratteristiche per creare diversi elementi di una lista
            var caratt = parsec(prodotto.caratteristiche);
            for (var i = 0; i < caratt.length; i++) {
                caratt_str += '<li>' + caratt[i] +'</li>';
            }

            // gestione delle specifiche tecniche
            var spec_tec_str = '<table class="tg">';
            // parso la stringa per ottenere  singole specifiche
            var spec_tec = parsespec(prodotto.specifiche);
            for (var j=0; j < spec_tec.length; j++) {
                var single_spec = spec_tec[j].split(',');
                spec_tec_str += '<tr>';
                if (j%2 == 0) {
                	spec_tec_str += '<td class="col-sm-4 tg-1col tg-6k2t">' + single_spec[0] + '</td>';
                	spec_tec_str += '<td class="col-sm-8 tg-6k2t">' + single_spec[1] + '</td>';
                } else {
                	spec_tec_str += '<td class="col-sm-4 tg-1col tg-yw4l">' + single_spec[0] + '</td>';
                	spec_tec_str += '<td class="col-sm-8 tg-yw4l">' + single_spec[1] + '</td>';
                }
                spec_tec_str += '</tr>';
            }
            spec_tec_str += '</table>';
            $("#caratteristiche-base").html(caratt_str);
            $("#spec-tech").html(spec_tec_str);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}


function parsec (stringa) {
    var res = stringa.split('+');
    console.log(res);
    return res;
}

function parsespec (stringa) {
    var res = stringa.split('+');
    console.log(res);
    return res;
}
