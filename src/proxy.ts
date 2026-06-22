// import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from "next-auth/jwt"

// export async function proxy(request: NextRequest) {
//     const token = await getToken({ req: request });
//     const url = request.nextUrl

//     const isAuthPage = url.pathname.startsWith('/sign-in') ||
//         url.pathname.startsWith('/sign-up') ||
//         url.pathname.startsWith('/verify')

//     // Logged in but trying to visit an auth page -> bounce to dashboard
//     if (token && isAuthPage) {
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//     }

//     // Not logged in but trying to visit a protected page -> bounce to sign-in
//     if (!token && url.pathname.startsWith('/dashboard')) {
//         return NextResponse.redirect(new URL('/sign-in', request.url))
//     }

//     // Everything else -> let it through
//     return NextResponse.next()
// }

// export const config = {
//     matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*']
// }


import { NextRequest, NextResponse } from 'next/server'

// import type { NextRequest } from 'next/server'

// export { default } from "next-auth/middleware"
// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const token = await getToken({ req: request });
    const url = request.nextUrl

    if (token &&
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify')
            // url.pathname.startsWith('/')
        )
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    // return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ['/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
}
