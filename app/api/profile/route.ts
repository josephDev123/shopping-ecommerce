import { NextRequest } from "next/server";

async function Profile(req: NextRequest) {
  try {
    const body = await req.json();
  } catch (error) {}
}

export const PATCH = Profile;
