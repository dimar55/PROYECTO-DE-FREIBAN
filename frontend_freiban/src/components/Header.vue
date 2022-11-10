<template>
    <div class="ctn-header">
        <div class="titular">
            <img src="../assets/jf.jpeg" alt="" width="300" height="200">
            <h1>CONTROL JF INGENIERIA</h1>
        </div>
        <div class="logo_salir">
            <img src="../assets/logout.png" alt="">
        </div>
</div>
</template>

<script>
export default{
    name: 'Header'
}
</script>

<style>

.ctn-header{
    padding: 20px;
    display: flex;
    justify-content: space-between;
    background-color: #0E5A96;
    color: white;
}

.ctn-header h1{
    font-size:70px;
}

.ctn-header p{
    font-size:30px;
}

.titular{
    display: flex;
    align-items: center;
}

.titular img{
    margin-right: 150px;
    border-radius: 30px;
}

.logo_salir{
    display: flex;
    align-items: center;
}


</style>