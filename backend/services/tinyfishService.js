import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.TINY_FISH_API_KEY;
const BASE_URL = 'https://agent.tinyfish.ai/v1';

/**
 * Helper to ensure API Key exists
 */
function getHeaders() {
    if (!API_KEY) {
        throw new Error('TINY_FISH_API_KEY is not defined in the environment variables.');
    }
    return {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    };
}

/**
 * Synchronous /run endpoint. Best for simple tasks taking < 30 seconds.
 * @param {string} url The target website URL
 * @param {string} goal The automation goal
 * @returns {Promise<any>} The result of the run
 */
export async function runTask(url, goal) {
    const response = await fetch(`${BASE_URL}/automation/run`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ url, goal }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`TinyFish API Error (${response.status}): ${errorBody}`);
    }

    const run = await response.json();
    return run.result;
}

/**
 * Asynchronous /run-async endpoint. Best for long-running automations.
 * @param {string} url The target website URL
 * @param {string} goal The automation goal
 * @returns {Promise<string>} The generated run_id
 */
export async function runTaskAsync(url, goal) {
    const response = await fetch(`${BASE_URL}/automation/run-async`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ url, goal }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`TinyFish API Error (${response.status}): ${errorBody}`);
    }

    const { run_id } = await response.json();
    return run_id;
}

/**
 * Check the status of an asynchronous run.
 * @param {string} run_id The ID of the run
 * @returns {Promise<object>} Status object containing status (PENDING, RUNNING, COMPLETED, FAILED, CANCELLED) and result.
 */
export async function getRunStatus(run_id) {
    const response = await fetch(`${BASE_URL}/runs/${run_id}`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`TinyFish API Error (${response.status}): ${errorBody}`);
    }

    return await response.json();
}

/**
 * Cancel an ongoing asynchronous run.
 * @param {string} run_id The ID of the run
 * @returns {Promise<void>}
 */
export async function cancelRun(run_id) {
    const response = await fetch(`${BASE_URL}/runs/${run_id}/cancel`, {
        method: "POST",
        headers: getHeaders(),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`TinyFish API Error (${response.status}): ${errorBody}`);
    }
}

/**
 * Streaming /run-sse endpoint. Yields progress updates in real-time.
 * @param {string} url The target website URL
 * @param {string} goal The automation goal
 * @param {function} onEvent Callback function triggered on every SSE event
 * @returns {Promise<void>} Resolves when the stream is completely finished
 */
export async function runTaskStream(url, goal, onEvent) {
    const response = await fetch(`${BASE_URL}/automation/run-sse`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ url, goal }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`TinyFish API Error (${response.status}): ${errorBody}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
            if (line.startsWith("data: ")) {
                try {
                    const event = JSON.parse(line.slice(6));
                    onEvent(event);
                } catch (e) {
                    console.error("Error parsing SSE event:", line, e);
                }
            }
        }
    }
}
