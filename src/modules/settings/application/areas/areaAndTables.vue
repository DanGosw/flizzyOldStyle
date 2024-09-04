<script setup>

import TableDesign from "@/hooks/components/tableDesign/tableDesign.vue";

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
                is_disabled: false,
                order_amount: 66,
                orders: []
            },
            {
                id: 3,
                modified: "19/06/2024 22:58:19",
                code: "ME-03",
                description: "MESA 3",
                area: 1,
                is_disabled: false,
                order_amount: 52,
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
            }
        ]
    }
]);

const arrayTable = ref([]);
const editingRows = ref([]);

const saveRowEdit = ({ data }) => {
    console.log(data);
};

const addDataOnRowClick = ({ data, originalEvent }) => {
    console.log(data);
    // console.log(xd);
    console.log(originalEvent.target.closest(""));
    if(!originalEvent.target.closest(".xd .p-cell-editing")) {
        arrayTable.value = data;
    }
};

</script>

<template>
    <div class="flex gap-2 flex-wrap md:flex-nowrap">
        <div class="md:w-1/4 w-full">
            <DataTable size="large" striped-rows show-gridlines dataKey="code" tableStyle="min-width: 15rem;" :value="tableSchema"
                       @row-click="addDataOnRowClick" edit-mode="row" v-model:editing-rows="editingRows" data-key="id"
                       @row-edit-save="saveRowEdit">
                <Column field="description" header="Areas" style="width: 10%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]"/>
                    </template>
                </Column>
                <Column field="" header="" row-editor style="width: 1%" class="xd">
                    <template #header>
                        <Button raised text>
                            <template #icon>
                                <i-fluent-table-offset-add-24-filled/>
                            </template>
                        </Button>
                    </template>
                    <template #roweditoriniticon>
                        <i-material-symbols-edit class="xd"/>
                    </template>
                    <template #roweditorsaveicon>
                        <i-ic-baseline-save-all class="xd"/>
                    </template>
                    <template #roweditorcancelicon>
                        <i-solar-close-square-bold class="xd"/>
                    </template>

                </Column>
            </DataTable>
        </div>
        <div class="md:w-3/4 w-full bg-surface-100 dark:bg-surface-800 p-2 rounded-xl border dark:border-slate-700">
            Mesas de {{ arrayTable?.description }}
            <div class="grid grid-cols-1 flex-wrap items-center justify-start gap-2 sm:grid-cols-4 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-12">

                <tableDesign v-for="table in arrayTable?.tables" :key="table.id" :table="table">
                    <div class="w-full bottom-0 absolute gap-2 flex p-1">
                        <Button label="Editar" raised class="w-1/2">
                            <template #icon>
                                <i-material-symbols-edit-note-rounded/>
                            </template>
                        </Button>
                        <Button label="Eliminar" raised severity="contrast" class="w-1/2">
                            <template #icon>
                                <i-material-symbols-light-delete-rounded/>
                            </template>
                        </Button>
                    </div>
                </tableDesign>
            </div>
        </div>
    </div>
</template>
