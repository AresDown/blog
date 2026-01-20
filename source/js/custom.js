(function() {
    const originalCreateElement = document.createElement;
    document.createElement = function(tag) {
        const el = originalCreateElement.call(document, tag);

        // 拦截 clarity.js
        if (tag === "script") {
            const originalSetAttribute = el.setAttribute;
            el.setAttribute = function(name, value) {
                if (name === "src") {
                    if (value.includes("scripts.clarity.ms")) {
                        value = value.replace(
                            "https://scripts.clarity.ms",
                            "/clarity-scripts"
                        );
                    }
                    if (value.includes("static.cloudflareinsights.com")) {
                        value = value.replace(
                            "https://static.cloudflareinsights.com",
                            "/cf-insights"
                        );
                    }
                }
                return originalSetAttribute.call(el, name, value);
            };
        }

        // 拦截 c.gif
        if (tag === "img") {
            const originalSetAttribute = el.setAttribute;
            el.setAttribute = function(name, value) {
                if (name === "src" && value.includes("c.clarity.ms")) {
                    value = value.replace(
                        "https://c.clarity.ms",
                        "/clarity-c"
                    );
                }
                return originalSetAttribute.call(el, name, value);
            };
        }

        return el;
    };
})();
