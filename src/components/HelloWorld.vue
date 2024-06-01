<script setup>
import { onMounted, ref } from "vue";
import { ProductService } from "@/components/ProductService.js";
import Login from "@/pages/public/login.vue";

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();
const count = ref(0);

const selectedCity = ref();

const countries = ref([
    {
        name: "Australia",
        code: "AU",
        states: [
            {
                name: "New South Wales",
                cities: [
                    { cname: "Sydney", code: "A-SY" },
                    { cname: "Newcastle", code: "A-NE" },
                    { cname: "Wollongong", code: "A-WO" }
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
                    { cname: "San Diego", code: "US-SD" },
                    { cname: "San Francisco", code: "US-SF" }
                ]
            },
            {
                name: "Florida",
                cities: [
                    { cname: "Jacksonville", code: "US-JA" },
                    { cname: "Miami", code: "US-MI" },
                    { cname: "Tampa", code: "US-TA" },
                    { cname: "Orlando", code: "US-OR" }
                ]
            },
            {
                name: "Texas",
                cities: [
                    { cname: "Austin", code: "US-AU" },
                    { cname: "Dallas", code: "US-DA" },
                    { cname: "Houston", code: "US-HO" }
                ]
            }
        ]
    }
]);
</script>

<template>
    <p-card class=" border m-0 p-0">
        <template #content>

            <!--            <div class="max-w-fit items-center justify-center rounded-2xl border border-slate-300 bg-slate-900 p-2">-->
            <div class="flex flex-wrap gap-2 card ">
                <p-button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="secondary"
                          @click="count++"/>
                <p-button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="success"
                          @click="count++"/>
                <p-button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="info"
                          @click="count++"/>
                <p-button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="warning"
                          @click="count++"/>
                <p-button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="help"
                          @click="count++"/>
                <p-button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="danger"
                          @click="count++"/>
                <p-button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()"
                          class="border border-violet-500" severity="contrast"/>


            </div>
            <div class="card flex justify-content-center m-2">
                <!--                <FloatLabel class="w-full md:w-14rem">-->
                <Dropdown v-model="selectedCity" inputId="dd-city" :options="countries" optionLabel="name" class="w-auto" filter
                          show-clear/>
                <!--                    <label for="dd-city">Select a City</label>-->
                <!--                </FloatLabel>-->
            </div>
            <!--        <div class="p-4">-->
            <p-dataTable size="small" striped-rows show-gridlines :value="products" scrollable scroll-direction="horizontal"
                         dataKey="code" tableStyle="min-width: 50rem; font-size: 13px;" class="mt-4">
                <template #header>
                    <div class="mb-2 flex items-center justify-center gap-2">
                        <p> Lista de Clientes </p>
                    </div>
                </template>
                <template #empty> No se encontraron datos.</template>
                <template #loading> Cargando datos. Por favor espere.</template>
                <p-column class="border border-[#474751]" style="width: 9%" field="code" header="Nombre"/>
                <p-column class="border border-[#474751]" style="width: 9%" field="name" header="Negocio"/>
                <p-column class="border border-[#474751]" style="width: 9%" field="name" header="Negocio"/>
            </p-dataTable>
            <!--        </div>-->
            <div class="flex justify-center">
                <login/>
            </div>
            <!--            </div>-->
        </template>
    </p-card>
</template>