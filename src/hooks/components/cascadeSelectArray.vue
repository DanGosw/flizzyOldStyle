<script setup>
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
    value: { type: [String, Number, Object], default: "" },
    name: { type: String, required: true },
    label: { type: String, default: "" },
    options: { type: Array, default: () => [] },
    optionLabel: { type: String, default: "" },
    optionValue: { type: String, default: "" },
    optionGroupLabel: { type: String, default: "" },
    optionGroupChildren: { type: Array, default: () => [] }
});

const name = toRef(props, "name");
const { value: selectValue, errorMessage, handleBlur, handleChange } = useField(name, undefined, { initialValue: props.value });

</script>
<template>
    <div class="flex flex-col">
        <label-required :label="label" :mark="true" :for="name"/>
        <CascadeSelect v-model="selectValue" :options="options" :optionLabel="optionLabel" :optionGroupLabel="optionGroupLabel"
                       :optionGroupChildren="['states', 'cities']" style="min-width: 14rem" @input="handleChange" :invalid="!!errorMessage"
                       @blur="handleBlur($event, true)" placeholder="Seleccione" :optionValue="optionValue" :input-id="name"/>
        <span class="markRequired">{{ errorMessage }}</span>
    </div>
</template>

