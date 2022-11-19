import { SyntheticEvent, useContext, useEffect, useState } from "react";
import {
    BsFillJournalBookmarkFill,
    BsFillTagFill,
    BsTrash,
} from "react-icons/bs";
import { NoteBookContext } from "../../context/NoteBookContext";
import { NoteContext } from "../../context/NoteContext";
import { INotebook, ITagInfo } from "../../interface/card";
import { EditMenuStyled, InputEditMenuItemStyled } from "./styled";

type EditMenuTypes = {
    type: "notebook" | "tag",
    show: boolean,
    onClose: () => void
};

type OptionsNoteBook = INotebook & { active: boolean }
type OptionsTag = ITagInfo & { active: boolean }

export function EditMenu({
    type,
    show, onClose
}: EditMenuTypes) {
    const { createNoteBook, deleteNoteBook, editNotebook, noteBooks } = useContext(NoteBookContext);
    const { addTag, deleteTag, editTag, tags } = useContext(NoteContext);

    const [notebookTitle, setNoteBookTitle] = useState<string>("");
    const [tagTitle, setTagTitle] = useState<string>("");

    const [myNotebooks, setMyNotebooks] = useState<OptionsNoteBook[]>([])
    const [myTags, setMyTags] = useState<OptionsTag[]>([])

    useEffect(() => {
        setMyNotebooks(transformArrayToOptions(noteBooks))
        setMyTags(transformArrayToOptions(tags))
    }, [noteBooks, tags])

    function transformArrayToOptions(arr: any[]) {
        const itemsWithNewProperty = arr.map((item) => {
            return { ...item, active: false };
        });
        return itemsWithNewProperty
    }

    function handleNotebookSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        createNoteBook(notebookTitle);
        setNoteBookTitle("");
    }

    function handleTagSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        addTag(tagTitle);
        setTagTitle("");
    }

    function handleEditNotebook(event: SyntheticEvent<HTMLFormElement>, title: string, id: string) {
        event.preventDefault()
        editNotebook(title, id)
        setMyNotebooks(transformArrayToOptions(noteBooks))
    }

    function handleEditTag(event: SyntheticEvent<HTMLFormElement>, name: string, id: string) {
        event.preventDefault()
        editTag(name, id)
        setMyTags(transformArrayToOptions(tags))
    }

    if (!show) {
        return null
    }


    return (
        <EditMenuStyled onMouseDown={() => onClose()}>
            <div className="edit_content" onMouseDown={(e) => {
                e.stopPropagation()
            }}>

                <div className="name_area">
                    <p>Edit {type + "s"}</p>
                </div>
                <div className="create_input">
                    <form
                        onSubmit={
                            type === "notebook" ? handleNotebookSubmit : handleTagSubmit
                        }
                    >
                        <input
                            type="text"
                            placeholder={`Create a ${type}`}
                            value={type === "notebook" ? notebookTitle : tagTitle}
                            onChange={(e) =>
                                type === "notebook"
                                    ? setNoteBookTitle(e.target.value)
                                    : setTagTitle(e.target.value)
                            }
                        />
                    </form>
                </div>
                <div className="items_area">
                    {type === "notebook"
                        ? myNotebooks.map((item) => (
                            <div className="item">
                                <BsFillJournalBookmarkFill />
                                <form onSubmit={(e) => handleEditNotebook(e, item.title, item._id)}>
                                    <InputEditMenuItemStyled active={item.active}>
                                        <input type="text" value={item.title}
                                            onChange={(e) => {
                                                item.active = true
                                                item.title = e.target.value;
                                                setMyNotebooks([...myNotebooks]);
                                            }}

                                        />
                                    </InputEditMenuItemStyled>

                                </form>
                                <BsTrash className="icon" onClick={() => deleteNoteBook(item._id)} />
                            </div>
                        ))
                        : myTags.map((item) => (
                            <div className="item">
                                <BsFillTagFill />
                                <form onSubmit={(e) => handleEditTag(e, item.name, item._id)}>
                                    <InputEditMenuItemStyled active={item.active}>
                                        <input type="text" value={item.name}
                                            onChange={(e) => {
                                                item.name = e.target.value;
                                                setMyTags([...myTags]);
                                            }}

                                        />
                                    </InputEditMenuItemStyled>
                                </form>
                                <BsTrash className="icon" onClick={() => deleteTag(item._id)} />
                            </div>
                        ))}
                </div>
            </div>

        </EditMenuStyled>
    );
}
