<?php
require_once __DIR__ . '/../models/ResepModel.php';
require_once __DIR__ . '/../middlewares/ResepValidation.php';

class ResepController {
    private $model;

    public function __construct() {
        $this->model = new ResepModel();
    }

    public function getAllResep() {
        $page = $_GET['page'] ?? 1;
        $limit = $_GET['limit'] ?? 10;
        $kategori = $_GET['kategori'] ?? null;
        $kesulitan = $_GET['kesulitan'] ?? null;

        $result = $this->model->getAllResep($page, $limit, $kategori, $kesulitan);
        echo json_encode($result);
    }

    public function createResep() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $validator = new ResepValidation();
        $validation = $validator->validate($data);
        
        if (!$validation['success']) {
            http_response_code(400);
            echo json_encode($validation);
            return;
        }

        $result = $this->model->addResep($data);
        
        if ($result) {
            echo json_encode([
                'success' => true,
                'message' => 'Resep berhasil ditambahkan'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Gagal menambahkan resep'
            ]);
        }
    }
}
?>
