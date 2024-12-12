import { createApp } from "vue";
import "./style.css";
import "./assets/primevue/tailwind.css";
import PrimeVue from "primevue/config";

import AnimateOnScroll from "primevue/animateonscroll";
import BadgeDirective from "primevue/badgedirective";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import FocusTrap from "primevue/focustrap";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import routes from "@/routes/index.js";

import App from "@/App.vue";

const pinia = createPinia();

const app = createApp(App);

app.directive("tooltip", Tooltip);
app.directive("badge", BadgeDirective);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.directive("focustrap", FocusTrap);
app.directive("animateonscroll", AnimateOnScroll);

app.use(pinia);
app.use(PrimeVue, {
    ripple: true,
    theme: "none"
});

app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(routes);

app.mount("#app");
