$(document).ready(function() {
    console.log('=== KERIPIK SINGKONG CANDRA ===');
    console.log('jQuery & Bootstrap loaded successfully!');
    
    // Initialize all components
    initializeComponents();
    initializeEventListeners();
    loadPageSpecificFunctions();
});

/* ============================================
   GLOBAL VARIABLES
   ============================================ */
const namaUMKM = "Keripik Singkong Candra";
const pemilikUMKM = "Candra";
const tahunBerdiri = 2025;
let totalClicks = 0;

/* ============================================
   INITIALIZATION FUNCTIONS
   ============================================ */

function initializeComponents() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Welcome message (only once)
    if (!localStorage.getItem("welcomeShown")) {
        setTimeout(function() {
            alert("🍠 Selamat datang di " + namaUMKM + "!");
            alert("Kami menyediakan keripik singkong premium dengan berbagai varian rasa!");
            localStorage.setItem("welcomeShown", "true");
        }, 500);
    }
}

function initializeEventListeners() {
    // EVENT #1: Smooth Scroll untuk anchor links
    $('a[href^="#"]').on('click', function(e) {
        if ($(this).attr('href') !== '#') {
            e.preventDefault();
            const target = $(this).attr('href');
            if ($(target).length) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 70
                }, 800, 'swing');
            }
        }
    });
    
    // EVENT #2: Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar-custom').addClass('shadow-lg');
        } else {
            $('.navbar-custom').removeClass('shadow-lg');
        }
    });
    
    // EVENT #3: Hover effect pada cards
    $('.hover-card, .contact-card').hover(
        function() {
            $(this).addClass('shadow-lg');
        },
        function() {
            $(this).removeClass('shadow-lg');
        }
    );
    
    // EVENT #4: Social icon animation
    $('.social-icon, .social-links a').hover(
        function() {
            $(this).css('animation', 'pulse 0.5s infinite');
        },
        function() {
            $(this).css('animation', 'none');
        }
    );
    
    // EVENT #5: Auto fade alerts
    $('.alert:not(.alert-dismissible)').delay(5000).fadeOut('slow');
}

function loadPageSpecificFunctions() {
    const pathname = window.location.pathname;
    const page = pathname.substring(pathname.lastIndexOf('/') + 1);
    
    // Load specific functions based on current page
    if (page === 'index.html' || page === '') {
        initializeHomePage();
    } else if (page === 'galeri.html') {
        initializeGalleryPage();
    } else if (page === 'produk.html') {
        initializeProductPage();
    } else if (page === 'kontak.html') {
        initializeContactPage();
    } else if (page === 'tentang.html') {
        initializeAboutPage();
    }
}

/* ============================================
   HOME PAGE FUNCTIONS
   ============================================ */

function initializeHomePage() {
    console.log('Home page initialized');
    
    // Animate hero section
    $('.hero h1, .hero p').css({
        'opacity': '0',
        'transform': 'translateY(30px)'
    });
    
    setTimeout(function() {
        $('.hero h1').animate({ opacity: 1 }, 800);
        $('.hero p').delay(200).animate({ opacity: 1 }, 800);
    }, 200);
}

/* ============================================
   GALLERY PAGE FUNCTIONS
   ============================================ */

