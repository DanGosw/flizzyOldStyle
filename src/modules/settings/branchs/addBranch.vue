<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import LabelRequired from "@/hooks/components/labelRequired/labelRequired.vue";

const toast = useToast();
const businessOptions = ref([
    { label: "Arizona", value: 1 },
    { label: "Arizona Moyos", value: 2 },
    { label: "Arizona Food", value: 3 }
]);

const props = defineProps({
    closeModal: { type: Function, default: () => {}, required: true },
    refreshData: { type: Function, default: () => {}, required: true },
    formData: { type: Object, default: () => {}, required: false }
});

const schemaValidate = ref(yup.object().shape({
    business: yup.number().required("Seleccione una empresa valida").label("Empresa"),
    branchName: yup.string().trim().required("Ingrese una denominación").label("Nombre Comercial"),
    description: yup.string().trim().required("Ingrese una descripción").label("Descripción"),
    ubigeo: yup.string().trim().required("Seleccione su ubigeo").label("Ubigeo"),
    address: yup.string().trim().required("Ingrese una dirección").label("Dirección")
}));

const formFields = ref({
    branchName: "",
    business: undefined,
    address: "",
    ubigeo: "",
    description: "",
    email: "",
    phone: "",
    legendAsset: "",
    legendService: "",
    legendReturn: "",
    logoMini: [{ objectURL: "" }],
    logoA4: [{ objectURL: "" }],
    logoTicket: [{ objectURL: "" }],
    sendAutomatic: true
});

const { handleSubmit, resetForm, errors } = useForm(
    { validationSchema: schemaValidate, initialValues: props.formData ? formFields.value : props.formData });

const { value: business, handleBlur: businessBlur } = useField("business");
const { value: ubigeo, handleBlur: ubigeoBlur } = useField("ubigeo");
const { value: address, handleBlur: addressBlur } = useField("address");
const { value: description, handleBlur: descriptionBlur } = useField("description");
const { value: branchName, handleBlur: branchNameBlur } = useField("branchName");
const { value: email } = useField("email");
const { value: phone } = useField("phone");
const { value: legendAsset } = useField("legendAsset");
const { value: legendService } = useField("legendService");
const { value: legendReturn } = useField("legendReturn");
const { value: logoMini } = useField("logoMini");
const { value: logoA4 } = useField("logoA4");
const { value: logoTicket } = useField("logoTicket");
const { value: sendAutomatic } = useField("sendAutomatic");

const onSubmit = handleSubmit((values) => {
    console.log("Submitted with", values);
    props.refreshData();
    toast.add({ severity: "info", summary: "Title xd", detail: values, life: 10000 });
});

/**
 * Handle file selection and update the corresponding model
 * @param {Event} event - File selection event
 * @param imageFile
 */
const onFileSelect = async(event, imageFile) => {
    if(event?.["files"].length) {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);

        reader.onloadend = function() {
            switch(imageFile) {
                case "tick":
                    logoTicket.value = reader.result;
                    console.log(logoTicket.value);
                    break;
                case "a4":
                    logoA4.value = reader.result;
                    break;
                case "mini":
                    logoMini.value = reader.result;
                    break;
            }
        };
        toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
    }
};

const onReset = () => {
    resetForm();
    props.closeModal();
    props.refreshData();
};

const ubigeoOptions = ref([
    {
        name: "Australia",
        code: "AU",
        states: [
            {
                name: "New South Wales",
                cities: [
                    { cname: "Sydney", code: "A-SY" },
                    { cname: "Newcastle", code: "A-NE" }
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
                    { cname: "San Francisco", code: "US-SF" }
                ]
            },
            {
                name: "Florida",
                cities: [
                    { cname: "Miami", code: "US-MI" },
                    { cname: "Orlando", code: "US-OR" }
                ]
            },
            {
                name: "Texas",
                cities: [
                    { cname: "Austin", code: "US-AU" },
                    { cname: "Houston", code: "US-HO" }
                ]
            }
        ]
    }
]);

function handleInput(event) {
    const newValue = event.target.value.replace(/\D/g, "");
    formFields.value.phone = newValue;
    event.target.value = newValue;
}

const fileUploadMini = ref(null);
const fileUploadA4 = ref(null);
const fileUploadTicket = ref(null);

