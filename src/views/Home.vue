<template>
  <div>
    <Header />
    <v-card class="mx-auto">

      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.sectionItems"
            :key="child.title"
            @click="lessonItemClick(child.title)"
            :to="`/${item.title}/${child.startPageNum}/${child.endPageNum}`"
          >
            <v-list-item-content>
              <!--<v-icon> mdi-domain </v-icon>-->
              <v-list-item-title v-text="child.title +' ( '+ child.startPageNum +' , '+ child.endPageNum+' ) '"></v-list-item-title>

            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import lessonItems from "@/data/lessonItems.js";
import Header from "@/components/HeaderHome.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  methods: {
    lessonItemClick(itemTitle) {
      this.selectedLesson = itemTitle;
      console.log("selected lesson: ", itemTitle);
    },
  },
  data: () => ({
    selectedLesson: "",
    items: lessonItems,
  }),
};
</script>
