<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

const dropdownItems = ref([
    { name: "Option 1", value: "1" },
    { name: "Option 2", value: "2" },
    { name: "Option 3", value: "3" }
]);

const schemaValidate = ref(yup.object({
    docNumber: yup.string().required("DNI no valido").min(8, "Ingresa al menos 8 caracteres").label("DNI"),
    names: yup.string().required("Ingrese un nombre").label("Nombre"),
    lastnames: yup.string().required("Ingrese su apellido").label("Apellidos"),
    address: yup.string().required("Ingrese su dirección").label("Direccion"),
    company: yup.string().required("Seleccione una empresa").label("Empresa"),
    branch: yup.string().required("Seleccione una sucursal").label("Sucursal"),
    profile: yup.string().required("Seleccione un perfil").label("Perfil"),
    username: yup.string().required("Ingrese su usuario").label("Usuario").min(5, "Ingresa al menos 5 caracteres"),
    password: yup.string().required("Ingrese su contraseña").label("Contraseña").min(5, "Ingresa al menos 5 caracteres"),
    passwordConfirm: yup.string().
        required("La confirmación es requerida").
        oneOf([yup?.ref("password")], "La contraseña no coincide").
        label("Confirm. Contraseña").
        min(5, "Ingresa al menos 5 caracteres")
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
    password: "",
    passwordConfirm: ""
});

const { handleSubmit, resetForm, errors, values } = useForm({ validationSchema: schemaValidate, initialValues: fields.value });

const { value: docNumber, handleBlur: docNumberBlur } = useField("docNumber");
const { value: names, handleBlur: namesBlur } = useField("names");
const { value: lastnames, handleBlur: lastnamesBlur } = useField("lastnames");
const { value: address, handleBlur: addressBlur } = useField("address");
const { value: company, handleBlur: companyBlur } = useField("company");
const { value: branch, handleBlur: branchBlur } = useField("branch");
const { value: profile, handleBlur: profileBlur } = useField("profile");
const { value: username, handleBlur: usernameBlur } = useField("username");
const { value: password, handleBlur: passwordBlur } = useField("password");
const { value: passwordConfirm, handleBlur: passwordConfirmBlur } = useField("passwordConfirm");

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
});

const onReset = () => {
    resetForm();
};

</script>

<template>
    <div class="w-full">
        <div class="p-2">
            <div class="grid grid-cols-1 gap-3 md:grid-cols-12">
                <div class="col-span-1 md:col-span-4">
                    <label for="docNumber" class="mb-2 block text-sm">DNI <span class="ml-1 text-red-500">*</span></label>
                    <InputGroup class="w-full">
                        <InputText v-model.trim="docNumber" class="w-full" id="docNumber" maxlength="8" size="small"
                                   @blur="docNumberBlur(null, true)"/>
                        <Button size="small" severity="info">
                            <template #icon>
                                <i-material-symbols-manage-search-rounded class="!mx-1 text-lg"/>
                            </template>
                        </Button>
                    </InputGroup>
                    <span class="flex h-2 text-sm text-red-500">{{ errors.docNumber }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label for="names" class="mb-2 block text-sm">Nombres <span class="ml-1 text-red-500">*</span></label>
                    <InputText v-model="names" id="names" class="w-full" size="small" @blur="namesBlur(null, true)" maxlength="10"/>
                    <span class="flex h-2 text-sm text-red-500">{{ errors.names }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label for="lastnames" class="mb-2 block text-sm">Apellidos <span class="ml-1 text-red-500">*</span></label>
                    <InputText v-model="lastnames" id="lastnames" class="w-full" size="small" @blur="lastnamesBlur(null, true)"/>
                    <span class="flex h-2 text-sm text-red-500">{{ errors.lastnames }}</span>
                </div>
                <div class="col-span-1 md:col-span-6">
                    <label for="email" class="mb-2 block text-sm">Correo</label>
                    <InputText v-model="fields.email" id="email" class="w-full" size="small"/>
                </div>
                <div class="col-span-1 md:col-span-6">
                    <label for="address" class="mb-2 block text-sm">Dirección <span class="ml-1 text-red-500">*</span></label>
                    <InputText v-model="address" id="address" class="w-full" size="small" @blur="addressBlur(null, true)"/>
                    <span class="flex h-2 text-sm text-red-500">{{ errors.address }}</span>
                </div>
                <div class="col-span-1 md:col-span-6">
                    <label for="company" class="mb-2 block text-sm">Empresa / Sucursal <span class="ml-1 text-red-500">*</span></label>
                    <InputGroup>
                        <InputText v-model="company" id="company" class="w-full" size="small" @blur="companyBlur(null, true)"/>
                        <InputText v-model="branch" id="company" class="w-full" size="small" @blur="branchBlur(null, true)"/>
                    </InputGroup>
                    <div class="flex space-x-2">
                        <span class="flex h-2 text-sm text-red-500">{{ errors.company }}</span>
                        <span class="flex h-2 text-sm text-red-500">{{ errors.branch }}</span>
                    </div>
                </div>
                <div class="col-span-1 md:col-span-6">
                    <label for="profile" class="mb-2 block text-sm">Perfil <span class="ml-1 text-red-500">*</span></label>
                    <Dropdown v-model="profile" id="profile" size="small" :options="dropdownItems" optionLabel="name"
                              optionValue="value"
                              @blur="profileBlur(null, true)" class="w-full"/>
                    <span class="flex h-2 text-sm text-red-500">{{ errors.profile }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label for="username" class="mb-2 block text-sm">Usuario <span class="ml-1 text-red-500">*</span></label>
                    <InputText v-model="username" id="username" class="w-full" size="small" @blur="usernameBlur(null, true)"/>
                    <span class="flex h-2 text-sm text-red-500">{{ errors.username }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label for="password" class="mb-2 block text-sm">Contraseña <span class="ml-1 text-red-500">*</span></label>
                    <InputText v-model="password" id="password" class="w-full" size="small" @blur="passwordBlur(null, true)"/>
                    <span class="flex h-2 text-sm text-red-500">{{ errors.password }}</span>
                </div>
                <div class="col-span-1 md:col-span-4">
                    <label for="pc" class="mb-2 block text-sm">Confirmar Contraseña <span class="ml-1 text-red-500">*</span></label>
                    <InputText v-model="passwordConfirm" id="pc" class="w-full" size="small"
                               @blur="passwordConfirmBlur( null, true)"/>
                    <span class="flex h-2 text-sm text-red-500">{{ errors.passwordConfirm }}</span>
                </div>
                <Divider class="col-span-1 md:col-span-12 !my-2"/>
            </div>
            <div class="mt-4 flex items-center justify-center space-x-2">
                <Button label="Cancelar" severity="secondary" class="w-full border border-surface-300" @click="onReset">
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
