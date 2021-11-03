<template>
  <v-dialog
    v-model="isopened"
    transition="dialog-bottom-transition"
    max-width="800"
  >
    <v-card v-if="question">
      <v-container fill-height fluid>
        <v-row align="center" no-gutters>

          <v-col class="col-1 text-center">
            <v-btn
              fab
              small
              color="primary"
              :disabled="!prevenabled"
              @click.prevent="$emit('prevQuestion')"
            ><v-icon>
                mdi-menu-left
              </v-icon>
            </v-btn>
          </v-col>

          <v-col class="col-10">
            <v-card-title color="primary">
              {{ question.question }}
            </v-card-title>
            <v-card-subtitle class="mt-1">
              {{ livestream.dateread + ' ' + year }}
            </v-card-subtitle>
          </v-col>

          <v-col class="col-1 text-center">
            <v-btn
              fab
              small
              color="primary"
              :disabled="!nextenabled"
              @click.prevent="$emit('nextQuestion')"
              ><v-icon>
                mdi-menu-right
              </v-icon>
            </v-btn>
          </v-col>

        </v-row>
      </v-container>

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
  props: ['isopened', 'year', 'livestream', 'question', 'prevenabled', 'nextenabled'],
  data() {
    return {
      commonFunctions: CommonFunctions
    }
  }
}
</script>

<style>

.v-dialog {
  margin: 0
}

.v-btn--fab.v-btn--contained {
    -webkit-box-shadow: none;
    box-shadow: none
}

</style>
