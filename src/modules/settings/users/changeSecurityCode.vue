<script setup>

import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import LabelRequired from "@/hooks/components/labelRequired/labelRequired.vue";

const props = defineProps({
    // defaultOptions: { type: Object, default: () => {} },
    closeModal: { type: Function, default: () => {} }
});

/**
 * Validations objects for the form and fields
 * @params {Object}
 * @type {Ref<Object>}
 */
const schemaValidate = ref(yup.object({
    code: yup.string().required("Ingrese la clave").label("Nombre"),
    newCode: yup.string().required("Ingrese su nueva clave").label("Clave").min(4, "Ingresa al menos 4 caracteres"),
    codeConfirm: yup.string().required("La confirmación es requerida").oneOf([yup?.ref("newCode")], "La clave no coincide").
        label("Confirm. clave").min(4, "Ingresa al menos 4 caracteres")
}));

/**
 *
 * @type {Ref<UnwrapRef<{code: string, codeConfirm: string, newCode: string}>>}
 */
const fields = ref({
    code: "",
    newCode: "",
    codeConfirm: ""
});

const { handleSubmit, resetForm, errors, values } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: code, handleBlur: codeBlur } = useField("code");
const { value: newCode, handleBlur: newCodeBlur } = useField("newCode");
const { value: codeConfirm, handleBlur: codeConfirmBlur } = useField("codeConfirm");

const onSubmit = handleSubmit(() => {
    console.log("Submitted with", { ...values });
});

const onReset = () => {
    resetForm();
    props.closeModal();
};

</script>

<template>
    <div class="alignItemsForm">
        <div class="max-cols-12">
            <label-required for="code" label="Clave Actual" mark/>
            <InputText v-model="code" id="code" @blur="codeBlur($event, true)" maxlength="10" :invalid="!!errors.code" class="w-full"/>
            <span class="markRequired">{{ errors.code }}</span>
        </div>
        <div class="max-cols-12">
            <label-required for="newCode" label="Nueva Clave" mark/>
            <InputText v-model="newCode" id="newCode" @blur="newCodeBlur($event, true)" :invalid="!!errors.newCode" class="w-full"/>
            <span class="markRequired">{{ errors.newCode }}</span>
        </div>
        <div class="max-cols-12">
            <label-required for="confirm" label="Confirmar Clave" mark/>
            <InputText v-model="codeConfirm" id="confirm" @blur="codeConfirmBlur($event, true)" :invalid="!!errors.codeConfirm"
                       class="w-full"/>
            <span class="markRequired">{{ errors.codeConfirm }}</span>
        </div>
    </div>
    <div class="mt-4 flex items-center justify-center space-x-2">
        <Button label="Cancelar" severity="secondary" class="w-full border border-surface-300" @click="onReset">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button label="Modificar" severity="info" class="w-full" @click="onSubmit">
            <template #icon>
                <i-fluent-save-24-regular class="mx-1"/>
            </template>
        </Button>
    </div>
</template>
