// Ambil elemen form dan input
    const form = document.getElementById('webinarForm');
    const namaLengkap = document.getElementById('namaLengkap');
    const email = document.getElementById('email');
    const noHp = document.getElementById('noHp');
    const topikWebinar = document.getElementById('topikWebinar');
    const persetujuan = document.getElementById('persetujuan');
    const successMessage = document.getElementById('successMessage');

    // Fungsi untuk menampilkan error
    function showError(inputElement, errorElement, message) {
      inputElement.classList.add('error');
      inputElement.classList.remove('success');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }

    // Fungsi untuk menampilkan success
    function showSuccess(inputElement, errorElement) {
      inputElement.classList.remove('error');
      inputElement.classList.add('success');
      errorElement.classList.remove('show');
    }

    // Validasi Nama Lengkap
    function validateNama() {
      const errorNama = document.getElementById('errorNama');
      const value = namaLengkap.value.trim();

      if (value === '') {
        showError(namaLengkap, errorNama, 'Nama lengkap wajib diisi');
        return false;
      } else if (value.length < 3) {
        showError(namaLengkap, errorNama, 'Nama lengkap minimal 3 karakter');
        return false;
      } else {
        showSuccess(namaLengkap, errorNama);
        return true;
      }
    }

    // Validasi Email
    function validateEmail() {
      const errorEmail = document.getElementById('errorEmail');
      const value = email.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (value === '') {
        showError(email, errorEmail, 'Email wajib diisi');
        return false;
      } else if (!emailRegex.test(value)) {
        showError(email, errorEmail, 'Format email tidak valid');
        return false;
      } else if (value.toLowerCase().includes('@yahoo.com')) {
        showError(email, errorEmail, 'Email dengan domain yahoo.com tidak diperbolehkan');
        return false;
      } else {
        showSuccess(email, errorEmail);
        return true;
      }
    }

    // Validasi No HP
    function validateNoHp() {
      const errorHp = document.getElementById('errorHp');
      const value = noHp.value.trim();
      const numberRegex = /^[0-9]+$/;

      if (value === '') {
        showError(noHp, errorHp, 'No HP wajib diisi');
        return false;
      } else if (!numberRegex.test(value)) {
        showError(noHp, errorHp, 'No HP harus berupa angka');
        return false;
      } else if (value.length < 10 || value.length > 13) {
        showError(noHp, errorHp, 'No HP harus antara 10-13 digit');
        return false;
      } else {
        showSuccess(noHp, errorHp);
        return true;
      }
    }

    // Validasi Topik Webinar
    function validateTopik() {
      const errorTopik = document.getElementById('errorTopik');
      const value = topikWebinar.value;

      if (value === '') {
        showError(topikWebinar, errorTopik, 'Pilihan topik webinar wajib dipilih');
        return false;
      } else {
        showSuccess(topikWebinar, errorTopik);
        return true;
      }
    }

    // Validasi Persetujuan
    function validatePersetujuan() {
      const errorPersetujuan = document.getElementById('errorPersetujuan');

      if (!persetujuan.checked) {
        showError(persetujuan, errorPersetujuan, 'Anda harus menyetujui syarat dan ketentuan');
        return false;
      } else {
        showSuccess(persetujuan, errorPersetujuan);
        return true;
      }
    }

    // Event listener untuk validasi real-time
    namaLengkap.addEventListener('blur', validateNama);
    namaLengkap.addEventListener('input', validateNama);

    email.addEventListener('blur', validateEmail);
    email.addEventListener('input', validateEmail);

    noHp.addEventListener('blur', validateNoHp);
    noHp.addEventListener('input', validateNoHp);

    topikWebinar.addEventListener('change', validateTopik);
    topikWebinar.addEventListener('blur', validateTopik);

    persetujuan.addEventListener('change', validatePersetujuan);

    // Event listener untuk submit form
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validasi semua field
      const isNamaValid = validateNama();
      const isEmailValid = validateEmail();
      const isNoHpValid = validateNoHp();
      const isTopikValid = validateTopik();
      const isPersetujuanValid = validatePersetujuan();

      // Jika semua valid, tampilkan pesan sukses dan reset form
      if (isNamaValid && isEmailValid && isNoHpValid && isTopikValid && isPersetujuanValid) {
        successMessage.classList.add('show');
        
        // Reset form dan status validasi
        form.reset();
        
        // Hapus class success/error dari semua input
        [namaLengkap, email, noHp, topikWebinar, persetujuan].forEach(input => {
          input.classList.remove('success', 'error');
        });

        // Scroll ke pesan sukses
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Sembunyikan pesan sukses setelah 5 detik
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);
      } else {
        // Scroll ke error pertama
        const firstError = document.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });