<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";
import LabelRequired from "@/hooks/components/labelRequired/labelRequired.vue";

const props = defineProps({
    type: { type: String, default: "text" },
    value: { type: [String, Number], default: "" },
    name: { type: String, required: true },
    label: { type: String, default: "" },
    showMark: { type: Boolean, default: false },
    placeholder: { type: String, default: "" }
});

const name = toRef(props, "name");
const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(name, undefined, { initialValue: props.value });
</script>

<template>
    <div class="flex flex-col">
        <label-required :label="label" :mark="showMark" :for="name" v-if="label"/>
        <InputText :name="name" :id="name" :type="type" v-model="inputValue" @input="handleChange" @blur="handleBlur($event, true)"
                   size="small" :invalid="!!errorMessage"/>
        <span class="markRequired" v-if="showMark"> {{ errorMessage }} </span>
    </div>
</template>
