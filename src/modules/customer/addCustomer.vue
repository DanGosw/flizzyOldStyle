<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useField, useFieldArray, useForm, useSetFieldTouched } from "vee-validate";

const props = defineProps({
    closeModal: { type: Function, default: () => { }, required: true },
    refreshData: { type: Function, default: () => { }, required: true }
});

const optionsDocument = ref([
    { name: "DNI", value: "DNI" },
    { name: "RUC", value: "RUC" },
    { name: "PASAPORTE", value: "PASAPORTE" }
]);

const optionsGenere = ref([
    { name: "SIN GENERO", value: "SIN" },
    { name: "MASCULINO", value: "MASCULINO" },
    { name: "FEMENINO", value: "FEMENINO" },
    { name: "MACHETE", value: "MACHETE" },
    { name: "TRAKA", value: "TRAKA" }
]);

const schemaValidate = ref(yup.object().shape({
    docType: yup.string().required("Seleccione un documento").label("Documento"),
    docNumber: yup.string().required("DNI no valido").min(8, "Ingresa al menos 8 caracteres").label("DNI"),
    names: yup.string().required("Ingrese un nombre").label("Nombre"),
    lastnames: yup.string().required("Ingrese su apellido").label("Apellidos"),
    genere: yup.string().required("Seleccione un genero").label("Dirección"),
    address: yup.array().of(
        yup.object().shape({
            location: yup.string().required("Ingrese una dirección").label("location"),
            ubigeo: yup.string().required("Seleccione un ubigeo").label("ubigeo")
        })
    ).required("Ingrese al menos una dirección").label("Dirección")
}));

const fields = reactive({
    docType: "",
    docNumber: "",
    names: "",
    lastnames: "",
    address: [{ location: "", ubigeo: "" }],
    email: "",
    genere: "",
    birthday: "",
    phone: ""
});

const { handleSubmit, resetForm, errors } = useForm(
    { validationSchema: schemaValidate, initialValues: fields });

const { value: docNumber, handleBlur: docNumberBlur } = useField("docNumber");
const { value: names, handleBlur: namesBlur } = useField("names");
const { value: lastnames, errorMessage: ErrorLastname, handleBlur: lastnamesBlur } = useField("lastnames");
// const { value: address, errorMessage: addressError } = useField("address");
const { value: genere, handleBlur: genereBlur } = useField("genere");
// const { value: address.ubigeo, handleBlur: ubigeoBlur } = useField("address");
const { fields: valueFields, push: addDirection } = useFieldArray("address");
const { value: docType, handleBlur: docTypeBlur } = useField("docType");
// const { value: username, handleBlur: usernameBlur } = useField("username");
// const { value: password, handleBlur: passwordBlur } = useField("password");
// const { value: passwordConfirm, handleBlur: passwordConfirmBlur } = useField("passwordConfirm");

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
});

const validateInput = (value) => useSetFieldTouched({ value: value });

const clearAddress = (index) => {
    valueFields.value.splice(index, 1);
};

const onReset = () => {
    resetForm();
    props.closeModal();
    props.refreshData();
};

</script>

