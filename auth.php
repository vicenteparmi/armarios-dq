<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Armários DQ</title>
    <link href="https://fonts.googleapis.com/css?family=Muli:400,700&amp;display=swap&amp;subset=latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        button:hover {
            border: none;
        }

    </style>
    <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-auth-compat.js"></script>
    <script>
        const firebaseConfig = {
            apiKey: "AIzaSyAP0OlBnJCBC6J9l5VR6gkFRezLysxCl7U",
            authDomain: "armarios-dq.firebaseapp.com",
            databaseURL: "https://armarios-dq-default-rtdb.firebaseio.com",
            projectId: "armarios-dq",
            storageBucket: "armarios-dq.appspot.com",
            messagingSenderId: "591660308093",
            appId: "1:591660308093:web:8391ae63cfd5184af28314",
            measurementId: "G-MN9B3BBZ27"
        };

        firebase.initializeApp(firebaseConfig);

    </script>
    <script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />
    <script type="text/javascript">
        // FirebaseUI config.
        var uiConfig = {
            signInSuccessUrl: 'index.php',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            tosUrl: '<your-tos-url>',
            // Privacy policy url/callback.
            privacyPolicyUrl: function() {
                window.location.assign('<your-privacy-policy-url>');
            }
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    </script>
</head>

<body>
    <?php require 'modules/header.php' ?>
    <div id="firebaseui-auth-container"></div>
</body>

</html>