import { NextResponse } from 'next/server';

import { travelTrips, type TravelTrip } from '@/lib/travel-data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: travelTrips,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<TravelTrip>;

    const newTrip: TravelTrip = {
      id: body.id ?? `${Date.now()}`,
      title: body.title ?? 'New Adventure',
      location: body.location ?? 'Unknown place',
      country: body.country ?? 'World',
      price: Number(body.price ?? 0),
      rating: Number(body.rating ?? 4.5),
      duration: body.duration ?? '3 days',
      description: body.description ?? 'A new travel experience waiting to be explored.',
      image: body.image ?? '/camp.svg',
    };

    travelTrips.push(newTrip);

    return NextResponse.json({
      success: true,
      data: newTrip,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}
