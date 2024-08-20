<script setup>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import LabelRequired from "@/hooks/components/labelRequired/labelRequired.vue";
import router from "@/routes/index.js";

const schemaValidate = yup.object({
    username: yup.string().required("Ingrese su usuario").label("username").min(5, "Ingresa al menos 5 caracteres"),
    password: yup.string().required("Ingrese su contraseña").label("password").min(5, "Ingresa al menos 5 caracteres")
});

const fields = ref({ username: "", password: "" });

const { handleSubmit, resetForm, errors } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField("username");
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField("password");

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
    router.push({ name: "home" });
});

</script>

<template>
    <div class="flex min-h-screen bg-gradient-to-b from-indigo-200 to-indigo-600">
        <div class="z-10 m-auto p-2">
            <div class="flex justify-center items-center">
                <img class="h-64" draggable="false" src="~@/assets/flizzy-color.png" alt="business-logo"/>
            </div>
            <Card>
                <template #content>
                    <p class="text-center text-3xl font-extrabold"> Welcome Flizzy 2.0 </p>
                    <p class="my-2 text-center font-semibold text-gray-500 dark:text-gray-300">Inicie sesion para continuar</p>
                    <div class="grid grid-cols-4 gap-2" v-focustrap>
                        <div class="col-span-4">
                            <label-required for="username" label="Usuario" mark/>
                            <InputText v-model="username" class="w-full" placeholder="Ingrese su usuario" id="username" size="small"
                                       @blur="usernameBlur($event, true)" :invalid="!!errors.username" autofocus/>
                            <span class="markRequired">{{ usernameError }}</span>
                        </div>
                        <div class="col-span-4">
                            <label-required for="password" label="Contraseña" mark/>
                            <Password class="w-full" inputClass="w-full" :toggleMask="true" :feedback="false" :invalid="!!errors.password"
                                      v-model="password" @blur="passwordBlur($event,true)" placeholder="Ingrese su contraseña"
                                      input-id="password"/>
                            <span class="markRequired">{{ passwordError }}</span>
                        </div>
                    </div>
                    <Button class="mt-2 w-full" label="Iniciar Sesión" @click="onSubmit()">
                        <template #icon>
                            <i-ic-baseline-login class=""/>
                        </template>
                    </Button>
                </template>
            </Card>
            <div class="flex items-center justify-center gap-2 mt-2">
                <span class="text-gray-400">Powered by DevRunner</span>
                <i-bi-github/>
            </div>
        </div>
        <div class="fixed right-0 bottom-0 left-0 z-0 waves-container">
            <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(188, 189, 249, 0.7"/>
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(99, 102, 241, 0.5)"/>
                    <use xlink:href="#gentle-wave" x="48" y="8" fill="rgba(129, 131, 244, 0.3)"/>
                    <use xlink:href="#gentle-wave" x="48" y="10" fill="rgba(129, 131, 244)"/>
                </g>
            </svg>
        </div>
    </div>
</template>
<style>

.waves {
    @apply relative w-full h-32 min-h-24 max-h-72
}

.parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}

.parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}

.parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}

.parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }
    100% {
        transform: translate3d(85px, 0, 0);
    }
}

/*Shrinking for mobile*/
@media (max-width: 768px) {
    .waves {
        height: 100px;
        min-height: 100px;
    }
}
</style>
