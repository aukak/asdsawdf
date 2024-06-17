// Function to set a cookie
function setCookie(name, value, options) {
    options = options || {}; // If options are not provided, initialize as an empty object

    let expires = options.expires; // Retrieve the expiration date from options

    // If expires is a number and is greater than 0, calculate expiration date
    if (typeof expires == "number" && expires) {
        const d = new Date();
        d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
        expires = options.expires = d;
    }

    // If expires is a valid date, convert it to UTC string
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    // Encode the value to be stored in the cookie
    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value; // Construct the cookie string

    // Loop through options to append additional properties to the cookie string
    for (const propName in options) {
        updatedCookie += "; " + propName;
        const propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    // Set the cookie
    document.cookie = updatedCookie;
}

// Function to get a cookie by name
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Event listener to execute when DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the selected preset from the cookie
    const selectedPreset = getCookie("tabCloakPreset");

    // Preset configurations
    const presets = {
        google: {
            favicon: "https://www.google.com/favicon.ico",
            title: "Google"
        },
        gmail: {
            favicon: "/assets/img/favicons/gmail.png",
            title: "Gmail"
        },
        docs: {
            favicon: "/assets/img/favicons/docs.ico",
            title: "Google Docs"
        },
        googleclass: {
            favicon: "/assets/img/favicons/googleclassroom.ico",
            title: "Home"
        },
        tab: {
            favicon: "/assets/img/favicons/chromenewtab.ico",
            title: "New Tab"
        },
        googledrive: {
            favicon: "/assets/img/favicons/googledrive.ico",
            title: "My Drive - Google Drive"
        },
            word: {
                favicon: "/assets/img/favicons/word.png",
                title: "Document.docx"
                },
                school: {
                    favicon: "/assets/img/favicons/school.ico",
                    title: "Schoology"
        },
        StudentVue: {
            favicon: "/assets/img/favicons/student.ico",
            title: "StudentVue"
        },
        canvas: {
            favicon: "/assets/img/favicons/Canvas.ico",
            title: "Canvas"
        },
        clever: {
            favicon: "/assets/img/favicons/clever.png",
            title: "Clever"
        }
        // Add more preset configurations here
    };

    // If a preset is selected and exists in the presets object
    if (selectedPreset && presets[selectedPreset]) {
        const preset = presets[selectedPreset]; // Retrieve the preset
        document.title = preset.title; // Set document title

        // Create a new favicon element
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = preset.favicon;

        // Remove existing favicon, if any
        const existingFavicon = document.querySelector("link[rel='icon']");
        if (existingFavicon) {
            document.head.removeChild(existingFavicon);
        }

        // Append the new favicon to the head of the document
        document.head.appendChild(newFavicon);
    }
});  
