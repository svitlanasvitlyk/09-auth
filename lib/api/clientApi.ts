import type { Note, NoteMin } from "@/types/note.ts";
import { api } from "./api";
import type { User } from "@/types/user";

export interface fullResp {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  title?: string,
  page?: number,
  category?: string | undefined
) => {
  const response = await api.get<fullResp>("/notes", {
    params: {
      search: title,
      perPage: 12,
      page,
      tag: category,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const deleteResp = await api.delete<Note>(`/notes/${id}`);
  return deleteResp.data;
};

export const createNote = async (note: NoteMin): Promise<Note> => {
  const createResp = await api.post<Note>("/notes", note);
  return createResp.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const singleNote = await api.get<Note>(`/notes/${id}`);
  return singleNote.data;
};

export interface authProps {
  email: string;
  password: string;
}

export const register = async (body: authProps) => {
  const regResp = await api.post<User>("/auth/register", body);
  return regResp.data;
};

export const login = async (body: authProps) => {
  const logResp = await api.post<User>("/auth/login", body);
  return logResp.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

interface editProps {
  email: string;
  username: string;
}

export const updateMe = async (body: editProps) => {
  const updResp = await api.patch<User>("/users/me", body);
  return updResp.data;
};