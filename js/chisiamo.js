$(document).ready(ready);
function ready(){

    //get the parameter from the url
    var page = getLocationValue("entry");
    console.log(page);

    // in base all'id del parametro rende attiva e visibile la parte di pagina selezionata:


    switch (parseInt(page)) {
        case 1:
            console.log("num 1");
            $("#btn0").attr("class", "active");
            $("#sec0").attr("style", "display: block");
            showSection(0);
            break;
        case 2:

            console.log("num 2");
            $("#btn1").attr("class", "active");
            $("#sec1").attr("style", "display: block");
            showSection(1);
            break;
        case 3:

            console.log("num 3");
            $("#btn2").attr("class", "active");
            $("#sec2").attr("style", "display: block");
            showSection(2);
            break;
        default:
            console.log("What's this? Don't play with the url bud");
            console.log("num 1");
            $("#btn0").attr("class", "active");
            $("#sec0").attr("style", "display: block");
            showSection(0);
    }

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
