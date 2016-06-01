$(document).ready(ready);
function ready(){


    //    get the parameter from the url
    //  var course = getLocationValue("id");

    getFromDB(1);


    //modifica il titolo della pagine
    //var orario = "200/110/313";
    //getOrario(orario);



}


function getFromDB(id){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/assistenzaphp.php", //Relative or absolute path to file.php file
        data: {},
        success: function(response) {
            console.log(JSON.parse(response));
            var assi=JSON.parse(response);
            console.log(course);
            document.title = "Assistenza - " + assi[0].Nome;
            $("#AssiBoh").html(assi[0].Nome);
            $("#Category").html(assi[0].Descrizione);
            $("#Description").html(assi[0].DispositiviComp);
            $("#Description").html(assi[0].Boh);

            //console.log(course[0].schedule);
            //var ret = getTimeTable(course[0].schedule);
            $("#thumblist").html(ret);

            //modifica l'immagine nella seconda navbar
            $(".navbar-inverse").css('background', 'url(img/courses/' + course[0].image_header + ')');
            $(".navbar-inverse").css('-webkit-background-size','cover');
            $(".navbar-inverse").css('-moz-background-size','cover');
            $(".navbar-inverse").css('-o-background-size','cover');
            $(".navbar-inverse").css('background-size','cover');
        },
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}

}
