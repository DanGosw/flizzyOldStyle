<script setup>
/**
 * @type {Prettify<Readonly<ExtractPropTypes<{for: {default: string, type: StringConstructor, required: boolean}, label: {default: string, type: StringConstructor, required: boolean}, error: {default: null, type: StringConstructor, required: boolean}, mark: {default: boolean, type: BooleanConstructor, required: boolean}}>>>}
 */
const props = defineProps({
    label: { type: String, required: true, default: "" },
    hideLabel: { type: Boolean, required: false, default: false },
    for: { type: String, required: true, default: "" },
    mark: { type: Boolean, required: false, default: false },
    hideError: { type: Boolean, required: false, default: false },
    error: { type: String, required: false, default: "" }
});

</script>

<template>
    <label :for="props.for" class="label-size" v-if="!hideLabel">
        {{ props.label }}
        <span class="ml-1 text-red-500" v-if="props.mark">*</span>
    </label>
    <slot/>
    <span class="markRequired" v-if="!hideError">{{ error }}</span>
</template>
