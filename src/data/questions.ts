import { Question } from '../types/quiz';

export const QUESTIONS: Question[] = [
  // --- TPS: Penalaran Induktif ---
  {
    id: 'pi-1',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Amati pola berikut: 3, 6, 12, 24, ... Angka selanjutnya adalah?',
    options: ['30', '36', '48', '60', '72'],
    correctAnswer: 2,
    explanation: 'Pola perkalian dua (x2). 24 x 2 = 48.',
    irtParams: { difficulty: -1.5, discrimination: 1.2, guessing: 0.2 }
  },
  {
    id: 'pi-2',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Pola: 1, 4, 9, 16, 25, ... Angka ke-7 dari pola ini adalah?',
    options: ['36', '49', '64', '81', '100'],
    correctAnswer: 1,
    explanation: 'Pola bilangan kuadrat (n^2). Angka ke-7 adalah 7^2 = 49.',
    irtParams: { difficulty: 0.2, discrimination: 1.4, guessing: 0.2 }
  },
  {
    id: 'pi-3',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Pola: 2, 3, 5, 8, 13, 21, ... Dua angka selanjutnya adalah?',
    options: ['29, 42', '34, 55', '30, 45', '34, 50', '25, 38'],
    correctAnswer: 1,
    explanation: 'Deret Fibonacci (jumlah dua angka sebelumnya). 13+21=34, 21+34=55.',
    irtParams: { difficulty: 1.5, discrimination: 1.8, guessing: 0.2 }
  },
  {
    id: 'pi-4',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Jika mawar merah harum, melati putih harum, dan kamboja kuning harum, maka kesimpulan induktifnya adalah...',
    options: [
      'Semua bunga berwarna merah harum',
      'Semua bunga yang harum berwarna putih',
      'Semua bunga mungkin harum',
      'Beberapa bunga tidak harum',
      'Hanya kamboja yang harum'
    ],
    correctAnswer: 2,
    explanation: 'Penalaran induktif menarik kesimpulan umum dari contoh-contoh khusus. Karena beberapa contoh bunga harum, maka disimpulkan semua bunga mungkin harum.',
    irtParams: { difficulty: 0.5, discrimination: 1.3, guessing: 0.2 }
  },
  {
    id: 'pi-5',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Pola: A, D, G, J, ... Huruf selanjutnya adalah?',
    options: ['K', 'L', 'M', 'N', 'O'],
    correctAnswer: 2,
    explanation: 'Pola melompati dua huruf: A (bc) D (ef) G (hi) J (kl) M.',
    irtParams: { difficulty: -1.0, discrimination: 1.1, guessing: 0.2 }
  },

  // --- TPS: Penalaran Deduktif ---
  {
    id: 'pd-1',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Semua manusia fana. Socrates adalah manusia. Kesimpulan yang tepat adalah...',
    options: ['Socrates tidak fana', 'Socrates fana', 'Semua manusia adalah Socrates', 'Socrates adalah dewa', 'Tidak ada kesimpulan'],
    correctAnswer: 1,
    explanation: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B.',
    irtParams: { difficulty: -2.0, discrimination: 1.0, guessing: 0.2 }
  },
  {
    id: 'pd-2',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Jika hari hujan, maka tanah basah. Tanah tidak basah. Kesimpulan yang tepat adalah...',
    options: ['Hari hujan', 'Hari tidak hujan', 'Tanah kering', 'Hujan turun kemarin', 'Mungkin hari hujan'],
    correctAnswer: 1,
    explanation: 'Modus Tollens: p → q, ~q ∴ ~p.',
    irtParams: { difficulty: 0.5, discrimination: 1.5, guessing: 0.2 }
  },
  {
    id: 'pd-3',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Beberapa mahasiswa adalah aktivis. Semua aktivis pandai bicara. Kesimpulan yang tepat adalah...',
    options: [
      'Semua mahasiswa pandai bicara',
      'Beberapa mahasiswa pandai bicara',
      'Semua yang pandai bicara adalah mahasiswa',
      'Aktivis bukan mahasiswa',
      'Mahasiswa tidak pandai bicara'
    ],
    correctAnswer: 1,
    explanation: 'Karena beberapa mahasiswa adalah aktivis, dan semua aktivis pandai bicara, maka mahasiswa yang aktivis tersebut pasti pandai bicara.',
    irtParams: { difficulty: 1.2, discrimination: 1.6, guessing: 0.2 }
  },
  {
    id: 'pd-4',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'medium',
    type: 'complex_multiple_choice',
    question: 'Premis: "Jika lampu menyala, maka ada aliran listrik. Lampu tidak menyala." Tentukan kebenaran pernyataan berikut:',
    complexOptions: [
      { statement: 'Pasti tidak ada aliran listrik.', correct: false },
      { statement: 'Mungkin ada aliran listrik tapi lampu rusak.', correct: true },
      { statement: 'Aliran listrik menyebabkan lampu menyala.', correct: true },
      { statement: 'Lampu menyala jika tidak ada listrik.', correct: false }
    ],
    explanation: 'Pernyataan 1 salah karena ~p tidak menjamin ~q (Denying the antecedent). Pernyataan 2 benar secara logika dunia nyata. Pernyataan 3 benar sesuai premis p→q.',
    irtParams: { difficulty: 0.8, discrimination: 1.4, guessing: 0.0 }
  },

  // --- TPS: Penalaran Kuantitatif ---
  {
    id: 'pk-1',
    category: 'TPS',
    concept: 'Penalaran Kuantitatif',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Jika 3x = 12, maka x + 5 = ...',
    options: ['4', '7', '9', '12', '15'],
    correctAnswer: 2,
    explanation: 'x = 12/3 = 4. Maka x + 5 = 4 + 5 = 9.',
    irtParams: { difficulty: -1.5, discrimination: 1.1, guessing: 0.2 }
  },
  {
    id: 'pk-2',
    category: 'TPS',
    concept: 'Penalaran Kuantitatif',
    difficulty: 'medium',
    type: 'short_answer',
    question: 'Berapakah nilai dari (2^3 * 2^2) / 2^4?',
    shortAnswerCorrect: 2,
    explanation: '2^(3+2) / 2^4 = 2^5 / 2^4 = 2^(5-4) = 2^1 = 2.',
    irtParams: { difficulty: 0.3, discrimination: 1.3, guessing: 0.0 }
  },
  {
    id: 'pk-3',
    category: 'TPS',
    concept: 'Penalaran Kuantitatif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Sebuah toko memberikan diskon 20% kemudian diskon lagi 10% dari harga setelah diskon pertama. Total diskon yang diberikan adalah...',
    options: ['30%', '28%', '25%', '32%', '22%'],
    correctAnswer: 1,
    explanation: 'Misal harga 100. Diskon 20% -> 80. Diskon 10% dari 80 -> 8. Total diskon = 20 + 8 = 28%.',
    irtParams: { difficulty: 1.6, discrimination: 1.7, guessing: 0.2 }
  },

  // --- TPS: Pengetahuan & Pemahaman Umum (PPU) ---
  {
    id: 'ppu-1',
    category: 'TPS',
    concept: 'Pengetahuan & Pemahaman Umum',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Sinonim dari kata "MANGKUS" adalah...',
    options: ['Efisien', 'Efektif', 'Berguna', 'Cepat', 'Tepat'],
    correctAnswer: 1,
    explanation: 'Mangkus berarti efektif (berhasil guna). Sangkil berarti efisien (berdaya guna).',
    irtParams: { difficulty: -0.5, discrimination: 1.2, guessing: 0.2 }
  },
  {
    id: 'ppu-2',
    category: 'TPS',
    concept: 'Pengetahuan & Pemahaman Umum',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Antonim dari kata "PROGRESIF" adalah...',
    options: ['Agresif', 'Regresif', 'Aktif', 'Pasif', 'Statis'],
    correctAnswer: 1,
    explanation: 'Progresif berarti maju, lawannya adalah regresif yang berarti mundur.',
    irtParams: { difficulty: 0.4, discrimination: 1.3, guessing: 0.2 }
  },
  {
    id: 'ppu-3',
    category: 'TPS',
    concept: 'Pengetahuan & Pemahaman Umum',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Manakah penulisan kata serapan yang benar menurut KBBI?',
    options: ['Analisa', 'Kwitansi', 'Apotik', 'Sistem', 'Praktek'],
    correctAnswer: 3,
    explanation: 'Baku: Analisis, Kuitansi, Apotek, Sistem, Praktik.',
    irtParams: { difficulty: 1.2, discrimination: 1.5, guessing: 0.2 }
  },

  // --- TPS: Pemahaman Bacaan & Menulis (PBM) ---
  {
    id: 'pbm-1',
    category: 'TPS',
    concept: 'Pemahaman Bacaan & Menulis',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Kalimat manakah yang merupakan kalimat efektif?',
    options: [
      'Bagi para siswa-siswa diharapkan berkumpul.',
      'Para siswa diharapkan berkumpul.',
      'Untuk mempersingkat waktu, acara segera dimulai.',
      'Ia bekerja demi untuk keluarganya.',
      'Rumah di mana ia tinggal sangat besar.'
    ],
    correctAnswer: 1,
    explanation: 'Opsi B singkat dan padat. Opsi A pleonasme (para + siswa-siswa). Opsi C logisnya waktu dihemat bukan dipersingkat. Opsi D pleonasme (demi + untuk). Opsi E pengaruh bahasa asing (di mana).',
    irtParams: { difficulty: 0.6, discrimination: 1.4, guessing: 0.2 }
  },
  {
    id: 'pbm-2',
    category: 'TPS',
    concept: 'Pemahaman Bacaan & Menulis',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Penulisan kata depan yang benar adalah...',
    options: [
      'Ia pergi keluar kota.',
      'Buku itu diletakkan diatas meja.',
      'Mari kita makan di restoran.',
      'Surat itu dikirim kemana?',
      'Ia berdiri disamping saya.'
    ],
    correctAnswer: 2,
    explanation: 'Kata depan "di", "ke", "dari" ditulis terpisah dari kata yang mengikutinya jika menunjukkan tempat. "di restoran" benar.',
    irtParams: { difficulty: 1.3, discrimination: 1.5, guessing: 0.2 }
  },

  // --- TPS: Pengetahuan Kuantitatif (PK) ---
  {
    id: 'pkq-1',
    category: 'TPS',
    concept: 'Pengetahuan Kuantitatif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Jika x = 3 dan y = 4, berapakah nilai dari √(x^2 + y^2)?',
    options: ['5', '7', '12', '25', '1'],
    correctAnswer: 0,
    explanation: '√(3^2 + 4^2) = √(9 + 16) = √25 = 5.',
    irtParams: { difficulty: 0.2, discrimination: 1.2, guessing: 0.2 }
  },
  {
    id: 'pkq-2',
    category: 'TPS',
    concept: 'Pengetahuan Kuantitatif',
    difficulty: 'trap',
    type: 'short_answer',
    question: 'Berapakah luas lingkaran dengan jari-jari 7 cm? (Gunakan π = 22/7)',
    shortAnswerCorrect: 154,
    explanation: 'Luas = π * r^2 = 22/7 * 7 * 7 = 22 * 7 = 154.',
    irtParams: { difficulty: 1.4, discrimination: 1.6, guessing: 0.0 }
  },

  // --- Literasi Bahasa Indonesia ---
  {
    id: 'lit-id-1',
    category: 'Literasi Indonesia',
    concept: 'Literasi Bahasa Indonesia',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Teks: "Pemanasan global mengakibatkan mencairnya es di kutub. Hal ini menyebabkan kenaikan permukaan air laut yang mengancam kota-kota pesisir." Ide pokok paragraf tersebut adalah...',
    options: [
      'Mencairnya es di kutub utara',
      'Dampak pemanasan global terhadap permukaan laut',
      'Ancaman bagi kota pesisir',
      'Penyebab air laut naik',
      'Proses terjadinya pemanasan global'
    ],
    correctAnswer: 1,
    explanation: 'Teks menjelaskan hubungan sebab-akibat pemanasan global yang berujung pada kenaikan air laut.',
    irtParams: { difficulty: 0.2, discrimination: 1.2, guessing: 0.2 }
  },
  {
    id: 'lit-id-2',
    category: 'Literasi Indonesia',
    concept: 'Literasi Bahasa Indonesia',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Manakah kalimat yang mengandung majas personifikasi?',
    options: [
      'Wajahnya bersinar seperti rembulan.',
      'Angin malam membisikkan rahasia di telingaku.',
      'Dia bekerja keras membanting tulang.',
      'Suaranya menggelegar membelah angkasa.',
      'Rumahnya sangat besar seperti istana.'
    ],
    correctAnswer: 1,
    explanation: 'Personifikasi memberikan sifat manusia pada benda mati. "Angin membisikkan" adalah contohnya.',
    irtParams: { difficulty: 1.2, discrimination: 1.5, guessing: 0.2 }
  },

  // --- Literasi Bahasa Inggris ---
  {
    id: 'lit-en-1',
    category: 'Literasi Inggris',
    concept: 'Literasi Bahasa Inggris',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Text: "Artificial Intelligence (AI) is transforming the healthcare industry by providing faster diagnosis and personalized treatment plans." What is the main idea of the text?',
    options: [
      'The history of AI in medicine',
      'How AI is used in technology',
      'The impact of AI on healthcare',
      'The cost of AI in hospitals',
      'The risks of using AI for diagnosis'
    ],
    correctAnswer: 2,
    explanation: 'The text focuses on how AI is changing (transforming) healthcare through diagnosis and treatment.',
    irtParams: { difficulty: 0.3, discrimination: 1.3, guessing: 0.2 }
  },
  {
    id: 'lit-en-2',
    category: 'Literasi Inggris',
    concept: 'Literasi Bahasa Inggris',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'What is the synonym of the word "ENORMOUS"?',
    options: ['Small', 'Tiny', 'Huge', 'Weak', 'Soft'],
    correctAnswer: 2,
    explanation: 'Enormous means very large in size, quantity, or extent. Huge is the closest synonym.',
    irtParams: { difficulty: 1.4, discrimination: 1.1, guessing: 0.2 }
  },

  // --- Penalaran Matematika ---
  {
    id: 'pm-1',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Sebuah tangki air berbentuk tabung dengan jari-jari 1m dan tinggi 2m. Jika tangki tersebut diisi air hingga setengahnya, berapakah volume air tersebut? (Gunakan π = 3.14)',
    options: ['3.14 m^3', '6.28 m^3', '1.57 m^3', '12.56 m^3', '4.71 m^3'],
    correctAnswer: 0,
    explanation: 'Volume tabung = π * r^2 * h = 3.14 * 1^2 * 2 = 6.28 m^3. Setengahnya adalah 3.14 m^3.',
    irtParams: { difficulty: 0.5, discrimination: 1.4, guessing: 0.2 }
  },
  {
    id: 'pm-2',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'trap',
    type: 'short_answer',
    question: 'Jika rata-rata dari lima bilangan adalah 20, dan empat bilangan di antaranya adalah 15, 18, 22, dan 25, berapakah bilangan kelima?',
    shortAnswerCorrect: 20,
    explanation: 'Total = 5 * 20 = 100. Jumlah empat bilangan = 15 + 18 + 22 + 25 = 80. Bilangan kelima = 100 - 80 = 20.',
    irtParams: { difficulty: 1.2, discrimination: 1.6, guessing: 0.0 }
  },

  // --- HOTS: Penalaran Induktif ---
  {
    id: 'pi-hots-1',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Perhatikan urutan: 2, 6, 12, 20, 30, ... Pola apa yang paling tepat menggambarkan urutan ini?',
    options: [
      'n^2 + n',
      '2n + 4',
      'n^2 + 1',
      'n(n+1)',
      'Opsi A dan D benar'
    ],
    correctAnswer: 4,
    explanation: 'Pola adalah n(n+1) atau n^2 + n. Untuk n=1: 1(2)=2. n=2: 2(3)=6. n=3: 3(4)=12. n=4: 4(5)=20. n=5: 5(6)=30.',
    irtParams: { difficulty: 2.5, discrimination: 2.0, guessing: 0.2 }
  },
  // --- HOTS: Penalaran Deduktif ---
  {
    id: 'pd-hots-1',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Jika semua politisi jujur, maka negara akan makmur. Negara tidak makmur. Namun, diketahui bahwa beberapa politisi sebenarnya jujur. Kesimpulan yang paling logis adalah...',
    options: [
      'Semua politisi tidak jujur',
      'Beberapa politisi tidak jujur',
      'Kejujuran politisi tidak menjamin kemakmuran',
      'Negara akan makmur jika semua politisi jujur',
      'Tidak ada hubungan antara kejujuran dan kemakmuran'
    ],
    correctAnswer: 1,
    explanation: 'Dari "Jika semua jujur -> makmur" dan "Tidak makmur", kita simpulkan "Tidak semua politisi jujur". Karena diketahui "Beberapa jujur", maka kesimpulan yang pasti adalah "Beberapa politisi tidak jujur".',
    irtParams: { difficulty: 2.8, discrimination: 2.2, guessing: 0.2 }
  },
  // --- HOTS: Pengetahuan Kuantitatif ---
  {
    id: 'pk-hots-1',
    category: 'TPS',
    concept: 'Pengetahuan Kuantitatif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Jika f(x) = ax + b, f(1) = 5, dan f(2) = 8, berapakah nilai f(10)?',
    options: ['29', '32', '35', '38', '41'],
    correctAnswer: 1,
    explanation: 'f(1)=a+b=5. f(2)=2a+b=8. Kurangkan: a=3. Maka b=2. f(x)=3x+2. f(10)=3(10)+2=32.',
    irtParams: { difficulty: 2.0, discrimination: 1.8, guessing: 0.2 }
  },
  // --- HOTS: Penalaran Matematika ---
  {
    id: 'pm-hots-1',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Dalam sebuah kelas, 60% siswa adalah perempuan. Jika 25% dari siswa laki-laki menyukai basket dan ada 6 siswa laki-laki yang menyukai basket, berapakah total siswa di kelas tersebut?',
    options: ['40', '60', '80', '100', '120'],
    correctAnswer: 1,
    explanation: 'Laki-laki = 40%. 25% dari Laki-laki = 6 -> Laki-laki = 6 / 0.25 = 24. Jika 40% = 24, maka 100% = 24 / 0.4 = 60.',
    irtParams: { difficulty: 2.4, discrimination: 2.1, guessing: 0.2 }
  },
  // --- Additional Questions for Simulation ---
  {
    id: 'pi-6',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Pola: 5, 11, 23, 47, ... Angka selanjutnya adalah?',
    options: ['94', '95', '96', '97', '98'],
    correctAnswer: 1,
    explanation: 'Pola: (n * 2) + 1. 47 * 2 + 1 = 95.',
    irtParams: { difficulty: 0.6, discrimination: 1.4, guessing: 0.2 }
  },
  {
    id: 'pd-5',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Jika semua burung bisa terbang, dan penguin adalah burung, maka penguin bisa terbang. Pernyataan ini salah karena...',
    options: [
      'Premis pertama salah',
      'Premis kedua salah',
      'Kesimpulan tidak mengikuti premis',
      'Penguin bukan burung',
      'Burung tidak terbang'
    ],
    correctAnswer: 0,
    explanation: 'Logikanya valid (silogisme), tetapi premis pertama (semua burung bisa terbang) secara faktual salah karena ada burung yang tidak bisa terbang (seperti penguin).',
    irtParams: { difficulty: 0.7, discrimination: 1.5, guessing: 0.2 }
  },
  {
    id: 'pk-4-new',
    category: 'TPS',
    concept: 'Penalaran Kuantitatif',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Jika x + y = 10 dan x - y = 2, berapakah nilai x * y?',
    options: ['12', '20', '24', '16', '15'],
    correctAnswer: 2,
    explanation: '2x = 12 -> x = 6. y = 4. x * y = 24.',
    irtParams: { difficulty: -0.5, discrimination: 1.2, guessing: 0.2 }
  },
  {
    id: 'ppu-4-new',
    category: 'TPS',
    concept: 'Pengetahuan & Pemahaman Umum',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Apa arti dari kata "FILANTROPI"?',
    options: ['Cinta sesama manusia', 'Cinta alam', 'Cinta ilmu', 'Cinta seni', 'Cinta tanah air'],
    correctAnswer: 0,
    explanation: 'Filantropi adalah tindakan seseorang yang mencintai sesama manusia serta nilai kemanusiaan.',
    irtParams: { difficulty: 0.8, discrimination: 1.3, guessing: 0.2 }
  },
  {
    id: 'pbm-3-new',
    category: 'TPS',
    concept: 'Pemahaman Bacaan & Menulis',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Manakah penulisan judul karangan yang benar?',
    options: [
      'Laporan Hasil Observasi Di Hutan Lindung',
      'Laporan Hasil Observasi di Hutan Lindung',
      'Laporan hasil observasi di hutan lindung',
      'Laporan Hasil Observasi Di hutan lindung',
      'LAPORAN HASIL OBSERVASI DI HUTAN LINDUNG'
    ],
    correctAnswer: 1,
    explanation: 'Kata depan "di" dalam judul tidak menggunakan huruf kapital kecuali di awal kalimat.',
    irtParams: { difficulty: 0.5, discrimination: 1.2, guessing: 0.2 }
  },
  {
    id: 'pkq-3-new',
    category: 'TPS',
    concept: 'Pengetahuan Kuantitatif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Jika 2^x = 32, berapakah nilai x^2?',
    options: ['16', '25', '36', '49', '64'],
    correctAnswer: 1,
    explanation: '2^5 = 32, jadi x = 5. x^2 = 25.',
    irtParams: { difficulty: 0.4, discrimination: 1.3, guessing: 0.2 }
  },
  {
    id: 'lit-id-3-new',
    category: 'Literasi Indonesia',
    concept: 'Literasi Bahasa Indonesia',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Teks: "Pemerintah berencana membangun bendungan baru untuk mengatasi kekeringan. Namun, warga khawatir pembangunan tersebut akan menenggelamkan lahan pertanian mereka." Konflik utama dalam teks adalah...',
    options: [
      'Kekeringan yang berkepanjangan',
      'Rencana pembangunan bendungan',
      'Ketidaksetujuan warga terhadap lokasi bendungan',
      'Kekhawatiran warga akan kehilangan lahan',
      'Kegagalan pemerintah dalam sosialisasi'
    ],
    correctAnswer: 3,
    explanation: 'Teks menyoroti pertentangan antara rencana pemerintah dan kekhawatiran warga akan dampak pada lahan mereka.',
    irtParams: { difficulty: 0.6, discrimination: 1.4, guessing: 0.2 }
  },
  {
    id: 'lit-en-3-new',
    category: 'Literasi Inggris',
    concept: 'Literasi Bahasa Inggris',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Text: "The Great Barrier Reef is facing severe threats from climate change, which causes coral bleaching." What is the cause of coral bleaching according to the text?',
    options: ['Pollution', 'Overfishing', 'Climate change', 'Tourism', 'Natural predators'],
    correctAnswer: 2,
    explanation: 'The text explicitly states that climate change causes coral bleaching.',
    irtParams: { difficulty: 0.2, discrimination: 1.2, guessing: 0.2 }
  },
  {
    id: 'pm-3-new',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Sebuah toko memberikan diskon 50% + 20%. Jika harga awal barang adalah 100.000, berapakah harga akhirnya?',
    options: ['30.000', '40.000', '50.000', '70.000', '80.000'],
    correctAnswer: 1,
    explanation: 'Diskon 50% -> 50.000. Diskon 20% dari 50.000 -> 10.000. Harga akhir = 50.000 - 10.000 = 40.000.',
    irtParams: { difficulty: 0.7, discrimination: 1.4, guessing: 0.2 }
  },
  // --- Batch 3: More HOTS and Diverse Types ---
  {
    id: 'pi-7',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Pola: 1, 2, 6, 15, 31, ... Angka selanjutnya adalah?',
    options: ['47', '56', '62', '50', '45'],
    correctAnswer: 1,
    explanation: 'Pola selisih: +1, +4, +9, +16 (bilangan kuadrat). Selanjutnya +25. 31 + 25 = 56.',
    irtParams: { difficulty: 1.8, discrimination: 1.6, guessing: 0.2 }
  },
  {
    id: 'pd-6',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Jika semua X adalah Y, dan tidak ada Z yang merupakan Y, maka...',
    options: [
      'Semua X adalah Z',
      'Beberapa X adalah Z',
      'Tidak ada X yang merupakan Z',
      'Beberapa Z adalah X',
      'Semua Z adalah X'
    ],
    correctAnswer: 2,
    explanation: 'Jika X bagian dari Y, dan Z terpisah dari Y, maka X dan Z pasti terpisah.',
    irtParams: { difficulty: 1.5, discrimination: 1.7, guessing: 0.2 }
  },
  {
    id: 'pk-5-new',
    category: 'TPS',
    concept: 'Penalaran Kuantitatif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Jika p > q dan r < 0, maka pernyataan yang pasti benar adalah...',
    options: ['pr > qr', 'pr < qr', 'p+r > q+r', 'p/r > q/r', 'B dan C benar'],
    correctAnswer: 4,
    explanation: 'Mengalikan pertidaksamaan dengan bilangan negatif membalik tanda (pr < qr). Menambah bilangan yang sama tidak mengubah tanda (p+r > q+r).',
    irtParams: { difficulty: 0.9, discrimination: 1.4, guessing: 0.2 }
  },
  {
    id: 'ppu-5-new',
    category: 'TPS',
    concept: 'Pengetahuan & Pemahaman Umum',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Kata "EKSKAVASI" paling dekat maknanya dengan...',
    options: ['Penelitian', 'Penggalian', 'Penemuan', 'Pelestarian', 'Pemugaran'],
    correctAnswer: 1,
    explanation: 'Ekskavasi adalah penggalian yang dilakukan di tempat yang mengandung benda purbakala.',
    irtParams: { difficulty: 1.2, discrimination: 1.3, guessing: 0.2 }
  },
  {
    id: 'pbm-4-new',
    category: 'TPS',
    concept: 'Pemahaman Bacaan & Menulis',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Manakah kalimat yang tidak memiliki subjek?',
    options: [
      'Di dalam tas itu terdapat buku.',
      'Buku itu ada di dalam tas.',
      'Kepada para peserta diharapkan hadir tepat waktu.',
      'Peserta diharapkan hadir tepat waktu.',
      'A dan C benar.'
    ],
    correctAnswer: 2,
    explanation: 'Kalimat C diawali preposisi "Kepada" sehingga subjeknya hilang (menjadi keterangan). Kalimat A subjeknya "buku".',
    irtParams: { difficulty: 1.6, discrimination: 1.8, guessing: 0.2 }
  },
  {
    id: 'pkq-4-new',
    category: 'TPS',
    concept: 'Pengetahuan Kuantitatif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Jika x^2 - 4x + 3 = 0, maka nilai dari x1 + x2 adalah...',
    options: ['-4', '4', '3', '-3', '1'],
    correctAnswer: 1,
    explanation: 'Rumus jumlah akar: -b/a = -(-4)/1 = 4.',
    irtParams: { difficulty: 1.1, discrimination: 1.5, guessing: 0.2 }
  },
  {
    id: 'lit-id-4-new',
    category: 'Literasi Indonesia',
    concept: 'Literasi Bahasa Indonesia',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Teks: "Meskipun ekonomi digital tumbuh pesat, kesenjangan akses internet di daerah terpencil masih menjadi kendala serius bagi pemerataan kesejahteraan." Kalimat tersebut menyiratkan bahwa...',
    options: [
      'Ekonomi digital tidak bermanfaat bagi warga desa.',
      'Internet adalah satu-satunya faktor kesejahteraan.',
      'Pemerataan kesejahteraan terhambat oleh infrastruktur digital.',
      'Pemerintah gagal membangun jaringan internet.',
      'Warga daerah terpencil tidak butuh internet.'
    ],
    correctAnswer: 2,
    explanation: 'Teks menghubungkan kesenjangan akses (infrastruktur) dengan kendala pemerataan kesejahteraan.',
    irtParams: { difficulty: 1.4, discrimination: 1.6, guessing: 0.2 }
  },
  {
    id: 'lit-en-4-new',
    category: 'Literasi Inggris',
    concept: 'Literasi Bahasa Inggris',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Text: "The rapid depletion of fossil fuels has prompted scientists to explore sustainable energy alternatives such as solar and wind power." The word "prompted" is closest in meaning to...',
    options: ['Discouraged', 'Encouraged', 'Delayed', 'Prevented', 'Ignored'],
    correctAnswer: 1,
    explanation: 'Prompted means to cause or bring about an action. Encouraged is the closest synonym in this context.',
    irtParams: { difficulty: 1.3, discrimination: 1.4, guessing: 0.2 }
  },
  {
    id: 'pm-4-new',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Sebuah kotak berisi 5 bola merah dan 3 bola biru. Jika diambil 2 bola sekaligus secara acak, peluang terambilnya 2 bola merah adalah...',
    options: ['5/28', '10/28', '15/28', '20/28', '25/28'],
    correctAnswer: 1,
    explanation: 'Kombinasi 2 dari 5 = 10. Kombinasi 2 dari 8 = 28. Peluang = 10/28.',
    irtParams: { difficulty: 1.7, discrimination: 1.9, guessing: 0.2 }
  },
  {
    id: 'pi-8',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Pola: 100, 95, 85, 70, ... Angka selanjutnya adalah?',
    options: ['60', '55', '50', '45', '40'],
    correctAnswer: 2,
    explanation: 'Pola pengurangan: -5, -10, -15. Selanjutnya -20. 70 - 20 = 50.',
    irtParams: { difficulty: 0.4, discrimination: 1.2, guessing: 0.2 }
  },
  {
    id: 'pd-7',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'medium',
    type: 'multiple_choice',
    question: 'Jika hari ini Selasa, maka besok Rabu. Besok bukan Rabu. Kesimpulan?',
    options: ['Hari ini Selasa', 'Hari ini bukan Selasa', 'Besok Selasa', 'Kemarin Senin', 'Tidak ada kesimpulan'],
    correctAnswer: 1,
    explanation: 'Modus Tollens: p -> q, ~q ∴ ~p.',
    irtParams: { difficulty: 0.3, discrimination: 1.1, guessing: 0.2 }
  },
  {
    id: 'pk-6-new',
    category: 'TPS',
    concept: 'Penalaran Kuantitatif',
    difficulty: 'easy',
    type: 'multiple_choice',
    question: 'Manakah yang lebih besar: 0.5 atau 1/3?',
    options: ['0.5', '1/3', 'Sama besar', 'Tidak bisa ditentukan', '0.33'],
    correctAnswer: 0,
    explanation: '0.5 = 1/2. 1/2 > 1/3.',
    irtParams: { difficulty: -1.0, discrimination: 1.0, guessing: 0.2 }
  },
  // --- New HOTS Batch ---
  {
    id: 'pi-hots-2',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Amati pola: 1, 3, 7, 15, 31, ... Berapakah selisih antara angka ke-7 dan angka ke-6?',
    options: ['32', '64', '128', '63', '127'],
    correctAnswer: 1,
    explanation: 'Pola adalah 2^n - 1. Angka ke-6 adalah 2^6 - 1 = 63. Angka ke-7 adalah 2^7 - 1 = 127. Selisihnya adalah 127 - 63 = 64. Atau perhatikan pola selisih: +2, +4, +8, +16, +32... selisih berikutnya adalah 64.',
    irtParams: { difficulty: 2.2, discrimination: 1.8, guessing: 0.2 }
  },
  {
    id: 'pd-hots-2',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Premis 1: Jika semua kucing suka ikan, maka tidak ada anjing yang suka ikan. Premis 2: Ada anjing yang suka ikan. Kesimpulan yang paling tepat adalah...',
    options: [
      'Semua kucing tidak suka ikan',
      'Beberapa kucing tidak suka ikan',
      'Semua anjing suka ikan',
      'Kucing dan anjing sama-sama suka ikan',
      'Tidak ada kesimpulan yang valid'
    ],
    correctAnswer: 1,
    explanation: 'Menggunakan Modus Tollens: p → q, ~q ∴ ~p. p = "Semua kucing suka ikan", q = "Tidak ada anjing yang suka ikan". Karena ada anjing yang suka ikan (~q), maka kesimpulannya adalah "Tidak semua kucing suka ikan", yang berarti "Beberapa kucing tidak suka ikan".',
    irtParams: { difficulty: 2.5, discrimination: 2.0, guessing: 0.2 }
  },
  {
    id: 'pk-hots-2',
    category: 'TPS',
    concept: 'Penalaran Kuantitatif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Pekerjaan membangun jembatan dapat diselesaikan oleh 12 orang dalam waktu 20 hari. Setelah bekerja selama 8 hari, pekerjaan terhenti selama 4 hari. Agar jembatan selesai tepat waktu, berapa banyak tambahan pekerja yang diperlukan?',
    options: ['4 orang', '6 orang', '8 orang', '10 orang', '12 orang'],
    correctAnswer: 1,
    explanation: 'Total beban kerja = 12 * 20 = 240 orang-hari. Sisa beban setelah 8 hari = 240 - (12 * 8) = 240 - 96 = 144 orang-hari. Sisa waktu normal = 20 - 8 = 12 hari. Karena terhenti 4 hari, sisa waktu tersedia = 12 - 4 = 8 hari. Pekerja yang dibutuhkan = 144 / 8 = 18 orang. Tambahan pekerja = 18 - 12 = 6 orang.',
    irtParams: { difficulty: 2.3, discrimination: 1.9, guessing: 0.2 }
  },
  {
    id: 'ppu-hots-1-new',
    category: 'TPS',
    concept: 'Pengetahuan & Pemahaman Umum',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Analogi yang paling tepat untuk "MATAHARI : TERANG" adalah...',
    options: [
      'Api : Panas',
      'Es : Dingin',
      'Lampu : Listrik',
      'Air : Basah',
      'A, B, dan D benar'
    ],
    correctAnswer: 4,
    explanation: 'Matahari secara alami menghasilkan sifat terang. Api secara alami panas, Es secara alami dingin, dan Air secara alami basah. Lampu membutuhkan listrik (hubungan sebab-akibat/sumber), bukan sifat alami yang melekat tanpa energi luar dalam konteks yang sama.',
    irtParams: { difficulty: 2.1, discrimination: 1.7, guessing: 0.2 }
  },
  {
    id: 'pbm-hots-1-new',
    category: 'TPS',
    concept: 'Pemahaman Bacaan & Menulis',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Kalimat berikut yang memiliki pola dasar yang sama dengan kalimat "Adik bermain bola" adalah...',
    options: [
      'Ibu memasak nasi di dapur.',
      'Ayah pergi ke kantor pagi tadi.',
      'Kakak sedang tidur dengan lelap.',
      'Dia sangat pintar dalam matematika.',
      'Bunga itu harum sekali baunya.'
    ],
    correctAnswer: 0,
    explanation: '"Adik (S) bermain (P) bola (O)". Pola S-P-O. Opsi A: "Ibu (S) memasak (P) nasi (O) di dapur (K)". Pola dasarnya tetap S-P-O. Opsi B: S-P-K. Opsi C: S-P-K. Opsi D: S-P-K. Opsi E: S-P-K.',
    irtParams: { difficulty: 2.0, discrimination: 1.6, guessing: 0.2 }
  },
  {
    id: 'pkq-hots-2-new',
    category: 'TPS',
    concept: 'Pengetahuan Kuantitatif',
    difficulty: 'trap',
    type: 'short_answer',
    question: 'Jika x^2 + y^2 = 25 dan xy = 12, berapakah nilai dari (x + y)^2?',
    shortAnswerCorrect: 49,
    explanation: '(x + y)^2 = x^2 + y^2 + 2xy = 25 + 2(12) = 25 + 24 = 49.',
    irtParams: { difficulty: 2.2, discrimination: 1.8, guessing: 0.0 }
  },
  {
    id: 'lit-id-hots-1-new',
    category: 'Literasi Indonesia',
    concept: 'Literasi Bahasa Indonesia',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Teks: "Kebijakan subsidi energi seringkali menjadi pedang bermata dua. Di satu sisi, ia melindungi daya beli masyarakat menengah ke bawah. Di sisi lain, beban fiskal yang berat menghambat alokasi anggaran untuk sektor produktif seperti pendidikan dan infrastruktur." Apa asumsi yang mendasari argumen penulis?',
    options: [
      'Subsidi energi adalah penyebab utama kegagalan ekonomi.',
      'Anggaran negara bersifat terbatas dan memerlukan prioritas alokasi.',
      'Masyarakat menengah ke bawah tidak butuh pendidikan.',
      'Infrastruktur lebih penting daripada daya beli masyarakat.',
      'Pemerintah harus menghapus seluruh subsidi energi.'
    ],
    correctAnswer: 1,
    explanation: 'Penulis berargumen bahwa subsidi menghambat alokasi ke sektor lain, yang mengasumsikan bahwa anggaran itu terbatas (zero-sum game) sehingga harus ada prioritas.',
    irtParams: { difficulty: 2.4, discrimination: 2.0, guessing: 0.2 }
  },
  {
    id: 'lit-en-hots-1-new',
    category: 'Literasi Inggris',
    concept: 'Literasi Bahasa Inggris',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Text: "The ethical implications of genetic engineering extend beyond individual health to the very definition of what it means to be human. As we gain the power to edit the blueprint of life, we must ask whether we are playing God or simply fulfilling our evolutionary potential." What is the author\'s tone in this passage?',
    options: [
      'Indifferent and detached',
      'Optimistic and enthusiastic',
      'Reflective and questioning',
      'Aggressive and condemnatory',
      'Sarcastic and mocking'
    ],
    correctAnswer: 2,
    explanation: 'The author uses phrases like "we must ask" and explores deep ethical questions, indicating a reflective and questioning tone.',
    irtParams: { difficulty: 2.6, discrimination: 2.2, guessing: 0.2 }
  },
  {
    id: 'pm-hots-2-new',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'trap',
    type: 'short_answer',
    question: 'Sebuah kotak tanpa tutup dibuat dari selembar karton persegi berukuran 12x12 cm dengan memotong persegi berukuran 2x2 cm pada setiap sudutnya. Berapakah volume kotak yang terbentuk (dalam cm^3)?',
    shortAnswerCorrect: 128,
    explanation: 'Panjang dan lebar kotak = 12 - 2(2) = 8 cm. Tinggi kotak = 2 cm. Volume = 8 * 8 * 2 = 128 cm^3.',
    irtParams: { difficulty: 2.3, discrimination: 1.9, guessing: 0.0 }
  },
  {
    id: 'pm-hots-3-new',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'trap',
    type: 'short_answer',
    question: 'Dalam sebuah kompetisi, skor ditentukan sebagai berikut: Benar (+4), Salah (-2), Tidak Dijawab (-1). Dari 50 soal, seorang peserta menjawab 42 soal dan memperoleh skor total 100. Berapakah jumlah soal yang dijawab dengan benar?',
    shortAnswerCorrect: 32,
    explanation: 'Misal Benar = B, Salah = S. B + S = 42. Tidak dijawab = 50 - 42 = 8. Skor: 4B - 2S - 8 = 100 -> 4B - 2S = 108 -> 2B - S = 54. Eliminasi dengan B + S = 42: (2B - S) + (B + S) = 54 + 42 -> 3B = 96 -> B = 32.',
    irtParams: { difficulty: 2.5, discrimination: 2.1, guessing: 0.0 }
  },
  {
    id: 'pi-hots-1',
    category: 'TPS',
    concept: 'Penalaran Induktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Jika 3 @ 4 = 25, 5 @ 12 = 169, dan 8 @ 15 = 289, maka berapakah nilai dari 7 @ 24?',
    options: ['529', '625', '576', '676', '441'],
    correctAnswer: 1,
    explanation: 'Pola: a @ b = a^2 + b^2. 7^2 + 24^2 = 49 + 576 = 625.',
    irtParams: { difficulty: 2.3, discrimination: 1.9, guessing: 0.2 }
  },
  {
    id: 'pd-hots-1',
    category: 'TPS',
    concept: 'Penalaran Deduktif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Premis 1: Jika semua siswa rajin, maka sekolah akan berprestasi. Premis 2: Jika sekolah berprestasi, maka banyak donatur akan datang. Premis 3: Tidak banyak donatur yang datang. Kesimpulan yang sah adalah...',
    options: [
      'Beberapa siswa tidak rajin.',
      'Semua siswa tidak rajin.',
      'Ada siswa yang rajin.',
      'Sekolah tidak berprestasi.',
      'Sekolah mungkin berprestasi.'
    ],
    correctAnswer: 0,
    explanation: 'Silogisme: p -> q, q -> r, ~r. Maka ~p. ~p (Ingkaran dari "Semua siswa rajin") adalah "Ada/Beberapa siswa tidak rajin".',
    irtParams: { difficulty: 2.4, discrimination: 2.0, guessing: 0.2 }
  },
  {
    id: 'pq-hots-1',
    category: 'TPS',
    concept: 'Penalaran Kuantitatif',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Apakah x > y? (1) x + y > 0 (2) x^2 > y^2',
    options: [
      'Pernyataan (1) saja cukup.',
      'Pernyataan (2) saja cukup.',
      'Dua pernyataan bersama-sama cukup.',
      'Pernyataan (1) atau (2) saja cukup.',
      'Pernyataan (1) dan (2) tidak cukup.'
    ],
    correctAnswer: 4,
    explanation: 'Dari (1), x=2, y=-1 (x>y) atau x=-1, y=2 (x<y). Dari (2), x=2, y=1 (x>y) atau x=-2, y=1 (x<y). Gabungan: x=2, y=-1 (x>y) atau x=-2, y=1 (x<y). Tetap tidak cukup.',
    irtParams: { difficulty: 2.7, discrimination: 2.3, guessing: 0.2 }
  },
  {
    id: 'ppu-hots-1',
    category: 'TPS',
    concept: 'Pengetahuan & Pemahaman Umum',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Kata "paradoks" dalam kalimat "Kemajuan teknologi membawa paradoks dalam interaksi sosial" paling dekat maknanya dengan...',
    options: ['Keselarasan', 'Pertentangan', 'Kemajuan', 'Keajaiban', 'Kepastian'],
    correctAnswer: 1,
    explanation: 'Paradoks merujuk pada situasi yang seolah-olah bertentangan dengan pendapat umum atau logika, namun kenyataannya mengandung kebenaran.',
    irtParams: { difficulty: 2.1, discrimination: 1.7, guessing: 0.2 }
  },
  {
    id: 'pk-hots-1',
    category: 'TPS',
    concept: 'Pengetahuan Kuantitatif',
    difficulty: 'trap',
    type: 'short_answer',
    question: 'Jika f(x) = 2x + 3 dan g(f(x)) = 4x^2 + 12x + 10, berapakah nilai g(5)?',
    shortAnswerCorrect: 26,
    explanation: 'f(x)=5 -> 2x+3=5 -> 2x=2 -> x=1. g(5) = g(f(1)) = 4(1)^2 + 12(1) + 10 = 4 + 12 + 10 = 26.',
    irtParams: { difficulty: 2.4, discrimination: 2.0, guessing: 0.0 }
  },
  {
    id: 'lit-id-complex-1',
    category: 'Literasi Indonesia',
    concept: 'Literasi Bahasa Indonesia',
    difficulty: 'trap',
    type: 'complex_multiple_choice',
    question: 'Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan teks: "Penggunaan kecerdasan buatan (AI) di sektor pendidikan dapat meningkatkan efisiensi administratif, namun berisiko mengurangi interaksi personal antara guru dan siswa."',
    complexOptions: [
      { statement: 'AI hanya bermanfaat untuk tugas administratif.', correct: false },
      { statement: 'Penulis mengkhawatirkan aspek sosial dari penggunaan AI.', correct: true },
      { statement: 'Guru akan digantikan sepenuhnya oleh AI menurut teks.', correct: false }
    ],
    explanation: 'Teks menyebutkan AI dapat meningkatkan efisiensi (bukan hanya itu manfaatnya), berisiko mengurangi interaksi (kekhawatiran sosial), dan tidak menyebutkan guru akan digantikan sepenuhnya.',
    irtParams: { difficulty: 2.2, discrimination: 1.8, guessing: 0.1 }
  },
  {
    id: 'lit-en-hots-2',
    category: 'Literasi Inggris',
    concept: 'Literasi Bahasa Inggris',
    difficulty: 'trap',
    type: 'multiple_choice',
    question: 'Text: "The rapid melting of Arctic ice is not just a regional concern but a global tipping point. As the white surface disappears, the ocean absorbs more heat, accelerating a feedback loop that could destabilize the entire planet\'s climate system." What is the primary purpose of the passage?',
    options: [
      'To describe the beauty of the Arctic landscape.',
      'To warn about the global consequences of Arctic ice loss.',
      'To promote tourism in the polar regions.',
      'To explain the history of climate change research.',
      'To argue that the Arctic ice melting is a natural cycle.'
    ],
    correctAnswer: 1,
    explanation: 'The text focuses on how Arctic ice melting affects the global climate system and warns of a "tipping point".',
    irtParams: { difficulty: 2.3, discrimination: 1.9, guessing: 0.2 }
  },
  {
    id: 'pm-hots-4',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'trap',
    type: 'short_answer',
    question: 'Dua buah dadu dilempar bersamaan. Berapakah peluang munculnya mata dadu yang berjumlah 7 atau 11? (Tuliskan dalam bentuk persentase bulat, misal: 25)',
    shortAnswerCorrect: 22,
    explanation: 'Jumlah 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 cara. Jumlah 11: (5,6), (6,5) -> 2 cara. Total = 8 cara. Peluang = 8/36 = 2/9 ≈ 0.222... -> 22%.',
    irtParams: { difficulty: 2.4, discrimination: 2.0, guessing: 0.0 }
  },
  {
    id: 'pm-hots-5',
    category: 'Penalaran Matematika',
    concept: 'Penalaran Matematika',
    difficulty: 'trap',
    type: 'complex_multiple_choice',
    question: 'Sebuah toko memberikan diskon bertingkat: 20% untuk pembelian pertama, dan tambahan diskon 10% dari harga setelah diskon pertama untuk pembelian kedua. Tentukan kebenaran pernyataan berikut:',
    complexOptions: [
      { statement: 'Total diskon yang didapat adalah 30%.', correct: false },
      { statement: 'Jika harga awal 100rb, harga akhir adalah 72rb.', correct: true },
      { statement: 'Diskon kedua nilainya lebih kecil daripada diskon pertama.', correct: true }
    ],
    explanation: 'Harga setelah diskon 20% = 80%. Diskon kedua = 10% dari 80% = 8%. Total diskon = 20% + 8% = 28%. Harga akhir = 100rb - 28rb = 72rb.',
    irtParams: { difficulty: 2.5, discrimination: 2.1, guessing: 0.1 }
  }
];
