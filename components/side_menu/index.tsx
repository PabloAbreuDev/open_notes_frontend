import { useContext, useState } from "react";
import { NoteBookContext } from "../../context/NoteBookContext";
import { NoteContext } from "../../context/NoteContext";

export default function SideMenu() {
    const [tag, setTag] = useState<string>("");
    const [noteBook, setNoteBook] = useState<string>("");
    const { addTag, tags, deleteTag, editTag, loadNotes, findNotesByText } = useContext(NoteContext);
    const {
        noteBooks,
        createNoteBook,
        deleteNoteBook,
        editNotebook,
        currentNotebook,
        selectNoteBook,

    } = useContext(NoteBookContext);

    return (
        <>
            <h3>Notebooks</h3>

            <button onClick={() => findNotesByText("shi")}>ok</button>

            {noteBooks.map((item) => (
                <div>
                    {currentNotebook?._id === item._id ? "XXXX" : ""}
                    <div onClick={() => {
                        selectNoteBook(item)
                        loadNotes("", item._id)
                    }}>
                        {item.title} -----{" "}
                        <button onClick={() => deleteNoteBook(item._id)}>delete</button> -{" "}
                        <button
                            onClick={() => editNotebook(`${new Date().getTime()}`, item._id)}
                        >
                            change
                        </button>{" "}
                    </div>
                </div>
            ))}
            <input
                type="text"
                placeholder="Create a book"
                value={noteBook}
                onChange={(e) => setNoteBook(e.target.value)}
            />
            <button onClick={() => createNoteBook(noteBook)}>Send</button>
            <hr />

            <h3>Tags</h3>
            {tags.map((item) => (
                <div>
                    {item.name} &nbsp;{" "}
                    <button onClick={() => deleteTag(item._id)}>delete</button> -{" "}
                    <button onClick={() => editTag(`${new Date().getTime()}`, item._id)}>
                        change
                    </button>
                </div>
            ))}
            <input
                type="text"
                placeholder="Create a tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <button onClick={() => addTag(tag)}>Send</button>
        </>
    );
}
