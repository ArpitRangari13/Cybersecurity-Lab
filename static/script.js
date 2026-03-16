// =============================
// XSS SIMULATION
// =============================

function submitComment() {

    const input = document.getElementById("comment").value;

    const vulnerableOutput = document.getElementById("output");
    const safeOutput = document.getElementById("safeOutput");

    if (!vulnerableOutput || !safeOutput) return;

    // 🚨 Vulnerable rendering (XSS possible)
    vulnerableOutput.innerHTML = input;

    // ✅ Safe rendering
    safeOutput.textContent = input;
}



// =============================
// PASSWORD STRENGTH CHECKER
// =============================

function checkStrength() {

    const passwordField = document.getElementById("password");
    const strengthText = document.getElementById("strength");

    if (!passwordField || !strengthText) return;

    const password = passwordField.value;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strengthText.innerHTML = "Weak Password";
        strengthText.style.color = "red";
    } 
    else if (score <= 4) {
        strengthText.innerHTML = "Medium Password";
        strengthText.style.color = "orange";
    } 
    else {
        strengthText.innerHTML = "Strong Password";
        strengthText.style.color = "lime";
    }
}



// =============================
// CAESAR CIPHER ENCRYPTION
// =============================

function caesarEncrypt() {

    const textInput = document.getElementById("text");
    const shiftInput = document.getElementById("shift");
    const resultDiv = document.getElementById("result");

    if (!textInput || !shiftInput || !resultDiv) return;

    const text = textInput.value;
    const shift = parseInt(shiftInput.value) || 0;

    const encrypted = text.split('').map(char => {

        if (char.match(/[a-z]/i)) {

            const code = char.charCodeAt(0);

            let base;

            if (code >= 65 && code <= 90) {
                base = 65;
            } else {
                base = 97;
            }

            return String.fromCharCode((code - base + shift) % 26 + base);
        }

        return char;

    }).join('');

    resultDiv.innerHTML = encrypted;
}



// =============================
// SHA-256 HASHING
// =============================

async function sha256Hash() {

    const textInput = document.getElementById("text");
    const resultDiv = document.getElementById("result");

    if (!textInput || !resultDiv) return;

    const text = textInput.value;

    const msgBuffer = new TextEncoder().encode(text);

    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    resultDiv.innerHTML = hashHex;
}



// =============================
// UI HELPER (optional)
// =============================

function clearResult() {

    const resultDiv = document.getElementById("result");

    if (resultDiv) {
        resultDiv.innerHTML = "";
    }

}



// =============================
// PAGE LOAD MESSAGE
// =============================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Cybersecurity Lab Loaded");

});