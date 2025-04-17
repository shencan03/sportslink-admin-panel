# SportsLink Yönetim Paneli

SportsLink mobil uygulaması için geliştirilmiş yönetim panelidir. Kullanıcıları, etkinlikleri ve diğer platform özelliklerini yönetmek için kapsamlı bir arayüz sunar.

## Gereksinimler

- Node.js 18.0.0 veya üzeri
- npm veya yarn paket yöneticisi

## Başlangıç

1. Projeyi klonlayın:

```bash
git clone https://github.com/shencan03/sportslink-admin-panel.git
cd sportslink-admin-panel
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyin.

## Özellikler

- 📊 Temel metrikleri gösteren gösterge paneli
- 👥 Kullanıcı yönetimi
- 🎯 Etkinlik yönetimi
- 📰 Haber yönetimi
- 📈 Analitik ve raporlama
- 🔒 Rol tabanlı erişim kontrolü

## Teknoloji Altyapısı

- **Framework:** Next.js 15.3.0
- **UI Bileşenleri:** shadcn/ui
- **Stil:** Tailwind CSS
- **Form Yönetimi:** React Hook Form + Zod
- **Grafikler:** Recharts
- **İkonlar:** Lucide React + React Icons
- **Tarih İşlemleri:** date-fns
- **Tema:** next-themes

## Proje Yapısı

```
src/
├── app/              # Next.js sayfa yönlendirmeleri
├── components/       # Yeniden kullanılabilir bileşenler
├── lib/             # Yardımcı fonksiyonlar ve sabitler
└── styles/          # Global stiller
```

## Kullanılabilir Komutlar

- `npm run dev` - Geliştirme sunucusunu başlat
- `npm run build` - Prodüksiyon için derleme yap
- `npm run start` - Prodüksiyon sunucusunu başlat
- `npm run lint` - Kod kalitesi kontrolü yap

## Katkıda Bulunma

1. Projeyi forklayın
2. Özellik dalınızı oluşturun (`git checkout -b ozellik/harika-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik eklendi'`)
4. Dalınıza push yapın (`git push origin ozellik/harika-ozellik`)
5. Pull Request açın

## Lisans

Bu proje özel ve gizlidir.
