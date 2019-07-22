<template>
    <v-btn block color="success" v-on:click="$emit('clicked')">{{Message}}</v-btn>
</template>

<script>
export default {
    name: "ConfirmButton",
    data(){
        return{

        }
    },
    props:["Message"]
}
</script>

<style>

</style>
