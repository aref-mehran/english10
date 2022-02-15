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
        <v-menu
            left
            bottom
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            </template>

            <v-list>
            <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
            >
                <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>
      
    </v-app-bar>
</template>

<script>
export default {
    //props:{
    //    totalCount:Number,
    //    correctCount: Number
    //},
}
</script>