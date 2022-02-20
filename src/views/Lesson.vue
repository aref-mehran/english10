<template>
    <div   >
        <Header  />
        <div @click="clicked">
            <pdf 
            v-for="i in range(startPage,endPage)"
            :key="i"
            :src="require('../assets/pdfs/english-10.pdf')" 
            :page="i"
        ></pdf>
        </div>
        <div >
        <Footer :translate="this.farsiSentence" />
        </div>
    </div>
</template>

<script>
import Header from '@/components/HeaderLesson.vue'
import Footer from '@/components/Footer.vue'
import Speak from '@/services/Speak.js'
import Translate from '@/services/Translate.js'
import pdf from 'pdfvuer'


export default {
    data(){
        return{
            lesson :'',
            startPage:1,
            endPage:5,
            alignments: 'center',
            farsiSentence:''
        }
    },
    mounted(){
        this.lesson = this.$route.params.lessonTitle;
        this.startPage = this.$route.params.startPage;
        this.endPage = this.$route.params.endPage;
    },
    created() {
        this.speak=new Speak()
        this.translator = new Translate()
    },
    methods:{
        range(start, end) {
            start=Number(start);
            end=Number(end);
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        },
        clickOnSentence() {
            let cursor = window.getSelection();

            cursor.modify("move", "backward", "lineboundary");
            cursor.modify("extend", "forward", "lineboundary");
            var selectedStr = cursor.toString();

            selectedStr = selectedStr.trim();
            this.speak.read(selectedStr , this.$store.state.readingSpeed/100);
            
            this.farsiSentence =  this.translator.getTranslated(selectedStr);
            
            
        },
        clickOnWord() {
            let cursor = window.getSelection();
            cursor.modify("move", "backward", "word");
            cursor.modify("extend", "forward", "word");
            var selectedStr = cursor.toString();

            this.speak.read(selectedStr , this.$store.state.readingSpeed/100);
                        
            this.farsiSentence =  this.translator.getTranslated(selectedStr)
            
        },
        clicked (){
            console.log('State    '+this.$store.state.SentenceReadingMode)
            console.log('speed    '+this.$store.state.readingSpeed)
            if ( this.$store.state.SentenceReadingMode ) {
                this.clickOnSentence();
            } else {
                this.clickOnWord();
            }
        }
    },
    components: {
        pdf,
        Header,
        Footer
    }
}
</script>
