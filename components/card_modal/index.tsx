import { ITagInfo } from "../../interface/card";
import { Tag } from "../card_preview";
import { CardModalStyled } from "./styled";
import {
    BsFillFolderFill,
    BsFillTagFill,
    BsFillTrash2Fill,
    BsPaintBucket,
    BsPaletteFill,
} from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import SubMenu, { SubMenuOptions } from "../sub_menu";

type CardProps = {
    show: boolean;
    onClose: () => void;
    tags: ITagInfo[];
};

function CardModal({ props }: { props: CardProps }) {
    const { currentNote, changeNote, loadCurrentNote, deleteNote, tags, addTagToNote } =
        useContext(NoteContext);

    const [tagActions, setTagActions] = useState<SubMenuOptions[]>([])

    const [tagOptionsOpen, setTagOptionsOpen] = useState<boolean>(false);

    const [title, setTile] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextArea = () => {
        if (titleRef.current !== null) {
            titleRef.current.style.height = "auto";
            titleRef.current.style.height = titleRef.current.scrollHeight + "px";
        }
        if (contentRef.current !== null) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    };

    useEffect(resizeTextArea, [content, title]);

    useEffect(() => {
        setTile(currentNote?.title!);
        setContent(currentNote?.content!);
        function tagsToAction() {
            let items = []
            for (const item of tags) {
                items.push({ option: item.name, action: () => addTagToNote(currentNote?._id || "", item._id) },)
            }

            setTagActions(items)
        }
        tagsToAction()
    }, [currentNote]);

    if (!props.show) {
        return null;
    }

    async function onCloseModal() {
        setTagOptionsOpen(false)
        if (currentNote) changeNote(currentNote?._id, title, content);

        loadCurrentNote({
            _id: "",
            title: "",
            content: "",
            tags: [],
        });
        props.onClose();
    }


    const options = [
        { option: "Opção A", action: () => console.log("Hello World") },
        { option: "opção B", action: () => console.log("Hello World") },
    ];

    return (
        <CardModalStyled onMouseDown={onCloseModal}>
            <div
                className="card_modal_content"
                onMouseDown={(e) => {
                    e.stopPropagation(),
                        setTagOptionsOpen(false)
                }}
            >
                <div className="card_modal_header">
                    <textarea
                        maxLength={100}
                        ref={titleRef}
                        value={title}
                        rows={1}
                        onChange={(e) => setTile(e.target.value)}
                    ></textarea>
                </div>
                <div className="card_modal_body">
                    <div className="card_modal_body_text">
                        <textarea
                            ref={contentRef}
                            value={content}
                            rows={1}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="tags" contentEditable={false}>
                        {currentNote?.tags?.map((item) => (
                            <div>{Tag(item)} </div>
                        ))}
                    </div>
                </div>
                <div className="card_modal_footer" >
                    <div className="icon">
                        <BsPaletteFill />
                    </div>
                    <div className="icon">
                        <BsFillFolderFill />
                    </div>
                    <div className="icon" onMouseDown={(e) => e.stopPropagation()}>
                        <BsFillTagFill onClick={() => setTagOptionsOpen(!tagOptionsOpen)} />
                        <SubMenu
                            isVisible={tagOptionsOpen}
                            options={tagActions}
                            onClose={() => console.log("close")}
                            addDefaultOption={function (): void {
                                throw new Error("Function not implemented.");
                            }}
                        />
                    </div>

                    <div
                        className="icon"
                        onClick={() => {
                            deleteNote(currentNote?._id!), props.onClose();
                        }}
                    >
                        <BsFillTrash2Fill />
                    </div>
                </div>
            </div>
        </CardModalStyled>
    );
}

export default CardModal;
