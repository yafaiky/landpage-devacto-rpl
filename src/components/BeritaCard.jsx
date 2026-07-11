import { memo } from 'react';

const BeritaCard = memo(({ item, index }) => {
    return (
        <article className={`berita__card berita__card--${index}`} style={{ '--i': index }}>
            <div className="berita__card-img-wrap">
                <img src={item.image} alt={item.title} className="berita__card-img" loading="lazy" decoding="async" />
                <span className="berita__card-category">{item.category}</span>
            </div>
            <div className="berita__card-body">
                <div className="berita__card-meta">
                    <time className="berita__card-date">{item.date}</time>
                    <span className="berita__card-author">{item.author || "Devacctto Admin"}</span>
                </div>
                <h3 className="berita__card-title">{item.title}</h3>
                <p className="berita__card-excerpt">{item.excerpt}</p>
                <button className="berita__card-btn">
                    <span>Baca Selengkapnya</span>
                    <span className="berita__card-btn-arrow">→</span>
                </button>
            </div>
        </article>
    );
});

export default BeritaCard;