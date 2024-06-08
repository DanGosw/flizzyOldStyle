<script setup>
import { optionsMenuStore } from "@/store/layout/optionsMenu.js";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
optionsMenuStore.createOptionsMenu();
const menuOptions = computed(() => { return optionsMenuStore.options;});

const isDark = useDark({ disableTransition: false });
const toggleDark = useToggle(isDark);

</script>

<template>
    <div class="h-auto">
        <p-menubar :model="menuOptions" breakpoint="800px"
                   class="rounded-none border text-slate-900 shadow-md shadow-slate-300 text-[12.5px] font-[500] py-[1px] dark:shadow-[#22242B] dark:text-slate-200">
            <template #start>
                <img src="@/assets/logo-white.svg" alt="logo" class="max-h-10 max-w-10" v-if="isDark"/>
                <img src="@/assets/logo-dark.svg" alt="logo" class="max-h-10 max-w-10" v-else/>
            </template>
            <template #item="{ item, props }">
                <router-link v-if="item.route && !item.items" :to="item.route">
                    <div v-bind="props.action" :class="`${item.route === route.path ? 'bg-indigo-500 rounded bg-opacity-80' : ''} p-0`">
                        <component :is="item.icon"
                                   :class="`${item.route === route.path ? 'text-white' : 'text-indigo-500'} text-indigo-500 text-[16.5px]`"/>
                        <span :class="`${item.route === route.path ? 'text-white' : 'text-surface-900 dark:text-surface-200'} ml-2`">
                                {{ item.label }}
                            </span>
                    </div>
                </router-link>
                <div v-else class="ml-2 flex cursor-pointer items-center py-1.5" @click="item.expand = !item.expand">
                    <component :is="item.icon" class="text-indigo-500 text-[16.5px]"/>
                    <span class="ml-2">{{ item.label }}</span>
                    <i-ic-outline-keyboard-arrow-right
                            :class="`${item.expand ? 'rotate-90' : 'rotate-0'} ml-2.5 transition duration-300`"/>
                </div>
            </template>
            <template #baricon>
                <i-solar-hamburger-menu-broken class="text-[24px]"/>
            </template>
            <template #end>
                <div class="flex space-x-2">
                    <p-button size="small" severity="secondary" class=" border border-surface-300" @click="toggleDark()">
                        <template #icon>
                            <i-ic-round-dark-mode v-if="isDark"/>
                            <i-ic-round-light-mode v-else/>
                        </template>
                    </p-button>
                    <p-button size="small" severity="secondary" class=" border border-surface-300" @click="router.push({ name: 'login' })">
                        <template #icon>
                            <i-material-symbols-person-outline-rounded/>
                        </template>
                    </p-button>
                </div>
            </template>
        </p-menubar>
    </div>
</template>
