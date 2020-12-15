<template>
    <a-button @click="btnClick">点我</a-button>
    <a-modal title="VUE3" v-model:visible="visible">
        <p>{{ message }}</p>
    </a-modal>
</template>
<script>
import { ref } from 'vue';
export default {
    name: 'App',
    setup() {
        const visible = ref(false);
        const message = 'Hello vue3';
        const btnClick = () => {
            visible.value = true;
        };
        return {
            visible,
            message,
            btnClick,
        };
    },
};
</script>
