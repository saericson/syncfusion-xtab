<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
      </v-card>

      <v-card>
        <v-card-title class="headline">
          Welcome to The CapStack User Interface
        </v-card-title>
        <v-card-text>
          <p>
            From this user interface you will be able to control the CapStack
            application. You can: create simulation parameters, define reinsurance, run jobs, and create reports
          </p>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

// License key entered in .Nuxt/index.js
// import { registerLicense } from '@syncfusion/ej2-base'
// registerLicense('ORg4AjUWIQA/Gnt2VVhhQlFac11JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkBjUX1dc3NURWhbV0I=')

export default {
  name: 'IndexPage',
  data() {
    return {}
  },
}
</script>
