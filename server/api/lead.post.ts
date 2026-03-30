import { google } from "googleapis";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: config.GS_CLIENT_EMAIL,
      private_key: config.GS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.GS_SPREADSHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS", // ⬅️ INI KUNCI
    requestBody: {
      values: [
        [
          new Date().toLocaleString("id-ID"),
          body.nama,
          body.asalSekolah,
          body.minatProdi,
          body.noWa,
          body.source || "Landing PMB",
        ],
      ],
    },
  });

  return { success: true };
});
