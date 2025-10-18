import { createClient } from '@supabase/supabase-js';

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = await searchParams.get('filter');
    const propertyId = await searchParams.get('id');

    // If propertyId is provided, fetch specific property
    if (propertyId) {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) {
        return Response.json(
          { error: 'Property not found' }, 
          { status: 404 }
        );
      }

      return Response.json({ 
        property: data,
        filter: 'single'
      });
    }

    // Base query for multiple properties
    let query = supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    // If filter is 'top', limit to 3 records
    if (filter === 'top') {
      query = query.limit(3);
    }

    const { data, error } = await query;

    if (error) {
      return Response.json(
        { error: 'Failed to fetch properties' }, 
        { status: 500 }
      );
    }

    return Response.json({ 
      properties: data,
      total: data.length,
      filter: filter || 'all'
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
