<template>
    <Header></Header>
    <Equipos></Equipos>
</template>

<script>
import Header from '../components/Header.vue';
import Equipos from '../components/Equipos.vue';

export default{
    name: 'Menu',
    components: {
        Header,
        Equipos
    }
}

</script>