<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex items-center justify-center flex-1">
      <HeroSection />
      <!-- <FormulirSection /> -->
    </main>
    <!-- <FormulirSection /> -->
    <!-- <BeritaMahasiswa /> -->
    <CallToAction />
    <FormulirWaSection />
    <SejarahSection />
    <ProgramStudiSection />
    <KeunggulanSection />
    <TestimoniSlider />
    <LogoKemitraan />
    <AppFooter />
    <BackToTopButton />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

useHead({
  title: "SNBT 2026  | Penerimaan Calon Mahasiswa Baru STIKes Bogor Husada",
  meta: [
    {
      name: "description",
      content:
        "Penerimaan Calon Mahasiswa baru STIKes Bogor Husada! Ayo Daftar SNBT sekarang dan klaim Voucer Promo spesial untuk pendidikan kesehatan profesional Anda.",
    },
  ],
  script: [
    {
      src: "https://cdn.watzap.id/widget-api.js",
      async: true,
      "data-watzapkey": "xgWw1957",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/img/logo/logo_sbh_bulet.png",
    },
  ],
});

onMounted(() => {
  // Event view landing page
  window.trackFB?.("ViewContent", {
    content_name: "Landing PMB STIKes Bogor Husada",
    content_category: "PMB",
  });
});
</script>
