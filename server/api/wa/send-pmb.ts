import { sendWablasMessage } from "@/server/utils/wablas";
import { appendPmbLead } from "@/server/utils/googleSheets";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nama, asalSekolah, minatProdi, noWa } = body;

  if (!nama || !asalSekolah || !minatProdi || !noWa) {
    throw createError({
      statusCode: 400,
      statusMessage: "Data tidak lengkap",
    });
  }

  // 1️⃣ Simpan ke Google Spreadsheet
  await appendPmbLead({
    nama,
    asalSekolah,
    minatProdi,
    noWa,
  });

  const timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  // 2️⃣ Kirim WA ke user
  const userMessage = `Halo *${nama}*, salam sehat! 👋

Selamat! Kamu telah berhasil melakukan klaim *Voucer Promo SNBT* di STIKes Bogor Husada. 🎉

✅ Berikut adalah rincian data pendaftaran kamu:
🎓 Minat Program Studi: *${minatProdi}*
🏫 Asal Sekolah: *${asalSekolah}*
📱 Nomor WhatsApp: *${noWa}*
🕒 Waktu Klaim: *${timestamp}*

🎁 Keuntungan spesial dari Voucer SNBT yang kamu dapatkan:
* Potongan Biaya Kuliah Spesial Gelombang 1
* Kesempatan Gratis Laptop
* Bebas Tes Tulis
* Gratis Biaya Pendaftaran

Data kamu sudah terdata aman di sistem Penerimaan Mahasiswa Baru kami. Tim Admin PMB akan segera menghubungi kamu untuk panduan langkah selanjutnya.

Jika ada yang ingin ditanyakan, jangan ragu untuk membalas pesan ini kapan saja.
Wujudkan masa depanmu sebagai tenaga kesehatan profesional bersama STIKes Bogor Husada! 🩺✨`;

  await sendWablasMessage(noWa, userMessage);

  return {
    success: true,
    message: "Lead berhasil disimpan & WA terkirim",
  };
});
