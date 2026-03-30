<template>
  <section class="py-16 bg-orange-50">
    <div class="container max-w-xl px-4 mx-auto">
      <h2 class="mb-8 text-3xl font-bold text-center text-gray-800">
        Formulir Pendaftaran Beasiswa SNBT / SNBP
      </h2>

      <form
        @submit.prevent="handleSubmit"
        class="p-8 space-y-6 border border-orange-200 shadow-md bg-blue-950 rounded-xl"
      >
        <!-- Nama Lengkap -->
        <div>
          <label class="block mb-2 font-medium text-white">Nama Lengkap</label>
          <input
            v-model="form.nama"
            type="text"
            class="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            autocomplete="name"
          />
        </div>

        <!-- Kelas -->
        <div>
          <label class="block mb-2 font-medium text-white">Kelas</label>
          <input
            v-model="form.kelas"
            type="text"
            class="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            autocomplete="off"
          />
        </div>

        <!-- Asal Sekolah -->
        <div>
          <label class="block mb-2 font-medium text-white">Asal Sekolah</label>
          <input
            v-model="form.asalSekolah"
            type="text"
            class="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            autocomplete="organization"
          />
        </div>

        <!-- No Whatsapp -->
        <div>
          <label class="block mb-2 font-medium text-white">No WhatsApp</label>
          <div class="flex">
            <span
              class="px-4 py-2 text-black bg-gray-100 border border-r-0 select-none rounded-l-md"
              >+62</span
            >
            <input
              v-model="form.whatsapp"
              type="tel"
              class="w-full px-4 py-2 text-black border rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              autocomplete="tel"
              placeholder="8xxxxxxxxx"
              pattern="^8[1-9][0-9]{6,10}$"
            />
          </div>
        </div>

        <!-- Minat Program Studi -->
        <div>
          <label class="block mb-2 font-medium text-white"
            >Minat Program Studi</label
          >
          <select
            v-model="form.programStudi"
            class="w-full px-2 py-1 text-sm text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          >
            <option value="" disabled>Pilih Program Studi</option>
            <option value="D3 Kebidanan">D3 Kebidanan</option>
            <option value="S1 Farmasi">S1 Farmasi</option>
            <option value="S1 Farmasi Kelas Karyawan">
              S1 Farmasi Kelas Karyawan
            </option>
            <option value="S1 Gizi">S1 Gizi</option>
          </select>
        </div>

        <!-- Alert Messages -->
        <div
          v-if="successMessage"
          class="p-3 text-green-700 bg-green-100 rounded"
        >
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="p-3 text-red-700 bg-red-100 rounded">
          {{ errorMessage }}
        </div>

        <!-- Tombol Submit -->
        <div class="text-center">
          <button
            type="submit"
            :disabled="isLoading"
            class="px-6 py-2 font-semibold text-white transition bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-60"
          >
            {{ isLoading ? "Mengirim..." : "Daftar Sekarang" }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  nama: "",
  kelas: "",
  asalSekolah: "",
  whatsapp: "",
  programStudi: "",
});

const isLoading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const resetForm = () => {
  form.nama = "";
  form.kelas = "";
  form.asalSekolah = "";
  form.whatsapp = "";
  form.programStudi = "";
};

const handleSubmit = async () => {
  isLoading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  // Format nomor WA ke 62xxxx
  let nomorWA = form.whatsapp;
  if (nomorWA.startsWith("0")) {
    nomorWA = "62" + nomorWA.slice(1);
  } else if (nomorWA.startsWith("+62")) {
    nomorWA = nomorWA.replace("+", "");
  }

  try {
    const response = await fetch("/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        whatsapp: nomorWA, // Kirim WA yang sudah diformat
      }),
    });

    if (!response.ok) throw new Error("Gagal mengirim data");

    successMessage.value = "Formulir berhasil dikirim!";
    resetForm();
  } catch (error) {
    errorMessage.value = "Terjadi kesalahan saat mengirim formulir.";
  } finally {
    isLoading.value = false;
  }
};
</script>
