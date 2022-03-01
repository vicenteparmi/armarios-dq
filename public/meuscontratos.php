<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Armários DQ</title>
    <link href="https://fonts.googleapis.com/css?family=Muli:400,700&amp;display=swap&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="meuscontratos.css">
</head>

<body>
    <?php require 'modules/header.php' ?>

    <h2>Contratos ativos</h2>
    <table>
        <colgroup>
            <col span="1" style="width: 3%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 59%;">
            <col span="1" style="width: 8%;">
            <col span="1" style="width: 8%;">
            <col span="1" style="width: 15%;">
        </colgroup>
        <tr>
            <th>Número</th>
            <th>Situação</th>
            <th>Proprietário</th>
            <th>Data do Contrato</th>
            <th>Vencimento</th>
            <th>Ações</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Ativo</td>
            <td>João da Silva</td>
            <td>01/01/2020</td>
            <td>01/01/2020</td>
            <td>
                <a href="meuscontratos.php">Detalhes</a>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Ativo</td>
            <td>Maria da Silva</td>
            <td>01/01/2020</td>
            <td>01/01/2020</td>
            <td>
                <a href="meuscontratos.php">Detalhes</a>
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>Ativo</td>
            <td>José da Silva</td>
            <td>01/01/2020</td>
            <td>01/01/2020</td>
            <td>
                <a href="meuscontratos.php">Detalhes</a>
            </td>
        </tr>
    </table>
    <button style="margin-top: 24px; transform: translateX(-50%); margin-left: 50%">Novo Contrato</button>

    <script type="module" src="firebase.js"></script>
</body>

</html>