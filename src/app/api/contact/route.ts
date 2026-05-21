import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      message,
      current_country,
      interested_country_code,
      interested_stream_code,
      preferred_intake,
    } = body;

    if (!name || !phone || !message) {
      return Response.json({ error: "Name, phone and message are required." }, { status: 400 });
    }

    const { error } = await supabase.from("contacts").insert([
      {
        name,
        email: email || null,
        phone,
        message,
        current_country: current_country || null,
        interested_country_code: interested_country_code || null,
        interested_stream_code: interested_stream_code || null,
        preferred_intake: preferred_intake || null,
      },
    ]);

    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    console.error("Error saving contact:", err);
    return Response.json({ error: "Failed to save contact" }, { status: 500 });
  }
}
