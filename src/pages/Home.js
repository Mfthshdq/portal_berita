import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/articles')
            .then((response) => {
                // KITA INTIP DATANYA DI SINI!
                console.log("Data dari backend:", response.data);

                // Ganti sementara dengan response.data (biasanya backend default mengirikan array langsung ke sini)
                // Nanti sesuaikan dengan hasil console.log di browser
                setArticles(response.data.data);
            })
            .catch((error) => {
                console.error("Gagal menyedot data:", error);
            });
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ borderBottom: '2px solid red', paddingBottom: '10px', textAlign: 'center' }}>Berita Terbaru</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>

                {/* Gunakan articles?.map (tambah tanda tanya) */}
                {articles?.map((berita) => (
                    <div key={berita.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#fff' }}>

                        <small style={{ color: 'crimson', fontWeight: 'bold' }}>
                            {berita.category_name}
                        </small>

                        <h3 style={{ marginTop: '10px' }}>{berita.title}</h3>

                        {/* Gunakan ?.substring juga untuk jaga-jaga kalau content-nya kosong/null */}
                        <p style={{ color: '#555' }}>{berita.contant?.substring(0, 200)}...</p>

                        <p style={{ fontSize: '12px', color: '#888' }}>Oleh: {berita.author_name}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Home;