<template>
    <div class="w-full p-2">
        <div class="w-full p-2">
            <div class="alignItemsForm">
                <div class="col-span-1 md:col-span-4">
                    <label-required for="docType" label="Documento" :mark="true"/>
                    <Dropdown v-model="docType" id="docType" size="small" :options="optionsDocument" optionLabel="name"
                              :invalid="!!errors.docType" optionValue="value" @blur="docTypeBlur(null, true)"
                              class="w-full"/>
                    <span class="markRequired">{{ errors.docType }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label-required for="docNumber" label="DNI" :mark="true"/>
                    <InputGroup class="w-full">
                        <InputText v-model.trim="docNumber" id="docNumber" maxlength="8" :invalid="!!errors.docNumber"
                                   size="small" @blur="docNumberBlur(null, true)"/>
                        <Button size="small" severity="info">
                            <template #icon>
                                <i-material-symbols-manage-search-rounded class="!mx-1"/>
                            </template>
                        </Button>
                    </InputGroup>
                    <span class="markRequired">{{ errors.docNumber }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label-required for="genere" label="Documento" :mark="true"/>
                    <Dropdown v-model="genere" id="genere" size="small" :options="optionsGenere" optionLabel="name"
                              :invalid="!!errors.genere" optionValue="value" @blur="genereBlur(null, true)" class="w-full"/>
                    <span class="markRequired">{{ errors.genere }}</span>
                </div>
                <div class="col-span-1 md:col-span-6">
                    <label-required for="names" label="Nombres" :mark="true"/>
                    <InputText v-model="names" id="names" size="small" :invalid="!!errors.names"
                               @blur="namesBlur(null, true)"/>
                    <span class="markRequired">{{ errors.names }}</span>
                </div>
                <div class="col-span-1 md:col-span-6">
                    <label-required for="lastnames" label="Apellidos" :mark="true"/>
                    <InputText v-model="lastnames" id="lastnames" size="small" :invalid="!!errors.lastnames"
                               @blur="lastnamesBlur(null, true)"/>
                    <span class="markRequired">{{ ErrorLastname }}</span>
                </div>
                <div class="col-span-1 md:col-span-3">
                    <label-required for="birthday" label="F. Nacimiento" :mark="false"/>
                    <InputText v-model="fields.birthday" id="birthday" size="small"/>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label-required for="phone" label="Teléfono" :mark="false"/>
                    <InputText v-model="fields.phone" id="phone" size="small"/>
                </div>
                <div class="col-span-1 md:col-span-5">
                    <label-required for="email" label="Correo" :mark="false"/>
                    <InputText v-model="fields.email" id="email" size="small"/>
                </div>
            </div>
            <div class="sm:space-x-2 space-x-0 space-y-2 sm:space-y-0 flex flex-wrap items-center">
                <div class="flex-none">
                    Direcciones
                </div>
                <div class="flex-grow">
                    <Divider class="w-full" align="right">
                        <Button label="Agregar Dirección" size="small" class="w-full"
                                @click="addDirection(fields.address[0])">
                            <template #icon>
                                <i-material-symbols-add-location-alt-outline-rounded class="mx-1"/>
                            </template>
                        </Button>
                    </Divider>
                </div>
            </div>
            <div v-for="(data, index) in valueFields" :key="index" class="alignItemsForm mb-8">
                <div class="col-span-1 flex-col md:col-span-5">
                    <label-required :for="`ubigeo-${index}`" label="Ubigeo" :mark="true"/>
                    <InputText v-model="data.value.ubigeo" :id="`ubigeo-${index}`" :name="`ubigeo[${index}]`"
                               size="small" @blur="validateInput(`address[${index}].ubigeo`)"/>
                    <span class="markRequired">{{ errors[`address[${index}].ubigeo`] }}</span>
                </div>
                <div class="col-span-1 flex-col md:col-span-5">
                    <label-required :for="`location-${index}`" label="Dirección" :mark="true"/>
                    <InputText v-model="data.value.location" :id="`location-${index}`" :name="`location[${index}]`"
                               size="small" @blur="validateInput(`address[${index}].location`)"/>
                    <span class="markRequired">{{ errors[`address[${index}].location`] }}</span>
                </div>
                <div class="col-span-1 flex-col md:col-span-2 flex items-center justify-center">
                    <Button label="Remove" @click="clearAddress(index)"/>
                </div>
            </div>

            <div class="flex items-center justify-center space-x-2">
                <Button label="Cancelar" severity="secondary" class="w-full" @click="onReset">
                    <template #icon>
                        <i-ri-close-line class="mx-1"/>
                    </template>
                </Button>
                <Button label="Crear Usuario" severity="info" class="w-full" @click="onSubmit">
                    <template #icon>
                        <i-ri-user-add-line class="mx-1"/>
                    </template>
                </Button>
            </div>
        </div>
        <Button @click="() => { console.log(valueFields); }"/>
    </div>
</template>