function initializeGalleryPage() {
    console.log('Gallery page initialized');
    
    // EVENT: Click untuk toggle card content
    $('.gallery-card').on('click', function(e) {
        if (!$(e.target).is('span')) {
            const cardBody = $(this).find('.card-body');
            cardBody.slideToggle(300);
            totalClicks++;
            updateGalleryStats();
            
            $(this).addClass('zoom-effect');
            setTimeout(() => {
                $(this).removeClass('zoom-effect');
            }, 300);
        }
    });

    // EVENT: Double click untuk reset
    $('.gallery-card').on('dblclick', function() {
        const cardBody = $(this).find('.card-body');
        cardBody.slideUp(300);
        $(this).removeClass('shadow-lg');
        updateGalleryStats();
    });

    // EVENT: Hover effect pada gambar
    $('.gallery-card img').hover(
        function() {
            $(this).parent().addClass('shadow-lg');
        },
        function() {
            $(this).parent().removeClass('shadow-lg');
        }
    );

    // EVENT: Show all button
    $('#showAllBtn').on('click', function() {
        $('.card-body').slideDown(400);
        updateGalleryStats();
        $(this).addClass('zoom-effect');
        setTimeout(() => $(this).removeClass('zoom-effect'), 300);
    });

    // EVENT: Hide all button
    $('#hideAllBtn').on('click', function() {
        $('.card-body').slideUp(400);
        updateGalleryStats();
        $(this).addClass('zoom-effect');
        setTimeout(() => $(this).removeClass('zoom-effect'), 300);
    });

    // EVENT: Fade in pada scroll
    $(window).on('scroll', function() {
        $('.gallery-card').each(function() {
            const cardTop = $(this).offset().top;
            const scrollTop = $(window).scrollTop() + $(window).height();
            
            if (scrollTop > cardTop + 100) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    });

    // Initial setup
    $('.gallery-card').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.5s ease'
    });

    // Animate cards on load
    setTimeout(function() {
        $('.gallery-card').each(function(index) {
            setTimeout(() => {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }, index * 100);
        });
    }, 200);
}

function updateGalleryStats() {
    const visibleCount = $('.card-body:visible').length;
    $('#visibleCount').text(visibleCount);
    $('#totalClicks').text(totalClicks);
    $('#statsAlert').fadeIn();
}

/* ============================================
   PRODUCT PAGE FUNCTIONS
   ============================================ */

function initializeProductPage() {
    console.log('Product page initialized');
    
    // Load testimonials
    loadTestimonials();
    
    // Age checker
    initializeAgeChecker();
    
    // Calculator
    initializeCalculator();
    
    // Table hover effect
    $('.table-custom tbody tr').hover(
        function() { $(this).addClass('table-active'); },
        function() { $(this).removeClass('table-active'); }
    );
    
    // Animate on scroll
    $(window).on('scroll', function() {
        $('.testimonial-card').each(function() {
            const cardTop = $(this).offset().top;
            const scrollTop = $(window).scrollTop() + $(window).height();
            
            if (scrollTop > cardTop + 50) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    });

    // Initial setup
    $('.testimonial-card').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease'
    });
}

function loadTestimonials() {
    const testimonials = [
        { nama: 'Muhammad Sandi Ramadhan', bintang: 5, produk: 'Original', komentar: 'Keripik terenak! Renyah dan tidak berminyak.' },
        { nama: 'Siti Nurhaliza', bintang: 5, produk: 'Balado', komentar: 'Pedasnya pas! Jadi favorit keluarga.' },
        { nama: 'Ahmad Putra Nur', bintang: 5, produk: 'Keju', komentar: 'Rasa kejunya mantap! Anak-anak suka.' },
        { nama: 'Dewi Lestari', bintang: 5, produk: 'Bawang', komentar: 'Aroma bawangnya menggoda!' },
        { nama: 'Agung Putra', bintang: 5, produk: 'Keju', komentar: 'Rasa kejunya sangat pas di mulut dan bikin nagih!' },
        { nama: 'Cantika Putri', bintang: 5, produk: 'Jagung', komentar: 'Jagungnya kerasa banget dan teksturnya gurih.' },
        { nama: 'Doni Saputra', bintang: 5, produk: 'Keju', komentar: 'Rasa kejunya mantap bercampur dengan kerenyahan keripiknya!' },
        { nama: 'Indra Pratama', bintang: 5, produk: 'Balado', komentar: 'Baladonya sangat melekat di lidah dan rasa pedas campur kerenyahan keripiknya sangat lezat.' }
    ];

    testimonials.forEach(testi => {
        const stars = '⭐'.repeat(testi.bintang);
        const initial = testi.nama.charAt(0);
        
        const html = `
            <div class="col-md-6 col-lg-3">
                <div class="card testimonial-card">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <div class="testimonial-avatar me-3">${initial}</div>
                            <div>
                                <h6 class="mb-0">${testi.nama}</h6>
                                <small class="text-muted">${testi.produk}</small>
                            </div>
                        </div>
                        <div class="mb-2">${stars}</div>
                        <p class="card-text">${testi.komentar}</p>
                    </div>
                </div>
            </div>
        `;
        
        $('#testimonialContainer').append(html);
    });
}

