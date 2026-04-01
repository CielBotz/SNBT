import { PTN } from '../types/quiz';

export const PTN_DATA: PTN[] = [
  {
    id: 'ui',
    name: 'Universitas Indonesia',
    location: 'Depok, Jawa Barat',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/0/0b/Lambang_Universitas_Indonesia.svg/1200px-Lambang_Universitas_Indonesia.svg.png',
    prodi: [
      { id: 'ui-fk', name: 'Kedokteran', passingGrade: 785, capacity: 180, applicants: 3500 },
      { id: 'ui-ilkom', name: 'Ilmu Komputer', passingGrade: 760, capacity: 120, applicants: 2800 },
      { id: 'ui-hukum', name: 'Hukum', passingGrade: 720, capacity: 300, applicants: 4500 },
      { id: 'ui-akuntansi', name: 'Akuntansi', passingGrade: 740, capacity: 200, applicants: 3200 },
      { id: 'ui-psikologi', name: 'Psikologi', passingGrade: 710, capacity: 250, applicants: 3800 },
    ]
  },
  {
    id: 'itb',
    name: 'Institut Teknologi Bandung',
    location: 'Bandung, Jawa Barat',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/a/ae/Logo_ITB.svg/1200px-Logo_ITB.svg.png',
    prodi: [
      { id: 'itb-stei', name: 'STEI (Sekolah Teknik Elektro dan Informatika)', passingGrade: 775, capacity: 250, applicants: 4200 },
      { id: 'itb-ftmd', name: 'FTMD (Fakultas Teknik Mesin dan Dirgantara)', passingGrade: 745, capacity: 200, applicants: 3100 },
      { id: 'itb-sbm', name: 'SBM (Sekolah Bisnis dan Manajemen)', passingGrade: 755, capacity: 150, applicants: 3800 },
      { id: 'itb-fsrd', name: 'FSRD (Fakultas Seni Rupa dan Desain)', passingGrade: 690, capacity: 120, applicants: 1500 },
    ]
  },
  {
    id: 'ugm',
    name: 'Universitas Gadjah Mada',
    location: 'Sleman, DI Yogyakarta',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/a/a2/Logo_UGM.svg/1200px-Logo_UGM.svg.png',
    prodi: [
      { id: 'ugm-fk', name: 'Kedokteran', passingGrade: 780, capacity: 175, applicants: 3200 },
      { id: 'ugm-hi', name: 'Hubungan Internasional', passingGrade: 735, capacity: 80, applicants: 2500 },
      { id: 'ugm-manajemen', name: 'Manajemen', passingGrade: 730, capacity: 150, applicants: 3600 },
      { id: 'ugm-sipil', name: 'Teknik Sipil', passingGrade: 715, capacity: 180, applicants: 2800 },
    ]
  },
  {
    id: 'unair',
    name: 'Universitas Airlangga',
    location: 'Surabaya, Jawa Timur',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/b/b8/Logo_Universitas_Airlangga.svg/1200px-Logo_Universitas_Airlangga.svg.png',
    prodi: [
      { id: 'unair-fk', name: 'Kedokteran', passingGrade: 770, capacity: 200, applicants: 2900 },
      { id: 'unair-fkg', name: 'Kedokteran Gigi', passingGrade: 740, capacity: 120, applicants: 1800 },
      { id: 'unair-farmasi', name: 'Farmasi', passingGrade: 725, capacity: 150, applicants: 2200 },
    ]
  },
  {
    id: 'its',
    name: 'Institut Teknologi Sepuluh Nopember',
    location: 'Surabaya, Jawa Timur',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/a/a2/Logo_ITS.svg/1200px-Logo_ITS.svg.png',
    prodi: [
      { id: 'its-if', name: 'Teknik Informatika', passingGrade: 750, capacity: 150, applicants: 3100 },
      { id: 'its-si', name: 'Sistem Informasi', passingGrade: 730, capacity: 120, applicants: 2400 },
      { id: 'its-elektro', name: 'Teknik Elektro', passingGrade: 710, capacity: 180, applicants: 2100 },
    ]
  }
];
