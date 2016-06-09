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
        url: "http://tiim.altervista.org/php/getAssistenzaSingola.php", //Relative or absolute path to file.php file
        data: {ass_id:id},
        success: function(response) {
            // in prodotto dovrebbe esserci un elemento richiesto
            var res = JSON.parse(response);
            var assistenza = res[0];


            // path
            var path =  '<a  href="dinamicAssistenzaTutti.html">> Assistenza</a>';
            path +=     '<a  href="categorie.html?type=3"> > Categorie</a>';
            path +=     '<a  href="assistenzaPerCategoria.html?cat_id='+ assistenza.cat_id +'"> > ' + assistenza.nome_cat + '</a>';
            path +=     ' > '+ assistenza.nome_ass;


            // scrivo direttamente sull'html i componenti che possono essere scritti senza elaborazione
            $("#path").html(path);
            $("#nome_ass").html(assistenza.nome_ass);


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
		/*
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

            //installa il guided tour circolare sui prodotti della stessa categoria
            console.log("inizio a creare il cgt");
            getProdCGT(id, prodotto.cat_id);
            */
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
/*
function parsespec (stringa) {
    var res = stringa.split('+');
    console.log(res);
    return res;
}

*/
