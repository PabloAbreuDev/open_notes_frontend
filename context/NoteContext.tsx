import { createContext, useState } from "react";
import { ICardInfo, ITagInfo } from "../interface/card";
import { api } from "../services/api";

type NoteContextType = {
    currentNote: ICardInfo | null;
    notes: ICardInfo[];
    loadCurrentNote: (noteDate: ICardInfo) => void;
    loadNotes: () => void;
    changeNote: (noteId: string, title: string, content: string) => void
    deleteNote: (noteId: string) => void
}

export const NoteContext = createContext({} as NoteContextType)

export function NoteProvider({ children }: any) {

    const [notes, setNotes] = useState<ICardInfo[]>([])
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



    return <NoteContext.Provider value={{ notes, currentNote, loadCurrentNote, loadNotes, changeNote, deleteNote }}>
        {children}
    </NoteContext.Provider>

}