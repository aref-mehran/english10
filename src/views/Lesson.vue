<template>
    <div  @click="clickOnSentence" >
        <p >
            this is Losson : {{this.lesson}}
        </p>
    </div>
</template>

<script>
import Speak from '@/services/Speak.js'

export default {
    data(){
        return{
            lesson :''
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
        this.speak.read(selectedStr);
    }
    }
}
</script>
