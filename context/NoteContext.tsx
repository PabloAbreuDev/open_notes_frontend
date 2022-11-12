import { createContext, SetStateAction, useContext, useState } from "react";
import { ICardInfo, INotebook, ITagInfo } from "../interface/card";
import { api } from "../services/api";

type NoteContextType = {
    currentNote: ICardInfo | null;
    notes: ICardInfo[];
    tags: ITagInfo[];
    loadCurrentNote: (noteDate: ICardInfo) => void;
    loadNotes: (tagId?: string, noteBookId?: string) => void;
    changeNote: (noteId: string, title: string, content: string) => void;
    deleteNote: (noteId: string) => void;
    createNote: (noteBookId?: string | undefined) => Promise<ICardInfo>;
    loadTags: () => Promise<void>;
    addTagToNote: (idNote: string, idTag: string) => Promise<void>;
    removeTagFromNote: (idNote: string, idTag: string) => Promise<void>;
    addTag: (title: string) => Promise<void>;
    deleteTag: (idTag: string) => Promise<void>;
    setCurrentNote: (item: ICardInfo) => void;
    editTag: (name: string, tagId: string) => Promise<void>;
    findNotesByText: (text: string) => Promise<void>;
};

export const NoteContext = createContext({} as NoteContextType);

export function NoteProvider({ children }: any) {
    const [notes, setNotes] = useState<ICardInfo[]>([]);
    const [tags, setTags] = useState<ITagInfo[]>([]);
    const [currentNote, setCurrentNote] = useState<ICardInfo | null>(null);

    async function loadCurrentNote(noteDate: ICardInfo) {
        setCurrentNote(noteDate);
    }

    async function loadNotes(tagId?: string, noteBookId?: string) {
        const { data } = await api.get<ICardInfo[]>(
            `/notes?tagId=${tagId}&noteBookId=${noteBookId}`
        );
        setNotes(data);
    }

    async function changeNote(noteId: string, title: string, content: string) {
        await api.put(`/notes/${noteId}`, { title, content });
        const newState = notes.map((obj) => {
            if (obj._id === noteId) {
                return { ...obj, title: title, content: content };
            }
            return obj;
        });

        setNotes(newState);
    }

    async function deleteNote(noteId: string) {
        await api.delete(`/notes/${noteId}`);
        setNotes((item) => item.filter((element) => element._id !== noteId));
    }

    async function createNote(
        noteBookId: string | undefined
    ): Promise<ICardInfo> {
        console.log(noteBookId);
        const { data } = await api.post<ICardInfo>("/notes", {
            title: "Title",
            content: "...",
            notebookId: noteBookId,
        });
        setNotes([data, ...notes]);
        loadCurrentNote(data);
        return data;
    }

    async function loadTags() {
        const { data } = await api.get(`/users/tag`);
        setTags(data);
    }

    async function addTagToNote(idNote: string, idTag: string) {
        const { data } = await api.put(`/notes/${idNote}/tag`, {
            tagId: idTag,
        });
        const newState = notes.map((obj) => {
            if (obj._id === idNote) {
                let tag_existe = obj.tags.find((item) => item._id === idTag);

                if (!tag_existe) {
                    const newTagCurrentNoteList = [...currentNote?.tags!, data];
                    const newNoteTags = [...obj.tags, data];
                    setCurrentNote({ ...currentNote!, tags: newTagCurrentNoteList });
                    return { ...obj, tags: newNoteTags };
                }
            }
            return obj;
        });
        setNotes(newState);
    }

    async function removeTagFromNote(
        idNote: string,
        idTag: string
    ): Promise<void> {
        const { data } = await api.delete(`/notes/${idNote}/tag/${idTag}`);
        const newState: ICardInfo[] = [];
        notes.map((item) => {
            if (item._id === idNote) {
                const newTags = item.tags.filter((item) => item._id !== idTag);
                newState.push({ ...item, tags: newTags });
                setCurrentNote({ ...currentNote!, tags: newTags });
            } else {
                newState.push(item);
            }
        });
        setNotes(newState);
    }

    async function addTag(title: string) {
        const { data } = await api.post<ITagInfo>("/users/tag", { name: title });
        setTags([...tags, data]);
        return;
    }

    async function deleteTag(idTag: string) {
        await api.delete(`/users/tag/${idTag}`);
        const newState: ICardInfo[] = [];
        notes.map((item) => {
            const newTags = item.tags.filter((item) => item._id !== idTag);
            newState.push({ ...item, tags: newTags });
        });
        setNotes(newState);
        const stateTags = tags.filter((item) => item._id !== idTag);
        setTags(stateTags);
        return;
    }

    async function editTag(name: string, tagId: string) {
        await api.put(`/users/tag/${tagId}`, {
            name,
        });
        const newTagState = tags.map((obj) => {
            if (obj._id === tagId) {
                return { ...obj, name };
            }
            return obj;
        });

        notes.forEach((item) => {
            const indice = item.tags.findIndex((obj) => obj._id === tagId);
            if (indice !== -1) {
                item.tags[indice].name = name;
            }
        });

        setTags(newTagState);
        return;
    }

    async function findNotesByText(text: string) {
        const { data } = await api.put<ICardInfo[]>("/notebooks/search", {
            text,
        });
        setNotes(data);
        return;
    }

    return (
        <NoteContext.Provider
            value={{
                notes,
                tags,
                currentNote,
                loadCurrentNote,
                loadNotes,
                changeNote,
                deleteNote,
                createNote,
                loadTags,
                addTagToNote,
                removeTagFromNote,
                addTag,
                deleteTag,
                setCurrentNote,
                editTag,
                findNotesByText,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
}