function initializeAgeChecker() {
    // EVENT: Age checker dengan Enter key support
    $('#checkAgeBtn, #ageInput').on('click keypress', function(e) {
        if (e.type === 'click' || e.keyCode === 13) {
            e.preventDefault();
            checkAge();
        }
    });
}

function checkAge() {
    const age = parseInt($('#ageInput').val());
    const resultDiv = $('#ageResult');
    
    if (!age || age < 1) {
        resultDiv.removeClass()
                 .addClass('age-result alert alert-danger')
                 .text('⚠️ Mohon masukkan usia yang valid!')
                 .fadeIn();
        return;
    }
    
    let category, emoji, alertClass;
    
    if (age < 13) {
        category = 'Anak-anak'; 
        emoji = '👶'; 
        alertClass = 'alert-warning';
    } else if (age <= 17) {
        category = 'Remaja'; 
        emoji = '🧑'; 
        alertClass = 'alert-info';
    } else if (age <= 60) {
        category = 'Dewasa'; 
        emoji = '👨'; 
        alertClass = 'alert-success';
    } else {
        category = 'Lansia'; 
        emoji = '👴'; 
        alertClass = 'alert-primary';
    }
    
    resultDiv.removeClass()
             .addClass(`age-result alert ${alertClass}`)
             .html(`${emoji} <strong>Kategori:</strong> ${category} (${age} tahun)`)
             .fadeIn();
}

function initializeCalculator() {
    // EVENT: Real-time kalkulator
    $('#productSelect, #quantityInput').on('change input', function() {
        const price = $('#productSelect').val();
        const qty = $('#quantityInput').val();
        
        if (price && qty > 0) {
            calculatePrice(price, qty);
        }
    });

    // EVENT: Form submit
    $('#calculatorForm').on('submit', function(e) {
        e.preventDefault();
        const price = $('#productSelect').val();
        const qty = $('#quantityInput').val();
        
        if (!price) {
            alert('Mohon pilih produk!');
            return;
        }
        
        calculatePrice(price, qty);
    });
}

function calculatePrice(price, qty) {
    const total = parseInt(price) * parseInt(qty);
    const productName = $('#productSelect option:selected').text().split(' - ')[0];
    const priceFormatted = 'Rp ' + parseInt(price).toLocaleString('id-ID');
    const totalFormatted = 'Rp ' + total.toLocaleString('id-ID');
    
    const html = `
        <h4><i class="fas fa-receipt"></i> Detail Pembelian</h4>
        <p class="mb-2"><strong>Produk:</strong> ${productName}</p>
        <p class="mb-2"><strong>Harga Satuan:</strong> ${priceFormatted}</p>
        <p class="mb-3"><strong>Jumlah:</strong> ${qty} bungkus</p>
        <div class="price-total">${totalFormatted}</div>
        <p class="mt-3 mb-0"><i class="fas fa-whatsapp"></i> Siap memesan? Hubungi kami!</p>
    `;
    
    $('#priceResult').html(html).slideDown();
}

/* ============================================
   CONTACT PAGE FUNCTIONS
   ============================================ */

