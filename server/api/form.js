export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log("Data masuk:", body);

    const config = useRuntimeConfig();

    // Buat timestamp Indonesia (format dd-MM-yyyy HH:mm:ss)
    const timestamp = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    // Kirim ke Google Script (supaya masuk ke Google Sheet)
    const googleRes = await $fetch(config.public.googleScriptUrl, {
      method: "POST",
      body: {
        ...body,
        timestamp, // tambahkan timestamp ke data
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Pesan WhatsApp rapi dengan timestamp
    const pesan = `Halo ${body.nama}!
Selamat! Kamu telah berhasil mendaftar Tiket Beasiswa Jalur SNBP/SNBT STIKes Bogor Husada.

✅ Berikut data pendaftaran Anda:
Minat Program Studi: ${body.programStudi}
Asal Sekolah: ${body.asalSekolah}
Nomor WhatsApp: ${body.whatsapp}
Waktu Pendaftaran: ${timestamp}

Bersama pendaftaran ini, kamu berhak mendapatkan:
* Beasiswa Biaya Kuliah Gelombang 1
* Gratis Laptop
* Bebas Tes Tulis
* Free Biaya Pendaftaran

Informasi pendaftaran ini sudah tercatat di sistem kami.
Jangan khawatir, semua informasi penting akan kami kirimkan langsung ke WhatsApp kamu.
Jika ada pertanyaan, silakan hubungi kami kapan saja.
`;

    const waPayload = {
      api_key: config.public.waApiKey,
      number_key: config.public.waNumberKey,
      phone_no: body.whatsapp,
      message: pesan,
      wait_until_send: "1",
    };

    // Kirim ke WA Gateway
    const waRes = await $fetch("https://api.watzap.id/v1/send_message", {
      method: "POST",
      body: waPayload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      message: "Data berhasil dikirim ke Google Script & WhatsApp",
      googleRes,
      waRes,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      message: "Terjadi kesalahan saat mengirim data",
      error: error.message || error,
    };
  }
});
