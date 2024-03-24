<script setup>

import { ref } from 'vue'

import FormCheckRadio from '../FormCheckRadio.vue';

const shiftData = ref({
    Monday: {Shift1: true, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Tuesday: {Shift1: true, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Wednesday: {Shift1: true, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Thursday: {Shift1: true, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Friday: {Shift1: true, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
    Saturday: {Shift1: true, Shift2: false, Shift3: false, Shift4: false, Shift5: false, Shift6: false},
})

const shift = ref(['Shift 1', 'Shift 2', 'Shift 3', 'Shift 4', 'Shift 5', 'Shift 6'])

</script>

<template>
    <div>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
            <thead>
                <tr>
                    <th>Day</th>
                    <th class="text-center" v-for="s in shift" :key="s">{{ s }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in shiftData" :key="key">
                    <td data-label="Day">
                        <span class="font-semibold">
                            {{ key }}
                        </span>
                    </td>
                    <td v-for="s in shift" :key="s" :data-label="s" class="text-center">
                        <FormCheckRadio :name="key" :modelValue="shiftData[key][s]" :inputValue="s" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
/* color data-label */
[data-label="Day"] {
    color: rgb(81, 68, 68);
}

/* color Shift1-6 */
[data-label="Shift1"] {
    color: rgb(81, 68, 68);
}
[data-label="Shift2"] {
    color: rgb(81, 68, 68);
}
[data-label="Shift3"] {
    color: rgb(81, 68, 68);
}
[data-label="Shift4"] {
    color: rgb(81, 68, 68);
}
[data-label="Shift5"] {
    color: rgb(81, 68, 68);
}
[data-label="Shift6"] {
    color: rgb(81, 68, 68);
}

</style>