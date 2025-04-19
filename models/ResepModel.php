<?php
require_once __DIR__ . '/../config/db.php';

class ResepModel {
    private $db;

    public function __construct() {
        global $conn;
        $this->db = $conn;
    }

    public function getAllResep($page = 1, $limit = 10, $kategori = null, $kesulitan = null) {
        $offset = ($page - 1) * $limit;
        $query = "SELECT * FROM resep WHERE 1=1";
        $params = [];
        $types = '';

        if ($kategori) {
            $query .= " AND kategori = ?";
            $params[] = $kategori;
            $types .= 's';
        }

        if ($kesulitan) {
            $query .= " AND kesulitan = ?";
            $params[] = $kesulitan;
            $types .= 's';
        }

        $query .= " LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        $types .= 'ii';

        $stmt = $this->db->prepare($query);
        
        if ($types) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();
        
        $resep = [];
        while ($row = $result->fetch_assoc()) {
            $resep[] = $row;
        }

        // Get total count for pagination
        $countQuery = "SELECT COUNT(*) as total FROM resep WHERE 1=1";
        if ($kategori) {
            $countQuery .= " AND kategori = '$kategori'";
        }
        if ($kesulitan) {
            $countQuery .= " AND kesulitan = '$kesulitan'";
        }
        $totalResult = $this->db->query($countQuery);
        $total = $totalResult->fetch_assoc()['total'];

        return [
            'data' => $resep,
            'pagination' => [
                'page' => (int)$page,
                'limit' => (int)$limit,
                'total' => (int)$total,
                'totalPages' => ceil($total / $limit)
            ]
        ];
    }

    public function addResep($data) {
        $stmt = $this->db->prepare("INSERT INTO resep (nama, kategori, kesulitan, bahan, langkah) VALUES (?, ?, ?, ?, ?)");
        
        $bahan = json_encode($data['bahan']);
        $langkah = json_encode($data['langkah']);
        
        $stmt->bind_param("sssss", 
            $data['nama'],
            $data['kategori'],
            $data['kesulitan'],
            $bahan,
            $langkah
        );
        
        return $stmt->execute();
    }
}
?>