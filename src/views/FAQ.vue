<template>
  <v-container>
    <v-card>
      <v-expansion-panels multiple accordion>
        <v-expansion-panel
          v-for="faq in faqs"
          :key="faq.question"
        >
          <v-expansion-panel-header>
            <h2 class="title">{{ faq.question }}</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="px-4">
              <span v-html="faq.answer"></span>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      faqs: [
        { question: "Co to jest za strona?", answer: "Strona jest zbiorem pytań i odpowiedzi, które były zadawane przez internautów Mikołajowi - youtuberowi z kanału Dobra Nowina - podczas jego livestreamów na Facebooku albo Youtubie." },
        { question: "Dlaczego brakuje pytań z livestreamów np. z lat 2018 i 2019?", answer: "Niektórzych pytań i odpowiedzi jeszcze nie zdążyłam spisać." },
        { question: "Co oznacza napis [Skrót] w odpowiedziach?", answer: "Oznacza, że wypowiedź Mikołaja była dłuższa, ale spisałam ją fragmentarycznie. Żeby poznać całą odpowiedź należy samemu ją odsłuchać klikając w link przy pytaniu." },
        { question: "Dlaczego wyszkukiwanie tak długo trwa?", answer: "Ponieważ szukane są inne formy wpisanych słów aby wyniki były pełne i dokładniejsze. Można zaznaczyć \"Szukaj dokładnej frazy\" aby szukanie było szybsze." }
      ]
    }
  }
}
</script>
