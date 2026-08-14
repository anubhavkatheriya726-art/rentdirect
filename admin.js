import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


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

const db = getFirestore(app);


// ============================
// ADMIN CONTAINER
// ============================

const container =
    document.getElementById("adminProperties");


// ============================
// LOGIN CHECK
// ============================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "admin-login.html";

        return;
    }

    console.log(
        "Logged in:",
        user.email
    );

    await loadProperties();

});


// ============================
// LOAD PENDING PROPERTIES
// ============================

async function loadProperties() {

    container.innerHTML =
        "<p>Loading properties...</p>";

    try {

        const snapshot =
            await getDocs(
                collection(db, "properties")
            );


        container.innerHTML = "";


        let pendingFound = false;


        snapshot.forEach((propertyDoc) => {

            const property =
                propertyDoc.data();


            if (property.status !== "pending") {

                return;

            }


            pendingFound = true;


            const card =
                document.createElement("div");


            card.className =
                "property-card";


            card.innerHTML = `

                <div class="property-image">
                    🏠
                </div>

                <h3>
                    ${
                        property.bhk ||
                        property.propertyType ||
                        "Property"
                    }
                </h3>

                <p>
                    👤 Owner:
                    ${property.ownerName || "N/A"}
                </p>

                <p>
                    📱 Mobile:
                    ${property.mobile || "N/A"}
                </p>

                <p>
                    📍 Location:
                    ${property.area || ""},
                    ${property.city || ""}
                </p>

                <p>
                    🏠 Type:
                    ${property.propertyType || "N/A"}
                </p>

                <p>
                    🪑 Furnishing:
                    ${property.furnishing || "N/A"}
                </p>

                <p>
                    👨‍👩‍👧 Who can rent:
                    ${property.tenantPreference || "N/A"}
                </p>

                <p>
                    🅿️ Parking:
                    ${property.parking || "N/A"}
                </p>

                <p>
                    💰 Rent:
                    ₹${Number(
                        property.rent || 0
                    ).toLocaleString("en-IN")}
                    / month
                </p>

                <p>
                    🔐 Deposit:
                    ₹${Number(
                        property.deposit || 0
                    ).toLocaleString("en-IN")}
                </p>

                <p>
                    🛁 Bathrooms:
                    ${property.bathrooms || 0}
                </p>

                <p>
                    📅 Available From:
                    ${property.availableFrom || "N/A"}
                </p>

                <p>
                    📝 ${property.description || ""}
                </p>

                <p>
                    <strong>
                        Status: PENDING
                    </strong>
                </p>


                <div style="
                    display:flex;
                    gap:10px;
                    margin-top:15px;
                ">

                    <button
                        class="approve-btn"
                        style="
                            flex:1;
                            background:#16a34a;
                            color:white;
                        "
                    >
                        ✅ Approve
                    </button>

                    <button
                        class="reject-btn"
                        style="
                            flex:1;
                            background:#dc2626;
                            color:white;
                        "
                    >
                        ❌ Reject
                    </button>

                </div>

            `;


            // ============================
            // APPROVE
            // ============================

            const approve =
                card.querySelector(
                    ".approve-btn"
                );


            approve.addEventListener(
                "click",
                async () => {

                    approve.disabled =
                        true;

                    approve.textContent =
                        "Approving...";


                    try {

                        await updateDoc(
                            doc(
                                db,
                                "properties",
                                propertyDoc.id
                            ),
                            {
                                status:
                                    "approved"
                            }
                        );


                        alert(
                            "Property Approved ✅"
                        );


                        card.remove();


                    } catch (error) {

                        console.error(
                            error
                        );


                        alert(
                            "Approve failed ❌\n\n" +
                            error.message
                        );


                        approve.disabled =
                            false;

                        approve.textContent =
                            "✅ Approve";

                    }

                }
            );


            // ============================
            // REJECT
            // ============================

            const reject =
                card.querySelector(
                    ".reject-btn"
                );


            reject.addEventListener(
                "click",
                async () => {

                    const confirmReject =
                        confirm(
                            "Reject this property?"
                        );


                    if (!confirmReject) {

                        return;

                    }


                    reject.disabled =
                        true;

                    reject.textContent =
                        "Rejecting...";


                    try {

                        await updateDoc(
                            doc(
                                db,
                                "properties",
                                propertyDoc.id
                            ),
                            {
                                status:
                                    "rejected"
                            }
                        );


                        alert(
                            "Property Rejected ❌"
                        );


                        card.remove();


                    } catch (error) {

                        console.error(
                            error
                        );


                        alert(
                            "Reject failed ❌\n\n" +
                            error.message
                        );


                        reject.disabled =
                            false;

                        reject.textContent =
                            "❌ Reject";

                    }

                }
            );


            container.appendChild(
                card
            );

        });


        // ============================
        // NO PENDING PROPERTIES
        // ============================

        if (!pendingFound) {

            container.innerHTML = `

                <div style="
                    text-align:center;
                    padding:40px;
                ">

                    <h3>
                        No Pending Properties
                    </h3>

                    <p>
                        फिलहाल कोई property verification के लिए pending नहीं है.
                    </p>

                </div>

            `;

        }


    } catch (error) {

        console.error(
            "Firestore Error:",
            error
        );


        container.innerHTML = `

            <div style="
                padding:30px;
                text-align:center;
            ">

                <h3>
                    Properties load नहीं हो पाईं ❌
                </h3>

                <p>
                    ${error.message}
                </p>

            </div>

        `;

    }

}


// ============================
// LOGOUT
// ============================

const logout =
    document.createElement("button");


logout.textContent =
    "Logout";


logout.style.position =
    "fixed";

logout.style.top =
    "15px";

logout.style.right =
    "20px";

logout.style.zIndex =
    "9999";

logout.style.background =
    "#dc2626";

logout.style.color =
    "white";

logout.style.border =
    "none";

logout.style.padding =
    "10px 18px";

logout.style.borderRadius =
    "8px";

logout.style.cursor =
    "pointer";


document.body.appendChild(
    logout
);


logout.addEventListener(
    "click",
    async () => {

        await signOut(auth);

        window.location.href =
            "admin-login.html";

    }
);