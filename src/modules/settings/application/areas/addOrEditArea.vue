<script setup>
import { useNumericInput } from "@/hooks/inputMethods.js";
import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import FormItem from "@/hooks/components/formItem/formItem.vue";

const toast = useToast();

const props = defineProps({
    closeModal: { type: Function, default: () => { }, required: true },
    refreshData: { type: Function, default: () => { }, required: true },
    formData: { type: Object, default: () => {}, required: false }
});

const schemaValidate = ref(yup.object().shape({
    areaName: yup.string().trim().required("Ingrese una denominación").label("Denominación"),
    tableQuantity: yup.string().trim().required("Ingrese un representante").label("Representante"),
    tableCode: yup.string().trim().required("RUC no valido").min(8, "Ingresa al menos 8 caracteres").label("RUC"),
    tableName: yup.string().trim().required("RUC no valido").min(8, "Ingresa al menos 8 caracteres").label("RUC")
}));

const fields = ref({
    areaName: "",
    tableQuantity: 1,
    tableCode: "",
    tableName: ""
});

const { handleSubmit, resetForm, errors } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: areaName, handleBlur: areaNameBlur } = useField("areaName");
const { value: tableQuantity, handleBlur: tableQuantityBlur } = useField("tableQuantity");
const { value: tableCode, handleBlur: tableCodeBlur } = useField("tableCode");
const { value: tableName, handleBlur: tableNameBlur } = useField("tableName");

const { handleInputReactive: handleInputDocNumber } = useNumericInput(tableQuantity);

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
    props.refreshData();
    toast.add({ severity: "info", summary: "Title xd", detail: values, life: 10000 });
}, ({ errors }) => {
    console.log(errors);
});

const onReset = () => {
    resetForm();
    props.closeModal();
    props.refreshData();
};

</script>

<template>
    <div class="align-items-form">
        <div class="max-cols-6">
            <form-item for="docNumber" label="Nombre de Area" mark :error="errors.areaName">
                <InputText v-model.number="areaName" id="docNumber" maxlength="11" :invalid="!!errors.areaName"
                           size="small" @blur="areaNameBlur($event, true)" @input="handleInputDocNumber"/>
            </form-item>
        </div>
        <div class="max-cols-6">
            <form-item for="denomination" label="Cantidad de Mesas" mark :error="errors.tableQuantity">
                <InputNumber v-model="tableQuantity" id="denomination" size="small" :invalid="!!errors.tableQuantity" show-buttons :min="1"
                             button-layout="horizontal" @blur="tableQuantityBlur($event, true)" fluid/>
            </form-item>
        </div>
        <div class="max-cols-6">
            <form-item for="legalRep" label="Cod. de Mesa" mark :error="errors.tableCode">
                <InputText v-model="tableCode" id="legalRep" size="small" :invalid="!!errors.tableCode" @blur="tableCodeBlur($event, true)"
                           class="w-full"/>
            </form-item>
        </div>
        <div class="max-cols-6">
            <form-item for="token" label="Nombre de Mesas">
                <InputText v-model="tableName" id="token" size="small" :invalid="!!errors.tableName" @blur="tableNameBlur($event, true)"/>
            </form-item>
        </div>
    </div>

    <div class="flex items-center flex-wrap md:flex-nowrap justify-center gap-2 mt-4">
        <Button label="Cancelar" severity="secondary" outlined raised class="w-full" @click="onReset">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button label="Crear Empresa" class="w-full" @click="onSubmit">
            <template #icon>
                <i-material-symbols-add-business-outline-rounded class="mx-1"/>
            </template>
        </Button>
    </div>
</template>
