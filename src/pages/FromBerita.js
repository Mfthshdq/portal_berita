import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormBerita() {
  const { id } = useParams(); // Menangkap ID dari URL (jika ada)
  const navigate = useNavigate(); // Untuk pindah halaman otomatis setelah sukses

  // 1. Siapkan Wadah untuk menampung inputan Form
  const [title, setTitle] = useState('');
  const [contant, setContant] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('1'); // Default Kategori Teknologi (ID: 1)

  // STATUS: Apakah ini mode Edit atau Tambah Baru?
  const isEditMode = Boolean(id);

  // 2. Jika dalam Mode Edit, ambil data lama dari database
  useEffect(() => {
    if (isEditMode) {
      axios.get('http://localhost:5000/api/articles')
        .then((response) => {
          // Cari berita yang ID-nya cocok dengan ID di URL
          const beritaLama = response.data.data.find(item => item.id === parseInt(id));
          if (beritaLama) {
            setTitle(beritaLama.title);
            setContant(beritaLama.contant);
            setImage(beritaLama.image);
            setCategoryId(beritaLama.category_id.toString());
          }
        })
        .catch((error) => console.error("Gagal mengambil data lama:", error));
    }
  }, [id, isEditMode]);

  // 3. Fungsi saat Tombol Simpan diklik
  const handleSimpan = (e) => {
    e.preventDefault(); // Mencegah halaman refresh otomatis

    // Bungkus data yang mau dikirim
    const dataBerita = {
      title,
      contant,
      image: image || 'default.jpg',
      category_id: parseInt(categoryId),
      user_id: 1 // Sementara kita set Admin (ID: 1) karena belum ada fitur login
    };

    if (isEditMode) {
      // JIKA MODE EDIT -> Kirim ke API PUT
      axios.put(`http://localhost:5000/api/articles/${id}`, dataBerita)
        .then((response) => {
          alert(response.data.message);
          navigate('/dashboard'); // Tendang kembali ke Dashboard Admin
        })
        .catch((error) => alert("Gagal mengupdate berita"));
    } else {
      // JIKA MODE TAMBAH -> Kirim ke API POST
      axios.post('http://localhost:5000/api/articles', dataBerita)
        .then((response) => {
          alert(response.data.message);
          navigate('/dashboard'); // Tendang kembali ke Dashboard Admin
        })
        .catch((error) => alert("Gagal menambah berita"));
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid crimson', paddingBottom: '10px', marginBottom: '20px' }}>
        {isEditMode ? '📝 Edit Berita' : '✨ Tambah Berita Baru'}
      </h2>

      <form onSubmit={handleSimpan}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Judul Berita</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Masukkan judul..." required />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Kategori</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="1">Teknologi</option>
            <option value="2">Pendidikan</option>
            <option value="3">Olahraga</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nama File Gambar</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="contoh: berita1.jpg" />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Isi Berita</label>
          <textarea value={contant} onChange={(e) => setContant(e.target.value)} style={{ width: '100%', height: '15px', minHeight: '150px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Tulis konten berita di sini..." required></textarea>
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: 'crimson', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          {isEditMode ? 'Simpan Perubahan' : 'Terbitkan Berita'}
        </button>
      </form>
    </div>
  );
}

export default FormBerita;
