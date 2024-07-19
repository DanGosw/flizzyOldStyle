<script setup>
const props = defineProps({
    table: { type: Object, required: true },
    showSpeed: { type: Boolean, default: false }
});

function handleTableClick(event) {
    if(!event.target.closest(".xd")) {
        props.table.order_amount = 666;
    }
}
</script>

<template>
    <div @click="handleTableClick"
         class="relative z-10 col-span-2 flex h-48 max-h-48 cursor-pointer flex-col justify-between rounded-lg font-semibold shadow-lg sm:col-span-2 md:col-span-3 lg:col-span-2 transition">
        <div :class="`${table?.status === '3' ? 'bg-primary-400/60 dark:bg-primary-500/70' : 'bg-surface-400/70 dark:bg-surface-800/60'} border border-surface-400 dark:border-surface-600 rounded-lg h-full max-h-48`">
            <div class="flex h-32 w-full select-none flex-wrap gap-1 overflow-x-auto rounded-t-lg p-1.5" v-if="table.orders.length > 0">
                <div v-for="moreTable in table.orders" :key="moreTable.code" v-tooltip.top="moreTable.description"
                     class="flex w-auto flex-grow items-center justify-center rounded-lg border p-2 text-white border-surface-300 bg-primary-700/80 dark:bg-primary-800/60">
                    {{ moreTable.description }}
                </div>
            </div>
            <div class="flex h-32 w-full items-center justify-center rounded-lg text-xl" v-else>
                {{ table.description }}
            </div>
            <div class="flex h-10 w-full items-center justify-center text-xl text-surface-800" v-if="table?.status === '3'">
                S/. {{ table.order_amount.toFixed(2) }}
            </div>
            <div class="flex w-full items-center justify-center rounded-b-lg bg-red-400/60 text-sm font-bold h-[22.78px]"
                 v-if="table?.status === '3'">
                <p class="animate-pulse text-surface-800">
                    {{ table.modified }}
                </p>
            </div>
        </div>
        <slot/>
        <img draggable="false" src="~@/assets/animatedFood.gif" alt=""
             class="absolute top-0 left-0 -z-10 h-full w-full rounded-lg opacity-50"/>
    </div>
</template>
