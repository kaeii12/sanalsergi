# Ders 1 — GitHub'a proje yükleme

**Hedef:** Bu projeyi başkalarının görüp indirebileceği bir GitHub deposuna koymak.

## 1. GitHub hesabı ve depo

1. [github.com](https://github.com) adresinde hesabına giriş yap.
2. Sağ üstteki **+ → New repository** seçeneğini aç (veya [github.com/new](https://github.com/new)).
3. Örnek depo adı: `okul-sanal-sergi`.
4. **Description** alanına şunu yaz: `Okullar için özelleştirilebilir Three.js ve Supabase tabanlı 3D sanal fotoğraf sergisi.`
5. Herkesin erişebilmesini istiyorsan **Public** seç.
6. `README` ekleme seçeneğini boş bırak; bu projede zaten `README.md` var. **Create repository** düğmesine bas.

## 2. ZIP'deki dosyaları yükleme

1. İndirdiğin ZIP'i bilgisayarında **klasöre çıkar**. ZIP dosyasının kendisini tek dosya olarak yükleme.
2. Boş deponun sayfasında **uploading an existing file** bağlantısını; varsa **Add file → Upload files** seçeneğini aç.
3. Çıkardığın klasörün **içindeki** tüm dosyaları ve `docs` klasörünü yükleme alanına sürükle. `index.html`, `README.md` ve diğer dosyalar doğrudan deponun ana dizininde bulunmalı.
4. Commit açıklamasına `İlk sürüm: okul sanal sergisi ve Türkçe kurulum rehberi` yaz.
5. **Commit changes** ile yüklemeyi tamamla.
6. Deponun ana sayfasında README'nin otomatik açıldığını kontrol et.

**Dizin kontrolü:** Doğru: `okul-sanal-sergi/index.html`. Yanlış: `okul-sanal-sergi/okul-sergi-github-rehberli/index.html` (bu ikinci durumda Vercel kök dizini yeniden ayarlamak gerekebilir).

## 3. GitHub'daki README nasıl görüntülenir?

GitHub, depo kökündeki `README.md` dosyasını kendiliğinden açıklama olarak gösterir. Kullanıcılar konu anlatımı bağlantılarına tıklayarak `docs/` altındaki diğer derslere ulaşır.

## 4. Sonradan güncelleme

GitHub'da dosyaya girip kalem simgesiyle düzenleyebilir ya da **Add file → Upload files** ile güncel dosyaları yeniden yükleyebilirsin. Büyük değişikliklerde GitHub Desktop veya Git tercih edilebilir.

## 5. Vercel'e bağlama

1. [vercel.com/new](https://vercel.com/new) adresine git.
2. GitHub hesabına erişim iznini ver, `okul-sanal-sergi` deposunu seç.
3. Framework Preset: **Other**; Build Command: **boş**; Output Directory: **`.`**.
4. **Deploy** düğmesine bas. Değişiklikler depoya gönderildiğinde Vercel bağlı projeyi tekrar yayınlayabilir.
5. Projeyi kendi okulunda kullanacaksan, `config.js` dosyasındaki örnek URL/anahtarları **kendi Supabase projenin public değerleriyle** değiştir.

> **Paylaşım stratejisi:** Herkesin kullanması için olan asıl GitHub deposunda `config.js` **örnek değerlerle** kalsın. Kendi okulunun çalışan örneğini ayrı bir depo/dal veya ayrı Vercel projesinde yapılandır. Böylece başkaları senin Supabase projenin yapılandırmasını devralmaz.

**Sonraki ders:** [Supabase ve Vercel kurulumu](KURULUM.md).
