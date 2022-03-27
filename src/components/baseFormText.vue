<template>
       <baseFormField :title="title" :error="error">
              <input
                class="form__input"
                v-model="dataValue"
                :type="type"
                :placeholder="placeholder"
            /></baseFormField>
</template>

<script>
import baseFormField from '@/mixins/formFieldMixin';

export default {
    props: {
        type: {
            default: 'text',
        },
    },
mixins: [baseFormField],
};
</script>
