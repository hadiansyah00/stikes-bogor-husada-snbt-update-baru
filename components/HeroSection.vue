<template>
  <div class="relative py-16 bg-orange-500 sm:py-24 lg:py-32">
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
      <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
        <!-- Gambar -->
        <div class="flex justify-center lg:justify-end">
          <img
            class="h-auto max-w-full rounded-lg shadow-xl"
            src="/img/front-pages/landing-page/tiket-beasiswa-sbh.png"
            alt="Mahasiswa STIKes Bogor Husada"
          />
        </div>

        <!-- Card Benefit Beasiswa -->
        <div class="flex justify-center lg:justify-start">
          <div
            class="relative w-full max-w-md overflow-hidden bg-white border-2 border-black shadow-lg rounded-2xl"
          >
            <!-- Label Atas -->
            <div
              class="absolute px-6 py-1 text-lg font-extrabold tracking-wide text-center text-black transform -translate-x-1/2 bg-yellow-400 border-2 border-black shadow-lg -top-6 left-1/2 rounded-t-md drop-shadow-md"
            >
              <h2 class="mt-5"><strong>Benefit</strong></h2>
            </div>

            <!-- Daftar Benefit -->
            <ul class="pt-10 mt-5 divide-y divide-black">
              <li
                v-for="(benefit, index) in benefits"
                :key="index"
                class="relative flex items-center gap-4 py-4 pl-16 pr-6 text-lg font-bold"
              >
                <!-- Lingkaran Kiri -->
                <div
                  class="absolute w-6 h-6 transform -translate-y-1/2 bg-yellow-400 border-2 border-black rounded-full shadow-md left-4 top-1/2"
                ></div>

                <!-- Icon -->
                <div class="text-yellow-500">
                  <component :is="benefit.icon" class="w-6 h-6" />
                </div>

                <!-- Teks -->
                <span class="text-black">{{ benefit.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Laptop, School, CheckCircle, Wallet } from "lucide-vue-next";

const benefits = [
  { text: "Gratis Laptop", icon: Laptop },
  { text: "Biaya Kuliah Gelombang 1", icon: School },
  { text: "Gratis Uang Gedung", icon: CheckCircle },
  { text: "Free Biaya Pendaftaran", icon: Wallet },
];
</script>
