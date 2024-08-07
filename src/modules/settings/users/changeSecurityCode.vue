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
    newCodeConfirm: yup.string().required("La confirmación es requerida").oneOf([yup?.ref("newCode")], "La clave no coincide").
        label("Confirm. clave").min(4, "Ingresa al menos 4 caracteres")
}));

/**
 * define defaults values for the fields of the form
 * @type {Ref<UnwrapRef<{code: string, newCodeConfirm: string, newCode: string}>>}
 */
const fields = ref({
    code: "",
    newCode: "",
    newCodeConfirm: ""
});

const { handleSubmit, resetForm, errors, values } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: code, handleBlur: codeBlur } = useField("code");
const { value: newCode, handleBlur: newCodeBlur } = useField("newCode");
const { value: newCodeConfirm, handleBlur: newCodeConfirmBlur } = useField("newCodeConfirm");

const onSubmit = handleSubmit(() => {
    console.log("Submitted with", { ...values });
});

const onReset = () => {
    resetForm();
    props.closeModal();
};

</script>

<template>
    <div class="w-full py-2">
        <div class="grid grid-cols-1 gap-3 space-y-1 md:grid-cols-6">
            <div class="max-cols-6">
                <label-required for="code" label="Clave Actual" :mark="true"/>
                <InputText v-model="code" id="code" size="small" @blur="codeBlur(null, true)" maxlength="10"/>
                <span class="markRequired">{{ errors.code }}</span>
            </div>
            <div class="max-cols-6">
                <label-required for="newCode" label="Nueva Clave" :mark="true"/>
                <InputText v-model="newCode" id="newCode" size="small" @blur="newCodeBlur(null, true)"/>
                <span class="markRequired">{{ errors.newCode }}</span>
            </div>
            <div class="max-cols-6">
                <label-required for="confirmCode" label="Confirmar Clave" :mark="true"/>
                <InputText v-model="newCodeConfirm" id="confirmCode" size="small"
                           @blur="newCodeConfirmBlur(null, true)"/>
                <span class="markRequired">{{ errors.newCodeConfirm }}</span>
            </div>
            <div class="col-span-1 mt-4 flex w-full justify-center space-x-2 md:col-span-6">
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
        </div>
    </div>
</template>
