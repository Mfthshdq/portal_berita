import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [articles, setArticles] = useState([]);

    // 1. Fungsi untuk menyedot data (Sama seperti di Home)
    const fetchArticles = () => {
        axios.get('http://localhost:5000/api/articles')
            .then((response) => {
                setArticles(response.data.data);
            })
            .catch((error) => console.error("Error:", error));
    };

    // 2. Tarik pelatuk saat halaman dibuka
    useEffect(() => {
        fetchArticles();
    }, []);

    // 3. FUNGSI HAPUS (Kirim perintah DELETE ke Backend)
    const hapusBerita = (id) => {
        // Beri peringatan dulu agar tidak salah pencet
        const konfirmasi = window.confirm("Yakin ingin menghapus berita ini?");

        if (konfirmasi) {
            axios.delete(`http://localhost:5000/api/articles/${id}`)
                .then((response) => {
                    alert(response.data.message);
                    fetchArticles(); // Refresh tabel otomatis setelah berhasil dihapus
                })
                .catch((error) => alert("Gagal menghapus!"));
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: '#333' }}>Dashboard Kelola Berita</h1>
                <Link to="/form" style={{ padding: '10px 15px', background: 'crimson', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                    + Tambah Berita Baru
                </Link>
            </div>

            {/* TABEL DATA */}
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <thead>
                    <tr style={{ background: '#f8f8f8', borderBottom: '2px solid crimson' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>No</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Judul Berita</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Kategori</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((berita, index) => (
                        <tr key={berita.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '12px' }}>{index + 1}</td>
                            <td style={{ padding: '12px', fontWeight: 'bold' }}>{berita.title}</td>
                            <td style={{ padding: '12px' }}>{berita.category_name}</td>
                            <td style={{ padding: '12px' }}>
                                {/* Tombol Edit (Akan kita bahas di tahap selanjutnya) */}
                                <Link to={`/form/${berita.id}`} style={{ marginRight: '10px', color: 'blue', textDecoration: 'none' }}>Edit</Link>

                                {/* Tombol Hapus */}
                                <button
                                    onClick={() => hapusBerita(berita.id)}
                                    style={{ background: 'transparent', color: 'crimson', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;