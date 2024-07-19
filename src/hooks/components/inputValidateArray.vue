<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
    type: { type: String, default: "text" },
    value: { type: [String, Number], default: "" },
    name: { type: String, required: true },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" }
});

const name = toRef(props, "name");
const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(name, undefined, { initialValue: props.value });
</script>

<template>
    <div class="flex flex-col">
        <label-required :label="label" :mark="true" :for="name"></label-required>
        <InputText :name="name" :id="name" :type="type" v-model="inputValue" @input="handleChange" @blur="handleBlur($event, true)"
                   size="small" :invalid="!!errorMessage"/>
        <span class="markRequired"> {{ errorMessage }} </span>
    </div>
</template>
