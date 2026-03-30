<script setup>
const title = "Program Studi Kami";
const subtitle =
  "Jelajahi berbagai program studi yang kami tawarkan untuk membantu Anda mencapai tujuan akademik dan profesional.";

const programs = [
  {
    id: "d3-kebidanan",
    name: "D3 Kebidanan",
    degree: "A.Md.Keb",
    description:
      "Berfokus pada pendidikan bidan profesional yang kompeten di bidang kesehatan ibu dan anak.",
    image: "/img/prodi/diploma-kebidanan-stikes-bogor-husada.png",
    link: "https://sbh.ac.id/program-studi-d3-kebidanan",
  },
  {
    id: "s1-farmasi",
    name: "S1 Farmasi",
    degree: "S.Farm",
    description:
      "Menghasilkan tenaga profesional di bidang farmasi klinis, industri, dan penelitian.",
    image: "/img/prodi/s1-farmasi-stikes-bogor-husada.png",
    link: "https://sbh.ac.id/program-studi-farmasi",
  },
  {
    id: "s1-gizi",
    name: "S1 Gizi",
    degree: "S.Gz",
    description:
      "Mempersiapkan lulusan kompeten dalam pelayanan gizi masyarakat, klinis, dan penelitian.",
    image: "/img/prodi/s1-gizi-stikes-bogor-husada.png",
    link: "https://sbh.ac.id/program-studi-s1-gizi",
  },
];
</script>

<template>
  <section class="py-20 bg-white lg:py-28">
    <div class="container px-6 mx-auto max-w-7xl lg:px-12">
      <!-- HEADER -->
      <div class="mb-16 text-center" data-aos="fade-up">
        <h2 class="text-3xl font-bold text-orange-500 lg:text-4xl">
          {{ title }}
        </h2>
        <p class="max-w-2xl mx-auto mt-4 text-gray-600">
          {{ subtitle }}
        </p>
      </div>

      <!-- CARD GRID -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(program, index) in programs"
          :key="program.id"
          class="overflow-hidden transition bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-lg group"
          data-aos="fade-up"
          :data-aos-delay="index * 120"
        >
          <!-- IMAGE -->
          <div class="overflow-hidden">
            <img
              :src="program.image"
              :alt="program.name"
              class="object-cover w-full transition duration-500 group-hover:scale-105"
            />
          </div>

          <!-- CONTENT -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800">
              {{ program.name }}
            </h3>

            <span
              class="inline-block px-3 py-1 mt-2 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full"
            >
              {{ program.degree }}
            </span>

            <p class="mt-4 text-gray-600">
              {{ program.description }}
            </p>

            <!-- CTA -->
            <a
              :href="program.link"
              target="_blank"
              class="inline-flex items-center px-5 py-2 mt-6 text-sm font-semibold text-white transition bg-orange-500 rounded-full hover:bg-orange-600"
            >
              Selengkapnya
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
