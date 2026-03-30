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

  return await $fetch("https://bdg.wablas.com/api/v2/send-message", {
    method: "POST",
    timeout: 30000,
    headers: {
      Authorization: `${config.WABLAS_API_KEY}.${config.WABLAS_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: payload,
  });
}
