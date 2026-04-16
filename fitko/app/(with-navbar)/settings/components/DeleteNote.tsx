"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteTrainerNoteAction } from "@/lib/trainerNotesActions";
import { Loader2, Trash2 } from "lucide-react";

export type DeleteNoteProps = {
	type: "client" | "session";
	noteId: number;
};

export default function DeleteNote({ type, noteId }: DeleteNoteProps) {
	const router = useRouter();
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [open, setOpen] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const title = useMemo(() => (type === "client" ? "Delete client description?" : "Delete session description?"), [type]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open) {
			setError(null);
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}
	}, [open]);

	const onDelete = async () => {
		if (isPending) return;
		try {
			setIsPending(true);
			setError(null);
			await deleteTrainerNoteAction(noteId);
			setOpen(false);
			router.refresh();
		} catch (e) {
			console.error(e);
			setError(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<>
			<Button
				type="button"
				variant="outline"
				size="xs"
				className="border-rose-200 text-rose-700 hover:bg-rose-50"
				onClick={() => setOpen(true)}
				disabled={isPending}
			>
				<Trash2 className="w-3.5 h-3.5" /> Delete
			</Button>

			<dialog
				ref={dialogRef}
				onCancel={(e) => {
					e.preventDefault();
					setOpen(false);
				}}
				onClose={() => setOpen(false)}
				className="backdrop:bg-black/30 rounded-2xl p-0 w-[min(92vw,520px)] m-auto"
			>
				<div className="p-6 sm:p-7 bg-white">
					<h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
					<p className="mt-2 text-sm text-gray-600">
						This will remove the description for this {type === "client" ? "client" : "session"}.
					</p>

					{error && (
						<div className="mt-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
							{error}
						</div>
					)}

					<div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
						<Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
							Cancel
						</Button>
						<Button type="button" variant="destructive" onClick={onDelete} disabled={isPending}>
							{isPending ? (
								<span className="inline-flex items-center gap-2">
									<Loader2 className="w-4 h-4 animate-spin" />
									Deleting…
								</span>
							) : (
								"Delete"
							)}
						</Button>
					</div>
				</div>
			</dialog>
		</>
	);
}

