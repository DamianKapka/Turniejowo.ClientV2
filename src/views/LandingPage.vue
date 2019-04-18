<template>   
    <v-container>
        <v-layout row>          
                <v-card :dark="true" class="elevation-24" Height="100%" id="landingpage-card" >
                    <v-card-title primary-title>
                        <div id="landingpage-card-div">
                            <span class="landingpage-card-title">Witamy na CzasNaTurniej.pl !</span>
                            <p id="landingpage-card-p">
                                <p>Jest to doskonała platforma do organizacji własnych turniejów sportowych w 3 dyscyplinach: siatkówka, koszykówka i piłka nożna (w tym halowa).
                                </p>
                                <p>Przejrzysty panel administracyjny pozwoli każdemu użytkownikowi na łatwe administrowanie turniejem. Można tam zarządzać składami drużyn
                                terminarzem, wynikami, podzielić drużyny na grupy, a także ustawić wpisowe i wartość nagród na poszczególne miejsca w turnieju.
                                </p>
                                <p>Każdy turniej na wygenerowany link pod którym wszyscy użytkownicy mają pełny wgląd w przebieg turieju, terminarz, szczegółowe statystyki oraz mogą znaleść kontakt do administratora
                                turnieju. 
                                </p>
                                <p>Niesamowicie przydatną fukncja platformy jest autoorganizacja turnieju polegająca na wylosowaniu grup spośród zapisanych
                                drużyn, ustalenia dla nich harmonogramy spotkań a nawet terminarza w którym ustawiane są tylko dostępne daty a platforma sama 
                                przypisuja konkretny mecz na konkretny termin. 
                                </p>
                                <p>Serwis zapewnia także szczegółowe statystyki każdego turnieju : od najlepszego strzelca 
                                przez najlepszego bramkarza po najdłuzej przebywającego na boisku zawodnika, czy też tego który zdobył najwięcej puktów w meczu.  
                                </p>
                                <p>
                                Wciskając przysisk <strong>START!</strong> przejdz do serwisu, załóż konto i stwórz swój pierwszy turniej, a jeżeli szukasz informacji o 
                                konkretnym turnieju skorzystaj ze specjalnego wyszukiwarki turniejów która szybko przekieruje cię do odpowiednej storny.
                                 </p>
                                <v-layout row>
                                    <v-flex xs4></v-flex>
                                    <v-flex xs4>
                                        <v-btn block color="warning">START!</v-btn>
                                    </v-flex>
                                    <v-flex xs4></v-flex>
                                </v-layout>
                        </div>
                    </v-card-title>
                </v-card>
        </v-layout>
    </v-container>
</template>

<script>
export default {

}
</script>

<style>

    #landingpage-card{
        border-radius: 12px;
        margin: 5% 0;
        opacity: 0.9;
    }
    #landingpage-card-div{
        padding: 3%;
    }
    .landingpage-card-title{
        opacity: 2;
        font-weight: bold;
        font-size: 28px;
    }
    #landingpage-card-p{
        margin: 3% 0;
        line-height: 2;
    }
</style>
