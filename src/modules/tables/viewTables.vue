<script setup>

const toast = useToast();

const tableSchema = ref([
    {
        id: 1,
        description: "PRINCIPAL",
        branch: 1,
        is_disabled: false,
        tables: [
            {
                id: 1,
                modified: "26/06/2024 11:18:56",
                code: "ME-01",
                description: "MESA 1",
                area: 1,
                status: "3",
                is_disabled: false,
                order_amount: 60,
                orders: []
            },
            {
                id: 2,
                modified: "28/06/2024 09:44:57",
                code: "ME-02",
                description: "MESA 2",
                area: 1,
                status: "3",
                is_disabled: false,
                order_amount: 66,
                orders: [
                    {
                        id: 1,
                        modified: "26/06/2024 11:18:56",
                        code: "ME-01",
                        description: "MESA 1",
                        area: 1,
                        status: "3",
                        is_disabled: false,
                        order_amount: 60,
                        orders: []
                    },
                    {
                        id: 2,
                        modified: "28/06/2024 09:44:57",
                        code: "ME-02",
                        description: "MESA 2",
                        area: 1,
                        status: "3",
                        is_disabled: false,
                        order_amount: 66,
                        orders: []
                    }

                ]
            },
            {
                id: 3,
                modified: "19/06/2024 22:58:19",
                code: "ME-03",
                description: "MESA 3",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 4,
                modified: "19/06/2024 23:27:19",
                code: "ME-04",
                description: "MESA 4",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 5,
                modified: "19/06/2024 21:49:38",
                code: "ME-05",
                description: "MESA 5",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 6,
                modified: "19/06/2024 23:36:33",
                code: "ME-06",
                description: "MESA 6",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 7,
                modified: "19/06/2024 20:41:09",
                code: "ME-07",
                description: "MESA 7",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 8,
                modified: "19/06/2024 21:02:53",
                code: "ME-08",
                description: "MESA 8",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 9,
                modified: "19/06/2024 21:17:04",
                code: "ME-09",
                description: "MESA 9",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            }
        ]
    },
    {
        id: 2,
        description: "SECUNDARIA",
        branch: 1,
        is_disabled: false,
        tables: [
            {
                id: 10,
                modified: "19/06/2024 22:47:26",
                code: "ME-10",
                description: "MESA 10",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 11,
                modified: "19/06/2024 23:00:38",
                code: "ME-11",
                description: "MESA 11",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 12,
                modified: "20/06/2024 00:12:57",
                code: "ME-12",
                description: "MESA 12",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 13,
                modified: "20/06/2024 00:01:24",
                code: "ME-13",
                description: "MESA 13",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 14,
                modified: "19/06/2024 21:54:45",
                code: "ME-14",
                description: "MESA 14",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 15,
                modified: "20/06/2024 00:09:58",
                code: "ME-15",
                description: "MESA 15",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 16,
                modified: "17/06/2024 21:49:35",
                code: "ME-16",
                description: "MESA 16",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 17,
                modified: "19/06/2024 19:52:49",
                code: "ME-17",
                description: "MESA 17",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            },
            {
                id: 18,
                modified: "09/06/2024 16:09:18",
                code: "ME-18",
                description: "MESA 18",
                area: 1,
                status: "1",
                is_disabled: false,
                order_amount: "",
                orders: []
            }
        ]
    }
]);

const items = ref([
    {
        label: "Add",
        class: () => { return h(IconMaterialSymbolsLocationOnOutline); },
        command: () => {
            toast.add({ severity: "info", summary: "Add", detail: "Data Added" });
        }
    },
    {
        label: "Update",
        class: () => { return h(IconMaterialSymbolsArticle); },
        command: () => {
            toast.add({ severity: "success", summary: "Update", detail: "Data Updated" });
        }
    },
    {
        label: "Delete",
        class: () => { return h(IconFluentBoxEdit20Filled); },
        command: () => {
            toast.add({ severity: "error", summary: "Delete", detail: "Data Deleted" });
        }
    },
    {
        label: "Upload",
        class: () => { return h(IconFluentBoxEdit20Filled); },
        command: () => {
            toast.add({ severity: "error", summary: "Delete", detail: "Data Deleted" });
        }
    },
    {
        label: "Vue Website",
        class: () => { return h(IconFluentBoxEdit20Filled); },
        command: () => {
            toast.add({ severity: "error", summary: "Delete", detail: "Data Deleted" });
        }
    }
]);

</script>

<template>
    <Card>
        <template #title>
            Mesas
        </template>
        <template #content>
            <div v-for="(branch, index) in tableSchema" :key="index" class="my-2">
                <div class="flex h-full w-full flex-col rounded-lg p-2 bg-primary-400/20 dark:bg-surface-700/70">
                    <p class="m-3">{{ branch.description }}</p>
                    <div class="grid grid-cols-1 flex-wrap items-center justify-start gap-2 sm:grid-cols-4 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-12">
                        <div v-for="(table, index) in branch.tables" :key="index" @click="() => { table.order_amount = 666 }"
                             :class="`${table.order_amount ? 'bg-primary-300 dark:bg-primary-500' : 'bg-surface-300 dark:bg-surface-800'} border border-surface-300 dark:border-surface-700`"
                             class="relative col-span-2 flex h-44 z-10 flex-col justify-between rounded-lg sm:col-span-2 md:col-span-3 lg:col-span-2">

                            <SpeedDial :model="items" :radius="120" type="quarter-circle" direction="down-left"
                                       class="top-1.5 right-1.5 z-50" :tooltipOptions="{ position: 'left', event: 'hover' }"
                                       v-if="table.order_amount">
                                <template #button="{ onClick: toggleCallback }">
                                    <Button class="!p-1.5" rounded @click.stop="toggleCallback">
                                        <i-material-symbols-add/>
                                    </Button>
                                </template>
                                <template #item="{ item, onClick: toggleCallback }">
                                    <div class="flex cursor-pointer items-center justify-center rounded-full p-1.5 z-50 bg-primary-500 dark:bg-primary-400 "
                                         @click.stop="toggleCallback">
                                        <component :is="item.class"/>
                                    </div>
                                </template>
                            </SpeedDial>
                            <div class="flex h-20 w-full items-center justify-center rounded-t-lg text-xl font-semibold top-">
                                {{ table.description }}
                            </div>
                            <div class="flex h-20 w-full items-center justify-center rounded-b-lg" v-if="table.order_amount">
                                S/. {{ table.order_amount.toFixed(2) }}
                            </div>
                            <div class="flex h-6 w-full flex-col items-center justify-center rounded-b-lg bg-red-400 text-sm font-semibold"
                                 v-if="table.order_amount">
                                <p class="animate-pulse">
                                    {{ table.modified }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
