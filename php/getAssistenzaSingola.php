<?php
// ritrova le categorie dal database e risponde con un JSON object
$ass_id=$_POST["ass_id"];

// prova a stabilire una connessione con il database
$mysqli = new mysqli("localhost", "root", "", "my_tiim");

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else
}

// Voglio estrarre da database tutti i dati del prodotto,
// più i servizi per il prodotto
// più gli id del prodotto precedente e del prossimo
else {
    # extract results mysqli_result::fetch_array
    $query = "SELECT ass_id, Assistenza.nome AS nome_ass, Assistenza.descrizione, faq, promo, cat_id, Categorie.nome AS nome_cat
    FROM Assistenza join Categorie on id_categoria_ass = cat_id WHERE ass_id = $ass_id";
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
