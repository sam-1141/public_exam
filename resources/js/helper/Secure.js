import { useEffect } from "react";

const Secure = () => {
    useEffect(() => {
        // Disable Right Click
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        //  Disable Text Selection
        const style = document.createElement("style");
        style.innerHTML = `
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
        document.head.appendChild(style);

        // Block Certain Key Combos
        const blockKeys = (e) => {
            const key = e.key.toLowerCase();
            if (
                (e.ctrlKey && ["c", "u", "s"].includes(key)) ||
                (e.ctrlKey && e.shiftKey && key === "i") ||
                key === "f12"
            ) {
                e.preventDefault();
            }
        };
        window.addEventListener("keydown", blockKeys);

        // Detect DevTools Open
        let devtoolsOpened = false;
        const detectDevTools = setInterval(() => {
            const before = new Date();
            debugger;
            const after = new Date();
            if (after - before > 100) {
                if (!devtoolsOpened) {
                    devtoolsOpened = true;

                    window.location.href = "/";
                }
            }
        }, 1000);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("keydown", blockKeys);
            clearInterval(detectDevTools);
            document.head.removeChild(style);
        };
    }, []);

    return null;
};

export default Secure;
