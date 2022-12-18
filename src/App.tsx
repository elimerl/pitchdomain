import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { getAvailableDomain, getDomain } from "./getDomains";

function App() {
    const [loading, setLoading] = useState(true);

    const [currentDomain, setCurrentDomain] = useState("Loading...");
    useEffect(() => {
        let ignore = false;

        getAvailableDomain().then((domain) => {
            if (!ignore) {
                setLoading(false);
                setCurrentDomain(domain);
            }
        });
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="mx-16 py-16 min-h-screen flex h-full gap-y-16 justify-center align-middle flex-col">
            <h1 className="text-3xl text-left text-slate-600 dark:text-slate-400">
                Pitch it!
            </h1>
            <h2
                className={
                    "font-bold text-4xl lg:text-8xl break-words text-center transition-colors" +
                    (loading
                        ? " text-gray-400 dark:text-gray-600 blur-sm"
                        : " text-black dark:text-white")
                }
            >
                {currentDomain}
            </h2>

            <button
                onClick={() => {
                    console.log("click");
                    setLoading(true);
                    getAvailableDomain().then((domain) => {
                        setLoading(false);
                        setCurrentDomain(domain);
                    });
                }}
                className="self-end mx-auto w-full lg:w-1/2 text-white py-16 mt-8 bg-green-500 hover:bg-green-600 hover:translate-y-1 drop-shadow-lg text-4xl lg:text-8xl font-bold rounded-2xl transition-all"
            >
                Next!
            </button>
        </div>
    );
}

export default App;
