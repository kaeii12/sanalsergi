# Ders 5 — Güvenlik ve sorun giderme

## GitHub'a hangi bilgileri koymamalıyım?

- Yönetici e-posta parolası, veritabanı şifresi
- Supabase `service_role`, `sb_secret_...` gibi gizli anahtarlar
- Öğrenciye ait izin alınmamış fotoğraflar ve kişisel veriler
- Geçmişe yanlışlıkla eklenmiş sırlar: dosyayı silmek Git geçmişinden de silmez

`config.js` **public** Supabase URL ve publishable/anon anahtarını içerebilir; RLS güvenliği bu yüzden önemlidir. Asıl örnek depo için yer tutucular bırakılması önerilir.

## Neden yönetim paneli açılıyor ama veri değiştirilemiyor?

- Girişin Supabase Auth ile gerçekleştiğini kontrol et.
- SQL Editor'da `supabase-kurulum.sql` çalıştırıldığından emin ol.
- Doğru Supabase proje URL ve public anahtarını kullan.
- Supabase hata mesajını incele. Hata tablosu/veri politikası ile ilgili olabilir.

## Neden boş sergi görünüyor?

Yeni kurulumda `categories` tablosu boştur. Önce `/admin.html` sayfasından bölümleri ekleyip fotoğrafları yükle.

## Neden WebGL hatası alıyorum?

Tarayıcıdaki grafik hızlandırması kapalı olabilir veya cihaz WebGL desteklemiyor olabilir. Güncel tarayıcıyı, grafik sürücüsünü ve donanım hızlandırma ayarını kontrol et.

## Neden resim yüklenemiyor?

Supabase Storage'daki `photos`/`branding` bucket'larının ve ilgili RLS politikalarının oluştuğunu kontrol et. Logo PNG/JPEG/WEBP olabilir; fotoğraflar yüklenmeden önce JPEG'e dönüştürülür. Çok büyük dosya veya desteklenmeyen kaynak biçimi tarayıcıda hata verebilir.

## GitHub'da paylaştıktan sonra herkes benim verilerime erişir mi?

Kod herkese açık olur. Ancak başka bir okulun kendi Supabase projesini oluşturması ve `config.js` dosyasını değiştirmesi beklenir. Senin çalışan sitenin **public galerisi** zaten ziyaretçiler tarafından görüntülenebilir. Verileri değiştirme yetkisi Supabase RLS ve Auth politikalarıyla kontrol edilir. Mevcut SQL'de oturum açmış **bütün** hesaplar yazabilir: açık kaydı kapalı tut, hesap listesini yönet.

## Önceden gerçek sır paylaştım, ne yapmalıyım?

Söz konusu gizli anahtarı/şifreyi ilgili hizmetten **iptal et veya döndür**, şifreyi değiştir, Git geçmişini temizle. Sadece yeni dosya yüklemek eski commit'lerdeki sırları kaldırmaz.

## Fotoğrafların hukuki ve etik yönü

Özellikle öğrencilerin görüntüleri söz konusuysa okulun yetkilendirme ve izin süreçlerini tamamla; kimlik, iletişim bilgileri vb. hassas içerikleri izinsiz yükleme. Supabase Storage'daki görüntü dosyaları bu kurulumda herkese açık olarak sunulur.