function initializeContactPage() {
    console.log('Contact page initialized');
    
    const form = $('#contactForm');
    
    // EVENT: Real-time validation
    $('input, select, textarea').on('blur', function() {
        validateField($(this));
    });

    // EVENT: Phone number - hanya angka
    $('#nomorhp').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // EVENT: Form submit
    form.on('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmit(form);
    });

    // EVENT: Clear button
    $('#clearBtn').on('click', function() {
        clearContactForm(form);
    });

    // EVENT: Newsletter checkbox
    $('#langganan').on('change', function() {
        if ($(this).is(':checked')) {
            showFeedback('success', '✅ Terima kasih telah berlangganan newsletter!');
        }
    });

    // EVENT: Animate form inputs on focus
    $('input, select, textarea').on('focus', function() {
        $(this).parent().addClass('animate__animated animate__pulse');
        setTimeout(() => {
            $(this).parent().removeClass('animate__animated animate__pulse');
        }, 500);
    });
}

function handleContactFormSubmit(form) {
    if (!form[0].checkValidity()) {
        form.addClass('was-validated');
        showFeedback('danger', '⚠️ Mohon lengkapi semua field yang wajib diisi!');
        return;
    }

    const nama = $('#nama').val();
    const email = $('#email').val();
    const nomorHP = $('#nomorhp').val();
    const tanggal = $('#tanggal').val();

    // Additional validations
    if (nomorHP.length < 10 || nomorHP.length > 13) {
        showFeedback('danger', '⚠️ Nomor HP harus antara 10-13 digit!');
        $('#nomorhp').addClass('is-invalid');
        return;
    }

    if (nomorHP.charAt(0) !== '0') {
        showFeedback('danger', '⚠️ Nomor HP harus dimulai dengan 0!');
        $('#nomorhp').addClass('is-invalid');
        return;
    }

    // Validasi tanggal
    const selectedDate = new Date(tanggal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        showFeedback('danger', '⚠️ Tanggal pengiriman tidak boleh di masa lampau!');
        $('#tanggal').addClass('is-invalid');
        return;
    }

    // Success - show modal if exists, otherwise show popup
    if ($('#successModal').length) {
        $('#modalNama').text(nama);
        const modal = new bootstrap.Modal('#successModal');
        modal.show();
    } else {
        showSuccessPopup(nama);
    }
    
    showFeedback('success', `✅ Terima kasih ${nama}! Pesan berhasil dikirim.`);
    
    // Reset form
    setTimeout(() => {
        form[0].reset();
        form.removeClass('was-validated');
        $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
    }, 1000);
}

function clearContactForm(form) {
    if (confirm('Apakah Anda yakin ingin menghapus semua data?')) {
        form[0].reset();
        form.removeClass('was-validated');
        $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        showFeedback('info', 'ℹ️ Semua data telah dihapus!');
        
        setTimeout(() => {
            $('#feedbackAlert').fadeOut();
        }, 2000);
    }
}

function showSuccessPopup(nama) {
    const overlay = $('<div>', {
        class: 'popup-overlay',
        id: 'popupOverlay'
    });
    
    const popup = $('<div>', {
        class: 'popup-container'
    }).html(`
        <div class="popup-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 class="popup-title">PESAN BERHASIL DIKIRIM!</h2>
        <p class="popup-message">Terima kasih <strong>${nama}</strong>! Pesan Anda telah kami terima.</p>
        <p class="popup-submessage">Tim kami akan segera menghubungi Anda.</p>
        <button class="popup-btn" onclick="closePopup()">
            <i class="fas fa-times-circle"></i> Tutup
        </button>
    `);
    
    overlay.append(popup);
    $('body').append(overlay);
    
    setTimeout(() => {
        overlay.addClass('show');
    }, 10);
}

window.closePopup = function() {
    const overlay = $('#popupOverlay');
    if (overlay.length) {
        overlay.removeClass('show');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
};

function validateField(field) {
    if (field[0].checkValidity()) {
        field.removeClass('is-invalid').addClass('is-valid');
        return true;
    } else {
        field.removeClass('is-valid').addClass('is-invalid');
        return false;
    }
}

function showFeedback(type, message) {
    const alertDiv = $('#feedbackAlert');
    if (!alertDiv.length) return;
    
    const alertTypes = {
        'success': 'alert-success',
        'danger': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    };

    alertDiv.removeClass('alert-success alert-danger alert-warning alert-info')
            .addClass(alertTypes[type])
            .fadeIn()
            .addClass('show');
    
    $('#feedbackMessage').html(message);
    
    if (alertDiv[0]) {
        alertDiv[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            alertDiv.fadeOut();
        }, 5000);
    }
}

