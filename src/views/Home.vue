<template>
  <v-card
    class="mx-auto"
  >
    <v-list three-line>
      <template v-for="(item, index) in items ">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>
        
        <v-list-item
          v-else
          :key="item.title"
          @click="lessonItemClick(item.title)"
          :to="`/lossons/${item.title}`"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import lessonItems from '@/data/lessonItems.js'
  export default {
    name: 'Home',
    components: {
      
    },
    methods:{
        lessonItemClick(itemTitle){
            this.selectedLesson=itemTitle;
            console.log('selected lesson: ',itemTitle)
        }
    },
    data:()=>({
        selectedLesson :'',
        items : lessonItems
    })
  }
</script>
