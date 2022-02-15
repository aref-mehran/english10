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
            @click="someFunction()"
            :label="` ${switch1.toString()}`"
            :value="switch1"
            hide-details
        ></v-switch>

        <v-spacer></v-spacer>
        <v-select
            :items="items"
            :value="items[2]"
            hide-details
            style='max-width:25%'
        ></v-select>
      
    </v-app-bar>
</template>

<script>
export default {
    data(){
        return{
            switch1:'Word',
            switch2:'Sentence',
            items:['50%','70%','100%','150%','200%']
        }
    }
    //props:{
    //    totalCount:Number,
    //    correctCount: Number
    //},
}
</script>