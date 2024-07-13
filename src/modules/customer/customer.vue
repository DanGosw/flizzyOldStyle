<script setup>
import addCustomer from "@/modules/customer/addCustomer.vue";

const refListCustomer = ref();

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
     *  @default default width is 50vh.
     *  @description Width of the modal.
     */
    width: "65vw",
    /**
     *  @params {Component} - Returns a component in footer modal.
     *  @description Footer of the modal.
     */
    footer: () => {},
    /**
     * @params {Component} - Function that returns a component
     * @description Component of the modal.
     */
    component: () => {}
});

const closeModal = () => {
    parametersModal.value.visible = false;
};
const componentAddClientModal = h(addCustomer, {
    /**
     * Function to close de modal
     */
    closeModal,
    /**
     * Function to reload data when customer is added
     */
    refreshData: () => {refListCustomer.value?.loadCustomer();}
});

const addParametersCustomerModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Registrar Cliente",
        width: "70vw",
        footer: null,
        component: componentAddClientModal
    };
};


</script>

<template>
    <div>
        <Card>
            <template #title>
                <!-- title of page -->
                <div class="alignHeader">
                    <div>
                        <p> Lista de Clientes </p>
                    </div>
                    <!-- actions in header-->
                    <div class="sm:space-x-2 space-x-0 space-y-2 sm:space-y-0 mt-2 sm:mt-0">
                        <Button label="Crear Cliente" size="small" @click="addParametersCustomerModal">
                            <template #icon>
                                <i-fluent-person-add-32-regular class="mx-1"/>
                            </template>
                        </Button>
                    </div>
                </div>
                <Divider class="!my-4"/>
            </template>
            <template #content>
                <customer-list ref="refListCustomer"/>
            </template>
        </Card>
        <modal-component ref="modal" :parameters="parametersModal"/>
    </div>
</template>
