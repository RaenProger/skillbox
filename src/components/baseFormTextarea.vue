<template>
       <baseFormField :title="title" :error="error">
             <textarea
                class="form__input form__input--area"
                v-model="dataValue"
                name="comments"
                :placeholder="placeholder"
              ></textarea>
              </baseFormField>
</template>

<script>
import baseFormField from '@/mixins/formFieldMixin';

export default {
mixins: [baseFormField],
};
</script>
