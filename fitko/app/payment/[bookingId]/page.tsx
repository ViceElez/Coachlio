import PaymentClient from "./PaymentClient"
import { getBookingSession } from "@/lib/bookSession"

export default async function PaymentPage({params,}: {
    params: Promise<{ bookingId: string }>
}) {
    const { bookingId } = await params;
    const booking = await getBookingSession(Number(bookingId))
    const session = booking?.sessions

    if (!session || typeof session.price !== "number") {
        console.error("Missing session or price for booking", booking)
        return (
            <main className="max-w-2xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-4">Payment unavailable</h1>
                <p className="text-sm text-gray-600">We couldn&#39;t find the price for this booking. Please try again or contact support if the problem persists.</p>
            </main>
        )
    }

    if (!booking.stripe_client_secret) {
        return (
            <main className="max-w-2xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-4">Payment unavailable</h1>
                <p className="text-sm text-gray-600">
                    Payment could not be initialized. Please contact support.
                </p>
            </main>
        )
    }

    return (
        <PaymentClient
            amount={session.price}
            clientSecret={booking.stripe_client_secret}
        />
    )
}