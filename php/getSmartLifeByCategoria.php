<?php
// prende tutte le caratteristiche necessarie di tutti gli smart life di una categoria da database e li mette in un json
// elementi necessari: l'id, il nome dell'immagine anteprima, il nome dello smart life, il prezzo, la categoria di appartenenza e la descrizione in breve
$cat=$_POST["categoria"];
// prova a stabilire una connessione con il database
$mysqli = new mysqli("localhost", "root", "", "my_tiim");

if (mysqli_connect_errno()) {
    echo "Error to connect to DBMS: ".mysqli_connect_error();
    exit();
}
else {
    // connessione ok
    # extract results mysqli_result::fetch_array
    $query = " SELECT smart_life_id, Smart_Life.nome AS nome_smart_life, anteprima_big, descrizione_breve, prezzo, isPromo FROM `Smart_Life` WHERE categoria = $cat";
    // esecuzione della query
    $result = $mysqli->query($query);
    // se ci sono risultati: li mette in array
    if($result->num_rows >0)
    {
        $myArray = array();//create an array
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = $row;
        }
        // e quindi in json
        echo json_encode($myArray);
    }
    //free result
    $result->close();
    //close connection
    $mysqli->close();
}
?>
