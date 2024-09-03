<script setup>
import { useNumericInput } from "@/hooks/inputMethods.js";
import { ref } from "vue";
import * as yup from "yup";
import { useField, useFieldArray, useForm } from "vee-validate";
import FormItem from "@/hooks/components/formItem/formItem.vue";
import InputValidateArray from "@/hooks/components/inputsRequired/inputValidateArray.vue";

const toast = useToast();

const props = defineProps({
    closeModal: { type: Function, default: () => { }, required: true },
    refreshData: { type: Function, default: () => { }, required: true },
    formData: { type: Object, default: () => {}, required: false }
});

const schemaValidate = ref(yup.object().shape({
    denomination: yup.string().trim().required("Ingrese una denominación").label("Denominación"),
    legalRep: yup.string().trim().required("Ingrese un representante").label("Representante"),
    docNumber: yup.string().trim().required("RUC no valido").min(8, "Ingresa al menos 8 caracteres").label("RUC")
}));

const fields = ref({
    denomination: "",
    docNumber: "",
    token: "",
    url: "",
    socialNetworks: [{ location: null, ubigeo: null }],
    email: "",
    legalRep: "",
    cpe: "",
    website: ""
});

const { handleSubmit, resetForm, errors } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: docNumber, handleBlur: docNumberBlur } = useField("docNumber");
const { value: token, handleBlur: tokenBlur } = useField("token");
const { value: url, handleBlur: urlBlur } = useField("url");
const { value: legalRep, handleBlur: legalRepBlur } = useField("legalRep");
const { value: denomination, handleBlur: denominationBlur } = useField("denomination");
const { value: cpe } = useField("cpe");
const { value: website } = useField("website");
const { fields: valueFields, push: addSocialMedia, remove: removeSocialMedia } = useFieldArray("socialNetworks");

const { handleInput: handleInputDocNumber } = useNumericInput(docNumber);

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
    fields.value.website = newValue;
    event.target.value = newValue;
}

</script>

<template>
    <div class="align-items-form">
        <div class="max-cols-4">
            <form-item for="docNumber" label="RUC" mark :error="errors.docNumber">
                <InputGroup class="w-full">
                    <InputText v-model.number="docNumber" id="docNumber" maxlength="11" :invalid="!!errors.docNumber"
                               size="small" @blur="docNumberBlur($event, true)" @input="handleInputDocNumber"/>
                    <Button size="small">
                        <template #icon>
                            <i-material-symbols-manage-search-rounded class="!mx-1"/>
                        </template>
                    </Button>
                </InputGroup>
            </form-item>
        </div>
        <div class="max-cols-4">
            <form-item for="denomination" label="Denominación" mark :error="errors.denomination">
                <InputText v-model="denomination" id="denomination" size="small" :invalid="!!errors.denomination"
                           @blur="denominationBlur($event, true)" class="w-full"/>
            </form-item>
        </div>
        <div class="max-cols-4">
            <form-item for="legalRep" label="Representante Legal" mark :error="errors.legalRep">
                <InputText v-model="legalRep" id="legalRep" size="small" :invalid="!!errors.legalRep" @blur="legalRepBlur($event, true)"
                           class="w-full"/>
            </form-item>
        </div>
        <div class="max-cols-4">
            <form-item for="token" label="Token">
                <InputText v-model="token" id="token" size="small" :invalid="!!errors.token" @blur="tokenBlur($event, true)"/>
            </form-item>
        </div>
        <div class="max-cols-4">
            <form-item for="url" label="URL">
                <InputText v-model="url" id="url" size="small" :invalid="!!errors.url" @blur="urlBlur($event, true)"/>
            </form-item>
        </div>
        <div class="max-cols-4">
            <form-item for="cpe" label="CPE">
                <InputText v-model="cpe" class="!w-full" size="small" id="cpe"/>
            </form-item>
        </div>
        <div class="max-cols-4">
            <form-item for="website" label="Sitios Web">
                <InputText v-model="website" id="website" size="small" @input="handleInput"/>
            </form-item>
        </div>
        <div class="max-cols-8">
            <form-item for="socialNetwork" label="Redes Sociales" hide-error>
                <Button @click="addSocialMedia(fields.socialNetworks[0])" size="small" class="w-full" outlined raised label="Agregar Redes"
                        button-id="socialNetwork" v-if="!valueFields.length">
                    <template #icon>
                        <i-material-symbols-add-rounded/>
                    </template>
                </Button>
            </form-item>
            <div class="align-items-form mb-1" v-for="(data, index) in valueFields" :key="data.key">
                <div class="max-cols-5">
                    <input-validate-array :name="`socialNetworks[${index}].ubigeo`" :value="data.value.ubigeo" show-label show-error/>
                </div>
                <div class="max-cols-5">
                    <input-validate-array :name="`socialNetworks[${index}].location`" :value="data.value.location" show-label show-error/>
                </div>
                <div class="max-cols-2 flex items-center justify-center">
                    <ButtonGroup class="w-full">
                        <Button severity="warn" @click="removeSocialMedia(index)" size="small" class="w-1/2" raised rounded>
                            <template #icon>
                                <i-mdi-delete-empty-outline/>
                            </template>
                        </Button>
                        <Button @click="addSocialMedia(fields.socialNetworks[0])" :disabled="valueFields.length >= 5" size="small"
                                class="w-1/2" raised rounded>
                            <template #icon>
                                <i-material-symbols-add-rounded/>
                            </template>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    </div>

    <div class="flex items-center flex-wrap md:flex-nowrap justify-center gap-2 mt-4">
        <Button label="Cancelar" severity="secondary" class="w-full" @click="onReset">
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
