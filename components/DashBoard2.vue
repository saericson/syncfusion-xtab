<template>
  <div>
    <v-row>
      <v-col sm="12">
        <h5>Premium</h5>
        <Grid-Table variable="prem" ></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Premium Distribution</h5>
        <Grid-Table variable="premDist" ></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Loss Ratio</h5>
        <Grid-Table variable="lr" ></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Expense Ratio</h5>
        <Grid-Table variable="er" ></Grid-Table>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <h5>Combined Ratio</h5>
        <Grid-Table variable="cr" ></Grid-Table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DashBoard2',
  props: {
  },
  data() {
    return {}
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style></style>
