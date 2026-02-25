import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
    const supabaseResponse = NextResponse.next({ request })
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        supabaseResponse.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()
    const { pathname } = request.nextUrl
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (!user.user_metadata.is_activated && !pathname.startsWith('/activate')) {
        return NextResponse.redirect(new URL('/activate', request.url))
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        '/home/:path*',
        '/book/:path*',
    ],
}