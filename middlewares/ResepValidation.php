<?php
class ResepValidation {
    public function validate($data) {
        $errors = [];
        
        if (empty($data['nama'])) {
            $errors['nama'] = 'Nama resep harus diisi';
        }
        
        if (empty($data['bahan']) || count($data['bahan']) < 1) {
            $errors['bahan'] = 'Minimal harus ada 1 bahan';
        }
        
        if (empty($data['langkah']) || count($data['langkah']) < 1) {
            $errors['langkah'] = 'Minimal harus ada 1 langkah';
        }
        
        if (empty($data['kategori'])) {
            $errors['kategori'] = 'Kategori harus dipilih';
        }
        
        if (empty($data['kesulitan'])) {
            $errors['kesulitan'] = 'Tingkat kesulitan harus dipilih';
        }
        
        if (count($errors) > 0) {
            return [
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $errors
            ];
        }
        
        return ['success' => true];
    }
}
?>