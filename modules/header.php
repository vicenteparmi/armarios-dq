<?php
    $activePage = basename($_SERVER['PHP_SELF'], ".php");
?>

<nav>
    <h2>Armários do Departamento de Química</h2>
    <ul>
        <li <?php if ($activePage == "index.php") { echo 'class="active"'; } ?>><a href="index.php">Início</a></li>
        <li <?php if ($activePage == "meuscontratos.php") { echo 'class="active"'; } ?>><a href="meuscontratos.php">Meus Contratos</a></li>
        <li <?php if ($activePage == "help.php") { echo 'class="active"'; } ?>><a href="help.php">Como reservar</a></li>
    </ul>
</nav>