import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc
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
// INITIALIZE FIREBASE
// ============================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ============================
// GET PROPERTY ID FROM URL
// ============================

const urlParams =
    new URLSearchParams(window.location.search);

const propertyId =
    urlParams.get("id");


const details =
    document.getElementById("propertyDetails");


// ============================
// CHECK PROPERTY ID
// ============================

if (!propertyId) {

    details.innerHTML = `

        <div class="property-detail-card">

            <h2>
                Property not found ❌
            </h2>

            <p>
                No property ID was provided.
            </p>

            <a href="index.html">
                ← Back to Properties
            </a>

        </div>

    `;

} else {

    loadProperty();

}


// ============================
// LOAD PROPERTY
// ============================

async function loadProperty() {

    try {

        const propertyRef =
            doc(
                db,
                "properties",
                propertyId
            );


        const propertySnap =
            await getDoc(propertyRef);


        // PROPERTY DOES NOT EXIST

        if (!propertySnap.exists()) {

            details.innerHTML = `
            const contactButton =
    document.getElementById(
        "contactOwnerButton"
    );

if (
    contactButton &&
    property.mobile
) {

    contactButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "tel:" +
                property.mobile;

        }
    );

}

                <div class="property-detail-card">

                    <h2>
                        Property not found ❌
                    </h2>

                    <p>
                        This property may have been removed.
                    </p>

                    <a href="index.html">
                        ← Back to Properties
                    </a>

                </div>

            `;

            return;

        }


        // GET PROPERTY DATA

        const property =
            propertySnap.data();


        // ============================
        // DISPLAY PROPERTY
        // ============================

        details.innerHTML = `

            <div class="property-detail-card">


                <!-- PROPERTY IMAGE -->

                <div class="property-detail-image">
                    🏠
                </div>


                <!-- TITLE -->

                <h1>
                    ${property.bhk || property.propertyType || "Property"}
                </h1>


                <!-- LOCATION -->

                <p class="location">

                    📍 ${property.area || ""}
                    ${property.area && property.city ? ", " : ""}
                    ${property.city || ""}

                </p>


                <!-- RENT -->

                <h2 class="rent">

                    ₹${Number(property.rent || 0)
                        .toLocaleString("en-IN")}

                    / month

                </h2>
<p>
    ✅ Verified by RentDirect
</p>


                <!-- PROPERTY DETAILS -->

                <div class="details-grid">


                    <div>

                        <strong>
                            Property Type
                        </strong>

                        <span>
                            ${property.propertyType || "Not specified"}
                        </span>

                    </div>


                    <div>

                        <strong>
                            BHK
                        </strong>

                        <span>
                            ${property.bhk || "Not specified"}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Furnishing
                        </strong>

                        <span>
                            ${property.furnishing || "Not specified"}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Bathrooms
                        </strong>

                        <span>
                            ${property.bathrooms || "Not specified"}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Parking
                        </strong>

                        <span>
                            ${property.parking || "Not specified"}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Security Deposit
                        </strong>

                        <span>

                            ₹${Number(property.deposit || 0)
                                .toLocaleString("en-IN")}

                        </span>

                    </div>


                    <div>

                        <strong>
                            Tenant Preference
                        </strong>

                        <span>
                            ${property.tenantPreference || "Anyone"}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Available From
                        </strong>

                        <span>
                            ${property.availableFrom || "Immediately"}
                        </span>

                    </div>


                </div>


                <!-- DESCRIPTION -->

                <h3>
                    Description
                </h3>


                <p>
                    ${property.description ||
                    "No description provided."}
                </p>


                <!-- OWNER -->

                <div class="owner-box">

                    <h3>
                        👤 Direct Owner
                    </h3>


                    <p>
                        Owner:
                        ${property.ownerName || "Property Owner"}
                    </p>


<button
    id="contactOwnerButton"
    class="contact-button"
>
    📞 Contact Owner
</button>

<button
    id="whatsappButton"
    class="contact-button"
>
    💬 WhatsApp
</button>



                    <p
                        id="contactMessage"
                        style="display:none;"
                    ></p>

                </div>


                <br>


                <!-- BACK -->

                <a href="index.html">
                    ← Back to Properties
                </a>


            </div>

        `;


        // ============================
        // CONTACT OWNER BUTTON
        // ============================

        const contactButton =
            document.getElementById(
                "contactOwnerButton"
            );


        const contactMessage =
            document.getElementById(
                "contactMessage"
            );


        if (contactButton) {

            contactButton.addEventListener(
                "click",
                function () {
const mobile = property.mobile;




                    contactMessage.style.display =
                        "block";


                    contactMessage.innerHTML = `

                        📞 Owner Contact:

                        <strong>
                            ${mobile}
                        </strong>

                    `;

                }
            );

        }


    } catch (error) {

        console.error(
            "Error loading property:",
            error
        );


        details.innerHTML = `

            <div class="property-detail-card">

                <h2>
                    Something went wrong ❌
                </h2>

                <p>
                    Property details load nahi ho paayi.
                </p>

                <a href="index.html">
                    ← Back to Properties
                </a>

            </div>

        `;

    }

}