<template>
  <div>
    <Layout class-fix="layout">
      <tages />
      <note />
      <types />
      <number-pad />
    </Layout>
  </div>
</template>

<script lang="ts">
import Layout from "@/components/Layout.vue";
import Tages from "@/components/money/Tags.vue";
import Note from "@/components/money/Note.vue";
import Types from "@/components/money/Types.vue";
import NumberPad from "@/components/money/NumberPad.vue";
export default {
  components: {
    Layout,
    Tages,
    Note,
    Types,
    NumberPad,
  },
  name: "Money",
};
</script>
<style lang="sass">
.layout-content
  display: flex
  flex-direction: column
</style>
<style lang="scss" scoped>
</style>