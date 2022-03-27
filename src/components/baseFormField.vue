<template>
        <label class="form__label">
          <!-- создание слота для динамического изменения ввода -->
           <slot/>
              <span class="form__value">{{title}}</span>
              <span class="form__error" v-if="error">{{error}}</span>
            </label>
</template>

<script>
export default {
    props: ['title', 'error'],
};
</script>
