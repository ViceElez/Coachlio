"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { addClientNote, addSessionNote, deleteNote, updateNote } from "@/lib/notes";
import {routes} from "@/constants/routes";

const updateNoteScoped = updateNote as unknown as (
	trainerId: string,
	noteId: number,
	newNote: string
) => Promise<any | null>;
const deleteNoteScoped = deleteNote as unknown as (trainerId: string, noteId: number) => Promise<boolean>;

type UpsertClientNoteInput = {
	clientId: string;
	note: string;
	noteId?: number | null;
};

type UpsertSessionNoteInput = {
	clientId: string;
	sessionId: number;
	note: string;
	noteId?: number | null;
};

async function getAuthedTrainerId() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error("Unauthorized");
	return user.id;
}

export async function upsertClientNoteAction(input: UpsertClientNoteInput) {
	const trainerId = await getAuthedTrainerId();

	const trimmed = input.note.trim();
	if (!trimmed) throw new Error("Description cannot be empty");

	if (input.noteId) {
		const data = await updateNoteScoped(trainerId, input.noteId, trimmed);
		if (!data) throw new Error("Unable to update description");
		revalidatePath(routes.SETTINGS);
		return data;
	}

	const data = await addClientNote(trainerId, input.clientId, trimmed);
	if (!data) throw new Error("Unable to add description");

	revalidatePath(routes.SETTINGS);
	return data;
}

export async function upsertSessionNoteAction(input: UpsertSessionNoteInput) {
	const trainerId = await getAuthedTrainerId();

	const trimmed = input.note.trim();
	if (!trimmed) throw new Error("Description cannot be empty");

	if (input.noteId) {
		const data = await updateNoteScoped(trainerId, input.noteId, trimmed);
		if (!data) throw new Error("Unable to update description");
		revalidatePath(routes.SETTINGS);
		return data;
	}

	const data = await addSessionNote(trainerId, input.clientId, input.sessionId, trimmed);
	if (!data) throw new Error("Unable to add description");

	revalidatePath(routes.SETTINGS);
	return data;
}

export async function deleteTrainerNoteAction(noteId: number) {
	const trainerId = await getAuthedTrainerId();

	const ok = await deleteNoteScoped(trainerId, noteId);
	if (!ok) throw new Error("Unable to delete description");

	revalidatePath(routes.SETTINGS);
	return true;
}
