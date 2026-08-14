import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


// ============================
// FIREBASE CONFIG
// ============================

const firebaseConfig = {
    apiKey: "AIzaSyD7myAwraL7n_moRWAROvLj2LSpWyqOlDE",
    authDomain: "rentdirect-96e95.firebaseapp.com",
    projectId: "rentdirect-96e95",
    storageBucket: "rentdirect-96e95.firebasestorage.app",
    messagingSenderId: "592455325372",
    appId: "1:592455325372:web:bd1361e9db801a23b0a2b9",
    measurementId: "G-CR2Q6E4BD6"
};


// ============================
// FIREBASE
// ============================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ============================
// ELEMENTS
// ============================

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailLogin = document.getElementById("emailLogin");
const googleLogin = document.getElementById("googleLogin");
const phoneLogin = document.getElementById("phoneLogin");

const message = document.getElementById("message");


// ============================
// MESSAGE
// ============================

function showMessage(text, success = false) {

    message.textContent = text;

    message.style.color =
        success ? "green" : "#d00";
}


// ============================
// EMAIL + PASSWORD
// ============================

emailLogin.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {

        showMessage(
            "Email aur password enter karo."
        );

        return;
    }

    try {

        showMessage("Signing in...");

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        showMessage(
            "Login successful ✅",
            true
        );

        setTimeout(() => {

            window.location.href =
                "admin.html";

        }, 800);

    } catch (error) {

        console.error(error);

        showMessage(
            "Login failed ❌ " +
            error.message
        );
    }

});


// ============================
// GOOGLE LOGIN
// ============================

googleLogin.addEventListener("click", async () => {

    try {

        showMessage(
            "Google login opening..."
        );

        const provider =
            new GoogleAuthProvider();

        await signInWithPopup(
            auth,
            provider
        );

        showMessage(
            "Google login successful ✅",
            true
        );

        setTimeout(() => {

            window.location.href =
                "admin.html";

        }, 800);

    } catch (error) {

        console.error(error);

        showMessage(
            "Google login failed ❌ " +
            error.message
        );
    }

});


// ============================
// PHONE OTP
// ============================

const recaptchaContainer =
    document.createElement("div");

recaptchaContainer.id =
    "recaptcha-container";

phoneLogin.parentNode.insertBefore(
    recaptchaContainer,
    phoneLogin
);


let confirmationResult = null;
let recaptchaVerifier = null;


phoneLogin.addEventListener("click", async () => {

    try {

        if (!recaptchaVerifier) {

            recaptchaVerifier =
                new RecaptchaVerifier(
                    auth,
                    "recaptcha-container",
                    {
                        size: "normal"
                    }
                );
        }


        const phoneNumber =
            prompt(
                "Enter phone number with country code.\nExample: +919876543210"
            );


        if (!phoneNumber) {
            return;
        }


        showMessage(
            "OTP bheja ja raha hai..."
        );


        confirmationResult =
            await signInWithPhoneNumber(
                auth,
                phoneNumber,
                recaptchaVerifier
            );


        const otp =
            prompt(
                "Firebase se aaya OTP enter karo:"
            );


        if (!otp) {

            showMessage(
                "OTP enter nahi kiya."
            );

            return;
        }


        await confirmationResult.confirm(
            otp
        );


        showMessage(
            "Phone login successful ✅",
            true
        );


        setTimeout(() => {

            window.location.href =
                "admin.html";

        }, 800);


    } catch (error) {

        console.error(error);

        showMessage(
            "Phone login failed ❌ " +
            error.message
        );


        if (recaptchaVerifier) {

            try {
                recaptchaVerifier.clear();
            } catch (e) {}

            recaptchaVerifier = null;
        }

    }

});