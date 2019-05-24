<template>
    <h1>MyTournaments</h1>
</template>

<script>
import axios from 'axios';

export default {
    name:"MyTournaments",
    data(){
        return{
        userID: '',
        userTournaments: [],
        }
    },
    created(){
        this.userID = this.$store.getters.loggedUserId

        axios.get(`https://localhost:5001/api/user/${this.userID}/tournaments`).then(res => console.log(res.data)).catch(err => console.log(err));
    },

}
</script>

<style>

</style>
