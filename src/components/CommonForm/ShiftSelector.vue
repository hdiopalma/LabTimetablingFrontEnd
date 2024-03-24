<script setup>

import { ref, defineProps, defineEmits, computed, reactive } from 'vue';

import FormCheckRadio from '../FormCheckRadio.vue';

const props = defineProps({
    name: String,
    modelValue: Object,
    inputValue: String,
})

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})

</script>

<template>
    <div>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
            <thead>
                <tr>
                    <th>Day</th>
                    <th class="text-center" v-for="(value,key) in computedValue.Monday" :key="key">{{ key }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(shifts, day) in computedValue" :key="day">
                    <td data-label="Day" class="font-semibold text-gray-700 dark:text-gray-200">
                        {{ day }}
                    </td>
                    <td v-for="(value, shift) in shifts" :key="shift" :data-label="shift" class="text-center">
                        <FormCheckRadio 
                            :name= "`${day}-${shift}`"
                            v-model="computedValue[day][shift]"
                            :inputValue="computedValue[day][shift]"
                            />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
/* color data-label */
[data-label="Day"],
[data-label^="Shift"] {
  color: rgb(81, 68, 68);
}

</style>