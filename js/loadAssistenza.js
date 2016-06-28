$(document).ready(ready);
function ready(){

    //get the parameter from the url
    var id = getLocationValue("id");
    console.log(id);

    // ora carica da database il prodotto con quell'id
    getFromDB(id);

    // carica da DB i prodotti compatibili con le assistenze
    getProdAss(id);


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
        url: "http://tiim.altervista.org/php/getAssistenza.php", //Relative or absolute path to file.php file
        data: {ass_id:id},
        success: function(response) {
            // in prodotto dovrebbe esserci un elemento richiesto
            var res = JSON.parse(response);
            var assistenza = res[0];
            console.log(res[0]);


            // path
            var path =  '<a  href="assistenzaTutti.html">> Assistenza</a>';
            path +=     '<a  href="categorie.html?type=3"> > Categorie</a>';
            path +=     '<a  href="assistenzaPerCategoria.html?cat_id='+ assistenza.cat_id +'"> > ' + assistenza.nome_cat + '</a>';
            path +=     ' > '+ assistenza.nome_ass;


            // scrivo direttamente sull'html i componenti che possono essere scritti senza elaborazione
            $('#title').html('TIIM - '+assistenza.nome_ass);
            $('#path').html(path);
            $("#nome_ass").html(assistenza.nome_ass);


            //creazione immagine della promo
            if(assistenza.promo[0]==1){
                var img = '<span class = "over-img" >';
                img += '<img src="images/offerte/evidenza.png" alt="Image not available, sorry." class="img-responsive"/>';
                img += '</span>';
           		console.log(img);
              	$("#img_promo").html(img);
           }
            //scrivo img_promo su html


            // gestione della descrizione
            var descr_str = "";
            //parso le caratteristiche per creare diversi elementi di una lista
            var caratt = parsec(assistenza.descrizione);
            for (var i = 0; i < caratt.length; i++) {
                descr_str += '<li>' + caratt[i] +'</li>';
            }

            $("#descrizione").html(descr_str);


            // gestione delle FAQ
            var faq_str = "";
            //parso le caratteristiche per creare diversi elementi di una lista
            var caratt = parsec(assistenza.faq);
            for (var i = 0; i < caratt.length; i++) {
                faq_str += '<li>' + caratt[i] +'</li>';
            }

            $("#faq").html(faq_str);


            //installa il guided tour circolare sui prodotti della stessa categoria
            console.log("inizio a creare il cgt");
            getAssCGT(id, assistenza.cat_id);
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

// funzione per installare il circular guided tour tra le assistenze della stessa categoria
function getAssCGT(ass_id, cat_id) {
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/getAssistenzaID.php", //Relative or absolute path to file.php file
        data: {categoria:cat_id},
        // prende tutti gli id e seleziona quelli opportuni da metter in next e previous
        success: function(response) {
            var next, previous;
            var ids=JSON.parse(response);
            // ricerca degli id voluti
            for(var i=0; i < ids.length; i++) {
                if(ids[i].ass_id == ass_id) {
                    if(i == 0) {
                        previous = ids[ids.length-1].ass_id;
                    } else {
                        previous = ids[i-1].ass_id;
                    }
                    if(i == ids.length-1) {
                        next = ids[0].ass_id;
                    } else {
                        next = ids[i+1].ass_id;
                    }
                }
            }
            $("#prev-prod").attr('href', 'assistenza.html?id='+previous);
            $("#next-prod").attr('href', 'assistenza.html?id='+next);
        },
        error: function(request,error) {
            console.log("Error");
        }
    });
}

/* funzione per caricare i prodotti compatibili con l'assistenza dal db */
function getProdAss(id){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/getProdottoAss.php", //Relative or absolute path to file.php file
        data: {ass_id:id},
        success: function(response) {
            // in prodotto dovrebbe esserci un elemento richiesto
            var prodotti = JSON.parse(response);
            var res = "";

            for (var i = 0; i<prodotti.length; i++) {
                res += '<div class="col-xs-6 col-sm-3 col-md-2">';
                res +=      '<div class="thumbnail">';
                res +=          '<a href="prodotto.html?id=' + prodotti[i].prod_id + '">';
                res +=              '<img src="images/prodotti/anteprime/ante_' + prodotti[i].thumbnail + '" alt="Image not available, sorry." class="img-responsive">';
                res +=          '</a>'
                res +=      '</div>';
                res += '</div>';
            }

            $("#prod-list").html(res);
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}


