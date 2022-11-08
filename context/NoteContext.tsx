import { createContext, SetStateAction, useState } from "react";
import { ICardInfo, ITagInfo } from "../interface/card";
import { api } from "../services/api";

type NoteContextType = {
    currentNote: ICardInfo | null;
    notes: ICardInfo[];
    tags: ITagInfo[]
    loadCurrentNote: (noteDate: ICardInfo) => void;
    loadNotes: () => void;
    changeNote: (noteId: string, title: string, content: string) => void;
    deleteNote: (noteId: string) => void;
    createNote: () => Promise<ICardInfo>;
    loadTags: () => Promise<void>;
    addTagToNote: (idNote: string, idTag: string) => Promise<void>;
    removeTagFromNote: (idNote: string, idTag: string) => Promise<void>;

}

export const NoteContext = createContext({} as NoteContextType)

export function NoteProvider({ children }: any) {

    const [notes, setNotes] = useState<ICardInfo[]>([])
    const [tags, setTags] = useState<ITagInfo[]>([])
    const [currentNote, setCurrentNote] = useState<ICardInfo | null>(null)

    async function loadCurrentNote(noteDate: ICardInfo) {
        setCurrentNote(noteDate)
    }

    async function loadNotes() {
        const { data } = await api.get<ICardInfo[]>("/notes")
        setNotes(data)
    }

    async function changeNote(noteId: string, title: string, content: string) {
        await api.put(`/notes/${noteId}`, { title, content })
        const newState = notes.map(obj => {
            if (obj._id === noteId) {
                return { ...obj, title: title, content: content };
            }
            return obj;
        });

        setNotes(newState);
    }

    async function deleteNote(noteId: string) {
        await api.delete(`/notes/${noteId}`)
        setNotes((item) => item.filter((element) => element._id !== noteId))
    }

    async function createNote(): Promise<ICardInfo> {
        const { data } = await api.post<ICardInfo>("/notes", {
            title: "Title",
            content: "..."
        })
        setNotes([data, ...notes])
        loadCurrentNote(data)
        return data
    }

    async function loadTags() {
        const { data } = await api.get(`/users/tag`)
        setTags(data)
    }

    async function addTagToNote(idNote: string, idTag: string) {
        const { data } = await api.put(`/notes/${idNote}/tag`, {
            tagId: idTag
        })
        const newState = notes.map(obj => {
            if (obj._id === idNote) {
                let tag_existe = obj.tags.find((item) => item._id === idTag)

                if (!tag_existe) {
                    console.log(currentNote)
                    const newTagCurrentNoteList = [...currentNote?.tags!, data]
                    const newNoteTags = [...obj.tags, data]
                    setCurrentNote({ ...currentNote!, tags: newTagCurrentNoteList })
                    return { ...obj, tags: newNoteTags }
                }
            }

            return obj;

        });

        setNotes(newState);
    }

    async function removeTagFromNote(idNote: string, idTag: string): Promise<void> {
        const { data } = await api.delete(`/notes/${idNote}/tag/${idTag}`)
        const newState: ICardInfo[] = []
        notes.map((item) => {
            if (item._id === idNote) {
                const newTags = item.tags.filter(item => item._id !== idTag)
                newState.push({ ...item, tags: newTags })
                setCurrentNote({ ...currentNote!, tags: newTags })
            } else {
                newState.push(item)
            }
        })
        setNotes(newState);
    }



    return <NoteContext.Provider value={{ notes, tags, currentNote, loadCurrentNote, loadNotes, changeNote, deleteNote, createNote, loadTags, addTagToNote, removeTagFromNote }}>
        {children}
    </NoteContext.Provider>

}