const axios = require("axios");

const BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
const MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";
const API_KEY = process.env.OPENROUTER_API_KEY || "";

async function callAI(systemPrompt, userPrompt, options = {}) {
    const keyIsPlaceholder = !API_KEY || API_KEY.includes("REPLACE") || API_KEY === "your_openrouter_api_key_here" || !API_KEY.startsWith("sk-or-");
    if (keyIsPlaceholder) {
        console.warn("OPENROUTER_API_KEY not set or is a placeholder. Returning mock response.");
        return {
            success: true,
            data: "Mock AI response - Set OPENROUTER_API_KEY in .env to enable real AI.",
            mock: true,
        };
    }

    const modelToUse = options.model || MODEL;
    console.log("[AI] Using model:", modelToUse);
    console.log("[AI] API Key starts with:", API_KEY.substring(0, 10));

    try {
        const response = await axios.post(
            `${BASE_URL}/chat/completions`,
            {
                model: modelToUse,
                max_tokens: options.max_tokens || 1024,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://medivault.app",
                    "X-Title": "MediVault",
                },
                timeout: 30000,
            }
        );

        const text = response.data?.choices?.[0]?.message?.content;
        if (!text) {
            throw new Error("Empty response from AI");
        }

        return { success: true, data: text };
    } catch (err) {
        const rawErrMsg = err?.response?.data?.error?.message || err.message || "Unknown AI error";
        let normalizedErrMsg = rawErrMsg;

        if (/user not found/i.test(rawErrMsg)) {
            normalizedErrMsg = "OpenRouter authentication failed (invalid/revoked API key or account issue).";
        } else if (/no endpoints available matching your guardrail restrictions and data policy/i.test(rawErrMsg)) {
            normalizedErrMsg = "OpenRouter privacy settings are blocking available providers. Update privacy settings at openrouter.ai or choose a compatible model/provider.";
        }

        console.error("OpenRouter call failed:", rawErrMsg);
        return { success: false, error: normalizedErrMsg };
    }
}

async function analyzeMedicineSideEffects(medicineName) {
    return callAI(
        "You are a pharmacist assistant. Give clear, concise information about medicines. Use bullet points. Keep response under 250 words.",
        `What are the common side effects and precautions for: ${medicineName}`
    );
}

async function triageSymptoms(symptoms) {
    return callAI(
        "You are a basic health triage assistant. Based on symptoms, suggest possible conditions and whether the person should see a doctor urgently, soon, or can monitor at home. Always recommend consulting a real doctor. NEVER diagnose definitively. Keep under 250 words.",
        `Patient symptoms: ${symptoms}`
    );
}

async function explainMedicalReport(reportText) {
    return callAI(
        "You are a friendly medical assistant. Explain medical reports in simple, easy-to-understand language that a non-medical person can understand. Be empathetic, clear, and highlight anything that needs attention. Use bullet points. Keep it under 300 words.",
        `Please explain this medical report in simple terms:\n\n${reportText}`
    );
}

module.exports = { callAI, analyzeMedicineSideEffects, triageSymptoms, explainMedicalReport };