/* ============================================
   ABOUT PAGE FUNCTIONS
   ============================================ */

function initializeAboutPage() {
    console.log('About page initialized');
    
    const form = $('#webinarForm');
    
    // Real-time validation functions
    const validators = {
        namaLengkap: validateNama,
        email: validateEmail,
        noHp: validateNoHp,
        topikWebinar: validateTopik,
        persetujuan: validatePersetujuan
    };
    
    // EVENT: Real-time validation
    $('#namaLengkap').on('blur input', validators.namaLengkap);
    $('#email').on('blur input', validators.email);
    $('#noHp').on('blur input', validators.noHp);
    $('#topikWebinar').on('change blur', validators.topikWebinar);
    $('#persetujuan').on('change', validators.persetujuan);

    // EVENT: Form submit
    form.on('submit', function(e) {
        e.preventDefault();
        handleWebinarFormSubmit(validators);
    });

    // EVENT: Animate cards on scroll
    $(window).on('scroll', function() {
        $('.about-card').each(function() {
            const cardTop = $(this).offset().top;
            const scrollTop = $(window).scrollTop() + $(window).height();
            
            if (scrollTop > cardTop + 100) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    });

    // Initial setup
    $('.about-card').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease'
    });
}

function handleWebinarFormSubmit(validators) {
    const isNamaValid = validators.namaLengkap();
    const isEmailValid = validators.email();
    const isNoHpValid = validators.noHp();
    const isTopikValid = validators.topikWebinar();
    const isPersetujuanValid = validators.persetujuan();

    if (isNamaValid && isEmailValid && isNoHpValid && isTopikValid && isPersetujuanValid) {
        $('#successMessage').fadeIn().addClass('show');
        
        $('#webinarForm')[0].reset();
        $('.success, .error').removeClass('success error');
        
        const successMsg = $('#successMessage')[0];
        if (successMsg) {
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        setTimeout(() => {
            $('#successMessage').fadeOut();
        }, 5000);
    } else {
        const firstError = $('.error:first');
        if (firstError.length && firstError[0]) {
            firstError[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

function showError(input, errorDiv, message) {
    input.addClass('error').removeClass('success');
    errorDiv.text(message).addClass('show');
}

function showSuccess(input, errorDiv) {
    input.removeClass('error').addClass('success');
    errorDiv.removeClass('show');
}

function validateNama() {
    const input = $('#namaLengkap');
    const value = input.val().trim();
    const errorDiv = $('#errorNama');

    if (value === '') {
        showError(input, errorDiv, 'Nama lengkap wajib diisi');
        return false;
    } else if (value.length < 3) {
        showError(input, errorDiv, 'Nama minimal 3 karakter');
        return false;
    } else {
        showSuccess(input, errorDiv);
        return true;
    }
}

function validateEmail() {
    const input = $('#email');
    const value = input.val().trim();
    const errorDiv = $('#errorEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        showError(input, errorDiv, 'Email wajib diisi');
        return false;
    } else if (!emailRegex.test(value)) {
        showError(input, errorDiv, 'Format email tidak valid');
        return false;
    } else if (value.toLowerCase().includes('@yahoo.com')) {
        showError(input, errorDiv, 'Email yahoo.com tidak diperbolehkan');
        return false;
    } else {
        showSuccess(input, errorDiv);
        return true;
    }
}

function validateNoHp() {
    const input = $('#noHp');
    const value = input.val().trim();
    const errorDiv = $('#errorHp');
    const numberRegex = /^[0-9]+$/;

    if (value === '') {
        showError(input, errorDiv, 'No HP wajib diisi');
        return false;
    } else if (!numberRegex.test(value)) {
        showError(input, errorDiv, 'No HP harus berupa angka');
        return false;
    } else if (value.length < 10 || value.length > 13) {
        showError(input, errorDiv, 'No HP harus 10-13 digit');
        return false;
    } else {
        showSuccess(input, errorDiv);
        return true;
    }
}

function validateTopik() {
    const input = $('#topikWebinar');
    const value = input.val();
    const errorDiv = $('#errorTopik');

    if (value === '') {
        showError(input, errorDiv, 'Topik webinar wajib dipilih');
        return false;
    } else {
        showSuccess(input, errorDiv);
        return true;
    }
}

function validatePersetujuan() {
    const checkbox = $('#persetujuan');
    const errorDiv = $('#errorPersetujuan');

    if (!checkbox.is(':checked')) {
        showError(checkbox, errorDiv, 'Anda harus menyetujui syarat dan ketentuan');
        return false;
    } else {
        showSuccess(checkbox, errorDiv);
        return true;
    }
}

/* ============================================
   CONSOLE DEBUG FUNCTIONS
   ============================================ */

// Gallery debug functions
window.galleryModule = {
    reset: function() {
        $('.card-body').slideUp(300);
        console.log('All cards reset!');
    },
    logVisibleProducts: function() {
        console.log('=== VISIBLE PRODUCTS ===');
        $('.card-body:visible').each(function(index) {
            const productName = $(this).find('h5').text();
            console.log(`${index + 1}. ${productName}`);
        });
    }
};

window.galleryDebug = {
    showStats: function() {
        const total = $('.gallery-card').length;
        const visible = $('.card-body:visible').length;
        console.log('=== GALLERY STATISTICS ===');
        console.log(`Total Cards: ${total}`);
        console.log(`Visible: ${visible}`);
        console.log(`Hidden: ${total - visible}`);
        console.log(`Total Clicks: ${totalClicks}`);
    }
};

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Format rupiah
function formatRupiah(angka) {
    return 'Rp ' + parseInt(angka).toLocaleString('id-ID');
}

// Get current page name
function getCurrentPage() {
    const pathname = window.location.pathname;
    return pathname.substring(pathname.lastIndexOf('/') + 1);
}

// Fungsi untuk share lokasi UMKM
function shareLokasi() {
    var namaUMKM = "Keripik Singkong Candra";
    var alamat = "Jl. Raya Bulakpelem No. 3, Sragi, Pekalongan, Jawa Tengah 51155";
    var googleMapsLink = "https://maps.app.goo.gl/8mQ9eadnSQc3TyDWA";
    
    var pesanShare = "📍 Lokasi " + namaUMKM + "\n" + alamat + "\n\n" + 
                     "Lihat di Google Maps: " + googleMapsLink;
    
    // Cek apakah browser support Web Share API
    if (navigator.share) {
        navigator.share({
            title: "Lokasi " + namaUMKM,
            text: pesanShare,
            url: googleMapsLink
        })
        .then(function() {
            console.log('Lokasi berhasil dibagikan!');
        })
        .catch(function(error) {
            console.log('Gagal membagikan:', error);
            copyLokasiKeClipboard(pesanShare);
        });
    } else {
        // Fallback: Copy ke clipboard
        copyLokasiKeClipboard(pesanShare);
    }
}

// Fungsi untuk copy lokasi ke clipboard (fallback)
function copyLokasiKeClipboard(teks) {
    // Buat elemen textarea sementara
    var textarea = document.createElement('textarea');
    textarea.value = teks;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select dan copy
    textarea.select();
    
    try {
        document.execCommand('copy');
        alert('✅ Lokasi berhasil disalin ke clipboard!\n\nAnda bisa paste dan bagikan ke teman-teman Anda.');
    } catch (err) {
        alert('❌ Gagal menyalin lokasi. Silakan copy manual:\n\n' + teks);
    }
    
    // Hapus elemen textarea
    document.body.removeChild(textarea);
}

// Log page load
console.log(`Current page: ${getCurrentPage()}`);
console.log('All functions initialized successfully!');