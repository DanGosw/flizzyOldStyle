<script setup>
import { useNumericInput } from "@/hooks/inputMethods.js";
import { ref } from "vue";
import * as yup from "yup";
import { useField, useFieldArray, useForm } from "vee-validate";

const toast = useToast();

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
    address: yup.array().of(
        yup.object().shape({
            location: yup.string().trim("No se permiten espacios en blanco").required("Ingrese una dirección").label("Dirección"),
            ubigeo: yup.string().trim("No se permiten espacios en blanco").required("Seleccione un ubigeo").label("Ubigeo")
        })
    ).required("Ingrese al menos una dirección").label("Dirección").strict(),
    docType: yup.string().required("Seleccione un documento").label("Documento"),
    docNumber: yup.string().trim().required("DNI no valido").min(8, "Ingresa al menos 8 caracteres").label("DNI"),
    names: yup.string().trim().required("Ingrese un nombre").label("Nombre"),
    lastnames: yup.string().trim().required("Ingrese su apellido").label("Apellidos"),
    genere: yup.string().required("Seleccione un genero").label("Dirección")
}));

const fields = ref({
    docType: "",
    docNumber: "",
    names: "",
    lastnames: "",
    address: [{ location: null, ubigeo: null }],
    email: "",
    genere: "",
    birthday: "",
    phone: ""
});

const { handleSubmit, resetForm, errors } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: docNumber, handleBlur: docNumberBlur } = useField("docNumber");
const { value: names, handleBlur: namesBlur } = useField("names");
const { value: lastnames, handleBlur: lastnamesBlur } = useField("lastnames");
const { value: genere, handleBlur: genereBlur } = useField("genere");
const { value: docType, handleBlur: docTypeBlur } = useField("docType");
const { fields: valueFields, push: addDirection, remove: removeAddress } = useFieldArray("address");

const { handleInput: handleInputDocNumber } = useNumericInput(docNumber);

const ubigeoOptions = ref([
    {
        name: "Australia",
        code: "AU",
        states: [
            {
                name: "New South Wales",
                cities: [
                    { cname: "Sydney", code: "A-SY" },
                    { cname: "Newcastle", code: "A-NE" },
                    { cname: "Wollongong", code: "A-WO" }
                ]
            },
            {
                name: "Queensland",
                cities: [
                    { cname: "Brisbane", code: "A-BR" },
                    { cname: "Townsville", code: "A-TO" }
                ]
            }
        ]
    },
    {
        name: "Canada",
        code: "CA",
        states: [
            {
                name: "Quebec",
                cities: [
                    { cname: "Montreal", code: "C-MO" },
                    { cname: "Quebec City", code: "C-QU" }
                ]
            },
            {
                name: "Ontario",
                cities: [
                    { cname: "Ottawa", code: "C-OT" },
                    { cname: "Toronto", code: "C-TO" }
                ]
            }
        ]
    },
    {
        name: "United States",
        code: "US",
        states: [
            {
                name: "California",
                cities: [
                    { cname: "Los Angeles", code: "US-LA" },
                    { cname: "San Diego", code: "US-SD" },
                    { cname: "San Francisco", code: "US-SF" }
                ]
            },
            {
                name: "Florida",
                cities: [
                    { cname: "Jacksonville", code: "US-JA" },
                    { cname: "Miami", code: "US-MI" },
                    { cname: "Tampa", code: "US-TA" },
                    { cname: "Orlando", code: "US-OR" }
                ]
            },
            {
                name: "Texas",
                cities: [
                    { cname: "Austin", code: "US-AU" },
                    { cname: "Dallas", code: "US-DA" },
                    { cname: "Houston", code: "US-HO" }
                ]
            }
        ]
    }
]);

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
    props.refreshData();
    toast.add({ severity: "info", summary: "Title xd", detail: values, life: 10000 });
});

const onReset = () => {
    resetForm();
    props.closeModal();
    props.refreshData();
};

function handleInput(event) {
    const newValue = event.target.value.replace(/\D/g, "");
    fields.value.phone = newValue;
    event.target.value = newValue;
}

</script>

<template>
    <div class="w-full p-2">
        <div class="w-full p-2">
            <div class="alignItemsForm">
                <div class="col-span-1 md:col-span-4">
                    <label-required for="docType" label="Documento" :mark="true"/>
                    <Dropdown v-model="docType" input-id="docType" size="small" :options="optionsDocument" optionLabel="name" show-clear
                              :invalid="!!errors.docType" optionValue="value" @blur="docTypeBlur($event, true)" class="w-full"/>
                    <span class="markRequired">{{ errors.docType }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label-required for="docNumber" label="DNI" :mark="true"/>
                    <InputGroup class="w-full">
                        <InputText v-model.number="docNumber" id="docNumber" maxlength="8" :invalid="!!errors.docNumber"
                                   size="small" @blur="docNumberBlur($event, true)" @input="handleInputDocNumber"/>
                        <Button size="small" severity="info">
                            <template #icon>
                                <i-material-symbols-manage-search-rounded class="!mx-1"/>
                            </template>
                        </Button>
                    </InputGroup>
                    <span class="markRequired">{{ errors.docNumber }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label-required for="genere" label="Genero" :mark="true"/>
                    <Dropdown v-model="genere" input-id="genere" size="small" :options="optionsGenere" optionLabel="name"
                              :invalid="!!errors.genere" optionValue="value" @blur="genereBlur($event, true)" class="w-full"/>
                    <span class="markRequired">{{ errors.genere }}</span>
                </div>
                <div class="col-span-1 md:col-span-6">
                    <label-required for="names" label="Nombres" :mark="true"/>
                    <InputText v-model="names" id="names" size="small" :invalid="!!errors.names"
                               @blur="namesBlur($event, true)"/>
                    <span class="markRequired">{{ errors.names }}</span>
                </div>
                <div class="col-span-1 md:col-span-6">
                    <label-required for="lastnames" label="Apellidos" :mark="true"/>
                    <InputText v-model="lastnames" id="lastnames" size="small" :invalid="!!errors.lastnames"
                               @blur="lastnamesBlur($event, true)"/>
                    <span class="markRequired">{{ errors.lastnames }}</span>
                </div>
                <div class="col-span-1 md:col-span-3">
                    <label-required for="birthday" label="F. Nacimiento" :mark="false"/>
                    <Calendar v-model="fields.birthday" class="w-full" input-id="birthday" date-format="dd-mm-yy" show-icon/>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label-required for="phone" label="Teléfono" :mark="false"/>
                    <InputText v-model="fields.phone" id="phone" size="small" @input="handleInput"/>
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

            <div class="alignItemsForm mb-8" v-for="(data, index) in valueFields" :key="data.key">
                <div class="col-span-1 flex-col md:col-span-5">
                    <cascade-select-array :options="ubigeoOptions" :name="`address[${index}].ubigeo`" label="Ubigeo" option-value="code"
                                          :value="data.value.ubigeo" option-group-label="name" option-label="cname"
                                          :option-group-children="['states', 'cities']"/>
                </div>
                <div class="col-span-1 flex-col md:col-span-5">
                    <input-validate-array :name="`address[${index}].location`" label="Dirección" :value="data.value.location"/>
                </div>
                <div class="col-span-1 flex-col md:col-span-2 flex items-center justify-center">
                    <Button label="Remove" @click="removeAddress(index)" v-if="index !== 0" size="small" class="mt-3">
                        <template #icon>
                            <i-mdi-delete-empty-outline class="mx-1"/>
                        </template>
                    </Button>
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
    </div>
</template>
