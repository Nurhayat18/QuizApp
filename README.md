# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Geliştirici Notları

## Özellikler

- Login ekranı: Kullanıcı ismi girilerek quiz'e başlanır.
- 3 saniyelik bekleme süresi sonrası quiz başlar.
- Her soru için 10 saniyelik cevap süresi vardır.
- Süre dolarsa soru yanlış sayılır.
- Sonuç ekranında doğru/yanlış sayısı ve toplam puan gösterilir.
- Toplam sonuç hesaplanırken her doğru cevap +5 puan, her yanlış cevap ise -2 puandır.
- Quiz sorularu `data.js` dosyasından random sıra ile alınır.


# Projeyi Çalıştırma Adımları

## 1. Projeyi Klonlayın
git clone https://github.com/Nurhayat18/QuizApp.git

## 2. Projenin Bulunduğu Dizine Gidin
cd proje-adi

## 3. Gerekli Paketleri Yükleyin
npm install

## 4. Geliştirme Sunucusunu Başlatın
npm run dev

## 5. Tarayıcıda Aç
 Tarayıcınızda http://localhost:5173 adresine gidin.
#   Q u i z A p p 
 
 
