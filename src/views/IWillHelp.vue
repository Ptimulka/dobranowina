<template>
  <v-container>
    <v-card>
      <h1 class="py-5 display-1 text-center">Chcesz pomóc?</h1>
      <h1 class="py-5 headline text-center">Oto sposoby jakimi możesz to zrobić:</h1>

      <h1 class="py-5 title text-center">1. Spisywanie pytań z livestreamów</h1>
      <h3 class="py-5 px-5 subtitle-2 text-center">Możesz obejrzeć jeden z livestreamów Mikołaja i spisać pytania na które on odpowiada a także linki czasowe do tych pytań. Najlepiej żebyś spisał także jego odpowiedzi, przynajmniej  w skróconej formie, ale jeśli nie masz dużo czasu to wystarczą same pytania.</h3>

      <v-row no-gutters justify="center">
        <v-col cols="12" xs="12" sm="6">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2 class="subtitle-2 center">Lista linków do livestreamów, które nie zostały spisane:</h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <template v-for="livestream in todoLivestreams">
                  <h4 class="pt-5 subtitle-2 text-center" :key="livestream.dateread">{{ livestream.dateread }}</h4>
                  <h4 class="pb-5 subtitle-2 text-center" :key="livestream.link"><a :href="livestream.link">{{ livestream.link }}</a></h4>
                </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>

      <h1 class="py-5 title text-center">2. Poprawianie błędów</h1>
      <h3 class="py-5 px-5 subtitle-2 text-center">Widzisz jakiś błąd, literówkę, nieścisłość? Zgłoś to!</h3>

      <h1 class="py-5 title text-center">3. Dodawanie linków czasowych</h1>
      <h3 class="py-5 px-5 subtitle-2 text-center">Obecnie większość pytań ma linki tylko do całych livestreamów, a przydałyby się linki do konkretnych punktów czasowych.</h3>

    </v-card>
  </v-container>
</template>

<script>
import QuestionsData from '@/questions/questions-data';

export default {
  data() {
    return {
      todoLivestreams: QuestionsData.todos.livestreams
    }
  }
}
</script>
