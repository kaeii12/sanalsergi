# Ders 3 — Yönetim paneli kullanım kılavuzu

Yönetim adresi: `https://SITENIZ.vercel.app/admin.html`.

## 1. Okul adı ve giriş tabelası

1. Supabase'de tanımlı e-posta ve şifrenle giriş yap.
2. **Okul ve tabela ayarları** alanında **Okul adı** ve **Sergi başlığı** doldur.
3. İstersen PNG, JPEG veya WEBP logo yükle (en fazla 5 MB).
4. **Okul bilgilerini kaydet** düğmesine bas.
5. Ana sergi sayfasını yenile: tabela ve başlık yeni değerlerle görünür.

## 2. Bölüm ekleme

**Bölümler → + Bölüm ekle** formunda bölüm adını, fotoğraf kapasitesini (1–200) ve rengi seç. Kaydettiğinde bölüm sisteme eklenir. Örnek bölüm isimleri: `Bilişim Teknolojileri`, `Muhasebe ve Finansman`, `Grafik ve Fotoğraf` — bunlar *zorunlu* değildir; kendi okuluna uygun olanları girersin.

Bir okul 3, başka bir okul 15 bölüm tanımlayabilir; sabit bölüm listesi yoktur. Bölümlerin yanındaki **↑ / ↓** düğmeleri gösterim sırasını değiştirmek içindir. **Kaydet** ile adı, rengi ve kapasitesi düzenlenir. Silmek için bölümdeki bütün fotoğrafların önce kaldırılması gerekir.

## 3. Fotoğraf ekleme

1. İlgili bölüm altındaki boş yuvada **+ Fotoğraf ekle** düğmesine tıkla.
2. Bilgisayarından görsel seç.
3. Açılan istemlerde fotoğrafın başlık ve açıklamasını yaz.
4. Sistem görseli tarayıcıda işleyip JPEG formatında yükler.
5. Aynı konumdaki fotoğrafı **Değiştir** ile güncelleyebilir veya **Sil** ile kaldırabilirsin.

Fotoğraflar herkesin ziyaret ettiği galeride görüntülenir. Yalnızca yayın izni olan içerikleri yükle.

## 4. Galeride dolaşma

- **W / A / S / D** veya ok tuşları: hareket
- Fareyi sürükleme: bakış yönünü değiştirme
- Fotoğrafa tıklama: büyük görünüm
- Mobil cihazlarda ekrandaki yön düğmeleri desteklenir

Galerinin çalışması için WebGL desteği gerekir.

## 5. Sık yapılan düzenlemeler

- Bölüm kapasitesini düşürürken yeni limit dışında fotoğraf kalmamalı.
- Bölümü tamamen silmeden önce bütün fotoğraflar kaldırılmalı.
- Yapılan değişikliklerin 3D galeride görünmesi için sergi sayfası yenilenmeli.
- Yönetici oturumunu bitirmek için **Çıkış** düğmesine bas.
