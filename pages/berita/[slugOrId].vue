<template>
  <div> <div class="max-w-4xl px-4 pt-8 mx-auto">
      <NuxtLink to="/" class="inline-flex items-center mb-6 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Daftar Berita
      </NuxtLink>
    </div>

    <div class="max-w-3xl px-4 pb-12 mx-auto">
      <div v-if="loading" class="py-24 text-center text-gray-500">Memuat berita...</div>
      <div v-else-if="error" class="py-24 text-center text-red-500">Gagal memuat berita: {{ error.message }}</div>
      
      <article v-else-if="berita.id" class="p-8 bg-white shadow-lg rounded-2xl">
        
        <header class="mb-6">
            <span v-if="berita.kategori" class="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-blue-600 rounded-full">
                {{ berita.kategori }}
            </span>
            <h1 class="text-4xl font-extrabold leading-tight text-gray-800 drop-shadow-sm">
                {{ berita.judul }}
            </h1>
            <p class="mt-3 text-sm text-gray-500">
                Dipublikasikan pada {{ formatDate(berita.tanggal) }}
            </p>
        </header>

        <img
          v-if="berita.gambar"
          :src="berita.gambar"
          alt="Gambar Berita"
          class="object-cover w-full h-auto max-h-[450px] mb-8 rounded-xl shadow-md ring-1 ring-gray-900/5"
          loading="lazy"
        />

        <div 
          class="prose prose-lg max-w-none prose-blue prose-headings:font-bold prose-headings:text-gray-800" 
          v-html="berita.isi"
        ></div>

      </article>

      <div v-else class="py-24 text-center text-gray-500">Berita tidak ditemukan.</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// Beri tahu Nuxt untuk tidak menggunakan layout default, atau gunakan layout 'berita'
definePageMeta({
  layout: 'berita' // atau 'false' jika Anda memilih Pilihan B
})

const route = useRoute()
// Mengambil slug atau ID dari URL. Diberi nama 'slugOrId' agar cocok dengan nama file [slugOrId].vue
const slugOrId = route.params.slugOrId 

const berita = ref({}) // Gunakan objek kosong sebagai default
const loading = ref(true)
const error = ref(null)

const config = useRuntimeConfig()

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Fungsi untuk fetch berita yang lebih robust
async function fetchBerita() {
  loading.value = true
  error.value = null
  let beritaData = null

  try {
    // 1. Coba fetch berdasarkan slug terlebih dahulu (umumnya lebih disukai)
    const resBySlug = await fetch(`${config.public.API_BASE}/posts?_embed&slug=${slugOrId}`)
    const dataBySlug = await resBySlug.json()

    if (dataBySlug && dataBySlug.length > 0) {
      beritaData = dataBySlug[0]
    } 
    // 2. Jika slug tidak ditemukan dan parameternya adalah angka, coba fetch by ID
    else if (/^[0-9]+$/.test(slugOrId)) {
      const resById = await fetch(`${config.public.API_BASE}/posts/${slugOrId}?_embed`)
      if(resById.ok) {
        beritaData = await resById.json()
      }
    }

    // 3. Jika berita ditemukan, proses datanya
    if (beritaData) {
      berita.value = {
        id: beritaData.id,
        judul: beritaData.title?.rendered || 'Tanpa Judul',
        isi: beritaData.content?.rendered || '<p>Konten tidak tersedia.</p>',
        tanggal: beritaData.date,
        // Ambil gambar dari _embedded
        gambar: beritaData._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        // Ambil kategori pertama dari _embedded (API WordPress REST biasanya begini)
        kategori: beritaData._embedded?.['wp:term']?.[0]?.[0]?.name || null
      }
    } else {
        // Jika tetap tidak ditemukan, set berita menjadi objek kosong untuk menampilkan pesan "Tidak Ditemukan"
        berita.value = {}
    }

  } catch (e) {
    console.error("Fetch error:", e)
    error.value = e
  } finally {
    loading.value = false
  }
}

onMounted(fetchBerita)
</script>

<style>
/* Anda bisa menambahkan styling spesifik untuk 'prose' di sini jika perlu */
.prose a {
  text-decoration: none;
  font-weight: 600;
}
.prose a:hover {
  text-decoration: underline;
}
.prose img {
  border-radius: 0.75rem; /* rounded-xl */
}
</style>