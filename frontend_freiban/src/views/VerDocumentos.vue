<template>
    <Header></Header>
    <Documentos></Documentos>
</template>

<script>
import Header from '../components/Header.vue';
import Documentos from '../components/Documentos.vue';

export default{
    name: 'VerDocumentos',
    components: {
        Header,
        Documentos
    }
}

</script>