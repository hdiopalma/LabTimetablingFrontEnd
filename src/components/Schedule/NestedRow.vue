<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    level: {
        type: Number,
        default: 0
    }
});

const valuesAsArray = computed(() => {
    return Object.entries(props.data).map(([key, value]) => ({ key, value }));
});

const calculateRowspan = (obj, level) => {
    // Base case: Leaf node (array or non-object) - no rowspan needed
    if (typeof obj !== 'object' || Array.isArray(obj)) return 1;

    // If we are not at the deepest level, calculate recursively
    if (level < 4) {
        return Object.values(obj).reduce((sum, val) => sum + calculateRowspan(val, level + 1), 0) || 1;
    }

    // If we are at the deepest level, there is 1 row for each object entry
    return Object.keys(obj).length;
};

const calculateColspan = (level) => {
    return 6 - level;
};
</script>

<template>
    <template v-for="entry in valuesAsArray" :key="entry.key">
        <tr class="border-t">
            <td class="px-4 py-2 border" :rowspan="calculateRowspan(entry.value, level)">{{ entry.key }}</td>
            <template v-if="typeof entry.value === 'object' && !Array.isArray(entry.value)">
                <NestedRow :data="entry.value" :level="level + 1" />
            </template>
            <template v-else-if="Array.isArray(entry.value)">
                <td class="px-4 py-2 border" :colspan="calculateColspan(level)">{{ entry.value.join(', ') }}</td>
            </template>
        </tr>
    </template>
</template>
