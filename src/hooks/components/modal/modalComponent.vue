<script setup>
const propsModal = defineProps({
    parameters: {
        visible: {
            type: Boolean,
            default: false
        },
        header: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        footer: {
            type: String,
            default: ""
        },
        component: {
            type: Object,
            default: () => {}
        }
    }
});

defineExpose({ propsModal });

</script>

<template>
    <Dialog :breakpoints="{'960px': '75vw', '640px': '90vw'}" v-model:visible="parameters.visible" modal
            :style="{'width': parameters.width ? parameters.width : '50vw'}"
            @keyup.esc="parameters.visible = false" closable>
        <template #header>
            {{ parameters.header }}
        </template>
        <!--        <template #container>-->
        <component :is="parameters.component"/>
        <!--        </template>-->
        <template #footer v-if="parameters.footer">
            {{ parameters.footer }}
        </template>
    </Dialog>
</template>
