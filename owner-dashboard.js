import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD7zI_vbmyAwraL7n_moRWARLj2LSpWyqOlDE",
    authDomain: "rentdirect-96e95.firebaseapp.com",
    projectId: "rentdirect-96e95",
    storageBucket: "rentdirect-96e95.firebasestorage.app",
    messagingSenderId: "592455325372",
    appId: "1:592455325372:web:bd1361e9db801a23b0a2b9",
    measurementId: "G-CR2Q6E4BD6"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const myProperties =
    document.getElementById("myProperties");
    const propertyCount =
    document.getElementById(
        "propertyCount"
    );

loadProperties();

async function loadProperties() {

    const querySnapshot =
        await getDocs(
            collection(db, "properties")
        );

    let html = "";

    querySnapshot.forEach((doc) => {

        const property = doc.data();

        html += `

            <div>

                <h3>
                    ${property.bhk || "Property"}
                </h3>

                <p>
                    📍 ${property.city || ""}
                </p>

                <p>
                    ₹${property.rent || 0}
                </p>
                <p>

    Status:

    ${property.status === "approved"

        ? "Approved ✅"

        : "Pending ⏳"}

</p>
<button
    class="edit-button"
>
    ✏️ Edit
</button>
<button
    class="delete-button"
>
    🗑️ Delete
</button>

            </div>

            <hr>

        `;

    });

    myProperties.innerHTML =
        html || "<p>No properties found.</p>";
        propertyCount.textContent =
    `Total Properties: ${querySnapshot.size}`;
}