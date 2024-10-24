<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useDark } from "@vueuse/core";
import LoadingData from "@/hooks/components/loading/loadingData.vue";

const loadingPage = ref(true);
const isDark = useDark({ disableTransition: false, initialValue: "auto" });

onBeforeMount(() => {
    window.addEventListener("load", () => {
        loadingPage.value = true;
    });
});

onMounted(() => {
    window.addEventListener("load", () => {
        setTimeout(() => { loadingPage.value = false; }, 1000);
    });
});

watch(isDark, (newVal) => {
    if(newVal) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}, { immediate: true });


</script>
<template>
    <div v-if="loadingPage" :class="`flex h-screen w-full items-center justify-center ${isDark ? 'bg-surface-900' : 'bg-primary-300'}`">
        <div>
            <LoadingData/>
        </div>
    </div>
    <div v-else>
        <router-view v-slot="{ Component }">
            <transition mode="out-in">
                <component :is="Component"/>
            </transition>
        </router-view>
        <toast/>
    </div>
</template>

<style>
/* Puedes usar tus clases de Tailwind aquí para transiciones, etc. */
body {
    background-color: #f3f4f6;
    transition: background-color 0.3s ease;
}

body.dark {
    background-color: #09090b;
}
</style>