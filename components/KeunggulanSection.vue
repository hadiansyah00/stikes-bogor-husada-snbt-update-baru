<template>
  <section class="py-16 bg-orange-500">
    <div class="max-w-6xl px-5 mx-auto">
      <!-- Header -->
      <div class="mb-10 text-center">
        <h2 class="text-2xl font-bold text-white md:text-4xl">
          Keunggulan <span class="text-orange-100">SBH</span>
        </h2>
        <p class="mt-2 text-sm text-orange-100 md:text-base">
          Alasan tepat memilih STIKes Bogor Husada
        </p>
      </div>

      <!-- Content -->
      <div class="grid items-start gap-8 md:grid-cols-2">
        <!-- LEFT: Accordion -->
        <div class="space-y-3">
          <div
            v-for="item in items"
            :key="item.key"
            class="bg-white shadow-sm rounded-xl"
          >
            <button
              @click="toggle(item.key)"
              class="flex items-center justify-between w-full px-4 py-4"
            >
              <!-- LEFT ICON + TITLE -->
              <div class="flex items-center gap-3">
                <component :is="item.icon" class="w-5 h-5 text-orange-500" />
                <span class="font-semibold text-gray-800">
                  {{ item.title }}
                </span>
              </div>

              <!-- CHEVRON -->
              <ChevronDown
                class="w-5 h-5 text-orange-500 transition-transform"
                :class="{ 'rotate-180': active === item.key }"
              />
            </button>

            <!-- Content -->
            <Transition name="accordion">
              <div
                v-show="active === item.key"
                class="px-4 pb-4 text-sm leading-relaxed text-gray-600"
              >
                {{ item.description }}
              </div>
            </Transition>
          </div>
        </div>

        <!-- RIGHT: Image -->
        <div class="md:sticky md:top-24">
          <img
            src="/img/front-pages/landing-page/hero-2.jpg"
            alt="Kegiatan Praktikum STIKes Bogor Husada"
            loading="lazy"
            class="object-cover w-full h-auto shadow-md rounded-2xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  Award,
  FlaskConical,
  Users,
  Lightbulb,
  Briefcase,
  ChevronDown,
} from "lucide-vue-next";

const active = ref(null);

const items = [
  {
    key: "akreditasi",
    title: "Terakreditasi BAN-PT",
    description:
      "Institusi terakreditasi sebagai jaminan mutu pendidikan tinggi.",
    icon: Award,
  },
  {
    key: "praktik",
    title: "Pembelajaran Berbasis Praktik",
    description: "Didukung laboratorium dan praktik lapangan yang aplikatif.",
    icon: FlaskConical,
  },
  {
    key: "dosen",
    title: "Dosen Profesional",
    description: "Pengajar berpengalaman dari kalangan akademisi dan praktisi.",
    icon: Users,
  },
  {
    key: "softskill",
    title: "Soft Skills & Entrepreneurship",
    description: "Pembekalan karakter, komunikasi, dan kewirausahaan.",
    icon: Lightbulb,
  },
  {
    key: "career",
    title: "Career Development Center",
    description: "Pendampingan karier nasional dan internasional.",
    icon: Briefcase,
  },
];

function toggle(key) {
  active.value = active.value === key ? null : key;
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
