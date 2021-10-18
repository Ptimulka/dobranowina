<template>
  <v-dialog
    v-model="isopened"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <v-card v-if="question">
      <v-card-title color="primary">
        {{ question.question }}
      </v-card-title>
      <v-card-subtitle class="mt-1">
        {{ livestream.dateread + ' ' + year }}
      </v-card-subtitle>
      <v-card-text>
        <v-btn
          v-if="question.timelink"
          :href="question.timelink"
          rounded
          :color="commonFunctions.buttonColorFromPlatform(livestream.platform)"
          target="_blank"
        >
        <v-icon>
          {{ livestream.platform === "FB" ? "mdi-facebook" : "mdi-youtube" }}
        </v-icon>
          Obejrzyj na {{ livestream.platform }}<v-icon>mdi-open-in-new</v-icon>
        </v-btn>
        <v-divider class="my-2"></v-divider>
        <h4 class="h4 pt-2">
          <span v-html="question.answer ? question.answer : '[Nie spisano odpowiedzi]'">
          </span></h4>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text
          @click="$emit('update:isopened', false);"
        >Zamknij</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CommonFunctions from '@/questions/common-functions';

export default {
  name: "SingleQuestionDialog",
  props: ['isopened', 'year', 'livestream', 'question'],
  data() {
    return {
      commonFunctions: CommonFunctions
    }
  },
}
</script>
