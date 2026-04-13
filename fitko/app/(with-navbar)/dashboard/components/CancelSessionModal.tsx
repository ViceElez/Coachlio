"use client";

import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {handleStripeCancellation} from "@/lib/bookSession";
import { AlertCircle, Loader2 } from "lucide-react";


export type CancelSessionModalProps = {
	open: boolean;
	onOpenChangeAction: (open: boolean) => void;
	bookingId: number;
};

export default function CancelSessionModal({
	open,
	onOpenChangeAction,
	bookingId,
}: CancelSessionModalProps) {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open) {
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}
	}, [open]);

	const handleBookingCancel = async () => {
		if (isPending) return;
		try {
			setIsPending(true);
			setError(null);
			const res = await handleStripeCancellation(bookingId);
			if (res && "error" in res && res.error) {
				setError(res.error);
				return;
			}
			onOpenChangeAction(false);
		}catch (error) {
			console.error("Error cancelling booking:", error);
			setError("Unable to cancel booking. Please try again.");
		} finally {
			setIsPending(false);
		}
	}

	return (
		<dialog
			ref={dialogRef}
			onCancel={(e) => {
				e.preventDefault();
				onOpenChangeAction(false);
			}}
			onClose={() => onOpenChangeAction(false)}
			className="backdrop:bg-black/30 rounded-2xl p-0 w-[min(92vw,520px)] m-auto"
		>
			<div className="p-6 sm:p-7 bg-white">
				<h3 className="text-lg sm:text-xl font-bold text-gray-900">Cancel session?</h3>
				<p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
					Are you sure you want to cancel this session? If you cancel, the money from the cancellation will be
					reverted to your credits.
				</p>

				{error && (
					<div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
						<AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
						<span>{error}</span>
					</div>
				)}

				<div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
					<Button
						type="button"
						variant="outline"
						className="w-full sm:w-auto"
						onClick={() => onOpenChangeAction(false)}
						disabled={isPending}
					>
						No, keep session
					</Button>

					<Button
						type="button"
						className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700"
						onClick={handleBookingCancel}
						disabled={isPending}
					>
						{isPending ? (
							<span className="inline-flex items-center gap-2">
								<Loader2 className="w-4 h-4 animate-spin" />
								Cancelling…
							</span>
						) : (
							"Yes, cancel session"
						)}
					</Button>
				</div>
			</div>
		</dialog>
	);
}



