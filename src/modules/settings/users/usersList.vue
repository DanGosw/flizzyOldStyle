<script setup>
/* Imports */
import addUsers from "@/modules/settings/users/addUsers.vue";
import changeSecurityCode from "@/modules/settings/users/changeSecurityCode.vue";
/* Defaults Variables */
const data = ref();
const toast = useToast();
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
 * @params {Function} closeModal - Function that returns visible of the modal.
 * @returns {void} - Change the visibility of the modal
 */
const closeModal = () => {
    parametersModal.value.visible = false;
};

/**
 * Carga datos de la API de Pokémon.
 *
 * @async
 * @function loadData
 * @description Realiza una llamada a la API de Pokémon para obtener una lista de Pokémon basada en la paginación.
 * @params {Object} options - Opciones para la solicitud de la API.
 * @params {number} options.limit - El límite de Pokémon a retornar.
 * @params {number} options.offset - El desplazamiento de inicio para la consulta de Pokémon.
 * @returns {Promise<void>} - La promesa que representa el proceso de carga de datos.
 */
const loadData = async() => {
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
    await loadData();
};

const parametersModal = ref({
    /**
     * @params {boolean} false - default value.
     * @description Visible of the modal.
     */
    visible: false,
    /**
     *  @params {string} - default value.
     *  @description Title of the modal.
     */
    header: "",
    /**
     *  @params {string} - default value.
     *  @description Content of the modal.
     */
    content: "",
    /**
     *  @params {string} - default value.
     *  @description Width of the modal.
     */
    width: "30vw",
    /**
     *  @params {string} - default value.
     *  @description Footer of the modal.
     */
    footer: "",
    /**
     * @params {Component} - Function that returns a component
     * @description Component of the modal.
     */
    component: () => {}
});

const componentAddUserModal = h(addUsers, {
    closeModal
});

const addParametersUserModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Nuevo usuario",
        width: "70vw",
        content: "content",
        footer: "",
        component: componentAddUserModal
    };
};

const componentCodeModal = h(changeSecurityCode, {
    closeModal
});

const addParametersCodeModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Cambiar clave de seguridad",
        content: "content",
        width: "30vw",
        footer: "",
        component: componentCodeModal
    };
};

/**
 * Carga la lista de usuarios.
 */
onMounted(() => {
    loadData();
});

</script>

<template>
    <div>
        <Card>
            <template #title>
                <div class="flex sm:justify-between flex-wrap">
                    <div>
                        <p>Configuración de Usuarios</p>
                    </div>
                    <div class="sm:space-x-2 space-x-0 space-y-2 sm:space-y-0 mt-2 sm:mt-0">
                        <Button label="Cambiar Clave de Seguridad" size="small" severity="warning" @click="addParametersCodeModal">
                            <template #icon>
                                <i-ri-lock-password-line class="mx-1"/>
                            </template>
                        </Button>
                        <Button label="Nuevo usuario" size="small" @click="addParametersUserModal">
                            <template #icon>
                                <i-fluent-person-add-32-regular class="mx-1"/>
                            </template>
                        </Button>
                    </div>
                    <Divider class="!my-4"/>
                </div>
            </template>
            <template #content>
                <div class="relative">
                    <i-ri-search-line class="absolute top-2/4 -mt-2.5 left-3 text-surface-400 dark:text-surface-600"/>
                    <InputText placeholder="Buscar usuario" class="pl-10 !rounded-full !max-w-96" size="small"/>
                </div>
                <DataTable size="small" striped-rows show-gridlines :value="data" scroll-direction="horizontal" scroll-height="65vh"
                           :row-class="()=>{'text-center'}" :rowsPerPageOptions="[10,20,50]" :total-records="totalLength" lazy scrollable
                           @page="onPageChange" :loading="loading" dataKey="code" tableStyle="min-width: 110rem;" class="mt-4" paginator
                           :rows="pageSize"
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
                    <Column style="width: 5%" field="dni" header="DNI"/>
                    <Column style="width: 10%" field="name" header="Nombres"/>
                    <Column style="width: 10%" field="url" header="Correo"/>
                    <Column style="width: 10%" field="id" header="Perfil"/>
                    <Column style="width: 10%" field="id" header="Sucursal"/>
                    <Column style="width: 10%" field="id" header="Estado"/>
                    <Column style="width: 5%" header="Acciones">
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
            </template>
        </Card>
        <modal-component ref="modal" :parameters="parametersModal"/>
    </div>
</template>
