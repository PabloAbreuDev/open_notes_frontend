import { createContext, SetStateAction, useState } from "react";
import { ICardInfo, INotebook, ITagInfo } from "../interface/card";
import { api } from "../services/api";

type NoteContextType = {
    currentNote: ICardInfo | null;
    notes: ICardInfo[];
    tags: ITagInfo[];
    noteBooks: INotebook[];
    loadCurrentNote: (noteDate: ICardInfo) => void;
    loadNotes: () => void;
    changeNote: (noteId: string, title: string, content: string) => void;
    deleteNote: (noteId: string) => void;
    createNote: () => Promise<ICardInfo>;
    loadTags: () => Promise<void>;
    addTagToNote: (idNote: string, idTag: string) => Promise<void>;
    removeTagFromNote: (idNote: string, idTag: string) => Promise<void>;
    addTag: (title: string) => Promise<void>;
    deleteTag: (idTag: string) => Promise<void>;
    createNoteBook: (title: string) => Promise<void>;
    loadNoteBooks: () => Promise<void>;
};

export const NoteContext = createContext({} as NoteContextType);

export function NoteProvider({ children }: any) {
    const [notes, setNotes] = useState<ICardInfo[]>([]);
    const [tags, setTags] = useState<ITagInfo[]>([]);
    const [currentNote, setCurrentNote] = useState<ICardInfo | null>(null);
    const [noteBooks, setNoteBook] = useState<INotebook[]>([]);

    async function loadCurrentNote(noteDate: ICardInfo) {
        setCurrentNote(noteDate);
    }

    async function loadNotes() {
        const { data } = await api.get<ICardInfo[]>("/notes");
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

    async function createNote(): Promise<ICardInfo> {
        const { data } = await api.post<ICardInfo>("/notes", {
            title: "Title",
            content: "...",
        });
        setNotes([data, ...notes]);
        loadCurrentNote(data);
        return data;
    }

    async function loadTags() {
        const { data } = await api.get(`/users/tag`);
        setTags(data);
    }

    async function loadNoteBooks(): Promise<void> {
        const { data } = await api.get<INotebook[]>("/notebooks");
        setNoteBook(data);
        return;
    }

    async function addTagToNote(idNote: string, idTag: string) {
        const { data } = await api.put(`/notes/${idNote}/tag`, {
            tagId: idTag,
        });
        const newState = notes.map((obj) => {
            if (obj._id === idNote) {
                let tag_existe = obj.tags.find((item) => item._id === idTag);

                if (!tag_existe) {
                    console.log(currentNote);
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

    async function createNoteBook() {
        const { data } = await api.post<INotebook>("/notebooks");
        setNoteBook([...noteBooks, data]);
        return;
    }

    return (
        <NoteContext.Provider
            value={{
                notes,
                tags,
                currentNote,
                noteBooks,
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
                createNoteBook,
                loadNoteBooks,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
}
