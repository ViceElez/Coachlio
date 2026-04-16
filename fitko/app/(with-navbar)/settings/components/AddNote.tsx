"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { upsertClientNoteAction, upsertSessionNoteAction } from "@/lib/trainerNotesActions";
import { Loader2, Plus } from "lucide-react";

export type AddNoteProps =
	| {
			type: "client";
			clientId: string;
		}
	| {
			type: "session";
			clientId: string;
			sessionId: number;
		};

export default function AddNote(props: AddNoteProps) {
	const router = useRouter();
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const textareaId = useId();

	const [open, setOpen] = useState(false);
	const [draft, setDraft] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const title = useMemo(
		() => (props.type === "client" ? "Add Client Description" : "Add Session Description"),
		[props.type]
	);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open) {
			setError(null);
			setDraft("");
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}
	}, [open]);

	const onSave = async () => {
		if (isPending) return;
		try {
			setIsPending(true);
			setError(null);

			const trimmed = draft.trim();
			if (!trimmed) {
				setError("Please enter a description.");
				return;
			}

			if (props.type === "client") {
				await upsertClientNoteAction({ clientId: props.clientId, note: trimmed });
			} else {
				await upsertSessionNoteAction({
					clientId: props.clientId,
					sessionId: props.sessionId,
					note: trimmed,
				});
			}

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
			<Button type="button" variant="outline" size="xs" onClick={() => setOpen(true)} disabled={isPending}>
				<Plus className="w-3.5 h-3.5" /> Add Description
			</Button>

			<dialog
				ref={dialogRef}
				onCancel={(e) => {
					e.preventDefault();
					setOpen(false);
				}}
				onClose={() => setOpen(false)}
				className="backdrop:bg-black/30 rounded-2xl p-0 w-[min(92vw,560px)] m-auto"
			>
				<div className="p-6 sm:p-7 bg-white">
					<h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
					<p className="mt-2 text-sm text-gray-600">
						This description is visible under the {props.type === "client" ? "client" : "session"}.
					</p>

					<div className="mt-4">
						<label className="text-sm font-medium text-gray-900" htmlFor={textareaId}>
							Description
						</label>
						<textarea
							id={textareaId}
							value={draft}
							onChange={(e) => setDraft(e.target.value)}
							rows={5}
							className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200"
							placeholder={props.type === "client" ? "Add a note about this client…" : "Add a note about this session…"}
						/>
					</div>

					{error && (
						<div className="mt-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
							{error}
						</div>
					)}

					<div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
						<Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
							Cancel
						</Button>
						<Button type="button" onClick={onSave} disabled={isPending}>
							{isPending ? (
								<span className="inline-flex items-center gap-2">
									<Loader2 className="w-4 h-4 animate-spin" />
									Saving…
								</span>
							) : (
								"Save"
							)}
						</Button>
					</div>
				</div>
			</dialog>
		</>
	);
}

