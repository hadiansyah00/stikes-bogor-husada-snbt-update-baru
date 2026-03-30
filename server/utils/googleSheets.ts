import { google } from "googleapis";

export async function appendPmbLead(data: {
  nama: string;
  asalSekolah: string;
  minatProdi: string;
  noWa: string;
}) {
  const config = useRuntimeConfig();

  const auth = new google.auth.JWT({
    email: config.GS_CLIENT_EMAIL,
    key: config.GS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const now = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.GS_SPREADSHEET_ID,
    range: "Sheet1!A:F", // sesuaikan nama sheet
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          now,
          data.nama,
          data.asalSekolah,
          data.minatProdi,
          data.noWa,
          "Landing PMB",
        ],
      ],
    },
  });
}
