<script setup>
const { parameters } = defineProps({
    /**
     * @param visible, header title, width, footer, component
     */
    parameters: {
        default: {
            /**
             * @params {boolean} false - default value.
             * @description Visible of the modal.
             */
            visible: {
                type: Boolean,
                default: false
            },
            /**
             *  @params {string} - default value.
             *  @description Title of the modal.
             */
            header: {
                type: String,
                default: ""
            },
            /**
             *  @params {string} - default value.
             *  @default default width is 50vh.
             *  @description Width of the modal.
             */
            width: {
                type: String,
                default: "50vh"
            },
            /**
             *  @params {Component} - Returns a component in footer modal.
             *  @description Footer of the modal.
             */
            footer: {
                type: String,
                default: ""
            },
            /**
             * @params {Component} - Function that returns a component
             * @description Component of the modal.
             */
            component: {
                type: Object,
                default: () => {}
            }
        },
        type: Object,
        required: true
    }
});

defineExpose({ parameters });

</script>

<template>
    <Dialog :breakpoints="{'960px': '75vw', '640px': '90vw'}" v-model:visible="parameters.visible" modal
            :style="{'width': parameters.width}" @keyup.esc="parameters.visible = false" closable>
        <template #closeicon>
            <i-material-symbols-close-rounded class="text-surface-100"/>
        </template>
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
