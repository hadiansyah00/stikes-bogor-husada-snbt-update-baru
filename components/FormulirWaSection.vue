<script setup lang="ts">
import { ref, computed } from "vue";
import { usePmbForm } from "@/composables/usePmbForm";

/* =========================
   FORM STATE
========================= */
const nama = ref("");
const asalSekolah = ref("");
const minatProdi = ref("");
const noWa = ref("");

/* =========================
   COMPOSABLE
========================= */
const { submit, success, isSubmitting } = usePmbForm();

/* =========================
   HELPERS
========================= */
const isValidPhone = computed(() => /^08\d{9,10}$/.test(noWa.value));

function handlePhoneInput(e: Event) {
  let value = (e.target as HTMLInputElement).value.replace(/\D/g, "");
  if (value.length > 12) value = value.slice(0, 12);
  noWa.value = value;
}

const isFormValid = computed(
  () =>
    nama.value && asalSekolah.value && minatProdi.value && isValidPhone.value,
);

/* =========================
   SUBMIT
========================= */
async function onSubmit() {
  if (!isFormValid.value || isSubmitting.value) return;

  await submit({
    nama: nama.value,
    asalSekolah: asalSekolah.value,
    minatProdi: minatProdi.value,
    noWa: noWa.value,
  });
}
</script>
<template>
  <section id="formulir" class="py-20 bg-gray-50 lg:py-28">
    <div class="container max-w-4xl px-6 mx-auto lg:px-12">
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold text-gray-800 lg:text-4xl">
Isi Data untuk Menukar Kartu SNBT/SNBP Jadi Tiket Beasiswa        </h2>
        <p class="max-w-xl mx-auto mt-4 text-gray-600">
          Lengkapi data di bawah ini agar kami dapat memproses data kelulusan Anda dan mengubahnya menjadi penawaran Beasiswa Kuliah.
        </p>
      </div>

      <div class="p-8 bg-white shadow-sm rounded-2xl lg:p-10">
        <form v-if="!success" @submit.prevent="onSubmit" class="space-y-6">
          <div>
            <label class="label">Nama Lengkap</label>
            <input
              v-model="nama"
              type="text"
              placeholder="Nama Kamu"
              class="input"
            />
          </div>

          <div>
            <label class="label">Asal Sekolah</label>
            <input
              v-model="asalSekolah"
              type="text"
              placeholder="SMA / SMK / MA"
              class="input"
            />
          </div>

          <div>
            <label class="label">Minat Program Studi</label>
            <select v-model="minatProdi" class="input">
              <option value="" disabled>-- Pilih Program Studi --</option>
              <option>D3 Kebidanan (A.Md.Keb)</option>
              <option>S1 Farmasi (S.Farm)</option>
              <option>S1 Farmasi Karyawan</option>
              <option>S1 Gizi (S.Gz)</option>
            </select>
          </div>

          <div>
            <label class="label">Nomor WhatsApp</label>
            <input
              v-model="noWa"
              type="tel"
              inputmode="numeric"
              maxlength="12"
              placeholder="08xxxxxxxxxx"
              class="input"
              @input="handlePhoneInput"
            />
            <p v-if="noWa && !isValidPhone" class="mt-1 text-xs text-red-500">
              Nomor harus diawali 08 dan berjumlah 11–12 digit
            </p>
          </div>

          <button
            type="submit"
            class="btn-primary"
            :disabled="!isFormValid || isSubmitting"
          >
            <span v-if="!isSubmitting">Kirim Info ke WhatsApp Saya</span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="btn-loader"></span>
              Memproses...
            </span>
          </button>

          <p class="text-xs text-center text-gray-500">
            Data Anda aman dan hanya digunakan untuk keperluan PMB
          </p>
        </form>

        <div
          v-else
          class="p-6 text-center border border-green-200 bg-green-50 rounded-xl"
        >
          <h3 class="text-lg font-bold text-green-700">
            Pendaftaran Berhasil 🎉
          </h3>

          <p class="mt-2 text-sm text-green-600">
            Terima kasih <strong>{{ nama }}</strong
            >, data pendaftaran Anda telah berhasil kami terima.
          </p>

          <p class="mt-2 text-sm text-green-600">
            Tim PMB akan segera menghubungi Anda melalui WhatsApp untuk info
            biaya kuliah dan cara klaim laptop gratisnya.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-color: #ffffff;
  color: #111827;
}

.input:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15);
}

.btn-primary {
  width: 100%;
  padding: 14px;
  font-weight: 700;
  color: #ffffff;
  background-color: #f97316;
  border-radius: 12px;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
