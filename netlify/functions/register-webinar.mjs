const MEETING_ID = "83209688247";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;
  if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { first_name, last_name, email } = body;
  if (!first_name || !last_name || !email) {
    return new Response(
      JSON.stringify({ error: "first_name, last_name, and email are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const auth = btoa(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`);
  const tokenResp = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
    {
      method: "POST",
      headers: { Authorization: `Basic ${auth}` },
    }
  );
  const tokenData = await tokenResp.json();
  if (!tokenData.access_token) {
    return new Response(JSON.stringify({ error: "Zoom auth failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const regResp = await fetch(
    `https://api.zoom.us/v2/meetings/${MEETING_ID}/registrants`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        org: body.company || "",
      }),
    }
  );
  const regData = await regResp.json();

  if (!regResp.ok) {
    return new Response(JSON.stringify({ error: "Zoom registration failed", detail: regData }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, join_url: regData.join_url }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/register-webinar",
};
