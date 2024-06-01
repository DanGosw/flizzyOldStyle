<script setup>
import { optionsMenuStore } from "@/store/layout/optionsMenu.js";
import { useRouter } from "vue-router";

const router = useRouter();
optionsMenuStore.createOptionsMenu();
const menu_options = ref(optionsMenuStore.options);

</script>

<template>
    <div class="h-auto bg-opacity-70 pb-2 dark:bg-slate-800">
        <p-menubar :model="menu_options" class="!border-[1.7px] !border-gray-950 text-sm dark:!bg-slate-900 py-[2px]" exact>
            <template #start>
                <img src="@/assets/vue.svg" alt="logo" class="w-8"/>
            </template>
            <template #item="{ item, props }">
                <router-link v-if="item.route && !item.items" v-slot="{ href, navigate }" :to="item.route">
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <div class="flex cursor-pointer items-center p-0">
                            <component :is="item.customIcon"/>
                            <span class="ml-2">{{ item.label }}</span>
                        </div>
                    </a>
                </router-link>
                <div v-else class="ml-2 flex cursor-pointer items-center py-1.5">
                    <component :is="item.customIcon"/>
                    <span class="ml-2">{{ item.label }}</span>
                    <div class="ml-1 flex items-end" v-if="item.items">
                        <i-material-symbols-light-play-arrow-rounded/>
                    </div>
                </div>
            </template>
            <template #menubuttonicon>
                <div>
                    <i-material-symbols-light-menu-rounded/>
                </div>
            </template>
            <template #end>
                <p-button label="Logout" size="small" severity="danger" @click="router.push({ name: 'home' })"/>
            </template>
        </p-menubar>
    </div>
</template>
