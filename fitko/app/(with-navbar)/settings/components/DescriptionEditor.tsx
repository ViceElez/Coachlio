"use client";

import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";
import EditNote from "./EditNote";

export type DescriptionEditorProps =
	| {
			type: "client";
			entityId: string; // clientId
			existingNote: { id: number; note: string } | null;
		}
	| {
			type: "session";
			entityId: number; // sessionId
			clientId: string;
			existingNote: { id: number; note: string } | null;
		};

export default function DescriptionEditor(props: DescriptionEditorProps) {
	if (!props.existingNote) {
		return props.type === "client" ? (
			<AddNote type="client" clientId={props.entityId} />
		) : (
			<AddNote type="session" clientId={props.clientId} sessionId={props.entityId} />
		);
	}

	return (
		<div className="flex items-center gap-2">
			{props.type === "client" ? (
				<EditNote
					type="client"
					clientId={props.entityId}
					noteId={props.existingNote.id}
					initialNote={props.existingNote.note}
				/>
			) : (
				<EditNote
					type="session"
					clientId={props.clientId}
					sessionId={props.entityId}
					noteId={props.existingNote.id}
					initialNote={props.existingNote.note}
				/>
			)}

			<DeleteNote type={props.type} noteId={props.existingNote.id} />
		</div>
	);
}

