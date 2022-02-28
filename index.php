<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Armários DQ</title>
    <link href="https://fonts.googleapis.com/css?family=Muli:400,700&amp;display=swap&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="index.css">
</head>

<body>
    <?php require 'modules/header.php' ?>

    <div class="info-pannel-container">
        <div class="info-pannel">
            <span>Seu armário</span>
            <div id="locker">NI</div>
            <h3 style="margin: 0;">Vicente K Parmigiani</h3>
            <p>Status: Regular
                <br>
                Contrato feito em 20/02/2020
            </p>
            <button>Gerenciar Armários</button>
        </div>

        <div class="info-table">
            <table class="view-table">
                <tr>
                    <th>Número</th>
                    <th>Situação</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Regular</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Regular</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Irregular</td>
                </tr>
            </table>
        </div>
        <div class="info-table">
            <table class="view-table">
                <tr>
                    <th>Número</th>
                    <th>Situação</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Regular</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Regular</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Irregular</td>
                </tr>
            </table>
        </div>
    </div>


    <script type="module" src="firebase.js"></script>
</body>

</html>