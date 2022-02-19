<template>
    <v-app-bar
        app
        color="primary"
        dark
    >
        <v-btn
        :to = "`/`"
        text
        >
            <v-icon> mdi-home </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-switch
            @click="switchSentenceClick()"
            v-model="switchSentence"
            hide-details
        >
            <template v-slot:label >
                <p  v-if="switchSentence">  جمله </p>
                <p v-if="!switchSentence"> کلمه</p>
            </template>
            
        </v-switch>

        <v-spacer></v-spacer>
        <v-select
            :items="items"
            :value="items[2]"
            hide-details
            :label="selectLable"
            style='max-width:25%'
        ></v-select>
      
    </v-app-bar>
</template>

<script>
export default {
    data(){
        return{
            selectLable:'سرعت',
            switchLable:'خواندن جمله',
            switchSentence:this.$store.state.SentenceReadingMode,
            items:['50%','70%','100%','150%','200%']
        }
    },
    methods:{
        switchSentenceClick(){
            console.log(this.$store)
            this.$store.commit('setReadingMode', this.switchSentence )
            console.log(this.switchSentence)
        }
    }
    //props:{
    //    totalCount:Number,
    //    correctCount: Number
    //},
}
</script>