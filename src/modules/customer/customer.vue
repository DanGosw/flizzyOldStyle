<script setup>
import addCustomer from "@/modules/customer/addCustomer.vue";
import CustomerList from "@/modules/customer/customerList.vue";
import ModalComponent from "@/hooks/components/modal/modalComponent.vue";
import LabelRequired from "@/hooks/components/labelRequired/labelRequired.vue";

const refListCustomer = ref();
const showCustomerFilter = ref(true);

const parametersModal = ref({
    visible: false,
    header: "",
    width: "65vw",
    footer: () => {},
    component: () => {}
});

const optionsStatus = ref([
    { label: "Activo", value: "A" },
    { label: "Inactivo", value: "I" }
]);

const closeModal = () => { parametersModal.value.visible = false; };
const customerFilters = ref({ docType: null, docNumber: null, name: "", phone: null });

const componentAddClientModal = h(addCustomer, {
    /**
     * Function to close de modal
     */
    closeModal,
    /**
     * Function to reload data when customer is added
     */
    refreshData: () => {refListCustomer.value.loadCustomer();},
    /**
     * initial state of data form
     */
    formData: {}
});

const addParametersCustomerModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Registrar Cliente",
        width: "80vw",
        footer: null,
        component: componentAddClientModal
    };
};

const getFiltersCustomer = async() => {
    await refListCustomer.value.loadCustomer();
};

</script>

<template>
    <Card>
        <template #title>
            <!-- title of page -->
            <div class="alignHeader">
                <div>
                    <p> Lista de Clientes </p>
                </div>
                <!-- actions in header-->
                <div class="sm:space-x-2 space-x-0 space-y-2 sm:space-y-0 mt-2 sm:mt-0">
                    <Button label="Filtros" severity="secondary" outlined raised rounded size="small"
                            @click="showCustomerFilter = !showCustomerFilter">
                        <template #icon>
                            <i-material-symbols-filter-list-rounded class="mx-1"/>
                        </template>
                    </Button>
                    <Button label="Crear Cliente" size="small" @click="addParametersCustomerModal" raised rounded>
                        <template #icon>
                            <i-fluent-person-add-32-regular class="mx-1"/>
                        </template>
                    </Button>
                </div>
            </div>
            <Divider class="!my-0 !mt-3"/>
        </template>
        <template #content>
            <Fieldset class="mb-2" :collapsed="showCustomerFilter">
                <div class="alignItemsForm">
                    <div class="max-cols-2">
                        <label-required for="docType" label="Documento"/>
                        <Select v-model="customerFilters.docType" input-id="docType" size="small" optionLabel="name" optionValue="value"
                                show-clear class="w-full"/>
                    </div>
                    <div class="max-cols-2">
                        <label-required for="docNumber" label="N° Documento"/>
                        <InputText v-model="customerFilters.docNumber" id="docNumber" size="small" class="w-full"/>
                    </div>
                    <div class="max-cols-4">
                        <label-required for="name" label="Nombres"/>
                        <InputText v-model="customerFilters.name" id="name" size="small" class="w-full"/>
                    </div>
                    <!--                    <div class="max-cols-2">-->
                    <!--                        <label-required for="phone" label="Celular"/>-->
                    <!--                        <InputText v-model="customerFilters.phone" id="phone" size="small" class="w-full"/>-->
                    <!--                    </div>-->
                    <div class="max-cols-2">
                        <label-required for="xs" label="Estado"/>
                        <Select v-model="customerFilters.status" :options="optionsStatus" optionLabel="label" optionValue="value"
                                inputId="xs" size="small" class="w-full" show-clear/>
                    </div>
                    <div class="max-cols-2">
                        <Button label="Buscar" size="small" @click="getFiltersCustomer" raised rounded class="mt-6 w-full">
                            <template #icon>
                                <i-material-symbols-screen-search-desktop-outline-rounded class="mx-1"/>
                            </template>
                        </Button>
                    </div>
                </div>
            </Fieldset>
            <customer-list ref="refListCustomer" :filters="customerFilters"/>
            <modal-component ref="modal" :parameters="parametersModal"/>
        </template>
    </Card>
</template>
