<template>
  <section class="py-16 bg-gradient-to-b from-orange-50 to-white">
    <div class="max-w-4xl px-6 mx-auto lg:px-8">
      <div
        class="flex flex-col items-center justify-center p-8 text-center bg-white shadow-lg rounded-2xl md:p-12"
      >
        <h2 class="mb-4 text-3xl font-bold text-gray-800">
          Dapatkan Tiket Beasiswa Kuliahmu Sekarang !
        </h2>
        <p class="mb-8 text-gray-600 md:text-lg">
Hanya untuk Pendaftar Tercepat! Jangan biarkan kartu SNBT/SNBP Anda sia-sia. Segera isi formulir di bawah ini untuk menukarkannya dengan Tiket Beasiswa dan klaim promo laptop gratis Anda sebelum kuota penuh.
        </p>

        <div class="flex flex-col w-full gap-4 sm:flex-row sm:justify-center">
          <a
            :href="formLink"
            class="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-white transition bg-gradient-to-br from-orange-500 to-orange-600 shadow-md hover:from-orange-600 hover:to-orange-700 rounded-xl"
          >
            <Icon icon="mdi:laptop" class="w-5 h-5 text-white" />
            Daftar & Amankan Beasiswa
          </a>

          <a
            :href="waLink"
            target="_blank"
            class="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-green-700 transition bg-green-50 border border-green-200 shadow-sm hover:bg-green-100 rounded-xl"
          >
            <Icon icon="mdi:whatsapp" class="w-5 h-5 text-green-600" />
            Hubungi Admin CS
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  waLink: {
    type: String,
    default:
      "https://wa.me/6281110111560?text=Halo+Admin+CS+STIKes+Bogor+Husada%2C+saya+ingin+konsultasi+tentang+penerimaan+mahasiswa+baru.",
  },
  formLink: {
    type: String,
    default: "#formulir", // Ganti dengan ID section formulir atau link rute yang sesuai
  },
});
</script>
