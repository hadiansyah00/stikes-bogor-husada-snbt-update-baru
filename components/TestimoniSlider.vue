<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const config = useRuntimeConfig();

const apiBaseUrl = config.public.apiBaseUrl;
const imageBaseUrl = config.public.imageBaseUrl;

const { data, pending, error } = await useFetch(
  `${apiBaseUrl}/api/testimoni?limit=6`
);

// Extract data
const testimonials = computed(() => data.value?.data?.data ?? []);

/**
 * ✅ DEV CONSOLE LOG
 * Tidak spam & aman untuk SSR
 */
if (process.dev) {
  watchEffect(() => {
    if (pending.value) {
      console.info("[Testimoni] Loading data...");
    }

    if (error.value) {
      console.error("[Testimoni] Fetch error:", error.value);
    }

    if (testimonials.value.length) {
      console.table(
        testimonials.value.map((item) => ({
          id: item.id,
          name: item.name,
          title: item.title,
        }))
      );
    }
  });
}
</script>

<template>
  <section class="py-16 bg-gray-50 md:py-20">
    <div class="px-5 mx-auto max-w-7xl sm:px-6">
      <!-- Header -->
      <div class="max-w-xl mb-10 md:mb-12">
        <span
          class="inline-block px-3 py-1 mb-3 text-[11px] font-semibold text-orange-600 bg-orange-100 rounded-full"
        >
          ALUMNI STIKES BOGOR HUSADA
        </span>

        <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
          Cerita Alumni Kami
        </h2>

        <p class="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
          Dengarkan langsung pengalaman alumni STIKes Bogor Husada yang sukses
          berkarier di bidang kesehatan.
        </p>
      </div>

      <!-- Swiper -->
      <Swiper
        :modules="[Autoplay]"
        :loop="true"
        :space-between="20"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :breakpoints="{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }"
      >
        <SwiperSlide v-for="item in testimonials" :key="item.id">
          <div
            class="flex flex-col h-full overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl"
          >
            <!-- FOTO -->
            <div class="relative w-full overflow-hidden aspect-square">
              <img
                :src="`${imageBaseUrl}/storage/${item.photo}`"
                :alt="item.name"
                class="object-cover w-full h-full"
              />
            </div>

            <!-- CONTENT -->
            <div class="flex flex-col flex-1 p-5 text-center md:p-6">
              <p
                class="mb-5 text-sm italic leading-relaxed text-gray-600 line-clamp-4 md:text-base"
              >
                “{{ item.message }}”
              </p>

              <div class="mt-auto">
                <h4 class="text-sm font-semibold text-orange-600 md:text-base">
                  {{ item.name }}
                </h4>
                <p class="mt-1 text-xs text-gray-500 md:text-sm">
                  {{ item.role }}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
