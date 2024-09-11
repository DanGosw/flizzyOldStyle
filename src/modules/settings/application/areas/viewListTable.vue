<script setup>

import TableDesign from "@/hooks/components/tableDesign/tableDesign.vue";

const { table } = defineProps({ table: { default: { data: [], index: null }, required: true, type: Object } });

</script>

<template>
    <div class="md:w-3/4 w-full bg-surface-100 dark:bg-surface-800 p-2 rounded-xl border dark:border-slate-700">
        Mesas de {{ table?.data?.description }}
        <div class="grid grid-cols-1 flex-wrap items-center justify-start gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-12">
            <tableDesign v-for="table in table.data?.tables" :key="table.id" :table="table" :table-click="()=>{}">
                <div class="w-full bottom-0 absolute gap-1 flex p-1">
                    <Button label="Editar" size="small" raised class="w-1/2">
                        <template #icon>
                            <i-material-symbols-edit-note-rounded/>
                        </template>
                    </Button>
                    <Button label="Eliminar" size="small" raised severity="contrast" class="w-1/2">
                        <template #icon>
                            <i-material-symbols-light-delete-rounded/>
                        </template>
                    </Button>
                </div>
            </tableDesign>
        </div>
    </div>
</template>
