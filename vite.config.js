import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import Icons from "unplugin-icons/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import { PrimeVueResolver, VueUseComponentsResolver, VueUseDirectiveResolver } from "unplugin-vue-components/resolvers";
import vitePluginSocketIO from "vite-plugin-socket-io";
import { socketEvents } from "./src/modules/socket/socket.js";

export default defineConfig({
    plugins: [
        vue(),
        vitePluginSocketIO({
            socketEvents, // Usar la lógica separada socketEvents
            ioOptions: {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST", "PUT", "DELETE"]
                }
            }
        }),
        Icons({
            compiler: "vue3",
            autoInstall: true
        }),
        Components({
            dirs: ["./src/**"],
            resolvers: [IconsResolver(), PrimeVueResolver(), VueUseComponentsResolver(), VueUseDirectiveResolver()],
            types: [
                {
                    from: "vue-router",
                    names: ["RouterLink", "RouterView"]
                }
            ],
            include: [/\.vue$/, /\.vue\?vue/],
            dts: true
        }),
        AutoImport({
            dirs: ["./src/**"],
            imports: [
                "vue",
                "vue-router",
                {
                    "vue-router": ["createRouter", "createWebHistory", "useRoute", "RouterLink"],
                    "vue/server-renderer": ["renderToString"],
                    axios: [["default", "axios"]],
                    // jspdf: [["jsPDF"]],
                    // "jspdf-autotable": [["applyPlugin"]],
                    // qrcode: [["default", "qr"]],
                    "crypto-js": [["default", "CryptoJS"]],
                    pinia: ["createPinia", "defineStore"],
                    "@vueuse/core": ["watchDebounced", "useDebounceFn", "useWindowSize", "useDark", "useToggle"],
                    "@vueuse/integrations/useCookies": ["useCookies"],
                    "primevue": ["useConfirm", "useConfirmDialog", "Dialog", "Button", "Menubar", "Card"],
                    "primevue/usetoast": ["useToast"],
                    "vee-validate": ["useForm", "defineRule", "useField"],
                    "@vueuse/integrations/useAxios": ["useAxios"],
                    // "dom-to-image": ["toPng"],
                    "vue-cookies": [["default", "VueCookies"]]
                    // "date-fns/format": [["default", "format"]],
                    // "date-fns/locale": ["es"],
                    // "date-fns/addDays": [["default", "addDays"]],
                    // "date-fns/parseISO": [["default", "parseISO"]],
                    // "decimal.js": [["default", "Decimal"]],
                }
            ],
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/, /\.html/],
            resolvers: [
                IconsResolver({ prefix: "Icon" }),
                VueUseComponentsResolver(), PrimeVueResolver(), VueUseDirectiveResolver()
            ],
            dts: true
        })],
    server: {
        host: true,
        port: 5180
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
