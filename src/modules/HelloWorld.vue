<script setup>
import { ref } from "vue";

const data = ref();
// const isSticky = ref(false);
// const stickyStyle = ref(null);
//
// const handleScroll = () => {
//     if(stickyStyle.value) {
//         // getBoundingClientRect().top nos da la posición del elemento
//         // en relación a la ventana del navegador.
//         const rect = stickyStyle.value.getBoundingClientRect();
//         // Si top es menor o igual a 0, significa que el elemento
//         // ha alcanzado o pasado la parte superior de la ventana.
//         isSticky.value = rect.top <= 0;
//     }
// };
//
// watchEffect(() => {
//     window.addEventListener("scroll", handleScroll);
// });
//
// onUnmounted(() => {
//     window.removeEventListener("scroll", handleScroll);
// });

const getData = async() => {
    return await axios.get("https://retoolapi.dev/5boF6b/data").then(results => data.value = results.data);
};

getData();
const count = ref(0);

const selectedCity = ref();

const countries = ref([
    { name: "Australia", code: "AU" },
    { name: "Canada", code: "CA" },
    { name: "United States", code: "US" }
]);
</script>

<template>
    <Card class="">
        <template #content>
            <div class="flex flex-wrap gap-2 card">
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="secondary"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="success"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="info"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="warning"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="help"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()" severity="danger"
                        @click="count++"/>
                <Button size="small" label="count is" color="rgb(241, 245, 249)" :badge="count.toString()"
                        @click="count++" class="border border-violet-500" severity="contrast"/>

                <div class="flex card justify-content-center">
                    <Dropdown v-model="selectedCity" :options="countries" optionLabel="name" class="w-full" filter show-clear
                              @update:model-value="()=>console.log(selectedCity?.name)" placeholder="Select"/>
                </div>
            </div>
            <DataTable size="small" striped-rows show-gridlines :value="data" scroll-direction="horizontal" scroll-height="666px"
                       dataKey="code" tableStyle="min-width: 110rem; font-size: 13px;" class="mt-4" scrollable>
                <template #empty> No se encontraron datos.</template>
                <template #loading> Cargando datos. Por favor espere.</template>
                <Column class="border border-[#474751]" style="width: 1%" field="id" header="ID"/>
                <Column class="border border-[#474751]" style="width: 10%" field="Names" header="Names"/>
                <Column class="border border-[#474751]" style="width: 10%" field="mail" header="E-Mail"/>
                <Column class="border border-[#474751]" style="width: 16%" field="ubication" header="Ubication"/>
                <Column class="border border-[#474751]" style="width: 5%" field="ip" header="IP Address"/>
                <Column class="border border-[#474751]" style="width: 10%" field="industry" header="Industry"/>
                <Column class="border border-[#474751]" style="width: 10%" field="interests" header="Interests"/>
                <Column class="border border-[#474751]" style="width: 10%" field="url" header="URL"/>
                <Column class="border border-[#474751]" style="width: 10%" field="job" header="Job"/>
                <Column class="border border-[#474751]" sortable style="width: 9%" field="date" header="Date"/>
                <Column class="border border-[#474751]" style="width: 4%" header="Date">
                    <template #body>
                        <div class="flex justify-center">
                            <Button size="small" severity="info" class="">
                                <template #icon>
                                    <i-ic-sharp-access-time class="text-[16px] !mx-1"/>
                                </template>
                            </Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>