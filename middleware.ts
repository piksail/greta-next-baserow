import { NextRequest, NextResponse } from "next/server";
// import { decrypt } from "@/app/lib/session";
// import { cookies } from "next/headers";

const privateRoutes = ["/exo-19/sous-page-privee"];
const publicRoutes = ["/exo-19/sous-page-publique"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.includes(path); // Routes to protect
  const isPublicRoute = publicRoutes.includes(path); // Routes to ignore if authenticated

  // Normally we should decrypt sensitive data
  // But for exercise purpose keep it simple
  // const cookie = (await cookies()).get("session")?.value;
  // const session = await decrypt(cookie);

  // Provide a correct JWT to simulate authenticated user
  const refreshTokenStub =
    "MY_REFRESH_TOKEN_FROM_A_SUCCESSFUL_BASEROW_AUTHENTICATION";

  if (isPrivateRoute || isPublicRoute) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEROW_API_URL}user/token-verify/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: refreshTokenStub,
          }),
        },
      );
      const data = await response.json();
      console.log(data);

      console.log("Response ok ?", response.ok);

      const session = data;
      console.log(session?.user?.id);

      if (isPrivateRoute && !session?.user?.id) {
        console.log("NOT AUTHENTICATED");
        return NextResponse.redirect(
          new URL("/exo-19/sous-page-publique", req.nextUrl),
        );
      }

      // If authenticated
      if (
        isPublicRoute &&
        response.ok &&
        session?.user?.id &&
        !req.nextUrl.pathname.startsWith("/exo-19/sous-page-privee")
      ) {
        return NextResponse.redirect(
          new URL("/exo-19/sous-page-privee", req.nextUrl),
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/", "/exo-19/"],
};
