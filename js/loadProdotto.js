$(document).ready(ready);
function ready(){

    //get the parameter from the url
    var id = getLocationValue("id");
    console.log(id);

    // ora carica da database il prodotto con quell'id
    getFromDB(id);

    // carica dal database i servizi SL compatibili con il prodotto:
    getSLProd(id);
    // carica da DB i servizi di assistenza compatibili col prodotto
    getAssProd(id);

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
            var prodotto = res[0];
            //titolo della pagina
            $('#title').html('TIIM - '+prodotto.nome_prod);
            // path
            var path =  '<a  href="prodottiTutti.html">> Prodotti</a>';
            path +=     '<a  href="categorie.html?type=1"> > Categorie</a>';
            path +=     '<a  href="prodottiPerCategoria.html?cat_id='+ prodotto.cat_id +'"> > ' + prodotto.nome_cat + '</a>';
            path +=     ' > '+ prodotto.nome_prod;

            if (prodotto.promo == 1) {
                $('#promo').html('PRODOTTO IN PROMOZIONE');
            }
            var prezzo = "";
            prezzo += prodotto.prezzo.toString();
            prezzo += " &euro;";
            // scrivo direttamente sull'html i componenti che possono essere scritti senza elaborazione
            $("#path").html(path);
            $("#nome-prod").html(prodotto.nome_prod);
            $("#titolo-nav").html(prodotto.nome_prod);
            $("#descrizione").html(prodotto.descrizione);
            $("#prezzaccio").html(prezzo);

            // inserisco le immagini nei tab se presenti
            var tab = '<li class="active col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im1" data-toggle="tab"><img src="images/prodotti/' + prodotto.img1 + '" alt="kik" class="img-responsive"/></a></li>'

            var image1 = '<img src="images/prodotti/' + prodotto.img1 + '" alt="lol" class="img-responsive"/>';
            var image2 = "";
            var image3 = "";
            $('#im1').html(image1);

            if (prodotto.img2 != null) {
                tab += '<li class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im2" data-toggle="tab"><img src="images/prodotti/' + prodotto.img2 + '" alt="" class="img-responsive"/></a></li>';
                image2 += '<img src="images/prodotti/' + prodotto.img2 + '" alt="" class="img-responsive"/>';
                $('#im2').html(image2);
            }
            if (prodotto.img3 != null) {
                tab += '<li class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im3" data-toggle="tab"><img src="images/prodotti/' + prodotto.img3 + '" alt="lol" class="img-responsive"/></a></li>';
                image3 += '<img src="images/prodotti/' + prodotto.img3 + '" alt="lol" class="img-responsive"/>';
                $('#im3').html(image3);
            }
            $('#tabz').html(tab);

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
                var single_spec = spec_tec[j].split('*');
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

            //installa il guided tour circolare sui prodotti della stessa categoria
            getProdCGT(id, prodotto.cat_id);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}


function parsec (stringa) {
    var res = stringa.split('+');
    return res;
}

function parsespec (stringa) {
    var res = stringa.split('+');
    return res;
}



// funzione per installare il circular guided tour trI PRODOTti della stessa categoria
function getProdCGT(prod_id, cat_id) {
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/getProdottiID.php", //Relative or absolute path to file.php file
        data: {categoria:cat_id},
        // prende tutti gli id e seleziona quelli opportuni da metter in next e previous
        success: function(response) {
            var next, previous;
            var ids=JSON.parse(response);
            // ricerca degli id voluti
            for(var i=0; i < ids.length; i++) {
                if(ids[i].prod_id == prod_id) {
                    if(i == 0) {
                        previous = ids[ids.length-1].prod_id;
                    } else {
                        previous = ids[i-1].prod_id;
                    }
                    if(i == ids.length-1) {
                        next = ids[0].prod_id;
                    } else {
                        next = ids[i+1].prod_id;
                    }
                }
            }
            $("#prev-prod").attr('href', 'prodotto.html?id='+previous);
            $("#next-prod").attr('href', 'prodotto.html?id='+next);
        },
        error: function(request,error) {
            console.log("Error");
        }
    });
}





/* funzione per caricare ii servizi compatibili da database */
function getSLProd(id){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/getSLProdotto.php", //Relative or absolute path to file.php file
        data: {prod_id:id},
        success: function(response) {
            // in prodotto dovrebbe esserci un elemento richiesto
            var servizi = JSON.parse(response);
            var res = "";

            for (var i = 0; i<servizi.length; i++) {
                res += '<div class="col-xs-6 col-sm-3 col-md-2">';
                res +=      '<div class="thumbnail">';
                res +=          '<a href="smartLife.html?id=' + servizi[i].smart_life_id + '">';
                res +=              '<img src="images/smart_life/logo/' + servizi[i].icon + '" alt="Image not available, sorry." class="img-responsive">';
                res +=          '</a>'
                res +=      '</div>';
                res += '</div>';
            }

            $("#sl-list").html(res);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}

/* funzione per caricare le assistenze compatibili da database */
function getAssProd(id){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/getAssistenzeProdotto.php", //Relative or absolute path to file.php file
        data: {prod_id:id},
        success: function(response) {
            // in prodotto dovrebbe esserci un elemento richiesto
            var assistenze = JSON.parse(response);
            var res = "";

            for (var i = 0; i<assistenze.length; i++) {
                res += '<li>';
                res +=      '<a href="assistenza.html?id=' + assistenze[i].ass_id + '">' + assistenze[i].nome +'</a>';
                res += '</li>';
            }

            $("#ass-list").html(res);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}
