<script setup>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

const schemaValidate = yup.object({
    username: yup.string().required("Ingrese su usuario").label("username").min(5, "Ingresa al menos 5 caracteres"),
    password: yup.string().required("Ingrese su contraseña").label("password").min(5, "Ingresa al menos 5 caracteres")
});

const fields = ref({
    username: "",
    password: ""
});

const { handleSubmit, resetForm, errors } = useForm({
    validationSchema: schemaValidate,
    initialValues: fields.value
});

const { value: username, errorMessage: usernameError, handleBlur: usernameBlur } = useField("username");
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField("password");

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
});

const onReset = () => {
    resetForm();
};

</script>

<template>
    <div class="flex min-h-screen w-screen justify-center bg-gradient-to-b from-indigo-200 to-indigo-600">
        <div class="z-10 m-auto p-2">
            <div class="mx-10 flex justify-center">
                <img class="h-64" draggable="false" src="~@/assets/flizzy-color.png" alt="app-logo"/>
            </div>
            <Card class="h-auto w-full border border-gray-400" style="max-width: 400px;">
                <template #content>
                    <h2 class="text-center text-3xl font-extrabold text-slate-900 dark:text-slate-200">
                        Welcome Flizzy 2.0
                    </h2>
                    <p class="mt-4 text-center font-semibold text-gray-500 text-md">Sign in to continue</p>
                    <div class="mt-8 w-full space-y-2">
                        <div class="mt-4">
                            <label for="username" :class="{ 'text-red-500': !!errors.username }">Usuario
                                <strong class="text-red-500">*</strong>
                            </label>
                            <InputText class="relative block w-full" placeholder="Ingrese su usuario" id="username"
                                       @blur="usernameBlur(undefined, true)" :invalid="!!errors.username" v-model="username"/>
                            <span class="flex h-4 text-sm text-red-500">{{ usernameError }}</span>
                        </div>
                        <div>
                            <label for="password" :class="{ 'text-red-500': !!errors.password }">Contraseña
                                <strong class="text-red-500">*</strong>
                            </label>
                            <Password class="relative block w-full" :toggleMask="true" :feedback="false" :invalid="!!errors.password"
                                      inputClass="w-full" @blur="passwordBlur(undefined,true)"
                                      placeholder="Ingrese su contraseña" id="password" v-model="password">
                            </Password>
                            <span class="flex h-4 text-sm text-red-500">{{ passwordError }}</span>
                        </div>
                    </div>
                    <div class="mt-2 space-y-2">
                        <Button class="w-full" label="Iniciar Sesión" @click="onSubmit()" icon-pos="top" icon="i-ic-baseline-login">
                            <template #icon>
                                <i-ic-baseline-login class=""/>
                            </template>
                        </Button>
                        <Button class="w-full" label="Restablecer validación" severity="contrast" @click="onReset()"/>
                    </div>
                </template>
            </Card>
            <div class="px-8 py-4 text-center">
                <span class="text-gray-400">Powered by DevRunner</span>
                <a class="font-medium text-slate-900 hover:text-slate-800" href="#"> ACM1PT</a>
            </div>
        </div>
        <div class="fixed right-0 bottom-0 left-0 z-0 waves-container">
            <svg
                    class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(188, 189, 249, 0.7"/>
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(99, 102, 241, 0.5)"/>
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(129, 131, 244, 0.3)"/>
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(129, 131, 244)"/>
                </g>
            </svg>
        </div>
    </div>
</template>
<style>

.required label::after {
    content: "*";
}

.waves {
    position: relative;
    width: 100%;
    height: 15vh;
    min-height: 100px;
    max-height: 300px;
}

/* Animation */

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
