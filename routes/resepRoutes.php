<?php
require_once __DIR__ . '/../controllers/ResepController.php';

$router->get('/resep', 'ResepController@getAllResep');
$router->post('/resep', 'ResepController@createResep');
?>