<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once __DIR__ . '/config/Autoload.php';
require_once __DIR__ . '/routes/resepRoutes.php';

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Simple router
switch ($requestMethod) {
    case 'GET':
        if ($requestUri === '/resep') {
            $controller = new ResepController();
            $controller->getAllResep();
        }
        break;
    case 'POST':
        if ($requestUri === '/resep') {
            $controller = new ResepController();
            $controller->createResep();
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>