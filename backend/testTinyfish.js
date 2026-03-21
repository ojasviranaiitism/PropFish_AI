import { runTask } from "./services/tinyfishService.js";

async function test() {
    console.log("🚀 Starting TinyFish test...");

    try {
        const result = await runTask(
            "https://example.com",
            "Tell me what this website is about"
        );

        console.log("✅ Result:", result);
    } catch (err) {
        console.error("❌ Error:", err.message);
    }

    console.log("🏁 Test finished");
}

test();