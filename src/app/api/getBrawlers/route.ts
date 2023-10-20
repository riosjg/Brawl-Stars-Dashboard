import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

const DATA_SOURCE_URL = "https://api.brawlapi.com/v1/brawlers";

export async function GET() {
  try {
    const res = await fetch(DATA_SOURCE_URL, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const { list: brawlers } = await res.json();
    const brawlersWithStatsPromises = brawlers.map(async (brawler: Brawler) => {
      const response = await fetch(
        `https://brawlstars.fandom.com/wiki/${brawler.name}`
      );
      const data = await response.text();
      const $ = cheerio.load(data);

      const extractStatValues = (stat: string) => {
        return $(`[data-source="${stat}"]`)
          .map((index, element) => {
            let htmlValue = $(element).html();
            let value = htmlValue ? parseInt(htmlValue.trim(), 10) : 0;
            return {
              level: index + 1,
              value: value,
            };
          })
          .get();
      };

      const statsArray = {
        health: extractStatValues("Health"),
        attack: extractStatValues("Attack"),
      };

      return { ...brawler, stats: statsArray };
    });

    const brawlersWithStats = await Promise.all(brawlersWithStatsPromises);

    return NextResponse.json(brawlersWithStats);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
