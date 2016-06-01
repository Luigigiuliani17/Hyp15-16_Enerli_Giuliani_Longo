$(document).ready(ready);
function ready(){

    //var category = ["Combat", "Dance", "Mind-And-Body", "Water-Based", "Workout"];
    getFromDB(1);

    //alert("var a = "+a);
    $(".navbar-inverse").css('background', 'url(img/all-categories-header.jpg)');
    $(".navbar-inverse").css('-webkit-background-size','cover');
    $(".navbar-inverse").css('-moz-background-size','cover');
    $(".navbar-inverse").css('-o-background-size','cover');
    $(".navbar-inverse").css('background-size','cover');



}

function getFromDB(id){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://tiim.altervista.org/php/prova.php", //Relative or absolute path to file.php file
        data: {},
        success: function(response) {
            console.log(JSON.parse(response));
            var obj=JSON.parse(response);
            var result = "";

            for(var i = 0; i < obj.length; i++){
                result = result + " <div > <h3> id:" + obj.id  +"</h3>  lol:" + obj.lol + "lol2:" + obj.lol2 + "</div>";

            }

            $("#thumblist").html(result);
        },
        error: function(request,error)
        {
            console.log("Error " + error);
        }
    });
}

/*
function getDescription() {

    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigym.altervista.org/php/getIntro.php", //Relative or absolute path to file.php file
        data: {page: "allcoursecategories"},
        success: function(response) {
            console.log(JSON.parse(response));
            var intro=JSON.parse(response);
            var result = intro[0].description;
            $("#allcoursecategoriesdescription").html(result);
            },
        error: function(request,error) {
            console.log("Error");
        }
    });

}*/
