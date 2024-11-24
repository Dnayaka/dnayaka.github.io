

const icons = ['IconA', 'IconB', 'IconC', 'IconD', 'IconE', 'IconF'];

// Fungsi untuk mengambil nama domain dari URL
function getDomainName(url) {
    let domain = new URL(url).hostname;
    // Jika ada 'www.', hapus bagian tersebut
    if (domain.startsWith('www.')) {
        domain = domain.substring(4); // Menghapus 'www.'
    }
    // Ambil bagian pertama sebelum titik (misalnya google.com -> google)
    const domainName = domain.split('.')[0];
    // Kapitalisasi nama domain pertama
    return domainName.charAt(0).toUpperCase() + domainName.slice(1);
}

// Fungsi untuk mengambil dan menyimpan cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
}

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

// Iterasi untuk setiap elemen dengan ID IconA, IconB, dll.
icons.forEach(id => {
    const iconElement = document.getElementById(id);  // Ambil elemen <a>
    const imgElement = document.getElementById(`Load${id.charAt(0).toUpperCase() + id.slice(1)}`);  // ID gambar sesuai

    // Pastikan elemen-elemen tersebut ada
    if (iconElement && imgElement) {
        const url = iconElement.href;  // Ambil URL dari atribut href elemen <a>
        if (url) {
            // Ambil nama domain dari URL dan set sebagai alt pada gambar
            imgElement.alt = getDomainName(url);
        }
    }
});

// Fungsi untuk mengambil icon

// Array ID elemen
const iconIds = ['IconA', 'IconB', 'IconC', 'IconD', 'IconE', 'IconF'];
const loadIconIds = ['LoadIconA', 'LoadIconB', 'LoadIconC', 'LoadIconD', 'LoadIconE', 'LoadIconF'];

// Iterasi untuk setiap elemen
iconIds.forEach((iconId, index) => {
    const iconElement = document.getElementById(iconId);
    const iconHref = iconElement.href; // Ambil href

    const loadIconElement = document.getElementById(loadIconIds[index]);
    loadIconElement.src =  "https://logo.clearbit.com/" + iconHref; // Set src untuk favicon

    // Tangani error ketika gambar gagal dimuat
    loadIconElement.onerror = function() {
        const iconElement = document.getElementById(iconId);
        const iconHref = iconElement.href; // Ambil href
        
        const loadIconElement = document.getElementById(loadIconIds[index]);
        loadIconElement.src = iconHref + "favicon.ico"; // Set src untuk favicon
        
        // Tangani error ketika gambar gagal dimuat
        loadIconElement.onerror = () => handleImageError(iconHref, loadIconElement);
    }
});

// Fungsi untuk menangani error dan menyimpan favicon
function handleImageError(href, imgElement) {
    // Panggil API untuk menyimpan favicon
    const iconElement = document.getElementById(iconId);
    const iconHref = iconElement.href; // Ambil href
    
    const loadIconElement = document.getElementById(loadIconIds[index]);
    loadIconElement.src = iconHref + "favicon.ico"; // Set src untuk favicon
    
    // Tangani error ketika gambar gagal dimuat
    loadIconElement.onerror = () => handleImageError(iconHref, loadIconElement);
}

// Menambahkan event listener untuk klik kanan atau tahan lama
icons.forEach(id => {
    const iconElement = document.getElementById(id);
    const imgElement = document.getElementById(`Load${id.charAt(0).toUpperCase() + id.slice(1)}`);
    if (iconElement && imgElement) {
        let pressTimer;

        // Untuk perangkat dengan mouse (klik kanan)
        iconElement.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Mencegah menu konteks default
            handleChangeUrl(iconElement, imgElement);
        });

        // Untuk perangkat sentuh (tahan lama)
        iconElement.addEventListener('touchstart', () => {
            pressTimer = setTimeout(() => {
                handleChangeUrl(iconElement, imgElement);
            }, 1000); // Tahan selama 1 detik
        });

        iconElement.addEventListener('touchend', () => clearTimeout(pressTimer));
        iconElement.addEventListener('touchmove', () => clearTimeout(pressTimer));

        // Menambahkan event listener untuk sentuhan panjang pada PC (menggunakan mouse)
        iconElement.addEventListener('mousedown', () => {
            pressTimer = setTimeout(() => {
                handleChangeUrl(iconElement, imgElement);
            }, 1000); // Tahan selama 1 detik
        });

        iconElement.addEventListener('mouseup', () => clearTimeout(pressTimer));
        iconElement.addEventListener('mouseleave', () => clearTimeout(pressTimer));
    }
});

