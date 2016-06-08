<?php
// prende tutte le caratteristiche necessarie di tutti gli smart life da database e li mette in un json
// elementi necessari: l'id, il nome dell'immagine anteprima, il nome dello smart life, il prezzo, la categoria di appartenenza e la descrizione in breve
$mysqli = new mysqli("localhost", "root", "", "my_tiim");
// prova a stabilire una connessione
if (mysqli_connect_errno()) {
    echo "Errore di connessione al DataBase: ".mysqli_connect_error(); //notifica error
    exit();
}
else {
    // connessione ok
    # extract results mysqli_result::fetch_array
    // seleziono tutti i prodotti aggiungendo il nome della categoria e l'icona
    $query = " SELECT smart_life_id, Smart_Life.nome AS nome_smart_life, thumbnail, categoria, descrizione_breve, Categorie.nome AS nome_cat, Categorie.descrizione as descrizione FROM `Smart_Life` JOIN `Categorie` ON categoria = cat_id";
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
