import { api } from "@/app/api/api";
import type { User } from "@/types/user";
import { cookies } from "next/headers";
import { fullResp } from "./clientApi";
import { Note } from "@/types/note";

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const cookieStore = await cookies();

  const res = await api.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const fetchNotes = async (
  title?: string,
  page?: number,
  category?: string | undefined
) => {
  const cookieStore = await cookies();
  const response = await api.get<fullResp>("/notes", {
    params: {
      search: title,
      perPage: 12,
      page,
      tag: category,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const singleNote = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return singleNote.data;
};