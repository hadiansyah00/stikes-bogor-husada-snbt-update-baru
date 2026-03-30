export function useBerita() {
  const config = useRuntimeConfig()
  const beritaList = ref([])
  const categoriesList = ref([])
  const error = ref(null)
  const loading = ref(false)

  const API_URL = config.public.API_BASE

  const fetchBerita = async (url = `${config.public.API_BASE}/posts?_embed&per_page=30`) => {
    const res = await fetch(url)
    const contentType = res.headers.get('content-type')
    
    if (!res.ok) throw new Error('Gagal memuat data berita')
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text()
      console.error('Response bukan JSON:', text)
      throw new Error('Respons dari server bukan JSON')
    }
    
    const data = await res.json()
    
   
    try {
      loading.value = true
  
      const res = await fetch(url)
      const contentType = res.headers.get('content-type')
  
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`HTTP Error: ${res.status} - ${errorText}`)
      }
  
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text()
        console.error('❌ Response bukan JSON:\n', text)
        throw new Error('Respons dari server bukan JSON')
      }
  
      const data = await res.json()
  
      beritaList.value = data.map(item => ({
        id: item.id,
        judul: item.title?.rendered || '',
        isi: item.content?.rendered?.replace(/<[^>]+>/g, '') || '',
        tanggal: item.date,
        slug: item.slug,
        gambar: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        kategori_id: item.categories?.[0] || null
      }))
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  const fetchBeritaByCategory = async (categoryId) => {
    if (!categoryId) return fetchBerita()
    const url = `${config.public.API_BASE}/posts?_embed&categories=${categoryId}`
    return fetchBerita(url)
  }

  
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${config.public.API_BASE}/categories`)
      if (!res.ok) throw new Error('Gagal ambil kategori')
      return await res.json()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  const getCategoryNameById = (id) => {
    return categoriesList.value.find(cat => cat.id === id)?.name || 'Tidak diketahui'
  }
  const fetchBeritaBySearch = async (keyword) => {
    const params = keyword ? `&search=${encodeURIComponent(keyword)}` : ''
    await fetchBerita(params)
  }

  onMounted(() => {
    fetchBerita()
    fetchCategories()
  })

  return {
    beritaList,
    categoriesList,
    error,
    loading,
    fetchBerita,
    fetchBeritaByCategory,
    fetchBeritaBySearch,
    fetchCategories,
    getCategoryNameById
  }
}
