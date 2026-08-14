import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ============================
// FIREBASE
// ============================

const firebaseConfig = {
    apiKey: "AIzaSyD7myAwraL7n_moRWARLj2LSpWyqOlDE",
    authDomain: "rentdirect-96e95.firebaseapp.com",
    projectId: "rentdirect-96e95",
    storageBucket: "rentdirect-96e95.firebasestorage.app",
    messagingSenderId: "592455325372",
    appId: "1:592455325372:web:bd1361e9db801a23b0a2b9",
    measurementId: "G-CR2Q6E4BD6"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ============================
// OWNER PROPERTY FORM
// ============================

const propertyForm =
    document.querySelector(".property-form");


if (propertyForm) {

    propertyForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const formData =
                new FormData(propertyForm);


            const data = {

                ownerName:
                    formData.get("ownerName") || "",

                mobile:
                    formData.get("mobile") || "",

                propertyType:
                    formData.get("propertyType") || "",

                bhk:
                    formData.get("bhk") || "",

                furnishing:
                    formData.get("furnishing") || "",

                tenantPreference:
                    formData.get("tenantPreference") || "",

                parking:
                    formData.get("parking") || "",

                city:
                    formData.get("city") || "",

                area:
                    formData.get("area") || "",

                rent:
                    Number(formData.get("rent") || 0),

                deposit:
                    Number(formData.get("deposit") || 0),

                bathrooms:
                    Number(formData.get("bathrooms") || 0),

                availableFrom:
                    formData.get("availableFrom") || "",

                description:
                    formData.get("description") || "",

                status:
                    "pending",

                createdAt:
                    new Date().toISOString()

            };


            try {

                await addDoc(
                    collection(db, "properties"),
                    data
                );


                alert(
                    "Property submitted successfully! ✅\n\nYour property is waiting for verification."
                );


                propertyForm.reset();


            } catch (error) {

                console.error(
                    "Firebase Error:",
                    error
                );


                alert(
                    "Property save nahi ho paayi ❌\n\n" +
                    error.message
                );

            }

        }
    );

}


// ============================
// HOME PAGE
// ============================

const propertyContainer =
    document.getElementById(
        "propertyContainer"
    );


let allProperties = [];


if (propertyContainer) {

    loadProperties();

}


// ============================
// LOAD PROPERTIES
// ============================

async function loadProperties() {

    try {

        const querySnapshot =
            await getDocs(
                collection(db, "properties")
            );


        allProperties = [];


        querySnapshot.forEach(
            (doc) => {

                const property =
                    doc.data();


                if (
                    !property.city ||
                    !property.rent ||
                    Number(property.rent) <= 0
                ) {

                    return;

                }


                // ============================
                // APPROVAL FILTER
                // ============================

                // Old properties without status
                // will remain visible.

                // Pending properties will be hidden.

                if (
                    property.status === "pending"
                ) {

                    return;

                }


                allProperties.push({

                    id: doc.id,

                    ...property

                });

            }
        );


        displayProperties(
            allProperties
        );


    } catch (error) {

        console.error(
            "Error loading properties:",
            error
        );


        propertyContainer.innerHTML =
            "<p>Properties load nahi ho paayi ❌</p>";

    }

}


// ============================
// DISPLAY PROPERTIES
// ============================

function displayProperties(
    properties
) {

    propertyContainer.innerHTML = "";


    if (properties.length === 0) {

        propertyContainer.innerHTML = `

            <div class="no-properties">

                <h3>
                    No properties available
                </h3>

            </div>

        `;

        return;

    }


    properties.forEach(
        (property) => {

            const card =
                document.createElement(
                    "div"
                );


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
                    📍
                    ${property.area || ""},
                    ${property.city || ""}
                </p>


                <h4>
                    ₹${Number(
                        property.rent || 0
                    ).toLocaleString("en-IN")}
                    / month
                </h4>


                <p>
                    💰 Security Deposit:
                    ₹${Number(
                        property.deposit || 0
                    ).toLocaleString("en-IN")}
                </p>


                <p>
                    👤 Direct Owner
                </p>


                <button
                    class="view-property-button"
                >
                    View Property
                </button>

            `;


            const viewButton =
                card.querySelector(
                    ".view-property-button"
                );


            viewButton.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "property.html?id=" +
                        property.id;

                }
            );


            propertyContainer.appendChild(
                card
            );

        }
    );

}


// ============================
// SEARCH
// ============================

const searchButton =
    document.getElementById(
        "searchButton"
    );


if (searchButton) {

    searchButton.addEventListener(
        "click",
        function () {

            const locationInput =
                document.getElementById(
                    "searchLocation"
                );

            const typeInput =
                document.getElementById(
                    "searchType"
                );

            const rentInput =
                document.getElementById(
                    "searchRent"
                );


            const location =
                locationInput
                    ? locationInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const type =
                typeInput
                    ? typeInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const maxRent =
                rentInput
                    ? Number(
                        rentInput.value
                    )
                    : 0;


            const filtered =
                allProperties.filter(
                    (property) => {

                        const propertyLocation =
                            (
                                (property.city || "") +
                                " " +
                                (property.area || "")
                            ).toLowerCase();


                        const locationMatch =
                            !location ||
                            propertyLocation.includes(
                                location
                            );


                        const propertyType =
                            (
                                property.propertyType ||
                                ""
                            ).toLowerCase();


                        const typeMatch =
                            !type ||
                            propertyType === type;


                        const rentMatch =
                            !maxRent ||
                            Number(property.rent) <= maxRent;


                        return (
                            locationMatch &&
                            typeMatch &&
                            rentMatch
                        );

                    }
                );


            displayProperties(
                filtered
            );

        }
    );

}