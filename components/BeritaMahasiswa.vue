<template>
  <section class="py-16 bg-gradient-to-b from-blue-50 via-white to-gray-50" aria-label="Berita Terbaru">
    <div class="container px-4 mx-auto">
      <h2 class="mb-10 text-4xl font-extrabold text-center text-blue-900 drop-shadow-sm">
        Berita Terbaru
      </h2>

      <!-- Filter: Kategori & Pencarian -->
      <div class="flex flex-col items-center justify-between mb-10 space-y-4 md:flex-row md:space-y-0">
        <!-- Dropdown Kategori -->
        <div class="flex items-center space-x-2">
          <label for="category" class="text-sm font-medium text-blue-700">Kategori:</label>
          <select
            v-model="selectedCategory"
            id="category"
            class="px-3 py-2 text-blue-700 border border-blue-200 rounded focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Semua</option>
            <option
              v-for="kategori in categories"
              :key="kategori.id"
              :value="kategori.id"
            >
              {{ kategori.name }}
            </option>
          </select>
        </div>

        <!-- Input Pencarian -->
        <div class="relative w-full md:w-64">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari berita..."
            class="w-full px-4 py-2 text-blue-700 placeholder-blue-400 border border-blue-200 rounded focus:ring-2 focus:ring-blue-300"
          />
          <svg
            class="absolute right-3 top-2.5 w-5 h-5 text-blue-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12 text-center text-blue-400"
      >
        <svg
          class="w-8 h-8 mb-2 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        Memuat berita...
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-12 text-center text-red-600"
      >
        <svg class="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>
        Gagal memuat berita: {{ error.message }}
      </div>

      <!-- Tidak Ada Hasil -->
      <div
        v-else-if="filteredBerita.length === 0"
        class="flex flex-col items-center justify-center py-12 text-center text-gray-500"
      >
        <svg class="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 17v-2a4 4 0 018 0v2M9 17H7a2 2 0 01-2-2v-5a2 2 0 012-2h10a2 2 0 012 2v5a2 2 0 01-2 2h-2"
          />
        </svg>
        Tidak ada berita ditemukan.
      </div>

      <!-- Grid Berita -->
      <div
        v-else
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
        v-for="berita in paginatedBerita"
        :key="berita.id"
          class="flex flex-col overflow-hidden transition duration-300 bg-white shadow rounded-2xl hover:scale-[1.015] hover:shadow-xl group"
        >
          <!-- Gambar -->
          <div class="relative">
            <img
              v-if="berita.gambar"
              :src="berita.gambar"
              alt="Gambar Berita"
              class="object-cover w-full h-48 transition duration-300 group-hover:scale-105"
            />
            <div
              v-else
              class="flex items-center justify-center w-full h-48 text-blue-400 bg-blue-100"
            >
              <svg class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z"
                />
              </svg>
            </div>

            <!-- Badge Kategori -->
            <span
              class="absolute px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow top-3 right-3"
            >
              {{ getCategoryName(berita.kategori_id) }}
            </span>
          </div>

          <!-- Konten -->
          <div class="flex flex-col flex-1 px-6 py-5">
            <h3 class="mb-2 text-lg font-bold text-blue-900 transition group-hover:text-blue-700">
              {{ berita.judul }}
            </h3>
            <p class="mb-4 text-sm text-gray-600">
              {{ truncate(berita.isi, 120) }}
            </p>

            <div class="flex items-center justify-between mt-auto">
              <span class="text-xs text-gray-400">
                {{ formatDate(berita.tanggal) }}
              </span>
              <NuxtLink
                :to="`/berita/${berita.slug || berita.id}`"
                class="inline-block px-3 py-1 text-xs font-semibold text-blue-700 transition bg-blue-100 rounded hover:bg-blue-200"
              >
                Baca Selengkapnya
         
              </NuxtLink>
             

            </div>
          </div>
        </article>
      </div>
      <!-- Pagination -->
<div v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2">
  <button
    @click="goToPage(currentPage - 1)"
    :disabled="currentPage === 1"
    class="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded disabled:opacity-50"
  >
    Sebelumnya
  </button>

  <button
    v-for="page in totalPages"
    :key="page"
    @click="goToPage(page)"
    :class="[
      'px-3 py-1 text-sm font-medium rounded',
      currentPage === page
        ? 'bg-blue-600 text-white'
        : 'bg-blue-100 text-blue-600'
    ]"
  >
    {{ page }}
  </button>

  <button
    @click="goToPage(currentPage + 1)"
    :disabled="currentPage === totalPages"
    class="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded disabled:opacity-50"
  >
    Selanjutnya
  </button>
</div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
import { useBerita } from '@/composables/useBerita'

const { beritaList, error, loading, fetchBeritaByCategory, fetchCategories } = useBerita()

const selectedCategory = ref('')
const searchQuery = ref('')
const debouncedSearch = useDebounce(searchQuery, 300)

const categories = ref([])
const showAll = ref(false)
const currentPage = ref(1)
const perPage = ref(6)

// Ambil kategori dan berita saat mount
onMounted(async () => {
  try {
    const result = await fetchCategories()
    categories.value = Array.isArray(result) ? result : []
    await fetchBeritaByCategory(selectedCategory.value)
  } catch (e) {
    console.error('Gagal memuat data:', e)
    categories.value = []
  }
})

const filteredBerita = computed(() => {
  let result = beritaList.value || []

  if (selectedCategory.value) {
    result = result.filter(b => {
      const kategori = b.kategori_id
      const selected = String(selectedCategory.value)

      // Handle array & single value
      return Array.isArray(kategori)
        ? kategori.map(String).includes(selected)
        : String(kategori) === selected
    })
  }

  if (debouncedSearch.value.trim()) {
    const q = debouncedSearch.value.toLowerCase()
    result = result.filter(b =>
      (b.judul && b.judul.toLowerCase().includes(q)) ||
      (b.isi && b.isi.toLowerCase().includes(q))
    )
  }

  return result
})


// Pagination
const totalPages = computed(() => Math.ceil(filteredBerita.value.length / perPage.value))

const paginatedBerita = computed(() => {
  if (showAll.value) return filteredBerita.value
  const start = (currentPage.value - 1) * perPage.value
  return filteredBerita.value.slice(start, start + perPage.value)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Reset ke halaman 1 jika kategori atau search berubah
watch([selectedCategory, debouncedSearch], () => {
  currentPage.value = 1
  showAll.value = false
  fetchBeritaByCategory(selectedCategory.value)
})

// Utils
function truncate(text, length = 120) {
  if (!text) return ''
  const stripped = text.replace(/<[^>]+>/g, '')
  return stripped.length > length ? stripped.slice(0, length) + '...' : stripped
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getCategoryName(id) {
  return categories.value.find(c => c.id === id)?.name || 'Umum'
}
</script>


