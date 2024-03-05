import sheets from "@googleapis/sheets";

async function auth() {
  const auth = new sheets.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"), // Must replace newline chars
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authClient = await auth.getClient();

  return sheets.sheets({
    version: "v4",
    auth: authClient,
  });
}

export const writeToSheet = async (range, values) => {
  const client = await auth();

  return client.spreadsheets.values.update({
    valueInputOption: "USER_ENTERED",
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
    requestBody: {
      values: [values],
    },
  });
};
