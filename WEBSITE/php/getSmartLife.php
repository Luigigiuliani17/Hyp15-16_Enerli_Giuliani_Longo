<?php
// ritrova le categorie dal database e risponde con un JSON object
$smart_life_id=$_POST["smart_life_id"];

// prova a stabilire una connessione con il database
$mysqli = new mysqli("localhost", "root", "", "my_tiim");

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else
}

// Voglio estrarre da database tutti i dati del singolo smart life,
// più i prodotti che possono essere abbinati a questo servizio
// più gli id del servizio precedente e del prossimo
else {
    # extract results mysqli_result::fetch_array

    $query = " SELECT smart_life_id, Smart_Life.nome AS nome_smart_life, prezzo, img1, img2, img3, isPromo, descrizione_completa, categoria, regole_attivazione, caratteristiche, Categorie.nome AS nome_cat FROM Smart_Life join Categorie on categoria = cat_id WHERE smart_life_id = $smart_life_id";
    //query execution
    $result = $mysqli->query($query);
    //if there are data available
    if($result->num_rows >0)
    {
        $myArray = array();//create an array
        // metto i risultati della query in un array
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = $row;
        }
        // Scrivo un json con l'array
        echo json_encode($myArray);
    }
    //free result
    $result->close();
    //close connection
    $mysqli->close();
}
?>
