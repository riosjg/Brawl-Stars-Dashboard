"use client";
import { useState } from "react";

export const Button = () => {
  const [brawlers, setBrawlers] = useState<Brawler[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBrawlers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/getBrawlers");
      const data = await res.json();
      setBrawlers(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch brawlers:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchBrawlers}>Fetch Brawlers</button>
      {loading && (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {brawlers &&
        brawlers.map((brawler: Brawler) => (
          <div key={brawler.id}>
            <h1>{brawler.name}</h1>
            <img alt={`picture of ${brawler.name}`} src={brawler.imageUrl} />
            {brawler?.stats && (
              <>
                <p>Health at lv 11:{brawler.stats.health[10].value}</p>
                <p>Attack at lv 11:{brawler.stats.attack[10].value}</p>
              </>
            )}
          </div>
        ))}
    </div>
  );
};
