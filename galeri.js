// FITUR ES6 #1: CONST - untuk variabel yang tidak berubah
const cards = document.querySelectorAll('.card');

// FITUR ES6 #2: LET - untuk variabel yang bisa berubah
let totalKlik = 0;

// ============================================
// FUNGSI UTAMA
// ============================================

// FITUR ES6 #3: ARROW FUNCTION (=>) - cara baru menulis fungsi
const tampilkanNamaProduk = (card) => {
  const content = card.querySelector('.card-content');
  
  if (content.style.display === 'none' || content.style.display === '') {
    content.style.display = 'block';
    totalKlik++;
    console.log('Produk ditampilkan');
  } else {
    content.style.display = 'none';
    console.log('Produk disembunyikan');
  }
};

const tambahEfekHover = (card) => {
  card.style.transform = 'translateY(-10px) scale(1.05)';
  card.style.boxShadow = '0 12px 40px rgba(255, 140, 66, 0.3)';
};

const hapusEfekHover = (card) => {
  card.style.transform = 'translateY(0) scale(1)';
  card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
};

const resetCard = (card) => {
  const content = card.querySelector('.card-content');
  content.style.display = 'none';
  card.style.transform = '';
  card.style.boxShadow = '';
};

// ============================================
// PASANG EVENT KE SEMUA CARD
// ============================================

// FITUR ES6 #4: FOR...OF LOOP - cara mudah looping array
for (const card of cards) {
  
  // Sembunyikan nama produk dulu
  const content = card.querySelector('.card-content');
  content.style.display = 'none';
  
  // Event: Klik untuk tampilkan/sembunyikan
  card.addEventListener('click', () => {
    tampilkanNamaProduk(card);
  });
  
  // Event: Hover - tambah efek
  card.addEventListener('mouseenter', () => {
    tambahEfekHover(card);
  });
  
  // Event: Mouse keluar - hapus efek
  card.addEventListener('mouseleave', () => {
    hapusEfekHover(card);
  });
  
  // Event: Double klik untuk reset
  card.addEventListener('dblclick', () => {
    resetCard(card);
  });
}

// ============================================
// FUNGSI UNTUK TOMBOL
// ============================================

// Reset semua card
function resetSemuaCard() {
  for (const card of cards) {
    resetCard(card);
  }
  console.log('Semua card direset!');
}

// Lihat produk yang sedang ditampilkan
function lihatProdukAktif() {
  // FITUR ES6 #5: TEMPLATE LITERAL (`${}`) - string dengan variabel
  console.log(`=== PRODUK YANG DITAMPILKAN ===`);
  
  let ada = false;
  let nomor = 1;
  
  for (const card of cards) {
    const content = card.querySelector('.card-content');
    const namaProduk = card.querySelector('.card-content h3');
    
    if (content.style.display === 'block') {
      console.log(`${nomor}. ${namaProduk.textContent}`);
      nomor++;
      ada = true;
    }
  }
  
  if (!ada) {
    console.log('Tidak ada produk yang ditampilkan');
  }
  
  console.log(`Total klik: ${totalKlik}`);
}

// Lihat statistik
function lihatStatistik() {
  console.log(`=== STATISTIK GALERI ===`);
  console.log(`Total Card: ${cards.length}`);
  console.log(`Total Klik: ${totalKlik}`);
  
  let jumlahTampil = 0;
  for (const card of cards) {
    const content = card.querySelector('.card-content');
    if (content.style.display === 'block') {
      jumlahTampil++;
    }
  }
  console.log(`Card Tampil: ${jumlahTampil}`);
  console.log(`Card Tersembunyi: ${cards.length - jumlahTampil}`);
}

// ============================================
// EXPORT FUNGSI (biar bisa dipanggil dari HTML button)
// ============================================

window.galleryModule = {
  reset: resetSemuaCard,
  logVisibleProducts: lihatProdukAktif
};

window.galleryDebug = {
  showStats: lihatStatistik
};

// PESAN SELAMAT DATANG

console.log('=== GALERI KERIPIK SINGKONG CANDRA ===');
console.log('Modul galeri sudah siap!');
console.log('Klik card untuk lihat nama produk');
console.log('');
console.log('Perintah Console:');
console.log('- window.galleryModule.reset()');
console.log('- window.galleryModule.logVisibleProducts()');
console.log('- window.galleryDebug.showStats()');
