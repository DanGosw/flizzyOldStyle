<script setup>
const props = defineProps({
    label: { type: String, required: true, default: "" },
    for: { type: String, required: true, default: "" },
    mark: { type: Boolean, required: false, default: false }
});
</script>

<template>
    <label :for="props.for" class="labelSize"> {{ props.label }} <span class="ml-1 text-red-500" v-if="props.mark">*</span></label>
</template>
