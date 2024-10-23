import { NextResponse } from "next/server"

import { cakes } from "."

export async function GET() {
    return NextResponse.json(cakes)
}
