(function () {
    function encode64(data) {
        r = "";
        for (i=0; i<data.length; i+=3) {
            if (i+2==data.length) {
                r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
            } else if (i+1==data.length) {
                r += append3bytes(data.charCodeAt(i), 0, 0);
            } else {
                r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1),
                    data.charCodeAt(i+2));
            }
        }
        return r;
    }

    function append3bytes(b1, b2, b3) {
        c1 = b1 >> 2;
        c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
        c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
        c4 = b3 & 0x3F;
        r = "";
        r += encode6bit(c1 & 0x3F);
        r += encode6bit(c2 & 0x3F);
        r += encode6bit(c3 & 0x3F);
        r += encode6bit(c4 & 0x3F);
        return r;
    }

    function encode6bit(b) {
        if (b < 10) {
            return String.fromCharCode(48 + b);
        }
        b -= 10;
        if (b < 26) {
            return String.fromCharCode(65 + b);
        }
        b -= 26;
        if (b < 26) {
            return String.fromCharCode(97 + b);
        }
        b -= 26;
        if (b == 0) {
            return '-';
        }
        if (b == 1) {
            return '_';
        }
        return '?';
    }

    function encodePlantUML(s) {
        let compressed = pako.deflateRaw(s, { level: 9 }); // Compress using Pako
        return encode64(String.fromCharCode(...compressed)); // Convert to base64
    }

    function compress(s, imgId) {
        const encoded = encodePlantUML(s);
        // console.log("encoded: "+encoded);
        const img = document.getElementById(imgId);
        if (img) {
            const plantUMLHost = window.__CONFIG__?.PLANTUML_URL || "https://www.plantuml.com/plantuml/svg/";
            img.src = plantUMLHost + encoded;

            //TODO: add for preserving links. Local PUML server only.
            // const svgContent = await response.text();

            // Create a temporary container to parse the SVG content
            // const tempDiv = document.createElement('div');
            // tempDiv.innerHTML = svgContent;
        }
    }

    function renderPlantUMLDiagrams() {
        document.querySelectorAll('img[data-plantuml-file]').forEach(img => {
            const file = img.dataset.plantumlFile;
            const imgId = img.id;

            fetch(file)
                .then(response => response.ok ? response.text() : Promise.reject("File load failed"))
                .then(text => compress(text, imgId))
                .catch(error => console.error('Error loading PlantUML file:', error));
        });
    }

    document.addEventListener("DOMContentLoaded", renderPlantUMLDiagrams);
})();
