<script setup>
const partners = [
  { name: "RS Azra Bogor", logo: "/img/mitra/rs-azra.png" },
  { name: "Puskesmas", logo: "/img/mitra/puskesmas.png" },
  { name: "IPB University", logo: "/img/mitra/Logo_IPB.png" },
  { name: "Pemerintah Kota Bogor", logo: "/img/mitra/pemkot_bogor.png" },
  {
    name: "Pemerintah Kabupaten Bogor",
    logo: "/img/mitra/Lambang_Kabupaten_Bogor.svg",
  },
  {
    name: "AIPGI",
    logo: "/img/mitra/Logo-AIPGI-1010x1024.png",
  },
  {
    name: "PAFI",
    logo: "/img/mitra/PAFI.png",
  },
  {
    name: "Ikatan Apoteker Indonesia",
    logo: "/img/mitra/logo-big.jpeg",
  },
  {
    name: "Ikatan Bidan Indonesia",
    logo: "/img/mitra/ibi.png",
  },
];
</script>

<template>
  <section class="py-20 bg-white">
    <div class="container px-6 mx-auto lg:px-12">
      <!-- HEADER -->
      <div class="mb-10 text-center">
        <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl">
          Kerja Sama dengan Stakeholder
        </h2>
        <p class="max-w-2xl mx-auto mt-3 text-gray-600">
          STIKes Bogor Husada dipercaya menjalin kerja sama dengan berbagai
          institusi pemerintah, layanan kesehatan, dan pendidikan.
        </p>
      </div>

      <!-- MARQUEE -->
      <div class="relative overflow-hidden">
        <div class="marquee">
          <div class="marquee-group">
            <div
              v-for="(item, i) in partners"
              :key="i"
              class="flex items-center justify-center px-10"
            >
              <img
                :src="item.logo"
                :alt="item.name"
                class="h-12 transition opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
              />
            </div>
          </div>

          <!-- DUPLICATE (biar infinite) -->
          <div class="marquee-group">
            <div
              v-for="(item, i) in partners"
              :key="'dup-' + i"
              class="flex items-center justify-center px-10"
            >
              <img
                :src="item.logo"
                :alt="item.name"
                class="h-12 transition opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}

.marquee-group {
  display: flex;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
