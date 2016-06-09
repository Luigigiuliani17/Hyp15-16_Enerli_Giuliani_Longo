<?php
// prende tutti gli oggetti in promozione o in evidenza
// tipo 1 prodotti -- tipo 2 smartlife -- tipo 3 assistenze
$type=$_POST["tipo_oggetti"];
// prova a stabilire una connessione con il database
$mysqli = new mysqli("localhost", "root", "", "my_tiim");

if (mysqli_connect_errno()) {
    echo "Error to connect to DBMS: ".mysqli_connect_error();
    exit();
}
else {
    // connessione ok
    # extract results mysqli_result::fetch_array
    switch ($type) {
        case 1:
            $query = " SELECT * FROM `Prodotti` WHERE promo = 1";
            break;
        case 2:
            $query = " SELECT * FROM `Smart_Life` WHERE isPromo = 1";
            break;
        case 3:
            $query = " SELECT * FROM `Assistenza` WHERE promo = 1";
            break;
        default:
            echo "not able to get this type of promo";
    }

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