/**
 * Converts an image URL to a File object
 * @async {function} return async function
 * @param {String} url - Image URL
 * @param {String} filename - Name of the resulting file
 * @param {String} mimeType - MIME type of the file (e.g. "image/jpeg")
 * @returns {File} File object with objectURL property for preview
 */
const urlToFile = async(url, filename, mimeType) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const file = new File([buffer], filename, { type: mimeType });
    file.objectURL = URL.createObjectURL(file);
    return file;
};

/**
 * Set default images on page load
 * @param {String} url - expects an url sent via props
 * @param {ref} refFile - reactive variable to reference in html
 * @param {ref | ArrayBuffer} value - reactive variable to reference model
 * @param {String} name -name to image
 */
const setDefaultImages = async(url, refFile, value, name) => {
    const file = await urlToFile(url, name, "image/jpeg");
    // Convert to Base64
    value.value = await fileToBase64(file); // Assign the Base64 value to the reactive variable
    await nextTick(() => {
        forceFileUploadUpdate(refFile, [file]);
    });
};
/**
 * Converts a file to a Base64 string
 * @param {File} file - File object
 * @returns {Promise<string>} Base64 string representation of the file
 */
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Force the FileUpload component to refresh to display the selected image
 * @param {ref} fileUploadRef - FileUpload component reference name
 * @param {File[]} files - Array of files to show in the FileUpload
 */
const forceFileUploadUpdate = async(fileUploadRef, files) => {
    if(fileUploadRef && fileUploadRef?.$el) {
        const dataTransfer = new DataTransfer();
        for(const file of files) { dataTransfer.items.add(file); }

        const input = fileUploadRef.$el.querySelector("input[type=\"file\"]");
        if(input) {
            input.files = dataTransfer.files;
            fileUploadRef.files = Array.from(dataTransfer.files);
            updateFilePreview(fileUploadRef.$el, files);
        }
    }
};

/**
 * Updates the image preview in the FileUpload
 * @param {HTMLElement} fileUploadEl - FileUpload component DOM element
 * @param {File[]} files - Array of files to show in preview
 */
const updateFilePreview = (fileUploadEl, files) => {
    const img = fileUploadEl.querySelector("img");
    if(img && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(files[0]);
    }
};

onMounted(async() => {
    if(props.formData?.business) {
        formFields.value = props.formData;
        await setDefaultImages(props.formData?.logoA4, fileUploadA4.value, logoA4, "a4");
        await setDefaultImages(props.formData?.logoTicket, fileUploadTicket.value, logoTicket, "ticket");
        await setDefaultImages(props.formData?.logoMini, fileUploadMini.value, logoMini, "mini");
    }
});

</script>

