<?php
// devo prendere gli id dei prodotti di una certa categoria data
$cat=$_POST["categoria"];

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
    $query = " SELECT ass_id FROM Assistenza WHERE id_categoria_ass = $cat order by ass_id ";
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
