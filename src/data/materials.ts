import { StudyMaterial } from '../types/quiz';
import { PREDICTIONS_2026 } from './predictions2026';

export const STUDY_MATERIALS: StudyMaterial[] = [
  ...PREDICTIONS_2026,
  {
    id: 'mat-1',
    concept: 'Penalaran Induktif',
    category: 'TPS',
    title: 'Memahami Penalaran Induktif',
    fullContent: `
Penalaran induktif adalah proses berpikir untuk menarik kesimpulan umum berdasarkan pengamatan atau fakta-fakta khusus. Dalam konteks SNBT, penalaran ini sering diuji melalui pola bilangan, pola gambar, atau analogi kata.

### Ciri-ciri Penalaran Induktif:
1. **Khusus ke Umum**: Dimulai dari contoh-contoh spesifik menuju aturan umum.
2. **Probabilistik**: Kesimpulan yang ditarik memiliki tingkat peluang tertentu, bukan kepastian mutlak seperti deduktif.
3. **Pola**: Sangat bergantung pada kemampuan mengenali keteraturan atau pola.

### Strategi Mengerjakan Soal:
- **Amati Perubahan**: Lihat apa yang berubah dari satu elemen ke elemen berikutnya.
- **Cari Aturan**: Apakah ada penambahan, perkalian, rotasi, atau perubahan warna?
- **Uji Aturan**: Terapkan aturan yang ditemukan pada elemen berikutnya untuk memastikan konsistensi.
    `,
    summary: 'Penalaran induktif menarik kesimpulan umum dari fakta khusus. Fokus pada pengenalan pola dan konsistensi perubahan antar elemen.',
    sources: [
      { name: 'Kemendikbudristek - Simulasi SNBT', url: 'https://simulasi-tes.bppp.kemdikbud.go.id/' },
      { name: 'Wikipedia - Inductive Reasoning', url: 'https://id.wikipedia.org/wiki/Penalaran_induktif' }
    ]
  },
  {
    id: 'mat-2',
    concept: 'Penalaran Matematika',
    category: 'Penalaran Matematika',
    title: 'Strategi Penalaran Matematika',
    fullContent: `
Penalaran Matematika dalam SNBT bukan sekadar menghitung rumus, melainkan kemampuan untuk memecahkan masalah dalam konteks kehidupan sehari-hari menggunakan konsep matematika.

### Topik Utama:
1. **Bilangan**: Persentase, rasio, bunga majemuk, dan estimasi.
2. **Aljabar**: Persamaan linear, pertidaksamaan, dan fungsi.
3. **Geometri**: Luas, volume, dan teorema Pythagoras dalam konteks nyata.
4. **Data & Peluang**: Interpretasi grafik, rata-rata, median, dan peluang kejadian.

### Tips Sukses:
- **Baca dengan Teliti**: Seringkali informasi penting ada di narasi soal, bukan hanya angka.
- **Visualisasi**: Gambarkan sketsa jika soal berkaitan dengan geometri atau pergerakan.
- **Eliminasi Jawaban**: Jika ragu, eliminasi pilihan yang tidak masuk akal secara logis.
    `,
    summary: 'Fokus pada pemecahan masalah kontekstual. Pahami konsep dasar bilangan, aljabar, geometri, dan data. Baca narasi dengan teliti.',
    sources: [
      { name: 'Khan Academy - Math', url: 'https://www.khanacademy.org/math' },
      { name: 'BPPP - Materi SNBT', url: 'https://framework-snpmb.bppp.kemdikbud.go.id/' }
    ]
  },
  {
    id: 'mat-3',
    concept: 'Literasi Bahasa Inggris',
    category: 'Literasi Inggris',
    title: 'Mastering English Literacy',
    fullContent: `
English Literacy tests your ability to understand, analyze, and evaluate written texts in English.

### Key Skills:
1. **Main Idea**: Identifying the central point of a paragraph or the whole text.
2. **Inference**: Drawing conclusions based on implicit information.
3. **Vocabulary in Context**: Understanding the meaning of a word based on its surrounding sentences.
4. **Author\'s Purpose/Tone**: Determining why the author wrote the text and their attitude towards the subject.

### Reading Strategies:
- **Skimming**: Quickly reading to get the general idea.
- **Scanning**: Looking for specific keywords or information.
- **Context Clues**: Using nearby words to guess the meaning of unfamiliar terms.
    `,
    summary: 'Focus on main ideas, inferences, and vocabulary in context. Use skimming and scanning techniques to save time.',
    sources: [
      { name: 'British Council - Reading Skills', url: 'https://learnenglish.britishcouncil.org/skills/reading' },
      { name: 'TOEFL Preparation Guide', url: 'https://www.ets.org/toefl' }
    ]
  },
  {
    id: 'mat-4',
    concept: 'Penalaran Deduktif',
    category: 'TPS',
    title: 'Logika Penalaran Deduktif',
    fullContent: `
Penalaran deduktif adalah proses penarikan kesimpulan yang bersifat pasti dari premis-premis yang bersifat umum.

### Bentuk Silogisme:
1. **Modus Ponens**: Jika P maka Q. P terjadi, maka Q terjadi.
2. **Modus Tollens**: Jika P maka Q. Q tidak terjadi, maka P tidak terjadi.
3. **Silogisme Hipotetis**: Jika P maka Q. Jika Q maka R. Maka jika P maka R.

### Jebakan Umum:
- **Pernyataan Terbalik**: Jika P maka Q, bukan berarti jika Q maka P.
- **Kesimpulan Terburu-buru**: Menarik kesimpulan tanpa dasar premis yang kuat.
    `,
    summary: 'Penalaran deduktif menarik kesimpulan pasti dari premis umum. Pahami Modus Ponens, Tollens, dan Silogisme.',
    sources: [
      { name: 'Logika Matematika Dasar', url: 'https://id.wikipedia.org/wiki/Logika_matematika' },
      { name: 'Zenius - Penalaran Umum', url: 'https://www.zenius.net/' }
    ]
  },
  {
    id: 'mat-5',
    concept: 'Pemahaman Bacaan & Menulis',
    category: 'TPS',
    title: 'Teknik Pemahaman Bacaan & Menulis',
    fullContent: `
Bagian ini menguji kemampuan Anda dalam memahami isi bacaan dan menerapkan kaidah penulisan bahasa Indonesia yang baik dan benar (PUEBI/KBBI).

### Aspek yang Diuji:
1. **Ide Pokok & Judul**: Menentukan inti sari paragraf dan judul yang tepat.
2. **Kepaduan Paragraf**: Menyusun kalimat agar menjadi paragraf yang logis.
3. **Ejaan & Tanda Baca**: Penggunaan huruf kapital, koma, titik, dan kata baku.
4. **Kalimat Efektif**: Menghindari pemborosan kata dan ketidakjelasan struktur.

### Strategi:
- Baca pertanyaan terlebih dahulu sebelum teks.
- Fokus pada kalimat pertama dan terakhir paragraf untuk mencari ide pokok.
- Perhatikan konjungsi (kata hubung) antar kalimat.
    `,
    summary: 'Fokus pada ide pokok, kepaduan paragraf, ejaan, dan kalimat efektif. Baca pertanyaan sebelum teks untuk efisiensi.',
    sources: [
      { name: 'PUEBI Daring', url: 'https://puebi.readthedocs.io/' },
      { name: 'KBBI Daring', url: 'https://kbbi.kemdikbud.go.id/' }
    ]
  },
  {
    id: 'mat-6',
    concept: 'Pengetahuan Kuantitatif',
    category: 'TPS',
    title: 'Aljabar Dasar & Persamaan',
    fullContent: `
Pengetahuan Kuantitatif menguji pemahaman Anda tentang konsep matematika dasar, terutama aljabar.

### Topik Penting:
1. **Persamaan Linear**: Mencari nilai variabel dalam satu atau dua persamaan.
2. **Pertidaksamaan**: Memahami sifat-sifat pertidaksamaan (misal: membalik tanda saat dikali negatif).
3. **Eksponen & Akar**: Sifat-sifat pangkat dan penarikan akar.
4. **Faktorisasi**: Menguraikan bentuk kuadrat (x² - y² = (x+y)(x-y)).

### Strategi:
- Substitusi nilai jika memungkinkan untuk mempercepat hitungan.
- Hafalkan sifat-sifat dasar aljabar untuk menghindari kesalahan teknis.
    `,
    summary: 'Memahami konsep aljabar dasar, persamaan, pertidaksamaan, dan eksponen untuk subtes Pengetahuan Kuantitatif.',
    sources: [
      { name: 'Math Planet Aljabar', url: 'https://www.mathplanet.com/education/algebra-1' },
      { name: 'Zenius Matematika', url: 'https://www.zenius.net/belajar/matematika/' }
    ]
  },
  {
    id: 'mat-7',
    concept: 'Literasi Bahasa Indonesia',
    category: 'Literasi Indonesia',
    title: 'Analisis Teks & Makna Tersirat',
    fullContent: `
Literasi Bahasa Indonesia menguji kemampuan Anda dalam menganalisis teks yang lebih panjang dan kompleks.

### Fokus Utama:
1. **Makna Tersirat**: Menemukan informasi yang tidak tertulis secara langsung.
2. **Tujuan Penulis**: Mengapa penulis menulis teks tersebut (menginformasikan, membujuk, mengkritik).
3. **Hubungan Antar Paragraf**: Bagaimana satu paragraf mendukung paragraf lainnya.
4. **Sikap Penulis**: Apakah penulis setuju, tidak setuju, atau netral terhadap isu yang dibahas.

### Tips:
- Perhatikan kata-kata kunci (keywords) yang menunjukkan opini atau fakta.
- Latih kemampuan merangkum isi teks dalam satu kalimat.
    `,
    summary: 'Mempelajari cara menganalisis makna tersirat, tujuan penulis, dan hubungan antar bagian teks dalam Literasi Bahasa Indonesia.',
    sources: [
      { name: 'Badan Bahasa Kemdikbud', url: 'https://badanbahasa.kemdikbud.go.id/' },
      { name: 'Kompas Edukasi', url: 'https://edukasi.kompas.com/' }
    ]
  }
];
