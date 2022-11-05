import { ITagInfo } from "../../interface/card";
import { Tag } from "../card_preview";
import { CardModalStyled } from "./styled";
import { AiFillDelete } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../../context/NoteContext";







type CardProps = {
    show: boolean;
    onClose: () => void;
    tags: ITagInfo[]
};

function CardModal({ props }: { props: CardProps }) {

    const { currentNote, changeNote, loadCurrentNote, deleteNote } = useContext(NoteContext)

    const [title, setTile] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextArea = () => {
        if (titleRef.current !== null) {
            titleRef.current.style.height = "auto"
            titleRef.current.style.height = titleRef.current.scrollHeight + "px";
        }
        if (contentRef.current !== null) {
            contentRef.current.style.height = "auto"
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    };

    useEffect(resizeTextArea, [content, title]);


    useEffect(() => {
        setTile(currentNote?.title!)
        setContent(currentNote?.content!)
    }, [currentNote])


    if (!props.show) {
        return null;
    }


    async function onCloseModal() {
        if (currentNote)
            changeNote(currentNote?._id, title, content)
        console.log(currentNote?._id)

        loadCurrentNote({
            _id: "",
            title: "",
            content: "",
            tags: []
        })
        props.onClose()
    }


    return (
        <CardModalStyled onMouseDown={onCloseModal}>
            <div className="card_modal_content" onMouseDown={(e) => e.stopPropagation()}>
                <div className="card_modal_header" >
                    <textarea maxLength={100} ref={titleRef} value={title} rows={1} onChange={(e) => setTile(e.target.value)}></textarea>
                </div>
                <div className="card_modal_body" >
                    <div className="card_modal_body_text" >
                        <textarea ref={contentRef} value={content} rows={1} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>

                    <div className="tags" contentEditable={false}>
                        {currentNote?.tags.map((item) => <div>{Tag(item)} </div>)}
                    </div>
                </div>
                <div className="card_modal_footer" onClick={() => { deleteNote(currentNote?._id!), props.onClose() }}>
                    <AiFillDelete />
                </div>
            </div>
        </CardModalStyled>
    );
}

export default CardModal;
