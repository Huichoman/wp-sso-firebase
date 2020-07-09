jQuery(document).ready((_) => {
    firebase.initializeApp(wp_firebase);

    _('#wp-firebase-google-sign-in').on('click', (event) => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const token = result.credential.accessToken;
                const user = result.user;

//                console.log(token, user);
                _.post(firebase_ajaxurl, {action: 'firebase_google_login', oauth_token: token, refresh_token: user.refreshToken, email: user.email }, (e, textStatus, jqXHR) => {
                    if (e.success == true) {
                        window.location.href = e.data.url;
                    }
                });
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
            })
    });

    _('#wp-firebase-facebook-sign-in').on('click', (event) => {
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    const token = result.credential.accessToken;
                    const user = result.user;

                    _.post(firebase_ajaxurl, {action: 'firebase_facebook_login', oauth_token: token, refresh_token: user.refreshToken, email: user.email }, (e, textStatus, jqXHR) => {
                        if (e.success == true) {
                            window.location.href = e.data.url;
                        }
                    });
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                })
    });

    if ( document.cookie.indexOf('wp_firebase_logout') !== -1 ) {
        firebase.auth().signOut()
            .then(() => {
                console.log('firebase signout.');
            });

    }
});