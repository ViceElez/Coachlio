import { createClient } from "@/utils/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export async function updateNote(noteId: number, newNote: string): Promise<any | null>;
export async function updateNote(trainerId: string, noteId: number, newNote: string): Promise<any | null>;
export async function updateNote(
    a: string | number,
    b: number | string,
    c?: string
) {
    const supabase = await createClient();

    const trainerId = typeof a === "string" ? a : null;
    const noteId = typeof a === "number" ? a : (b as number);
    const noteText = typeof a === "number" ? (b as string) : (c ?? "");

    let q = supabase
        .from("trainer_notes")
        .update({ note: noteText })
        .eq("id", noteId);

    if (trainerId) q = q.eq("trainer_id", trainerId);

    const { data, error } = await q.select().single();

    if (error) {
        console.error('Error updating note:', error);
        return null;
    }

    return data;
}

export async function deleteNote(noteId: number): Promise<boolean>;
export async function deleteNote(trainerId: string, noteId: number): Promise<boolean>;
export async function deleteNote(a: string | number, b?: number) {
    const supabase = await createClient();

    const trainerId = typeof a === "string" ? a : null;
    const noteId = typeof a === "number" ? a : (b as number);

    let q = supabase
        .from("trainer_notes")
        .delete()
        .eq("id", noteId);

    if (trainerId) q = q.eq("trainer_id", trainerId);

    const { error } = await q;

    if (error) {
        console.error('Error deleting note:', error);
        return false;
    }

    return true;
}

export async function getClientNotes(trainerId: string, clientIds: string[]) {
    if (clientIds.length === 0) return [];

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("trainer_notes")
        .select("id, note, created_at, updated_at, client_id")
        .eq("trainer_id", trainerId)
        .in("client_id", clientIds)
        .is("session_id", null)
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error fetching client notes:", error);
        return [];
    }

    return data || [];
}

export async function getSessionNotes(trainerId: string, sessionIds: number[]) {
    if (sessionIds.length === 0) return [];

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("trainer_notes")
        .select("id, note, created_at, updated_at, session_id")
        .eq("trainer_id", trainerId)
        .in("session_id", sessionIds)
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error fetching session notes:", error);
        return [];
    }

    return data || [];
}