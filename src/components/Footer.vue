<template>
  <v-footer color="primary" padless fixed>
    <v-col class="text-right" cols="12">
      <strong style="float: right; direction: rtl">
        {{ message }} &nbsp;
      </strong>
      <br />
      <strong style="color: white"> {{ en_translate }} </strong>
      <br />
      <strong style="color: white"> {{ fa_translate }} </strong>
    </v-col>
  </v-footer>
</template>


<script>
export default {
  data() {
    return {
      message: "ترجمه:   ",
    };
  },
  props: {
    en_translate: String,
    fa_translate: String,
  },
};
</script>
