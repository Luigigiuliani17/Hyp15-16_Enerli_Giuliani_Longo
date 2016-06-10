<?php
// voglio prendere il nome e l'id delle assistenze compatibili con il prodotto con l'id passato
$id=$_POST["prod_id"];
// prova a stabilire una connessione con il database
$mysqli = new mysqli("localhost", "root", "", "my_tiim");

if (mysqli_connect_errno()) {
    echo "Error to connect to DBMS: ".mysqli_connect_error();
    exit();
}
else {
    // connessione ok
    # extract results mysqli_result::fetch_array
    $query = " SELECT Assistenza.ass_id, Assistenza.nome FROM `Prodotti_Assistenze` JOIN `Assistenza` ON Assistenza.ass_id = Prodotti_Assistenze.ass_id WHERE Prodotti_Assistenze.prod_id = $id";
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
