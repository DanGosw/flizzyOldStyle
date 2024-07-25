<script setup>
// const props = defineProps({ refreshData: { type: Function, default: () => {} } });

import EmptyTable from "@/hooks/components/empty/emptyTable.vue";
import LoadingData from "@/hooks/components/loading/loadingData.vue";

const toast = useToast();
const data = ref();
const totalLength = ref(0);
const page = ref(1);
const loading = ref(true);
const pageSize = ref(10);

/* Methods */
const showMessage = (info) => {
    console.log(info);
    /* Toast  @params {severity: 'success|info|warn|error', summary: 'string', detail: 'string', life: 'number'}*/
    toast.add({ severity: "info", summary: "Title xd", detail: info.type, life: 5000 });
};

/**
 * Carga datos de la API de Pokémon.
 *
 * @async
 * @function loadCustomer
 * @description Realiza una llamada a la API de Pokémon para obtener una lista de Pokémon basada en la paginación.
 * @params {Object} options - Opciones para la solicitud de la API.
 * @params {number} options.limit - El límite de Pokémon a retornar.
 * @params {number} options.offset - El desplazamiento de inicio para la consulta de Pokémon.
 * @returns {Promise<void>} - La promesa que representa el proceso de carga de datos.
 */
const loadCustomer = async() => {
    loading.value = true;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`,
        { params: { limit: pageSize.value, offset: (page.value - 1) * pageSize.value } });
    data.value = response.data.results;
    totalLength.value = response.data.count;
    loading.value = false;
};

/**
 * Change the pagination.
 * @params {event} event
 * @returns {Promise<void>} - La promesa que representa el proceso de cambio de paginación.
 */
const onPageChange = async(event) => {
    page.value = event.page + 1;
    pageSize.value = event.rows;
    await loadCustomer();
};

/**
 * Carga la lista de usuarios.
 */
onMounted(() => {
    loadCustomer();
});

defineExpose({ loadCustomer });
</script>

<template>
    <div>
        <DataTable size="small" striped-rows show-gridlines :value="data" scroll-direction="horizontal" scroll-height="65vh"
                   :rowsPerPageOptions="[10,20,50]" :total-records="totalLength" lazy scrollable @page="onPageChange" :loading="loading"
                   dataKey="code" tableStyle="min-width: 70rem;" paginator :rows="pageSize"
                   :paginatorTemplate="{
                                        '640px': 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown',
                                        '960px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
                                        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
                                        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown' }">
            <template #empty>
                <empty-table/>
            </template>
            <template #loading>
                <loading-data/>
            </template>
            <Column style="width: 10%" field="dni" header="DNI"/>
            <Column style="width: 10%" field="name" header="Nombres"/>
            <Column style="width: 10%" field="url" header="Correo"/>
            <Column style="width: 10%" field="id" header="Perfil"/>
            <Column style="width: 10%" field="id" header="Sucursal"/>
            <Column style="width: 10%" field="id" header="Estado"/>
            <Column style="width: 10%" header="Acciones">
                <template #body>
                    <div class="flex items-center justify-center space-x-1">
                        <Button size="small" severity="warning" v-tooltip.top="'Editar Usuario'" @click="showMessage"
                                class="!p-0.5">
                            <template #icon>
                                <i-tabler-user-edit class="mx-0.5"/>
                            </template>
                        </Button>
                        <Button size="small" v-tooltip.top="'Editar Permisos'" @click="showMessage" class="!p-0.5">
                            <template #icon>
                                <i-material-symbols-list-alt-add-outline class="mx-0.5"/>
                            </template>
                        </Button>
                        <Button size="small" severity="info" v-tooltip.top="'Cambiar Contraseña'" @click="showMessage"
                                class="!p-0.5">
                            <template #icon>
                                <i-material-symbols-lock class="mx-0.5"/>
                            </template>
                        </Button>
                        <Button size="small" severity="danger" v-tooltip.top="'Bloquear usuario'" @click="showMessage"
                                class="!p-0.5">
                            <template #icon>
                                <i-solar-user-block-outline class="mx-0.5"/>
                            </template>
                        </Button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
