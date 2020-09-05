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
        { question: "Dlaczego brakuje livestreamów np. z lat 2018 i 2019?", answer: "Niektórzych pytań i odpowiedzi jeszcze nie zdążyłam spisać." },
        { question: "Co oznacza napis [Skrót] w odpowiedziach?", answer: "Oznacza, że wypowiedź Mikołaja była dłuższa, ale spisałam ją fragmentarycznie. Żeby poznać całą odpowiedź należy samemu ją odsłuchać klikając w link przy pytaniu." },
        { question: "Dlaczego wyszukiwanie tak długo trwa?", answer: "Pierwsze szukanie może trwać dłużej, do kilkunastu sekund, ponieważ szukane są inne formy wpisanych słów, aby wyniki były pełne i dokładniejsze. Można zaznaczyć \"Szukaj dokładnej frazy\" aby szukanie było szybsze." },
        { question: "Czy spisywane są wszystkie pytania?", answer: "Czasem mogę nie spisać pytania niechcący, ale czasem specjalnie je pomijam, gdy pytanie dotyczy życia prywatnego Mikołaja, gdy pytanie dotyczy szczegółowej sytuacji pytającego lub gdy odpowiedź Mikołaja to mniej więcej \"nie wiem\"." },
        { question: "Dlaczego nie wszystkie linki do pytań kierują do konkretnej sekundy filmu z danym pytaniem tylko do jego początku?", answer: "Nie zdążyłam spisać takich linków dla wszystkich livestreamów." }
      ]
    }
  }
}
</script>
