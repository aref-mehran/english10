<template>
    <div>
        <p>
            this is Lossone : {{this.lesson}}
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            lesson :''
        }
    },
    mounted(){
        const selectedLesson = this.$route.params.lossonTitle;
        this.lesson = selectedLesson
    }
}
</script>
