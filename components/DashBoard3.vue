<template>
  <div>
    <v-row>
      <v-col sm="12">
        <h5>Expected Loss</h5>
        <Grid-Table variable="loss" ></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Coefficient of Variation</h5>
        <Grid-Table variable="cv" ></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Standard Deviation</h5>
        <Grid-Table  variable="sd" ></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Common Correlation Factor</h5>
        <Grid-Table variable="cf" ></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Common Correlation Factor Weight</h5>
        <Grid-Table  variable="cfwt" ></Grid-Table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DashBoard3',
    props: {
  },
  data() {
    return {}
  },
  computed: {
  },
  created() {},

  methods: {
  },
}
</script>

<style></style>
