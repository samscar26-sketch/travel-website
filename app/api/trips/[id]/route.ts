import { NextResponse } from 'next/server';

import { getTripById } from '@/lib/travel-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const trip = getTripById(params.id);

  if (!trip) {
    return NextResponse.json(
      {
        success: false,
        message: 'Trip not found',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: trip,
  });
}
