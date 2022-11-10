<template>
<div class="container">
    <div class="ctn">
        <div class="ctn-logo"><img src="../assets/jf_logo.jpg"  width="700" height="550 " alt=""></div>
        <div class="ctn-campos">
            <h1>INICIO DE SESIÓN</h1>
            <p>CORREO:</p>
            <input type="email">
            <p>CONTRASEÑA</p>
            <input type="password">
            <div>
                <button class="btn">INICIAR SESION</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default{
        name: 'FormLogin'
    }
</script>

<style>
*{margin: 0;
padding: 0;}

.container{
    display: flex;
    background: #555555;
    height: 100vh;
    width: 100%;

}
.ctn{
    margin: auto;
    display: flex;
    align-items: center;
    justify-content:center;
    height: 100%;
    width: 100%;

}

.ctn-logo img {
    border-radius: 25px 0px 0px 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.ctn-campos{
    width: 700px;
    height: 550px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #0E5A96;
    border-radius: 0px 25px 25px 0px;
    text-align: center;
}
.ctn-campos h1{
    font-size: 50px;
    color: white;
    padding-bottom: 40px;
    margin-top: 30px;
}

.ctn-campos p{
    font-size: 30px;
    color: white;
    text-align: start;
    margin-left: 150px;
    font-weight: bold;
    padding-bottom: 20px;
}

.ctn-campos input{
    width: 430px;
    height: 60px;
    border-radius: 25px;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;
    font-size: 30px;
    padding-left: 10px;
    margin-left: 50px; 
}

.btn{
    height: 55px;
    width: 250px;
    border-radius: 25px;
    background-color: #EFBF25;
    border: none;
    font-size: 25px;
    color: white;
    font-weight: bold;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
}




</style>