import { useEffect, useState, useRef } from "react";

const apiUrl= import.meta.env.VITE_SERVER_URL

export default function AgentActivity({ query }) {
  const [tasks, setTasks] = useState({});
  const [isActive, setIsActive] = useState(false);
  const logsEndRefs = useRef({});

  useEffect(() => {
    if (!query) return;

    setIsActive(true);
    setTasks({}); // ✅ no fake "initializing" card

    logsEndRefs.current = {};

    const eventSource = new EventSource(
      `${apiUrl}/api/search-stream?q=${encodeURIComponent(query)}`
    );

    eventSource.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (data.type === "PING") return;

      // ✅ FINAL RESULT
      if (data.type === "FINAL") {
        console.log("✅ FINAL RESULTS:", data.results);

        // 🔥 send results to App.jsx
        window.dispatchEvent(
          new CustomEvent("tinyfish-results", { detail: data.results })
        );

        setIsActive(false);
        eventSource.close();
        return;
      }

      // 🏆 Recommendation event — signal App.jsx to show refining banner
      if (data.type === "RECOMMENDATION") {
        window.dispatchEvent(new CustomEvent("tinyfish-refining"));
        return;
      }

      // ✅ global error
      if (data.status === "error" && !data.site) {
        setIsActive(false);
        eventSource.close();
        return;
      }

      // ❌ ignore non-site events
      if (!data.site) return;

      setTasks((prev) => {
        const siteData = prev[data.site] || {
          logs: [],
          streaming_url: null,
          status: "pending",
        };

        let newLogs = [...siteData.logs];

        if (data.message) {
          newLogs.push({
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }),
            message: data.message,
            status: data.status,
          });

          // ✅ limit logs (performance)
          if (newLogs.length > 30) {
            newLogs = newLogs.slice(-30);
          }
        }

        return {
          ...prev,
          [data.site]: {
            ...siteData,
            logs: newLogs,
            streaming_url: data.streaming_url || siteData.streaming_url,
            status:
              data.status === "success" || data.status === "error"
                ? data.status
                : siteData.status,
          },
        };
      });
    };

    eventSource.onerror = () => {
      console.log("❌ SSE connection closed");
      eventSource.close();
      setIsActive(false);
    };

    return () => {
      eventSource.close();
    };
  }, [query]);

  // ✅ Auto-scroll logs
  useEffect(() => {
    Object.keys(logsEndRefs.current).forEach((site) => {
      const el = logsEndRefs.current[site];
      if (el && el.parentElement) {
        el.parentElement.scrollTo({
          top: el.parentElement.scrollHeight,
          behavior: "smooth"
        });
      }
    });
  }, [tasks]);

  const activeSites = Object.keys(tasks);

  if (!query) return null;

  // ✅ CLEAN LOADING STATE (instead of fake card)
  if (activeSites.length === 0 && isActive) {
    return (
      <section className="w-full mb-16 text-center">
        <div className="text-gray-400 animate-pulse">
          🚀 Starting AI agents...
        </div>
      </section>
    );
  }

  return (
    <section className="w-full mb-16 px-0 md:px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-white text-2xl font-bold flex items-center justify-center gap-3">
          <span className="relative flex h-3 w-3">
            <span
              className={`${isActive ? "animate-ping" : "hidden"
                } absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${isActive ? "bg-purple-500" : "bg-green-500"
                }`}
            />
          </span>
          Live Search Agents
        </h2>

        <p className="text-gray-400 mt-2">
          AI agents are browsing real estate websites in real-time.
        </p>
      </div>

      {/* Cards */}
      <div
        className={`grid grid-cols-1 ${activeSites.length > 1 ? "lg:grid-cols-2" : ""
          } gap-8 max-w-7xl mx-auto`}
      >
        {activeSites.map((site) => {
          const task = tasks[site];

          return (
            <div
              key={site}
              className="flex flex-col rounded-2xl overflow-hidden border border-gray-800 bg-[#0A0D14]"
            >
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#131722] border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <div className="ml-4 flex-grow text-xs text-gray-400 truncate">
                  {site}
                </div>

                <div
                  className={`text-xs px-2 py-1 rounded ${task?.status === "success"
                      ? "bg-green-500/20 text-green-400"
                      : task?.status === "error"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-purple-500/20 text-purple-400 animate-pulse"
                    }`}
                >
                  {task?.status === "success"
                    ? "Done"
                    : task?.status === "error"
                      ? "Failed"
                      : "Running"}
                </div>
              </div>

              {/* Live Preview */}
              <div className="relative w-full h-64 bg-black flex items-center justify-center">
                {task?.status === "success" ? (
                  <div className="flex flex-col items-center gap-2 text-green-500 font-bold">
                    <span className="text-2xl">✅</span>
                    Agent task completed
                  </div>
                ) : task?.status === "error" ? (
                  <div className="flex flex-col items-center gap-2 text-red-500 font-bold">
                    <span className="text-2xl">❌</span>
                    Agent encountered an error
                  </div>
                ) : task?.streaming_url ? (
                  <iframe
                    src={task?.streaming_url}
                    className="absolute inset-0 w-full h-full"
                    title="preview"
                  />
                ) : (
                  <div className="text-gray-500 animate-pulse">
                    Initializing browser...
                  </div>
                )}
              </div>

              {/* Logs */}
              <div className="p-3 h-48 overflow-y-auto text-xs font-mono bg-[#0b0f16]">
                {task?.logs?.map((log, idx) => (
                  <div key={idx} className="flex gap-2 mb-1">
                    <span className="text-gray-600 w-16">{log.time}</span>
                    <span className="text-blue-400">▶</span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}

                <div
                  ref={(el) => (logsEndRefs.current[site] = el)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}