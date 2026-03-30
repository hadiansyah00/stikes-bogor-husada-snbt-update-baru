export async function sendWablasMessage(phone: string, message: string) {
  const config = useRuntimeConfig();

  const payload = {
    data: [
      {
        phone,
        message,
        isGroup: false,
        flag: "instant",
      },
    ],
  };

  try {
    return await $fetch("https://bdg.wablas.com/api/v2/send-message", {
      method: "POST",
      timeout: 30000,
      headers: {
        Authorization: `${config.WABLAS_API_KEY}.${config.WABLAS_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: payload,
    });
  } catch (error: any) {
    const errorData = error?.response?._data || error.message;
    console.error("Wablas API Error:", errorData);
    
    // Check for specific known errors to give better feedback via server logs
    if (errorData?.message?.includes('secret key invalid')) {
      console.warn("⚠️ PERHATIAN: WABLAS_SECRET_KEY di .env tidak valid atau sudah kadaluarsa. Silakan periksa dashboard Wablas Anda.");
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengirim pesan WhatsApp via Wablas",
      data: errorData,
    });
  }
}
