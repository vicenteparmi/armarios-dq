<?php
$activePage = basename($_SERVER['PHP_SELF'], ".php");
?>
<style>
    nav {
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        padding: 0;
        margin: 0;
        display: inline-flex;
        align-content: center;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        justify-content: space-between;
    }

    .links {
        display: inline-flex;
        align-items: center;
    }

    .links>li {
        padding: 0px 12px 0px 12px;
        list-style: none;
    }

    .links>li>a {
        color: black;
        text-decoration: none;
    }

    .links>li.active>a {
        background-color: var(--primary);
        padding: 8px 12px 8px 12px;
        color: white;
        font-weight: bold;
        border-radius: 100px;
    }

    #pageTitle {
        font-size: medium;
        font-weight: bold;
        display: inline-flex;
        margin-left: 5vw;
    }

    #loginStatus {
        display: inline-flex;
        align-items: center;
        margin-right: 5vw;
        cursor: pointer;
    }
</style>
<nav>
    <h2 id='pageTitle'>Armários do<br>Departamento de Química</h2>
    <ul class="links">
        <li <?php if ($activePage == "index") {
                echo 'class="active"';
            } ?>><a href="index.php">Início</a></li>
        <li <?php if ($activePage == "meuscontratos") {
                echo 'class="active"';
            } ?>><a href="meuscontratos.php">Meus Contratos</a></li>
        <li <?php if ($activePage == "help") {
                echo 'class="active"';
            } ?>><a href="help.php">Como reservar</a></li>
    </ul>
    <!-- Login with firebase -->
    <span id="loginStatus"><u>Entrar ou Registrar</u></span>
</nav>

<script src="modules/header.js"></script>