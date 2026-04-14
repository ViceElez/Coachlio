import { redirect } from "next/navigation"
import PaymentClient from "./PaymentClient"
import { getBookingSession } from "@/lib/bookSession"
import { routes } from "@/constants/routes"

export default async function PaymentPage({ params }: {
    params: Promise<{ bookingId: string }>
}) {
    const { bookingId } = await params
    const booking = await getBookingSession(Number(bookingId))
    const session = booking?.sessions

    if (!session || typeof session.price !== "number") {
        return (
            <main className="max-w-2xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-4">Payment unavailable</h1>
                <p className="text-sm text-gray-600">We couldn't find the price for this booking.</p>
            </main>
        )
    }

    if (booking.status === "paid") {
        redirect(`${routes.BOOK}?success=true`)
    }

    if (!booking.clientSecret) {
        return (
            <main className="max-w-2xl mx-auto p-6">
                <h1 className="text-xl font-semibold mb-4">Payment unavailable</h1>
                <p className="text-sm text-gray-600">Payment could not be initialized. Please contact support.</p>
            </main>
        )
    }

    return (
        <PaymentClient
            amount={session.price}
            clientSecret={booking.clientSecret}
            bookingId={Number(bookingId)}
            creditsApplied={booking.creditsApplied ?? 0}
        />
    )
}