<template>
  <v-container :key="key">
    <div class="d-flex justify-space-between">
      <p class="text-h5">Exposure Matrix Creation & Modification</p>
    </div>
    <v-divider class="my-7"></v-divider>

    <v-tabs v-model="tab" @change="refresh">
      <v-tab>UW Cross Tabs</v-tab>
    </v-tabs>
    <v-divider class="my-5"></v-divider>

    <v-tabs-items v-model="tab">

      <v-tab-item>
          <dash-board2></dash-board2>
        </div>


      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  name: 'SimParams',
  props: {},
  data() {
    return {
      tab: null,
      key: 'key0',
      xTab: { row: 'bu', col: 'lob' },
    }
  },
  beforeMount() {
    this.$store.dispatch('simParms/INIT_PARMS')
  },
  methods: {
    refresh() {
      //   alert('refresh')
      if (this.key === 'key0') {
        this.key = 'key1'
      } else {
        this.key = 'key0'
      }
    },
    switchClick() {
      if (this.xTab.row === 'bu') {
        this.xTab.row = 'lob'
        this.xTab.col = 'bu'
      } else {
        this.xTab.row = 'bu'
        this.xTab.col = 'lob'
      }
      this.$store.commit('simParms/SET_XTAB', this.xTab)
      this.$nuxt.$emit('switch')
    },
  },
}
</script>
