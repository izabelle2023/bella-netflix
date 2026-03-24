import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  publicDir: "public",

  server: {
    host: true,
    port: 3000,
  },

  build: {
    target: "esnext",
    minify: "terser",

    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "pags/login.html"),
        perfil: resolve(__dirname, "pags/perfil.html"),
        user: resolve(__dirname, "pags/usuarios.html"),
        analytics: resolve(__dirname, "pags/analytics.html"),
        face: resolve(__dirname, "pags/face.html"),
        video: resolve(__dirname, "pags/video.html"),

        adminDashboard: resolve(__dirname, "pags/adm/dashboard.html"),
        adminVideo: resolve(__dirname, "pags/adm/videos.html"),
        adminCategorias: resolve(__dirname, "pags/adm/categorias.html"),
        adminComentarios: resolve(__dirname, "pags/adm/comentarios.html"),
        adminAnalytics: resolve(__dirname, "pags/adm/analytics.html"),
        adminSetter: resolve(__dirname, "pags/adm/adm-setter.html"),
      },
    },
  },
});