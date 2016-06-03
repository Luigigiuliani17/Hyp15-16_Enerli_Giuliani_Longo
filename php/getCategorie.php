<?php
// ritrova le categorie dal database e risponde con un JSON object
$type=$_POST["categorie_tipo"];

switch($type){
    case "prodotti":
        $ordering = 'name';
        break;
    case "smartlife":
        $ordering = 'difficulty';
        break;
    case "assistenza":
        $ordering = 'difficulty';
        break;
}
// prova a stabilire una connessione con il database
$mysqli = new mysqli("localhost", "root", "", "my_tiim");

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else
}
else {
    # extract results mysqli_result::fetch_array
    $query = " SELECT * FROM categorie WHERE categorie.tipo = $type ";
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
