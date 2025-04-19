<?php
class Resep {
    private $db;

    public function __construct() {
        $this->db = new mysqli("localhost", "root", "", "resep_db"); // Ubah dengan kredensial database kamu
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }

    public function getAllResep() {
        $query = "SELECT * FROM resep";
        $result = $this->db->query($query);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function addResep($data) {
        $nama = $this->db->real_escape_string($data['nama']);
        $bahan = $this->db->real_escape_string($data['bahan']);
        $langkah = $this->db->real_escape_string($data['langkah']);
        
        $query = "INSERT INTO resep (nama, bahan, langkah) VALUES ('$nama', '$bahan', '$langkah')";
        return $this->db->query($query);
    }
}
