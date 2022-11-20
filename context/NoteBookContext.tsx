import { createContext, useState } from "react";
import { INotebook } from "../interface/card";
import { api } from "../services/api";

type NoteBookContextType = {
    noteBooks: INotebook[];
    createNoteBook: (title: string) => Promise<void>;
    loadNoteBooks: () => Promise<void>;
    deleteNoteBook: (noteBookId: string) => Promise<void>;
    editNotebook: (title: string, notebookId: string) => Promise<void>;
    currentNotebook: INotebook | null;
    selectNoteBook: (noteBookId: INotebook | null) => Promise<void>;
};

export const NoteBookContext = createContext({} as NoteBookContextType);

export function NoteBookProvider({ children }: any) {
    const [noteBooks, setNoteBooks] = useState<INotebook[]>([]);
    const [currentNotebook, setCurrentNotebook] = useState<INotebook | null>(
        null
    );

    async function loadNoteBooks(): Promise<void> {
        const { data } = await api.get<INotebook[]>("/notebooks");
        setNoteBooks(data);
        return;
    }

    async function createNoteBook(title: string) {
        const { data } = await api.post<INotebook>("/notebooks", { title });
        setNoteBooks([...noteBooks, data]);
        return;
    }

    async function deleteNoteBook(noteBookId: string) {
        try {
            await api.delete(`/notebooks/${noteBookId}`);
            const newState = noteBooks.filter((item) => item._id !== noteBookId);
            setNoteBooks(newState);
        } catch (err) {
            console.log(err);
        }
        return;
    }

    async function editNotebook(title: string, notebookId: string) {
        try {
            await api.put(`/notebooks/${notebookId}`, {
                title,
            });
            const newNotebooksState = noteBooks.map((obj) => {
                if (obj._id === notebookId) {
                    return { ...obj, title };
                }
                return obj;
            });

            setNoteBooks(newNotebooksState);
        } catch (err) {
            console.log(err);
        }

        return;
    }

    async function selectNoteBook(notebook: INotebook | null) {
        setCurrentNotebook(notebook);
        return;
    }

    return (
        <NoteBookContext.Provider
            value={{
                noteBooks,
                createNoteBook,
                loadNoteBooks,
                deleteNoteBook,
                editNotebook,
                selectNoteBook,
                currentNotebook
            }}
        >
            {children}
        </NoteBookContext.Provider>
    );
}
