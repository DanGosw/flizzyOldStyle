<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import LabelRequired from "@/hooks/components/labelRequired/labelRequired.vue";
import { useNumericInput } from "@/hooks/inputMethods.js";

const props = defineProps({
    closeModal: { type: Function, default: () => {}, required: true },
    refreshData: { type: Function, default: () => {}, required: true },
    formData: { type: Object, default: () => {}, required: true }
});

const dropdownItems = ref([
    { name: "Option 1", value: "1" },
    { name: "Option 2", value: "2" },
    { name: "Option 3", value: "3" }
]);

const schemaValidate = ref(yup.object({
    docNumber: yup.string().trim().required("DNI no valido").min(8, "Ingresa al menos 8 caracteres").label("DNI"),
    names: yup.string().trim().required("Ingrese un nombre").label("Nombre"),
    lastnames: yup.string().trim().required("Ingrese su apellido").label("Apellidos"),
    address: yup.string().trim().required("Ingrese su dirección").label("Dirección"),
    company: yup.string().trim().required("Seleccione una empresa").label("Empresa"),
    branch: yup.string().trim().required("Seleccione una sucursal").label("Sucursal"),
    profile: yup.string().trim().required("Seleccione un perfil").label("Perfil"),
    username: yup.string().trim().required("Ingrese su usuario").label("Usuario").min(5, "Ingresa al menos 5 caracteres"),
    code: yup.string().trim().required("Ingrese su contraseña").label("Contraseña").min(5, "Ingresa al menos 5 caracteres"),
    codeConfirm: yup.string().trim().required("La confirmación es requerida").oneOf([yup?.ref("code")], "La contraseña no coincide").
        label("Confirm. Contraseña").min(5, "Ingresa al menos 5 caracteres")
}));

const fields = ref({
    docNumber: "",
    names: "",
    lastnames: "",
    address: "",
    company: "",
    branch: "",
    email: "",
    profile: "",
    username: "",
    code: "",
    codeConfirm: ""
});

// Watch for changes in formData prop
watch(() => props.formData, () => {
    fields.value = props.formData;
}, { immediate: true });

/**
 * add initial values to form, get methods to validate form
 */
const { handleSubmit, resetForm, errors } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: docNumber, handleBlur: docNumberBlur } = useField("docNumber");
const { value: names, handleBlur: namesBlur } = useField("names");
const { value: lastnames, handleBlur: lastnamesBlur } = useField("lastnames");
const { value: address, handleBlur: addressBlur } = useField("address");
const { value: company, handleBlur: companyBlur } = useField("company");
const { value: branch, handleBlur: branchBlur } = useField("branch");
const { value: email } = useField("email");
const { value: profile, handleBlur: profileBlur } = useField("profile");
const { value: username, handleBlur: usernameBlur } = useField("username");
const { value: code, handleBlur: codeBlur } = useField("code");
const { value: codeConfirm, handleBlur: codeConfirmBlur } = useField("codeConfirm");
/**
 * validation input
 */
const { handleInput: handleInputDocNumber } = useNumericInput(docNumber);

const onSubmit = handleSubmit((values) => {
    /**
     * Send Values to Api
     */
    props.refreshData();
    console.log("Submitted with", values);
});

const reloadData = () => {
    resetForm();
    props.closeModal();
    props.refreshData();
};

</script>

<template>
    <div class="alignItemsForm">
        <div class="max-cols-4">
            <label-required for="docNumber" label="DNI" mark/>
            <InputGroup class="w-full">
                <InputText v-model.trim="docNumber" id="docNumber" maxlength="8" :invalid="!!errors.docNumber" size="small"
                           @blur="docNumberBlur(null, true)" @input="handleInputDocNumber"/>
                <Button size="small" severity="info">
                    <template #icon>
                        <i-material-symbols-manage-search-rounded class="!mx-1"/>
                    </template>
                </Button>
            </InputGroup>
            <span class="markRequired">{{ errors.docNumber }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="names" label="Nombres" mark/>
            <InputText v-model="names" id="names" :invalid="!!errors.names" size="small" @blur="namesBlur(null, true)"/>
            <span class="markRequired">{{ errors.names }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="lastnames" label="Apellidos" mark/>
            <InputText v-model="lastnames" id="lastnames" :invalid="!!errors.lastnames" size="small" @blur="lastnamesBlur(null, true)"/>
            <span class="markRequired">{{ errors.lastnames }}</span>
        </div>
        <div class="max-cols-6">
            <label-required for="email" label="Correo"/>
            <InputText v-model="email" id="email" size="small"/>
        </div>
        <div class="max-cols-6">
            <label-required for="address" label="Dirección" mark/>
            <InputText v-model="address" id="address" :invalid="!!errors.address" size="small" @blur="addressBlur(null, true)"/>
            <span class="markRequired">{{ errors.address }}</span>
        </div>
        <div class="max-cols-6">
            <label-required for="company" label="Empresa / Sucursal" mark/>
            <InputGroup>
                <InputText v-model="company" id="company" :invalid="!!errors.company" size="small" @blur="companyBlur(null, true)"/>
                <InputText v-model="branch" id="branch" :invalid="!!errors.branch" size="small" @blur="branchBlur(null, true)"/>
            </InputGroup>
            <div class="flex space-x-2">
                <span class="markRequired">{{ errors.company }}</span>
                <span class="markRequired">{{ errors.branch }}</span>
            </div>
        </div>
        <div class="max-cols-6">
            <label-required for="profile" label="Perfil" mark/>
            <Select v-model="profile" id="profile" :invalid="!!errors.profile" size="small" :options="dropdownItems"
                    optionLabel="name" optionValue="value" @blur="profileBlur(null, true)" class="w-full"/>
            <span class="markRequired">{{ errors.profile }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="username" label="Usuario" mark/>
            <InputText v-model="username" id="username" :invalid="!!errors.username" size="small" @blur="usernameBlur(null, true)"/>
            <span class="markRequired">{{ errors.username }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="code" label="Contraseña" mark/>
            <Password v-model="code" input-id="code" :invalid="!!errors.code" class="w-full" :toggleMask="true" :feedback="false"
                      @blur="codeBlur(null, true)" input-class="w-full !py-1.5"/>
            <span class="markRequired">{{ errors.code }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="confirm" label="Confirmar Contraseña" mark/>
            <Password v-model="codeConfirm" input-id="confirm" :invalid="!!errors.codeConfirm" class="w-full" :toggleMask="true"
                      :feedback="false" @blur="codeConfirmBlur( null, true)" input-class="w-full !py-1.5"/>
            <span class="markRequired">{{ errors.codeConfirm }}</span>
        </div>
        <Divider class="col-span-1 md:col-span-12 !my-2"/>
    </div>
    <div class="mt-4 flex items-center justify-center space-x-2">
        <Button label="Cancelar" severity="secondary" class="w-full border border-surface-300" @click="reloadData">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button :label="`${!props.formData?.id ? 'Crear' : 'Editar'} Usuario`" severity="info" class="w-full" @click="onSubmit">
            <template #icon>
                <i-ri-user-add-line class="mx-1"/>
            </template>
        </Button>
    </div>
</template>
