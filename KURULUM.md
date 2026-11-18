# Ders 2 — Supabase veritabanı ve web sitesini kurma

Bu rehber, her okulun birbirinden bağımsız bir sergi kurmasını sağlar.

## A. Supabase'de proje aç

1. [supabase.com](https://supabase.com) üzerinde hesap oluştur, Dashboard'dan **New project** seç.
2. Kurumun için bir proje adı ve **güçlü veritabanı şifresi** belirle. Bu şifreyi **hiçbir HTML/JS dosyasına yazma**.
3. Proje oluşturulunca **SQL Editor → New query** ekranını aç.
4. Depodaki `supabase-kurulum.sql` dosyasının tamamını sorgu alanına yapıştır, **Run** düğmesine bas.
5. **Table Editor** bölümünde `site_settings`, `categories`, `photos` tablolarının oluştuğunu kontrol et.
6. **Storage** ekranında `photos` ve `branding` adlı iki bucket bulunduğunu kontrol et.

### Tablo ve dosya alanları

| Kaynak | İşlevi |
| --- | --- |
| `site_settings` | Okul adı, sergi başlığı, logo dosya yolu |
| `categories` | Bölüm adı, renk, kapasite, sıralama |
| `photos` | Bölüm, konum, fotoğraf başlığı, açıklaması ve yolu |
| `photos` bucket | Fotoğraf dosyalarını saklar |
| `branding` bucket | Okul logosunu saklar |

**Dikkat:** SQL, boş/yeni proje içindir. Aynı SQL'i ikinci kez çalıştırmak bazı nesneler zaten mevcut olduğundan hata verebilir.

## B. Yönetici hesabını aç

1. **Authentication → Providers → Email** ekranından herkese açık **Sign ups** seçeneğini kapat.
2. **Authentication → Users → Add user** bölümünden yönetici e-posta adresini ve şifreni oluştur. Arayüz sunuyorsa e-posta onayını tamamla.
3. Bu bilgiler **sadece Supabase Auth** içinde tutulur; GitHub dosyalarına girilmez.
4. Bu örnekte Supabase projesinde oturum açabilen her kullanıcı yönetici yazma iznine sahip olabilir. Dolayısıyla başka hesap oluşturma ve genel kaydı kapalı tut.

## C. `config.js` dosyasını düzenle

Supabase panelinde **Project Settings → API** (veya güncel arayüzde **Connect / API Keys**) bölümünden:

- Project URL: `https://ORNEK.supabase.co`
- Publishable key (`sb_publishable_...`) veya legacy `anon` public key

Bu iki değeri `config.js` içinde değiştir:

```javascript
export const SUPABASE_URL = "https://ORNEK.supabase.co";
export const SUPABASE_KEY = "sb_publishable_ORNEK";
```

**ASLA** `service_role`, `sb_secret_...`, veritabanı şifresi veya yönetici parolasını bu dosyaya yazma. `config.js` tarayıcıdan görülebilir.

## D. GitHub ve Vercel ile yayınla

1. Dosyaları GitHub'a koy (bkz. [GitHub yükleme](GITHUB-YUKLEME.md)).
2. Vercel'e giriş yapıp **Add New → Project → Import Git Repository** ile depoyu seç.
3. Framework Preset **Other**, Build Command **boş**, Output Directory **`.`**.
4. Deploy sonrası ana sayfanı `https://proje-adi.vercel.app/` adresinde kontrol et.
5. Yönetim ekranını `https://proje-adi.vercel.app/admin.html` adresinden aç.
6. Yönetici hesabıyla giriş yap, okul adını / başlığı / logoyu kaydet, bölümleri ve fotoğrafları ekle.

## E. İlk kontrol listesi

- [ ] `index.html` açılıyor.
- [ ] `/admin.html` giriş ekranı geliyor.
- [ ] Yönetici hesabıyla giriş yapılıyor.
- [ ] Okul adı kaydedilince 3D tabela değişiyor (galeriyi yenile).
- [ ] Yeni bölüm eklenince koridorda bölüm görünüyor.
- [ ] Fotoğraf yüklendiğinde galeride görüntüleniyor.
- [ ] Çıkış sonrası yönetim işlemleri yapılamıyor.

**Sonraki ders:** [Yönetim panelini kullanma](KULLANIM.md).