<template>
    <div class="alignItemsForm">
        <div class="max-cols-6">
            <label-required for="business" label="Empresa" mark/>
            <Select v-model="business" input-id="business" :options="businessOptions" optionLabel="label" optionValue="value"
                    class="w-full" :invalid="!!errors.business" @blur="businessBlur($event, true)"/>
            <span class="markRequired">{{ errors.business }}</span>
        </div>
        <div class="max-cols-6">
            <label-required for="branchName" label="Nombre Comercial" mark/>
            <InputText v-model="branchName" id="branchName" size="small" :invalid="!!errors.branchName"
                       @blur="branchNameBlur($event, true)" class="w-full"/>
            <span class="markRequired">{{ errors.branchName }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="description" label="Descripción" mark/>
            <InputText v-model="description" id="description" size="small" :invalid="!!errors.description"
                       @blur="descriptionBlur($event, true)" class="w-full"/>
            <span class="markRequired">{{ errors.description }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="ubigeo" label="Ubigeo" mark/>
            <CascadeSelect :options="ubigeoOptions" name="ubigeo" label="Ubigeo" option-value="code" option-group-label="name"
                           option-label="cname" :option-group-children="['states', 'cities']" v-model="ubigeo" input-id="ubigeo"
                           :invalid="!!errors.ubigeo" @blur="ubigeoBlur($event, true)" placeholder="Seleccione su ubigeo" class="w-full"/>
            <span class="markRequired">{{ errors.ubigeo }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="address" label="Dirección" mark/>
            <InputText v-model="address" id="address" size="small" :invalid="!!errors.address" @blur="addressBlur($event, true)"/>
            <span class="markRequired">{{ errors.address }}</span>
        </div>
        <div class="max-cols-4">
            <label-required for="email" label="Correo"/>
            <InputText v-model="email" size="small" id="email"/>
        </div>
        <div class="max-cols-4">
            <label-required for="phone" label="Teléfono"/>
            <InputText v-model="phone" id="phone" size="small" @input="handleInput"/>
        </div>
        <div class="max-cols-4">
            <label-required for="sendAutomatic" label="Activar envío automático"/>
            <Checkbox v-model="sendAutomatic" binary input-id="sendAutomatic"/>
        </div>
        <div class="max-cols-4">
            <label-required for="legendAsset" label="Leyenda Bienes"/>
            <Textarea v-model="legendAsset" id="legendAsset" auto-resize rows="3" cols="30" class="w-full"/>
        </div>
        <div class="max-cols-4">
            <label-required for="legendService" label="Leyenda Servicio"/>
            <Textarea v-model="legendService" id="legendService" auto-resize rows="3" cols="30" class="w-full"/>
        </div>
        <div class="max-cols-4">
            <label-required for="legendReturn" label="Leyenda Retorno"/>
            <Textarea v-model="legendReturn" id="legendReturn" auto-resize rows="3" cols="30" class="w-full"/>
        </div>
        <div class="max-cols-4">
            <label-required for="logoMini" label="Mini Logo"/>
            <FileUpload name="logoMini[0]" accept="image/png, image/jpeg, image/jpg" :multiple="false" :max-file-size="1000000"
                        :file-limit="1" @select="onFileSelect($event, 'mini')" input-id="logoMini" class="w-full"
                        @remove="logoMini = []" v-model="logoMini" choose-label="Seleccione su logo" ref="fileUploadMini"
                        invalid-file-size-message="La imagen supera el tamaño permitido" :show-upload-button="false"
                        :show-cancel-button="false" invalid-file-limit-message="Solo puedes subir una imagen...">
                <template #empty>
                    <span>Arrastre su logo aquí...</span>
                </template>
            </FileUpload>
        </div>
        <div class="max-cols-4">
            <label-required for="logoA4" label="Logo A4"/>
            <FileUpload name="logoA4[0]" accept="image/png, image/jpeg, image/jpg" :multiple="false" :max-file-size="1000000"
                        :file-limit="1" input-id="logoA4" @select="onFileSelect($event, 'a4')" class="w-full"
                        @remove="logoA4 = []" v-model="logoA4" choose-label="Seleccione su logo" ref="fileUploadA4"
                        invalid-file-size-message="La imagen supera el tamaño permitido" :show-upload-button="false"
                        :show-cancel-button="false" invalid-file-limit-message="Solo puedes subir una imagen...">
                <template #empty>
                    <span>Arrastre su logo aquí...</span>
                </template>
            </FileUpload>
        </div>
        <div class="max-cols-4">
            <label-required for="logoTicket" label="Logo Ticket"/>
            <FileUpload name="logoTicket[0]" accept="image/png, image/jpeg, image/jpg" :multiple="false" :max-file-size="1000000"
                        :file-limit="1" @select="onFileSelect($event, 'tick')" input-id="logoTicket" class="w-full"
                        @remove="logoTicket = []" v-model="logoTicket" choose-label="Seleccione su logo" ref="fileUploadTicket"
                        invalid-file-size-message="La imagen supera el tamaño permitido" :show-upload-button="false"
                        :show-cancel-button="false" invalid-file-limit-message="Solo puedes subir una imagen...">
                <template #empty>
                    <span>Arrastre su logo aquí...</span>
                </template>
                <template #content="{}"></template>
            </FileUpload>
        </div>
    </div>
    <div class="flex items-center flex-wrap md:flex-nowrap justify-center gap-2 mt-4">
        <Button label="Cancelar" severity="secondary" class="w-full" @click="onReset">
            <template #icon>
                <i-ri-close-line class="mx-1"/>
            </template>
        </Button>
        <Button label="Crear Empresa" severity="info" class="w-full" @click="onSubmit">
            <template #icon>
                <i-material-symbols-add-business-outline-rounded class="mx-1"/>
            </template>
        </Button>
    </div>
</template>
