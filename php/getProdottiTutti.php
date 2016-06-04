<?php
// prende tutte le caratteristiche necessarie di tutti u prodotti da database e li mette in un json
// Ci serve l'id, il nome dell'immagine anteprima, il nome del prodotto, il prezzo, la categoria di appartenenza
$mysqli = new mysqli("localhost", "root", "", "my_bigym");
// prova a stabilire una connessione
if (mysqli_connect_errno()) {
    echo "Errore di connessione al DataBase: ".mysqli_connect_error(); //notifica error
    exit();
}
else {
    // connessione ok
    # extract results mysqli_result::fetch_array
    $query = " SELECT prod_id, nome, thumbnail, prezzo, categoria FROM prodotti";
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
