import { createClient } from "@/utils/supabase/server";

export async function addSessionNote(
    trainerId: string,
    clientId: string,
    sessionId: number,
    note: string
) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("trainer_notes")
        .insert({
            trainer_id: trainerId,
            client_id: clientId,
            session_id: sessionId,
            note: note
        })
        .select()
        .single();

    if (error) {
        console.error('Error adding session note:', error);
        return null;
    }

    return data;
}

export async function addClientNote(
    trainerId: string,
    clientId: string,
    note: string
) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("trainer_notes")
        .insert({
            trainer_id: trainerId,
            client_id: clientId,
            session_id: null,
            note: note
        })
        .select()
        .single();

    if (error) {
        console.error('Error adding client note:', error);
        return null;
    }

    return data;
}

export async function updateNote(noteId: number, newNote: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("trainer_notes")
        .update({ note: newNote })
        .eq("id", noteId)
        .select()
        .single();

    if (error) {
        console.error('Error updating note:', error);
        return null;
    }

    return data;
}

export async function deleteNote(noteId: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("trainer_notes")
        .delete()
        .eq("id", noteId);

    if (error) {
        console.error('Error deleting note:', error);
        return false;
    }

    return true;
}