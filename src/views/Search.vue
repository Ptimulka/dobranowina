<template>
  <v-container>

      <v-row no-gutters class="mt-5">
        <v-col class="px-3" cols="12" sm="12" md="9">
          <v-text-field
              hide-details
              solo
              placeholder="Wpisz np. 'modlitwa'"
              prepend-icon="mdi-magnify"
              class="my-1"
            ></v-text-field>
        </v-col>
        <v-col class="px-3" cols="12" sm="12" md="3">
           <v-btn large block color="primary" class="my-2">Szukaj</v-btn>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>
