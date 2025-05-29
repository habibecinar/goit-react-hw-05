//mevcut olmayan rota, kullanıcıyı ana sayfaya yönlendirir
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradığınız sayfa mevcut değil.</p>
      <Link to="/">Ana sayfaya dön</Link>
    </div>
  );
}

export default NotFoundPage;
