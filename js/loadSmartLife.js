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
        url: "http://tiim.altervista.org/php/getSmartLife.php", //Relative or absolute path to file.php file
        data: {smart_life_id:id},
        success: function(response) {
            // in smart life dovrebbe esserci un elemento richiesto
            var res = JSON.parse(response);
            var smartLife = res[0];
            // path
            var path =  '<a  href="smartLifeTutti.html">> Smart Life</a>';
            path +=     '<a  href="categorie.html?type=1"> > Categorie</a>';
            path +=     '<a  href="prodottiPerCategoria.html?cat_id='+ smartLife.cat_id +'"> > ' + smartLife.nome_cat + '</a>';
            path +=     ' > '+ smartLife.nome_prod;

            var prezzo = "";
            prezzo += smartLife.prezzo.toString();
            prezzo += " &euro;";
            // scrivo direttamente sull'html i componenti che possono essere scritti senza elaborazione
            $("#path").html(path);
            $("#nome-smart-life").html(smartLife.nome_prod);
            $("#descrizione").html(smartLife.descrizione_completa);
            $("#prezzaccio").html(prezzo);

            // inserisco le immagini nei tab se presenti
            var tab = '<li class="active col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im1" data-toggle="tab"><img src="images/smart_life/' + smartLife.img1 + '" alt="kik" class="img-responsive"/></a></li>'

            var image1 = '<img src="images/prodotti/' + smartLife.img1 + '" alt="lol" class="img-responsive"/>';
            var image2 = "";
            var image3 = "";
            $('#im1').html(image1);

            if (smartLife.img2 != null) {
                tab += '<li class="active col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im1" data-toggle="tab"><img src="images/smart_life/' + smartLife.img2 + '" alt="" class="img-responsive"/></a></li>';
                image2 += '<img src="images/prodotti/' + smartLife.img2 + '" alt="" class="img-responsive"/>';
                $('#im2').html(image2);
            }
            if (smartLife.img3 != null) {
                tab += '<li class="active col-xs-4 col-sm-4 col-md-4 col-lg-4"><a href="#im1" data-toggle="tab"><img src="images/smart_life/' + smartLife.img3 + '" alt="lol" class="img-responsive"/></a></li>';
                image3 += '<img src="images/prodotti/' + smartLife.img3 + '" alt="lol" class="img-responsive"/>';
                $('#im3').html(image3);
            }
            $('#tabz').html(tab);

            // gestione delle caratteristiche nella presentazione
            var caratt_str = "";
            //parso le caratteristiche per creare diversi elementi di una lista
            var caratt = parsec(smartLife.caratteristiche);
            for (var i = 0; i < caratt.length; i++) {
                caratt_str += '<li>' + caratt[i] +'</li>';
            }



            //installa il guided tour circolare sugli smart life della stessa categoria
            console.log("inizio a creare il cgt");
            getSmartCGT(id, smartLife.categoria);
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



// funzione per installare il circular guided tour tra gli smart life della stessa categoria
function getSmartCGT(prod_id, cat_id) {
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/getSmartLifeID.php", //Relative or absolute path to file.php file
        data: {categoria:categoria},
        // prende tutti gli id e seleziona quelli opportuni da metter in next e previous
        success: function(response) {
            var next, previous;
            console.log(JSON.parse(response));
            var ids=JSON.parse(response);
            // ricerca degli id voluti
            for(var i=0; i < ids.length; i++) {
                if(ids[i].smart_life_id == smart_life_id) {
                    if(i == 0) {
                        previous = ids[ids.length-1].smart_life_id;
                    } else {
                        previous = ids[i-1].smart_life_id;
                    }
                    if(i == ids.length-1) {
                        next = ids[0].smart_life_id;
                    } else {
                        next = ids[i+1].smart_life_id;
                    }
                }
            }
            $("#prev-smart-life").attr('href', 'smartLife.html?id='+previous);
            $("#next-smart-life").attr('href', 'smartLife.html?id='+next);
        },
        error: function(request,error) {
            console.log("Error");
        }
    });
}
