<script setup>
import { useFullscreen } from "@vueuse/core";
import { optionsMenuStore } from "@/store/layout/optionsMenu.js";
import { useRoute, useRouter } from "vue-router";
import AppConfig from "@/hooks/components/app/appConfig.vue";
import Menubar from "primevue/menubar";
import Button from "primevue/button";

const router = useRouter();
const route = useRoute();
optionsMenuStore.createOptionsMenu();
const menuOptions = computed(() => { return optionsMenuStore.options;});

const isDark = useDark({ disableTransition: false, initialValue: "auto" });

const { toggle, isFullscreen } = useFullscreen();
</script>

<template>
    <Menubar :model="menuOptions" class="border shadow-md shadow-slate-300 font-medium text-[12px] dark:shadow-[#22242B] p-0.5">
        <template #start>
            <div class="mr-1 flex h-9 w-14 items-center justify-center rounded-md border bg-surface-200 border-surface-300 dark:bg-surface-900 dark:border-surface-600">
                <img src="@/assets/logo-white.svg" alt="logo" class="max-h-10 max-w-10" v-if="isDark"/>
                <img src="@/assets/logo-dark.svg" alt="logo" class="max-h-10 max-w-10" v-else/>
            </div>
        </template>
        <template #item="{ item, props }">
            <router-link v-if="item.route && !item.items" :to="item.route">
                <div v-bind="props.action" :class="`${item.route === route.path ? 'bg-primary-500 rounded' : ''} select-none`" v-ripple>
                    <component :is="item.icon" :class="`${item.route === route.path ? 'text-white' : 'text-primary-500'} text-[16px]`"/>
                    <span :class="`${item.route === route.path ? 'text-white' : 'text-surface-900 dark:text-surface-200'} ml-1.5`">
                                            {{ item.label }}
                                        </span>
                </div>
            </router-link>
            <div v-else class="flex cursor-pointer select-none items-center pl-2 py-1.5" @click="item.expand = !item.expand" v-ripple>
                <component :is="item.icon" class="text-primary-500 text-[16px]"/>
                <span class="ml-1.5 text-surface-900 dark:text-surface-200">{{ item.label }}</span>
                <i-material-symbols-keyboard-arrow-down-rounded class="text-primary-500 ml-1 transition duration-300`"/>
            </div>
        </template>
        <template #submenuicon>
            <i-solar-hamburger-menu-broken/>
        </template>
        <template #end>
            <div class="flex space-x-1">
                <Button size="small" severity="secondary" class="border border-surface-300" @click="toggle">
                    <template #icon>
                        <i-material-symbols-fullscreen v-if="isFullscreen"/>
                        <i-material-symbols-fullscreen-exit v-else/>
                    </template>
                </Button>
                <Button size="small" severity="secondary" class="border border-surface-300" @click="router.push({ name: 'login' })">
                    <template #icon>
                        <i-material-symbols-person-outline-rounded/>
                    </template>
                </Button>
                <app-config/>
            </div>
        </template>
    </Menubar>
</template>
