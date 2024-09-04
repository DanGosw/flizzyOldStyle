<script setup>

import AreaAndTables from "@/modules/settings/application/areas/areaAndTables.vue";
</script>

<template>
    <Card>
        <template #title>
            <div class="flex gap-2 items-center">
                <Button severity="secondary" size="small" class="!px-2" rounded @click="$router.go(-1)">
                    <template #icon>
                        <i-material-symbols-arrow-back-rounded/>
                    </template>
                </Button>
                <p> Configuración General </p>
            </div>
        </template>
        <template #content>
            <Tabs value="0">
                <TabList>
                    <Tab value="0">Areas y mesas</Tab>
                    <Tab value="1">Lugares de preparación</Tab>
                    <Tab value="2">Categorías de Producto</Tab>
                    <Tab value="3">Métodos de Pago</Tab>
                    <Tab value="4">Conceptos</Tab>
                    <Tab value="5">Kardex</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <area-and-tables/>
                    </TabPanel>
                    <TabPanel value="1">
                        <p class="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim
                            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                            ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                    </TabPanel>
                    <TabPanel value="2">
                        <p class="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                            corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa
                            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                            expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </template>
    </Card>
</template>
