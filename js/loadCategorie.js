$(document).ready(ready);
function ready(){

    /* Voglio caricare da database le categorie di un certo tipo a seconda di ciò che viene richiesto: categorie sono parametrizza su prodotti, smartlife, assistenza */

    /* devo caricare le immagini delle categorie, i nomi, la descrizione generale del tipo delle categorie */
    getFromDB(1);

    //alert("var a = "+a);
    $(".navbar-inverse").css('background', 'url(img/all-categories-header.jpg)');
    $(".navbar-inverse").css('-webkit-background-size','cover');
    $(".navbar-inverse").css('-moz-background-size','cover');
    $(".navbar-inverse").css('-o-background-size','cover');
    $(".navbar-inverse").css('background-size','cover');

    getDescription();

}

function getFromDB(id){
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigym.altervista.org/php/getAllCategories.php", //Relative or absolute path to file.php file
        data: {course:id},
        success: function(response) {
            console.log(JSON.parse(response));
            var categories=JSON.parse(response);
            var result = "<div class='row'>";
            var j = 0;
            for(var i = 0; i < categories.length; i++){
                if(j%3 == 0){
                    result = result + "</div> <div class='row'>";
                }
                result = result + " <div class='col-xs-12 col-sm-6 col-md-4'> <div class='thumbnail'> <img src='img/categories/"+ categories[i].thumbnail + "' alt='Image not available, sorry.' class='img-responsive'><div class='caption'> <h3>" + categories[i].name + "</h3><a href='category.html?id=" + categories[i].id + "&cgt=1'>See more details</a> <br> <a href='allcoursesofcategory.html?id=" + categories[i].id + "'>All courses of this category</a></div></div></div>";
                j++;
            }
            result = result + "</div></div>";
            $("#thumblist").html(result);
        },
        error: function(request,error)
        {
            console.log("Error " + error);
        }
    });
}


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
}