// Fungsi untuk menangani perubahan URL dan menyimpannya ke cookie
function handleChangeUrl(anchor, img) {
    let newUrl = prompt('Masukkan URL baru:', anchor.href);
    if (newUrl) {
        anchor.href = newUrl; // Ubah URL elemen <a>
        const domain = new URL(newUrl).hostname;
        img.src = `https://logo.clearbit.com/${domain}`; // Update logo berdasarkan domain baru
        img.alt = getDomainName(newUrl); // Update alt text

        // Simpan URL baru ke cookie
        setCookie(anchor.id, newUrl, 7); // Simpan dalam cookie selama 7 hari
    }
}

// Membaca URL dari cookie jika tersedia saat halaman dimuat
icons.forEach(id => {
    const storedUrl = getCookie(id);
    if (storedUrl) {
        const iconElement = document.getElementById(id);
        const imgElement = document.getElementById(`Load${id.charAt(0).toUpperCase() + id.slice(1)}`);
        if (iconElement && imgElement) {
            iconElement.href = storedUrl; // Terapkan URL dari cookie
            const domain = new URL(storedUrl).hostname;
            imgElement.src = `https://logo.clearbit.com/${domain}`; // Update logo
            imgElement.alt = getDomainName(storedUrl); // Update alt text
        }
    }
});

function handleKeyPress(event) {
    if (event.key === "Enter") {
        performSearch('text');
    }
}

async function performSearch(type) {
    const query = document.getElementById('voice-search').value;
    const apiKey = 'AIzaSyALdfw4LpwkEfSAHNGmJYjYaHaXE8OAzcs'; // Ganti dengan API Key Anda 
    const searchEngineId = '0747e2b2a7dca4137'; // Ganti dengan Search Engine ID Anda
    let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}`;
    
    if (type === 'image') {
        url += '&searchType=image';
    } else if (type === 'news') {
        url += '&sort=date'; // Optional: Menampilkan berita terbaru jika tersedia
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.items, type);

        // Update button styles based on type
        document.getElementById('textResultBtn').classList.toggle('bg-blue-500', type === 'text');
        document.getElementById('textResultBtn').classList.toggle('bg-gray-300', type !== 'text');
        
        document.getElementById('imageResultBtn').classList.toggle('bg-blue-500', type === 'image');
        document.getElementById('imageResultBtn').classList.toggle('bg-gray-300', type !== 'image');
        
        document.getElementById('newsResultBtn').classList.toggle('bg-blue-500', type === 'news');
        document.getElementById('newsResultBtn').classList.toggle('bg-gray-300', type !== 'news');
    } catch (error) {
        console.error('Error fetching results:', error);
        document.getElementById('results').innerHTML = '<p class="text-red-500">Error fetching results. Please try again.</p>';
    }
}

function displayResults(items, type) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (items) {
        items.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('p-4', 'bg-white', 'rounded', 'shadow-md');

            if (type === 'image') {
                resultItem.innerHTML = `
                <a href="${item.link}" target="_blank">
                    <img src="${item.link}" alt="${item.title}" class="w-full rounded-lg"/>
                </a>
                <p class="mt-2 text-gray-800">${item.title}</p>
            `;
            } else {
                resultItem.innerHTML = `
                <a href="${item.link}" target="_blank" class="text-xl text-blue-600 hover:underline">${item.title}</a>
                <p class="text-gray-500 dark:text-gray-400">${item.displayLink}\n</p>
                
                <p class="text-gray-500 dark:text-gray-400">${item.snippet}</p>
            `;
            }
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p class="text-gray-700">No results found.</p>';
    }
}

function voice(){
	var recognition = new webkitSpeechRecognition();
	recognition.lang="en-GB"
	recognition.onresult = function(event){
		console.log(event);
	}
	recognition.start();
	document.getElementById("voice").value = 
        event.results[0][0].transcript;
}