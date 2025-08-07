import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathName = req.nextUrl.pathname;
    console.log("ini request ", req);
    

    if (token && (pathName === "/login" || pathName === "/register")) {
      console.log(`User with token on ${pathName}. Redirecting to /dashboard.`);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } 

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathName = req.nextUrl.pathname;
        console.log("request nih wo", req);
        

        if (pathName === "/login" || pathName === "/register") {
          return true;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
