<template>
    <div  @click="clicked" >
        
        <!--<v-container class="grey lighten-5" :align="alignments">
        
        </v-container>-->
        <pdf 
            v-for="i in range(startPage,endPage)"
            :key="i"
            :src="`/pdfs/english-10.pdf`" 
            :page="i"
        ></pdf>
    </div>
</template>

<script>
import Speak from '@/services/Speak.js'
import pdf from 'pdfvuer'

export default {
    data(){
        return{
            lesson :'',
            startPage:1,
            endPage:5,
            alignments: 'center',
            sliderValue: 100 ,
            autocompleteItems: ['Word', 'Sentence'],
            autocompleteValue: 'Sentence',
            
            //pdfPath: require('@/assets/pdfs/lessonone.pdf'),
        }
    },
    mounted(){
        this.lesson = this.$route.params.lessonTitle;
        this.startPage = this.$route.params.startPage;
        this.endPage = this.$route.params.endPage;
        
    },
    created() {
        this.speak=new Speak()
        //speak.read("This is text to speech test.")
    },
    methods:{
        range(start, end) {
            start=Number(start);
            end=Number(end);
            //console.log(Array(end - start + 1).fill().map((_, idx) => start + idx))
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        },
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
