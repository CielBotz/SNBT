import { StudyMaterial } from '../types/quiz';
import { PREDICTIONS_2026 } from './predictions2026';

export const STUDY_MATERIALS: StudyMaterial[] = [
  ...PREDICTIONS_2026,
  {
    id: 'mat-1',
    concept: 'Penalaran Induktif',
    category: 'TPS',
    title: 'Panduan Lengkap Penalaran Induktif',
    fullContent: `
# Penalaran Induktif: Memahami Pola dan Generalisasi

Penalaran induktif adalah proses berpikir untuk menarik kesimpulan umum berdasarkan pengamatan atau fakta-fakta khusus. Dalam konteks SNBT, kemampuan ini sangat krusial untuk menyelesaikan soal-soal pola, analogi, dan klasifikasi.

## 1. Konsep Dasar
Penalaran induktif bekerja dengan cara mengumpulkan bukti-bukti spesifik untuk membentuk sebuah aturan atau hukum umum. Berbeda dengan deduktif yang bersifat pasti, induktif bersifat probabilistik (berdasarkan peluang kebenaran yang tinggi).

## 2. Sub-Materi Penting
### A. Pola Bilangan dan Huruf
Mengidentifikasi aturan perubahan angka atau huruf dalam sebuah deret. Aturan bisa berupa operasi aritmatika (+, -, *, /), pangkat, atau pola bertingkat.
### B. Analogi Kata
Memahami hubungan antara dua kata dan menerapkannya pada pasangan kata lain. Contoh: *Haus : Air = Lapar : Makanan*.
### C. Penalaran Figural (Pola Gambar)
Mengenali rotasi, pencerminan, perubahan jumlah elemen, atau perubahan warna dalam serangkaian gambar.

## 3. Strategi Mengerjakan Soal
1. **Identifikasi Elemen**: Lihat apa saja yang ada dalam soal (angka, bentuk, warna).
2. **Cari Perubahan**: Bandingkan elemen pertama dengan kedua, kedua dengan ketiga.
3. **Rumuskan Hipotesis**: Buat dugaan aturan (misal: "setiap langkah ditambah 2").
4. **Verifikasi**: Uji dugaan tersebut pada elemen berikutnya. Jika konsisten, itulah jawabannya.

## 4. Ringkasan Poin Penting
- **Arah Berpikir**: Khusus → Umum.
- **Fokus Utama**: Pengenalan pola (Pattern Recognition).
- **Kesalahan Umum**: Terlalu cepat menyimpulkan pola hanya dari dua elemen pertama.
- **Tips**: Selalu cek konsistensi pola hingga elemen terakhir yang tersedia.
    `,
    summary: 'Penalaran induktif berfokus pada penarikan kesimpulan umum dari pola khusus. Kuasai pola bilangan, analogi, dan figural dengan strategi identifikasi-verifikasi.',
    sources: [
      { name: 'EduPath Research Team', url: '#' },
      { name: 'Kemendikbudristek - Simulasi SNBT', url: 'https://simulasi-tes.bppp.kemdikbud.go.id/' }
    ]
  },
  {
    id: 'mat-2',
    concept: 'Penalaran Matematika',
    category: 'Penalaran Matematika',
    title: 'Aritmatika Sosial & Persentase',
    fullContent: `
# Aritmatika Sosial: Aplikasi Matematika dalam Kehidupan

Aritmatika sosial adalah cabang matematika yang mempelajari perhitungan terkait ekonomi dan kehidupan sehari-hari, seperti harga jual, harga beli, untung, rugi, diskon, bunga, dan pajak.

## 1. Konsep Untung dan Rugi
- **Untung (Laba)**: Terjadi jika Harga Jual (HJ) > Harga Beli (HB).
  - *Rumus*: Untung = HJ - HB
  - *Persentase Untung*: (Untung / HB) x 100%
- **Rugi**: Terjadi jika Harga Jual (HJ) < Harga Beli (HB).
  - *Rumus*: Rugi = HB - HJ
  - *Persentase Rugi*: (Rugi / HB) x 100%

## 2. Diskon (Rabat), Bruto, Tara, dan Netto
- **Diskon**: Potongan harga yang diberikan penjual kepada pembeli.
  - *Harga Setelah Diskon*: Harga Awal - (Persen Diskon x Harga Awal)
- **Bruto**: Berat kotor (berat barang + berat kemasan).
- **Tara**: Berat kemasan.
- **Netto**: Berat bersih (berat barang saja).
  - *Rumus*: Netto = Bruto - Tara

## 3. Bunga Tunggal dan Pajak
- **Bunga Tunggal**: Bunga yang dihitung berdasarkan modal awal saja.
  - *Rumus Bunga (n bulan)*: (n/12) x Persen Bunga x Modal
- **Pajak (PPN/PPh)**:
  - PPN (Pajak Pertambahan Nilai): Menambah harga yang harus dibayar.
  - PPh (Pajak Penghasilan): Mengurangi jumlah uang yang diterima.

## 4. Ringkasan Poin Penting
- Selalu gunakan **Harga Beli** sebagai dasar perhitungan persentase untung/rugi.
- Pahami perbedaan bunga tunggal dan bunga majemuk (SNBT biasanya fokus pada bunga tunggal).
- Teliti dalam membaca soal apakah yang ditanya adalah "besar diskon" atau "harga setelah diskon".
    `,
    summary: 'Kuasai perhitungan untung-rugi, diskon, bunga tunggal, serta konsep bruto-tara-netto untuk menyelesaikan soal aritmatika sosial dengan cepat.',
    sources: [
      { name: 'Buku Matematika Dasar SMA', url: '#' },
      { name: 'Khan Academy - Finance', url: 'https://www.khanacademy.org/math/arithmetic' }
    ]
  },
  {
    id: 'mat-3',
    concept: 'Literasi Bahasa Inggris',
    category: 'Literasi Inggris',
    title: 'Comprehensive Guide to English Literacy',
    fullContent: `
# English Literacy: Analyzing and Evaluating Texts

This section measures your ability to understand, use, and reflect on written texts in English to achieve goals and develop knowledge.

## 1. Core Reading Skills
### A. Identifying Main Ideas
Finding the primary message of a paragraph or the entire passage. Look for topic sentences and concluding remarks.
### B. Making Inferences
Understanding what is implied but not explicitly stated. Connect the "dots" provided by the author.
### C. Vocabulary in Context
Determining the meaning of unfamiliar words by looking at the surrounding sentences (context clues).
### D. Identifying Tone and Purpose
Recognizing the author's attitude (objective, critical, optimistic) and why they wrote the piece.

## 2. Advanced Techniques
- **Skimming**: Moving your eyes quickly over the text to get a general overview.
- **Scanning**: Searching for specific information like dates, names, or numbers.
- **Critical Reading**: Evaluating the strength of the author's arguments and identifying potential biases.

## 3. Ringkasan Poin Penting
- **Active Reading**: Always ask "What is the author trying to say here?" while reading.
- **Keywords**: Pay attention to transition words (however, therefore, moreover) as they signal changes in logic.
- **Time Management**: Don't spend too much time on one difficult sentence; move on and come back if needed.
- **Practice**: Exposure to various topics (science, social issues, arts) is key.
    `,
    summary: 'Master main ideas, inferences, and context clues. Use skimming and scanning for efficiency and always read critically.',
    sources: [
      { name: 'EduPath Language Lab', url: '#' },
      { name: 'British Council Reading Resources', url: 'https://learnenglish.britishcouncil.org/' }
    ]
  },
  {
    id: 'mat-4',
    concept: 'Penalaran Deduktif',
    category: 'TPS',
    title: 'Logika Formal: Penalaran Deduktif',
    fullContent: `
# Penalaran Deduktif: Menarik Kesimpulan yang Pasti

Penalaran deduktif adalah proses penarikan kesimpulan yang bersifat khusus dari pernyataan-pernyataan yang bersifat umum (premis). Jika premisnya benar, maka kesimpulannya *pasti* benar.

## 1. Struktur Logika
### A. Silogisme Kategoris
Terdiri dari Premis Mayor, Premis Minor, dan Kesimpulan.
*Contoh: Semua manusia fana (Mayor). Socrates adalah manusia (Minor). Maka Socrates fana (Kesimpulan).*
### B. Modus Ponens
Jika P maka Q. P terjadi. Maka Q pasti terjadi.
### C. Modus Tollens
Jika P maka Q. Q tidak terjadi. Maka P pasti tidak terjadi.

## 2. Jebakan dalam Logika
- **Affirming the Consequent**: Jika P maka Q. Q terjadi. (Salah jika menyimpulkan P pasti terjadi).
- **Denying the Antecedent**: Jika P maka Q. P tidak terjadi. (Salah jika menyimpulkan Q pasti tidak terjadi).

## 3. Ringkasan Poin Penting
- **Kepastian**: Berbeda dengan induktif, deduktif memberikan hasil yang mutlak benar jika dasarnya benar.
- **Hukum Logika**: Kuasai aturan "Jika-Maka" dan negasi.
- **Diagram Venn**: Sangat membantu untuk memvisualisasikan hubungan antar himpunan (Semua, Sebagian, Tidak Ada).
    `,
    summary: 'Deduktif menarik kesimpulan pasti dari premis umum. Kuasai Silogisme, Modus Ponens, dan Modus Tollens serta hindari kesalahan logika umum.',
    sources: [
      { name: 'EduPath Logic Dept', url: '#' },
      { name: 'Stanford Encyclopedia of Philosophy', url: 'https://plato.stanford.edu/' }
    ]
  },
  {
    id: 'mat-5',
    concept: 'Pemahaman Bacaan & Menulis',
    category: 'TPS',
    title: 'Teknik Pemahaman Bacaan & Menulis',
    fullContent: `
# Pemahaman Bacaan & Menulis (PBM): Strategi dan Kaidah

Subtes ini menguji kemampuan Anda dalam memahami isi bacaan dan menerapkan kaidah penulisan bahasa Indonesia yang baik dan benar.

## 1. Fokus Utama PBM
### A. Ide Pokok dan Judul
Menentukan inti sari dari sebuah paragraf atau teks secara keseluruhan. Judul harus mewakili seluruh isi teks secara singkat dan menarik.
### B. Kepaduan Paragraf
Memastikan setiap kalimat dalam paragraf saling berhubungan secara logis (kohesi dan koherensi).
### C. Kaidah Bahasa (PUEBI/KBBI)
Penggunaan huruf kapital, tanda baca (koma, titik, titik dua), dan pemilihan kata baku.
### D. Kalimat Efektif
Menyusun kalimat yang tidak bertele-tele, memiliki subjek dan predikat yang jelas, serta tidak bermakna ganda.

## 2. Strategi Analisis Teks
1. **Baca Pertanyaan Terlebih Dahulu**: Agar Anda tahu informasi apa yang harus dicari dalam teks.
2. **Identifikasi Kalimat Utama**: Biasanya terletak di awal (deduktif) atau akhir (induktif) paragraf.
3. **Perhatikan Konjungsi**: Kata hubung seperti "namun", "oleh karena itu", "selain itu" menunjukkan alur logika penulis.

## 3. Ringkasan Poin Penting
- **Efisiensi**: Jangan membaca seluruh teks jika pertanyaan hanya menanyakan kata tertentu.
- **Kamus & Ejaan**: Selalu rujuk pada KBBI dan PUEBI untuk soal kebahasaan.
- **Logika Kalimat**: Kalimat harus logis dan tidak ambigu.
    `,
    summary: 'Fokus pada ide pokok, kepaduan paragraf, kaidah bahasa (PUEBI), dan kalimat efektif. Gunakan strategi membaca pertanyaan terlebih dahulu.',
    sources: [
      { name: 'EduPath Literacy Team', url: '#' },
      { name: 'PUEBI Daring', url: 'https://puebi.readthedocs.io/' }
    ]
  },
  {
    id: 'mat-6',
    concept: 'Pengetahuan Kuantitatif',
    category: 'TPS',
    title: 'Aljabar Dasar & Persamaan Kuantitatif',
    fullContent: `
# Pengetahuan Kuantitatif: Fondasi Matematika Dasar

Pengetahuan Kuantitatif menguji pemahaman Anda tentang konsep matematika dasar yang menjadi dasar pemecahan masalah yang lebih kompleks.

## 1. Topik Esensial
### A. Sistem Persamaan Linear
Menyelesaikan nilai variabel (x, y) dalam satu atau lebih persamaan. Sangat berguna untuk soal cerita tentang harga barang atau usia.
### B. Pertidaksamaan
Memahami daerah penyelesaian dan sifat-sifat pertidaksamaan, terutama saat melibatkan perkalian dengan bilangan negatif.
### C. Eksponen dan Akar
Menguasai sifat-sifat pangkat (perkalian, pembagian, pangkat negatif) dan penyederhanaan bentuk akar.
### D. Faktorisasi Aljabar
Menguraikan bentuk kuadrat seperti (a+b)², (a-b)², dan selisih dua kuadrat (a²-b²).

## 2. Tips Cepat (Shortcuts)
- **Substitusi**: Masukkan angka dari pilihan jawaban ke dalam persamaan untuk mengecek kebenaran.
- **Angka Sederhana**: Gunakan angka permisalan (seperti 100 untuk persentase) jika soal bersifat abstrak.
- **Eliminasi**: Buang pilihan jawaban yang jelas-jelas salah secara logika bilangan.

## 3. Ringkasan Poin Penting
- **Akurasi**: Kesalahan kecil dalam tanda (+/-) bisa berakibat fatal.
- **Hafalan Dasar**: Hafalkan kuadrat 1-20 dan pangkat dua/tiga dasar.
- **Logika Bilangan**: Pahami sifat bilangan genap/ganjil dan positif/negatif.
    `,
    summary: 'Kuasai sistem persamaan, pertidaksamaan, eksponen, dan faktorisasi. Gunakan teknik substitusi dan angka permisalan untuk mempercepat hitungan.',
    sources: [
      { name: 'EduPath Math Lab', url: '#' },
      { name: 'Math Planet Algebra', url: 'https://www.mathplanet.com/' }
    ]
  },
  {
    id: 'mat-7',
    concept: 'Literasi Bahasa Indonesia',
    category: 'Literasi Indonesia',
    title: 'Analisis Teks Kompleks Bahasa Indonesia',
    fullContent: `
# Literasi Bahasa Indonesia: Membedah Makna dan Argumen

Literasi Bahasa Indonesia menguji kemampuan Anda dalam menganalisis teks yang lebih panjang, kompleks, dan bersifat ilmiah atau opini.

## 1. Aspek Analisis Mendalam
### A. Makna Tersirat (Inference)
Menemukan pesan atau informasi yang tidak tertulis secara gamblang namun didukung oleh data dalam teks.
### B. Tujuan dan Sikap Penulis
Menganalisis mengapa teks ditulis dan bagaimana perasaan atau posisi penulis terhadap topik tersebut (mendukung, menentang, atau netral).
### C. Hubungan Antar Bagian Teks
Memahami bagaimana paragraf satu mendukung paragraf lainnya atau bagaimana data tabel mendukung narasi teks.
### D. Evaluasi Argumen
Menilai apakah kesimpulan penulis didukung oleh bukti yang kuat atau terdapat cacat logika.

## 2. Strategi Membaca Kritis
1. **Previewing**: Melihat sekilas struktur teks dan judul.
2. **Annotating**: Menandai poin-poin penting atau kata kunci saat membaca.
3. **Summarizing**: Mencoba merangkum inti teks dengan kata-kata sendiri.

## 3. Ringkasan Poin Penting
- **Konteks**: Jangan hanya fokus pada satu kalimat; lihat konteks paragraf secara utuh.
- **Objektivitas**: Jawab berdasarkan isi teks, bukan berdasarkan pengetahuan umum Anda yang tidak ada di teks.
- **Struktur Argumen**: Pahami klaim, bukti, dan kesimpulan.
    `,
    summary: 'Fokus pada makna tersirat, tujuan penulis, dan evaluasi argumen. Gunakan teknik membaca kritis dan tetap objektif berdasarkan isi teks.',
    sources: [
      { name: 'EduPath Indonesian Dept', url: '#' },
      { name: 'Badan Bahasa Kemdikbud', url: 'https://badanbahasa.kemdikbud.go.id/' }
    ]
  },
  {
    id: 'mat-3',
    concept: 'Literasi Bahasa Indonesia',
    category: 'Literasi Indonesia',
    title: 'Analisis Teks Eksplanasi & Argumentasi',
    fullContent: `
# Membedah Teks: Eksplanasi dan Argumentasi

Dalam Literasi Bahasa Indonesia, kemampuan membedakan jenis teks dan memahami strukturnya adalah kunci utama.

## 1. Teks Eksplanasi
Teks yang menjelaskan proses "mengapa" dan "bagaimana" suatu fenomena (alam, sosial, budaya) terjadi.
- **Struktur**:
  1. Identifikasi Fenomena (Pernyataan Umum)
  2. Rangkaian Kejadian (Sebab-Akibat)
  3. Interpretasi (Kesimpulan/Ulasan)
- **Ciri Kebahasaan**: Menggunakan konjungsi kausalitas (sebab, karena, sehingga) dan kronologis (kemudian, lalu).

## 2. Teks Argumentasi
Teks yang bertujuan meyakinkan pembaca agar memiliki pandangan yang sama dengan penulis melalui bukti dan alasan yang kuat.
- **Struktur**:
  1. Pendahuluan (Tesis/Pandangan Penulis)
  2. Tubuh Argumen (Alasan, Data, Fakta)
  3. Kesimpulan (Penegasan Ulang)
- **Ciri Kebahasaan**: Menggunakan kata-kata persuasif dan kata kerja mental (berpendapat, berasumsi, meyakini).

## 3. Menemukan Ide Pokok dan Simpulan
- **Ide Pokok**: Gagasan utama yang menjadi dasar pengembangan paragraf. Biasanya terletak di awal (deduktif), akhir (induktif), atau keduanya (campuran).
- **Simpulan**: Intisari dari seluruh isi teks yang dirumuskan berdasarkan poin-poin penting yang telah dipaparkan.

## 4. Ringkasan Poin Penting
- **Eksplanasi**: Fokus pada proses dan sebab-akibat.
- **Argumentasi**: Fokus pada opini yang didukung fakta untuk meyakinkan.
- **Tips**: Perhatikan kalimat utama untuk menemukan ide pokok dengan cepat.
    `,
    summary: 'Pahami perbedaan struktur teks eksplanasi (sebab-akibat) dan argumentasi (opini-fakta). Latih kemampuan menemukan ide pokok di setiap paragraf.',
    sources: [
      { name: 'Pedoman Umum Ejaan Bahasa Indonesia (PUEBI)', url: 'https://puebi.readthedocs.io/' },
      { name: 'Badan Bahasa Kemdikbud', url: 'https://badanbahasa.kemdikbud.go.id/' }
    ]
  },
  {
    id: 'mat-4',
    concept: 'Pengetahuan & Pemahaman Umum',
    category: 'TPS',
    title: 'Sinonim, Antonim, dan Hubungan Kata',
    fullContent: `
# Kosakata dan Hubungan Kata dalam PPU

Sub-tes Pengetahuan dan Pemahaman Umum (PPU) sering menguji kekayaan kosakata dan kemampuan logika bahasa melalui hubungan antar kata.

## 1. Sinonim dan Antonim
- **Sinonim**: Persamaan makna kata. Penting untuk memahami konteks kalimat karena satu kata bisa memiliki sinonim berbeda tergantung konteksnya.
- **Antonim**: Lawan kata. Perhatikan lawan kata yang bersifat mutlak (hidup-mati) maupun gradasi (panas-dingin).

## 2. Analogi Kata (Hubungan Kata)
Menguji kemampuan logika dalam melihat pola hubungan antara sepasang kata.
- **Jenis Hubungan**:
  - *Sebab-Akibat*: Api : Panas
  - *Bagian-Seluruh*: Roda : Mobil
  - *Fungsi*: Pulpen : Menulis
  - *Tempat*: Ikan : Laut
  - *Alat-Pelaku*: Cangkul : Petani

## 3. Kata Serapan dan Ejaan
Memahami penulisan kata yang benar sesuai KBBI, terutama kata serapan dari bahasa asing (Inggris, Arab, Belanda).
- Contoh: *Analisa* (Salah) -> *Analisis* (Benar), *Praktek* (Salah) -> *Praktik* (Benar).

## 4. Ringkasan Poin Penting
- Perbanyak membaca berita dan artikel ilmiah untuk memperkaya kosakata.
- Gunakan metode eliminasi pada soal sinonim/antonim jika tidak tahu arti kata tersebut secara pasti.
- Analogi kata memerlukan identifikasi hubungan yang paling spesifik.
    `,
    summary: 'Perdalam penguasaan sinonim, antonim, dan logika hubungan kata. Pahami ejaan baku sesuai KBBI untuk memaksimalkan skor PPU.',
    sources: [
      { name: 'KBBI Daring', url: 'https://kbbi.kemdikbud.go.id/' },
      { name: 'Latihan Soal PPU SNBT', url: '#' }
    ]
  }
];
