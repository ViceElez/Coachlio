"use client";

import { SessionProps } from "@/constants/interface/SessionProps";
import { formatDate, formatTime, getDuration } from "@/lib/helper/getTime";
import { AlertTriangle, Trash2, X } from "lucide-react";

type DeleteSessionProps = {
	open: boolean;
	session: SessionProps | null;
	onCloseAction: () => void;
	onConfirmAction: (session: SessionProps) => Promise<void> | void;
	isLoading?: boolean;
};

export default function DeleteSession({
	open,
	session,
	onCloseAction,
	onConfirmAction,
	isLoading = false,
}: DeleteSessionProps) {
	if (!open || !session) return null;

	const sessionLabel = session.session_type === "1on1" ? "1-on-1 Session" : "Group Session";

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
			<button
				type="button"
				className="absolute inset-0 bg-black/40"
				aria-label="Close delete session modal"
				onClick={() => {
					if (isLoading) return;
					onCloseAction();
				}}
			/>

			<div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl border border-gray-200">
				<div className="flex items-start justify-between gap-4 p-5 sm:p-6">
					<div className="flex items-start gap-3">
						<div className="mt-0.5 rounded-xl bg-red-50 p-2 text-red-600">
							<AlertTriangle className="h-5 w-5" />
						</div>
						<div className="min-w-0">
							<h2 className="text-lg sm:text-xl font-bold text-gray-900">Delete session?</h2>
							<p className="text-sm text-gray-500 mt-1">
								This action can’t be undone. Please confirm you want to delete the session below.
							</p>
						</div>
					</div>

					<button
						type="button"
						onClick={() => {
							if (isLoading) return;
							onCloseAction();
						}}
						className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 transition-colors"
						aria-label="Close"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="px-5 sm:px-6 pb-5 sm:pb-6">
					<div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
						<div className="flex items-start justify-between gap-3">
							<div className="min-w-0">
								<p className="text-sm font-semibold text-gray-900 truncate">{sessionLabel}</p>
								<p className="text-xs text-gray-500 mt-0.5 truncate">
									{getDuration(session.start_time, session.end_time)}
								</p>
							</div>
							<span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 shrink-0">
								{formatDate(session.start_time)}
							</span>
						</div>

						<div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
							<div>
								<span className="text-gray-500">Starts:</span> {formatTime(session.start_time)}
							</div>
							<div className="text-right">
								<span className="text-gray-500">Price:</span> ${session.price}
							</div>
						</div>
					</div>

					<div className="mt-5 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
						<button
							type="button"
							onClick={() => {
								if (isLoading) return;
								onCloseAction();
							}}
							className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={() => onConfirmAction(session)}
							disabled={isLoading}
							className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
						>
							<Trash2 className="h-4 w-4" />
							{isLoading ? "Deleting..." : "Yes, delete"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}


