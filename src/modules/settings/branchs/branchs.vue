<script setup>

import ModalComponent from "@/hooks/components/modal/modalComponent.vue";
import addBranch from "@/modules/settings/branchs/addBranch.vue";
import BranchList from "@/modules/settings/branchs/branchList.vue";
import router from "@/routes/index.js";

/* Defaults Variables */
const refBranchList = ref();

/**
 * @params {Function} closeModal - Function that returns visible of the modal.
 * @returns {void} - Change the visibility of the modal
 */
const closeModal = () => {
    parametersModal.value.visible = false;
};

const parametersModal = ref({
    visible: false,
    header: "",
    width: "30vw",
    footer: () => {},
    component: () => {}
});

const componentAddBranchModal = h(addBranch, {
    closeModal,
    refreshData: () => {refBranchList.value.loadBranchs();},
    formData: { id: null }
});

const addParametersBranchModal = () => {
    parametersModal.value = {
        visible: true,
        header: "Nueva Sucursal",
        width: "80vw",
        footer: "",
        component: componentAddBranchModal
    };
};
</script>

<template>
    <Card>
        <template #title>
            <div class="alignHeader">
                <div class="flex gap-2 items-center">
                    <Button severity="secondary" size="small" class="!px-2" rounded @click="router.push({name: 'settings', force: true})">
                        <template #icon>
                            <i-material-symbols-arrow-back-rounded/>
                        </template>
                    </Button>
                    <p>Lista de Sucursales</p>
                </div>
                <div class="sm:space-x-2 space-x-0 space-y-2 sm:space-y-0 mt-2 sm:mt-0">
                    <Button label="Agregar Sucursal" rounded size="small" @click="addParametersBranchModal()">
                        <template #icon>
                            <i-material-symbols-add-business-outline-rounded class="mx-1"/>
                        </template>
                    </Button>
                </div>
                <Divider class="!my-0 !mt-2"/>
            </div>
        </template>
        <template #content>
            <branch-list ref="refBranchList"/>
            <modal-component ref="modal" :parameters="parametersModal"/>
        </template>
    </Card>
</template>
