import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.TINY_FISH_API_KEY;
const BASE_URL = 'https://agent.tinyfish.ai/v1/automation/run-sse';

function getHeaders() {
    if (!API_KEY) {
        throw new Error('TINY_FISH_API_KEY is not defined.');
    }

    return {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "text/event-stream"
    };
}

/**
 * 🔥 STREAMING CORE (Improved)
 */
export async function runTaskStream(url, goal, onEvent) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            url,
            goal,
            browser_profile: "stealth" // 🔥 from reference
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`TinyFish Error ${response.status}: ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let finalResult = null;
    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep incomplete chunk

        for (const line of lines) {
            const trimmed = line.trim();

            if (!trimmed) continue;

            // 🔹 SSE data line
            if (trimmed.startsWith("data:")) {
                const jsonStr = trimmed.replace("data:", "").trim();

                if (jsonStr === "[DONE]") break;

                try {
                    const event = JSON.parse(jsonStr);

                    // 🔥 Send structured event
                    onEvent?.({
                        type: event.type || "LOG",
                        message: mapTinyFishEvent(event),
                        raw: event,
                        status: mapStatus(event.type),
                        streaming_url: event.streaming_url
                    });

                    // 🔥 Capture result
                    if (event.type === "COMPLETE" && event.result) {
                        let resObj = event.result;
                        if (typeof resObj === "string") {
                            try {
                                const match = resObj.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                                if (match) resObj = JSON.parse(match[0]);
                            } catch (e) {
                                console.warn("Could not parse stringified event.result:", e);
                            }
                        }
                        finalResult = resObj;
                    }

                } catch (err) {
                    onEvent?.({
                        type: "LOG",
                        message: jsonStr,
                        status: "progress"
                    });
                }
            }
        }
    }

    return finalResult;
}

/**
 * 🔥 Concurrent execution (IMPROVED)
 */
export async function runTasksConcurrently(websites, goal, onEvent) {
    const tasks = websites.map(async (site) => {
        try {
            onEvent?.({
                site,
                type: "START",
                message: `Opening ${site}`,
                status: "start"
            });

            const result = await runTaskStream(site, goal, (event) => {
                onEvent?.({ site, ...event });
            });

            if (result) {
                // 🔥 stream result immediately
                onEvent?.({
                    type: "RESULT",
                    site,
                    result,
                    status: "success"
                });

                return { site, result };
            }

            return { site, error: "No result returned" };

        } catch (err) {
            onEvent?.({
                site,
                type: "ERROR",
                message: err.message,
                status: "error"
            });

            return { site, error: err.message };
        }
    });

    return Promise.all(tasks);
}

/**
 * 🔥 Better status mapping
 */
function mapStatus(type) {
    if (!type) return "progress";

    if (type === "COMPLETE") return "success";
    if (type === "ERROR") return "error";
    if (type === "STARTED") return "start";

    return "progress";
}

/**
 * 🔥 Improved event mapping
 */
function mapTinyFishEvent(event) {
    if (!event) return "Processing...";

    const text = (event.purpose || "").toLowerCase();

    if (event.type === "STARTED") return "Agent started...";
    if (event.type === "COMPLETE") return "Finalizing results...";
    if (event.type === "STREAMING_URL") return "Live browser opened...";
    if (event.type === "HEARTBEAT") return "Still working...";

    if (text.includes("navigate")) return "Opening website...";
    if (text.includes("visit")) return "Opening page...";
    if (text.includes("search")) return "Searching properties...";
    if (text.includes("enter")) return "Entering location...";
    if (text.includes("filter")) return "Applying filters...";
    if (text.includes("extract")) return "Extracting listings...";
    if (text.includes("click")) return "Interacting with page...";
    if (text.includes("wait")) return "Loading page...";

    return "Processing...";
}