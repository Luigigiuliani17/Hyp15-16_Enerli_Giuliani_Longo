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
            console.log(JSON.parse(response));
            // in categorie dovrebbe esserci un vettore di elementi categoria
            var categorie=JSON.parse(response);

        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}
