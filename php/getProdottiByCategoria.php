<?php
// prende tutte le caratteristiche necessarie di tutti i prodotti di una categoria da database e li mette in un json
// Ci serve l'id, il nome dell'immagine anteprima, il nome del prodotto, il prezzo,
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
    $query = " SELECT prod_id, prodotti.nome AS nome_prod, thumbnail, prezzo, categoria.nome AS nome_cat, icon AS icon_cat, FROM prodotti JOIN categorie ON categoria = cat_id WHERE categoria = $cat";
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
