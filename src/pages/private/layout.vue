<script setup>

</script>
<template>
    <div>
        <div class="sticky top-0 h-auto bg-slate-900 bg-opacity-70 dark:bg-slate-800 z-50">
            <navbar class="w-full"/>
        </div>
        <div class="z-40 flex w-full flex-col">
            <div class="m-2 flex-1">
                <router-view v-slot="{ Component }">
                    <transition mode="out-in">
                        <component :is="Component"/>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
    <p-toast/>
</template>
<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>
