import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message ,preferredBudget,preferredLocation} = body;

    // Validate input
    if (!name || !phone || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone,
          message,
          location:preferredLocation,
          budget:preferredBudget,

          created_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error saving contact:', error);
    return Response.json(
      { error: 'Failed to save contact' },
      { status: 500 }
    );
  }
}