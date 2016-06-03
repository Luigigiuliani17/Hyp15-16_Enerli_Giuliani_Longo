$(document).ready(ready);
function ready(){

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
        url: "http://tiim.altervista.org/php/getAssistance.php", //Relative or absolute path to file.php file
        data: {},
        success: function(response) {
            console.log(JSON.parse(response));
            var obj=JSON.parse(response);
            var result = "";

            for(var i = 0; i < obj.length; i++){
                result = result + " <div > <h3> id:" + obj[i].id +"</h3>  lol:" + obj[i].Descrizione+ "</div>";

            }

            $("#thumblist").html(result);
        },
        error: function(request,error)
        {
            console.log("Error " + error);
        }
    });
}
