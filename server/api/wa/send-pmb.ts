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

  // 2️⃣ Kirim WA ke user
  const userMessage = `📌 *KONFIRMASI PENDAFTARAN PMB*
STIKes Bogor Husada

Berikut data Anda:
👤 Nama : ${nama}
🏫 Asal Sekolah : ${asalSekolah}
🎓 Minat Prodi : ${minatProdi}
📱 WhatsApp : ${noWa}

Tim PMB akan menghubungi Anda maksimal *1x24 jam*.

🙏 Terima kasih`;

  await sendWablasMessage(noWa, userMessage);

  return {
    success: true,
    message: "Lead berhasil disimpan & WA terkirim",
  };
});
