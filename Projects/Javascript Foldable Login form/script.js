document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");
    const registrationForm = document.querySelector(".registration-form");
    const inputs = document.querySelectorAll("input");

    /**
     * Performance: Debounce function to limit the rate at which a function can fire.
     * Useful for real-time validation or window resizing.
     */
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    /**
     * Accessibility: Manage focus and ARIA attributes during form transitions.
     */
    const toggleFormAccessibility = (activeForm, inactiveForm) => {
        activeForm.setAttribute("aria-hidden", "false");
        inactiveForm.setAttribute("aria-hidden", "true");
        
        // Focus the first input of the active form for screen readers
        const firstInput = activeForm.querySelector("input");
        if (firstInput) firstInput.focus();
    };

    /**
     * Accessibility: Real-time validation feedback for screen readers.
     */
    const validateInput = (input) => {
        const errorId = `${input.id}-error`;
        let errorElement = document.getElementById(errorId);

        if (!input.checkValidity()) {
            input.setAttribute("aria-invalid", "true");
            if (!errorElement) {
                errorElement = document.createElement("span");
                errorElement.id = errorId;
                errorElement.className = "error-message";
                errorElement.style.color = "red";
                errorElement.style.fontSize = "12px";
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }
            errorElement.textContent = input.validationMessage;
        } else {
            input.setAttribute("aria-invalid", "false");
            if (errorElement) errorElement.remove();
        }
    };

    // Attach debounced validation to all inputs
    inputs.forEach(input => {
        input.addEventListener("input", debounce);
    });
});
