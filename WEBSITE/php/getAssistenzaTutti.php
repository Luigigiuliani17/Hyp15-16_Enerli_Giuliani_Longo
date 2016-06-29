<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_tiim";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query =  "SELECT ass_id, Assistenza.nome AS nome_ass, promo, cat_id, Categorie.nome AS nome_cat, icon AS icon_cat
    FROM Assistenza JOIN Categorie ON id_categoria_ass = cat_id";
$result = $conn->query($query);

if($result->num_rows >0)
    {
        $myArray = array();//create an array
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = $row;
        }
        echo json_encode($myArray);
    }

$result->close();
$conn->close();
?>
