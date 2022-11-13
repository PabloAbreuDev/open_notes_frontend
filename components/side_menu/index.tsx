import { useContext, useState } from "react";
import {
    BsFillGearFill,
    BsFillJournalBookmarkFill,
    BsFillLightbulbFill,
    BsFillTagFill,
    BsPencil,
} from "react-icons/bs";
import { NoteBookContext } from "../../context/NoteBookContext";
import { NoteContext } from "../../context/NoteContext";
import { IconTitleStyled, SidebarStyled } from "./styled";

export default function SideMenu({ isOpen }: { isOpen: boolean }) {
    const [tag, setTag] = useState<string>("");
    const [noteBook, setNoteBook] = useState<string>("");
    const { tags } = useContext(NoteContext);
    const { noteBooks } = useContext(NoteBookContext);

    return (
        <SidebarStyled>
            <IconTitleStyled active={true} isMenuOpen={isOpen}>
                <BsFillLightbulbFill className="icon" />
                <label>All Notes</label>
            </IconTitleStyled>

            <IconTitleStyled active={false} isMenuOpen={isOpen}>
                <BsPencil className="icon" /> <label>Edit notebooks</label>
            </IconTitleStyled>

            <IconTitleStyled active={false} isMenuOpen={isOpen}>
                <BsPencil className="icon" />
                <label>Edit tags</label>
            </IconTitleStyled>

            {noteBooks.map((item) => (
                <IconTitleStyled active={false} isMenuOpen={isOpen}>
                    <BsFillJournalBookmarkFill className="icon" />
                    <label> {item.title}</label>
                </IconTitleStyled>
            ))}

            {tags.map((item) => (
                <IconTitleStyled active={false} isMenuOpen={isOpen}>
                    <BsFillTagFill className="icon" />
                    <label> {item.name}</label>
                </IconTitleStyled>
            ))}
        </SidebarStyled>
    );
}
