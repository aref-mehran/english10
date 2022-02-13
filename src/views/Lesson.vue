<template>
<div>
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
import pdf from 'pdfvuer'
export default {
    data(){
        return{
            lesson :'',
            alignments: 'center',
            sliderValue: 0,
            autocompleteItems: ['word', 'Sentence'],
            autocompleteValue: 'word',
            pageNumber : 5,
            //pdfPath: `https://www.roshd.ir/DesktopModules/Barrizon/LArticle/api/File/Get/d38704cb-3f5e-48df-94c7-2fa55fcc5221`
        }
    },
    mounted(){
        const selectedLesson = this.$route.params.lossonTitle;
        this.lesson = selectedLesson;
        //let path=this.$route.name+pdfPath
        //console.log( this.pdfPath )
    },
    components: {
        pdf
    }
}
</script>
