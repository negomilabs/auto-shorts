import { writeToSheet } from "./helpers/google-sheets";

export default async (req) => {
  try {
    const data = await req.json();
    if (!data || data.error) {
      throw new Error(data.error);
    }
    await writeToSheet("C2", [data.url]);
    return new Response("URL added to Google Sheet");
  } catch (error) {
    console.error(error);
    return new Response(error.message);
  }
};
