export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: "/",

    /* =========================
       META PIXEL (JANGAN DIUBAH)
    ========================= */
    head: {
      script: [
        {
          hid: "meta-pixel",
          innerHTML: `
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${
              process.env.NUXT_PUBLIC_META_PIXEL_ID || "3852898454807503"
            }');
            fbq('track', 'PageView');
          `,
          type: "text/javascript",
        },
      ],

      noscript: [
        {
          innerHTML: `
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=${
              process.env.NUXT_PUBLIC_META_PIXEL_ID || "3852898454807503"
            }&ev=PageView&noscript=1" />
          `,
        },
      ],
    },
  },

  /* =========================
     RUNTIME CONFIG (FIXED)
  ========================= */
  runtimeConfig: {
    // 🔒 SERVER ONLY (AMAN)
    GS_CLIENT_EMAIL: process.env.GS_CLIENT_EMAIL,
    GS_PRIVATE_KEY: process.env.GS_PRIVATE_KEY,
    GS_SPREADSHEET_ID: process.env.GS_SPREADSHEET_ID,
    WABLAS_API_KEY: process.env.WABLAS_API_KEY,
    WABLAS_SECRET_KEY: process.env.WABLAS_SECRET_KEY,
    WABLAS_ADMIN_WA: process.env.WABLAS_ADMIN_WA,

    // 🌍 CLIENT PUBLIC
    public: {
      metaPixelId: process.env.NUXT_PUBLIC_META_PIXEL_ID,
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "https://sbh.ac.id",
      imageBaseUrl:
        process.env.NUXT_PUBLIC_IMAGE_BASE_URL || "https://sbh.ac.id",
      API_URL_BASE: process.env.API_URL_BASE || "https://join.sbh.ac.id",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],

  tailwindcss: {
    viewer: false,
  },

  devServer: {
    port: 3001,
    host: "0.0.0.0",
  },
});
