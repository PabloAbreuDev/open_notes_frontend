import { ITagInfo } from "../../interface/card";
import { Tag } from "../card_preview";
import { CardModalStyled } from "./styled";
import {
    BsFillTagFill,
    BsFillTrash2Fill,
    BsFillMarkdownFill,
    BsPaletteFill,
} from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import SubMenu, { SubMenuOptions } from "../sub_menu";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

type CardProps = {
    show: boolean;
    onClose: () => void;
    tags: ITagInfo[];
};

function CardModal({ props }: { props: CardProps }) {
    const {
        currentNote,
        changeNote,
        loadCurrentNote,
        deleteNote,
        tags,
        addTagToNote,
        removeTagFromNote,
        setCurrentNote,
    } = useContext(NoteContext);

    const [tagActions, setTagActions] = useState<SubMenuOptions[]>([]);

    const [tagOptionsOpen, setTagOptionsOpen] = useState<boolean>(false);

    const [title, setTile] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [markdownOn, setMarkdownOn] = useState<boolean>(false)

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
            let items = [];
            for (const item of tags) {
                items.push({
                    option: item.name,
                    action: () => addTagToNote(currentNote?._id || "", item._id),
                });
            }

            setTagActions(items);
        }
        tagsToAction();
    }, [currentNote]);

    if (!props.show) {
        return null;
    }

    async function onCloseModal() {
        setTagOptionsOpen(false);
        if (currentNote) changeNote(currentNote?._id, title, content);

        loadCurrentNote({
            _id: "",
            title: "",
            content: "",
            tags: [],
        });
        props.onClose();
    }

    async function toggleMarkdown() {
        setMarkdownOn(!markdownOn)
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
                    e.stopPropagation(), setTagOptionsOpen(false);
                }}
            >
                <div className="card_modal_header">
                    <textarea
                        maxLength={100}
                        ref={titleRef}
                        value={currentNote?.title}
                        rows={1}
                        onChange={(e) =>
                            setCurrentNote({
                                _id: currentNote?._id || "",
                                tags: currentNote?.tags || [],
                                content: currentNote?.content || "",
                                title: e.target.value,
                            })
                        }
                    ></textarea>
                </div>
                <div className="card_modal_body">
                    <div className="card_modal_body_text">
                        {
                            markdownOn ?
                                <div className="markdown">
                                    <ReactMarkdown children={currentNote?.content || ""} remarkPlugins={[remarkGfm]} />
                                </div>
                                :
                                <textarea
                                    ref={contentRef}
                                    value={currentNote?.content}
                                    rows={1}
                                    onChange={(e) =>
                                        setCurrentNote({
                                            _id: currentNote?._id || "",
                                            tags: currentNote?.tags || [],
                                            content: e.target.value,
                                            title: currentNote?.title || "",
                                        })
                                    }
                                ></textarea>
                        }





                    </div>

                    <div className="tags" contentEditable={false}>
                        {currentNote?.tags?.map((item) => (
                            <div className="tag_space">
                                {Tag(item)}
                                <div
                                    className="remove_tag"
                                    onClick={() => removeTagFromNote(currentNote._id, item._id)}
                                >
                                    x
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card_modal_footer">
                    <div className="icon">
                        <BsFillMarkdownFill onClick={() => toggleMarkdown()} />
                    </div>
                    <div className="icon">
                        <BsPaletteFill />
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
