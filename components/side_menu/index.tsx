import { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";

export default function SideMenu() {
    const [tag, setTag] = useState<string>("");
    const { addTag, tags, deleteTag, noteBooks } =
        useContext(NoteContext);
    return (
        <>
            {noteBooks.map((item) => <div>{item.title} </div>)}


            <br /><br />
            {tags.map((item) => <div>{item.name} &nbsp; <div onClick={() => deleteTag(item._id)}>xxx</div></div>)}

            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
            <button onClick={() => addTag(tag)}>Send</button>
        </>
    );
}
