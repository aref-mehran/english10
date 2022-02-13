<template>
    <div  @click="clicked" >
        
        <v-container class="grey lighten-5" :align="alignments">
        <!--<h1> this is Lossone : {{this.lesson}} </h1>-->
            <v-row no-gutters :align="alignments">
                <v-col
                    cols="12"
                    sm="4"
                >
                    <v-slider
                        v-model="sliderValue"
                        step="5"
                        thumb-label
                        ticks
                        :max="200"
                    ></v-slider> 
                </v-col>    
                <v-col
                    cols="12"
                    sm="4"
                >                   
                    <v-autocomplete
                        v-model="autocompleteValue"
                        :items="autocompleteItems"
                        dense
                        filled
                        label="choose model"
                    >
                    </v-autocomplete>                
                </v-col>
            </v-row>
        </v-container>
        <pdf 
            v-for="i in pageNumber"
            :key="i"
            :src="`/pdfs/english-10.pdf`" 
            :page="i"
        ></pdf>
    </div>
</template>

<script>
import Speak from '@/services/Speak.js'

export default {
    data(){
        return{
            lesson :'',
            alignments: 'center',
            sliderValue: 100 ,
            autocompleteItems: ['Word', 'Sentence'],
            autocompleteValue: 'Sentence',
            pageNumber : 5,
            //pdfPath: require('@/assets/pdfs/lessonone.pdf'),
        }
    },
    mounted(){
        const selectedLesson = this.$route.params.lossonTitle;
        this.lesson = selectedLesson
    },
    created() {
        this.speak=new Speak()
        //speak.read("This is text to speech test.")
    },
    methods:{
        clickOnSentence() {
            let cursor = window.getSelection();

            cursor.modify("move", "backward", "lineboundary");
            cursor.modify("extend", "forward", "lineboundary");
            var selectedStr = cursor.toString();

            selectedStr = selectedStr.trim();
            this.speak.read(selectedStr , this.sliderValue/100);
        },
        clickOnWord() {
            let cursor = window.getSelection();
            cursor.modify("move", "backward", "word");
            cursor.modify("extend", "forward", "word");
            var selectedStr = cursor.toString();

            this.speak.read(selectedStr , this.sliderValue/100);
            //setSelected(res);
        },
        clicked (){
            if (this.autocompleteValue === 'Sentence') {
                this.clickOnSentence();
            } else {
                this.clickOnWord();
            }
        }
    },
    components: {
        pdf
    }
}
</script>
