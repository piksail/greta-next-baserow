import axios from "@/lib/axios";
import type { NextApiRequest } from "next";

export function GET(req: NextApiRequest) {
  // We would handle custom, internal logic here
  // For exercise purpose, just return the Baserow call
  return axios
    .get(
      `database/rows/table/${process.env.NEXT_PUBLIC_BASEROW_COURSE_TABLE_ID}/?user_field_names=true`,
    )
    .then((response) => {
      return new Response(JSON.stringify(response.data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    });
}

export function PATCH(req: NextApiRequest) {
  // TODO
}

export function POST(req: NextApiRequest) {
  // TODO
}

export function PUT(req: NextApiRequest) {
  // TODO
}

export function CREATE(req: NextApiRequest) {
  // TODO
}

export function DELETE(req: NextApiRequest) {
  // TODO
}
