# Ders 4 — Web uygulaması nasıl çalışıyor?

## 1. Ön yüz (frontend) nedir?

Ziyaretçi `index.html` sayfasını açınca tarayıcı `gallery.js` dosyasını çalıştırır. Burada **Three.js** ile sanal galeri çizilir. Görünüm için CSS ve tarayıcının WebGL desteği kullanılır. Yönetim ekranında ise `admin.html` ve `admin.js` çalışır.

## 2. Veritabanı neden gerekiyor?

Her okulun bölüm sayısı farklıdır. Bu nedenle bölümleri doğrudan HTML içine yazmak yerine veritabanındaki `categories` tablosundan okuruz. Örneğin tabloya yeni bölüm eklendiğinde, kod bir sonraki sayfa açılışında bu bölümü de alır ve koridoru **bölüm kapasitesine göre** uzatır.

`site_settings` okul tabelasını, `categories` bölümleri, `photos` ise sergiye yerleştirilecek görsellerin bilgilerini saklar. Resim dosyalarının kendisi `photos` Storage bucket'ındadır.

## 3. Supabase ile istemci nasıl haberleşir?

`config.js` içinde **public** Supabase adresi ve publishable/anon anahtarı yer alır. `api.js` bu bilgilerle Supabase istemcisini kurar. `gallery.js` ve `admin.js` ortak veri erişim fonksiyonlarından yararlanır.

Basitleştirilmiş veri akışı:

```text
Ziyaretçi → index.html → gallery.js → api.js → Supabase verileri
                                                 ├─ site_settings
                                                 ├─ categories
                                                 └─ photos → Storage görselleri

Yönetici → admin.html → Supabase Auth → admin.js → Supabase (RLS kontrolü)
```

## 4. Authentication ve Authorization farkı

- **Authentication (kimlik doğrulama):** E-posta ve şifreyle kullanıcının kim olduğunu belirler.
- **Authorization (yetkilendirme):** Kullanıcının hangi verileri değiştirebileceğini belirler.

Bu projede Supabase Auth kimliği doğrular, **Row Level Security (RLS)** politikaları anonim ziyaretçilere okuma, oturum açmış kullanıcılara ise yönetim izni verir. SQL'in mevcut sürümü bütün `authenticated` hesapları yönetici kabul eder; açık kayıt kapatılmalıdır.

## 5. Dinamik 3D koridor fikri

`gallery.js`, her kategori için fotoğraf kontenjanından bir sergi alanı uzunluğu hesaplar. Böylece sabit sayıda bölüm ya da sabit uzunlukta koridor gerekmez. Kullanıcı kapasiteyi değiştirince sonraki sayfa açılışında koridor yeniden hesaplanır.

## 6. Öğrenme etkinlikleri

1. `categories` tablosuna iki yeni bölüm ekleyip galerinin nasıl değiştiğini gözlemle.
2. Aynı bölümün kapasitesini 6'dan 12'ye yükseltip koridor uzunluğunu karşılaştır.
3. Yönetici oturumundan çık ve veri güncellemelerinin neden engellendiğini RLS üzerinden tartış.
4. `site_settings` içindeki sergi başlığı değişince tarayıcı başlığı ile tabelanın nasıl yenilendiğini incele.

**İleri geliştirme önerisi:** Birden fazla yönetici rolü, kullanıcı bazlı izinler, erişilebilirlik ve performans iyileştirmeleri.
