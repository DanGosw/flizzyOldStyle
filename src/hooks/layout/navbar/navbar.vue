<script setup>
import { useFullscreen } from "@vueuse/core";
import { optionsMenuStore } from "@/store/layout/optionsMenu.js";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
optionsMenuStore.createOptionsMenu();
const menuOptions = computed(() => { return optionsMenuStore.options;});

const isDark = useDark({ disableTransition: false, initialValue: "auto" });

const toggleDark = () => {
    isDark.value = !isDark.value;
};

const { toggle, isFullscreen } = useFullscreen();
</script>

<template>
    <div class="h-auto">
        <Menubar :model="menuOptions" class="border shadow-md shadow-slate-300 text-[12px] font-[550] py-[2px] dark:shadow-[#22242B]">
            <template #start>
                <div class="flex h-9 w-14 items-center justify-center rounded border p-0.5 bg-surface-200 border-surface-300 dark:bg-surface-900 dark:border-surface-600">
                    <img src="@/assets/logo-white.svg" alt="logo" class="max-h-10 max-w-10" v-if="isDark"/>
                    <img src="@/assets/logo-dark.svg" alt="logo" class="max-h-10 max-w-10" v-else/>
                </div>
            </template>
            <template #item="{ item, props }">
                <router-link v-if="item.route && !item.items" :to="item.route">
                    <div v-bind="props.action"
                         :class="`${item.route === route.path ? 'bg-primary-500 rounded bg-opacity-80' : ''} p-0 select-none`">
                        <component :is="item.icon"
                                   :class="`${item.route === route.path ? 'text-white' : 'text-primary-500'} text-[16px]`"/>
                        <span :class="`${item.route === route.path ? 'text-white' : 'text-surface-900 dark:text-surface-200'} ml-1.5`">
                                {{ item.label }}
                            </span>
                    </div>
                </router-link>
                <div v-else class="ml-2 flex cursor-pointer select-none items-center py-1.5" @click="item.expand = !item.expand">
                    <component :is="item.icon" class="text-primary-500 text-[16px]"/>
                    <span class="ml-1.5 text-surface-900 dark:text-surface-200">{{ item.label }}</span>
                    <i-ic-outline-keyboard-arrow-right
                            :class="`${item.expand ? 'rotate-90' : 'rotate-0'} text-primary-500 mx-1.5 transition duration-300`"/>
                </div>
            </template>
            <template #submenuicon>
                <i-solar-hamburger-menu-broken class="text-[24px]"/>
            </template>
            <template #end>
                <div class="flex space-x-1">
                    <Button size="small" severity="secondary" class="!px-1.5 border border-surface-300" @click="toggle">
                        <template #icon>
                            <i-material-symbols-fullscreen v-if="isFullscreen"/>
                            <i-material-symbols-fullscreen-exit v-else/>
                        </template>
                    </Button>
                    <Button size="small" severity="secondary" class="!px-1.5 border border-surface-300" @click="toggleDark">
                        <template #icon>
                            <i-ic-round-dark-mode v-if="isDark"/>
                            <i-ic-round-light-mode v-else/>
                        </template>
                    </Button>
                    <Button size="small" severity="secondary" class="!px-1.5 border border-surface-300"
                            @click="router.push({ name: 'login' })">
                        <template #icon>
                            <i-material-symbols-person-outline-rounded/>
                        </template>
                    </Button>
                    <!--                    <div class="relative">-->
                    <!--                        <Button size="small" class="!px-1.5 border border-surface-300"-->
                    <!--                                v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true }">-->
                    <!--                            <template #icon>-->
                    <!--                                <i-carbon-color-palette/>-->
                    <!--                            </template>-->
                    <!--                        </Button>-->
                    <app-config/>
                    <!--                    </div>-->
                </div>
            </template>
        </Menubar>
    </div>
</template>
