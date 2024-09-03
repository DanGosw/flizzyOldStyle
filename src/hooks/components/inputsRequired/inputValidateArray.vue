<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";
import LabelRequired from "@/hooks/components/formItem/formItem.vue";

const props = defineProps({
    type: { type: String, default: "text" },
    value: { type: [String, Number], default: "" },
    name: { type: String, required: true },
    label: { type: String, default: "" },
    showMark: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    showLabel: { type: Boolean, default: false },
    showError: { type: Boolean, default: false }
});

const name = toRef(props, "name");
const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(name, undefined, { initialValue: props.value });
</script>

<template>
    <label-required :label="label" :mark="showMark" :for="name" :error="errorMessage" :hide-label="showLabel" :hide-error="showError">
        <InputText :name="name" :id="name" :type="type" v-model="inputValue" @input="handleChange" @blur="handleBlur($event, true)"
                   size="small" :invalid="!!errorMessage"/>
    </label-required>
</template>
