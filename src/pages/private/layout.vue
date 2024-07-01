<script setup>

</script>
<template>
    <div class="h-screen">
        <div class="dark:bg-surface-900">
            <navbar class="sticky top-0 z-50 h-auto w-full"/>
            <div class="h-full w-full dark:bg-surface-900">
                <div class="m-2.5">
                    <router-view v-slot="{ Component }">
                        <transition mode="out-in">
                            <component :is="Component"/>
                        </transition>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
    <Toast/>
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
