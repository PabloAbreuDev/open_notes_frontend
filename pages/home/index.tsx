import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import CardModal from "../../components/card_modal";
import CardPreview from "../../components/card_preview";
import NewNoteBox from "../../components/newnote_box";
import { AuthContext } from "../../context/AuthContext";
import { NoteBookContext } from "../../context/NoteBookContext";
import { NoteContext } from "../../context/NoteContext";
import {
    BsFillTagFill,
    BsMoonFill,
    BsFillPersonFill,
    BsFillGearFill,
    BsFillJournalBookmarkFill,
    BsList,
    BsFillLightbulbFill,
    BsPencil,
    BsSunFill,
} from "react-icons/bs";
import { HomeStyled } from "./styled";
import useWindowDimensions from "../../custom_hooks/useWindowDimensions";
import { ConfigContext } from "../../context/ConfigContext";
import { EditMenu } from "../../components/edit_menu";
import { DebounceInput } from "react-debounce-input";

export default function Home() {
    const { user, signOut } = useContext(AuthContext);
    const {
        loadNotes,
        loadTags,
        notes,
        currentNote,
        loadCurrentNote,
        createNote,
        tags,
        currentTag,
        selectTag,
        findNotesByText,
    } = useContext(NoteContext);
    const { loadNoteBooks, currentNotebook, selectNoteBook } =
        useContext(NoteBookContext);
    const { toggleMenuOpen, menuOpen, toggleTheme, theme } = useContext(ConfigContext);
    const [show, setShow] = useState(false);
    const { width, height } = useWindowDimensions();
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
    const { noteBooks } = useContext(NoteBookContext);
    const [isOpenLogoutDropDown, setIsOpenLogoutDropDown] =
        useState<boolean>(false);

    const [noteBookEditOpen, setNoteBookEditOpen] = useState(false);
    const [tagEditOpen, setTagEditOpen] = useState(false);

    useEffect(() => {
        function loadPageDate() {
            loadTags();
            loadNoteBooks();
            loadNotes("", "");
        }
        loadPageDate();
    }, []);

    return (
        <HomeStyled
            sideBarOpen={sideBarOpen}
            openLogoutDropDown={isOpenLogoutDropDown}
        >
            <CardModal
                props={{
                    show: show,
                    onClose: () => setShow(false),
                    tags: currentNote?.tags || [],
                }}
            />
            <EditMenu
                type="notebook"
                show={noteBookEditOpen}
                onClose={() => setNoteBookEditOpen(!noteBookEditOpen)}
            />
            <EditMenu
                type="tag"
                show={tagEditOpen}
                onClose={() => setTagEditOpen(!tagEditOpen)}
            />
            <div className="side_bar">
                <div className="item-list" onClick={() => setNoteBookEditOpen(true)}>
                    <BsPencil className="icon" />
                    <a>Edit notebooks</a>
                </div>
                <div className="item-list" onClick={() => setTagEditOpen(true)}>
                    <BsPencil className="icon" />
                    <a>Edit tags</a>
                </div>
                <div
                    onClick={() => {
                        loadNotes("", ""), selectNoteBook(null), selectTag(null);
                    }}
                    className="item-list"
                >
                    <BsFillLightbulbFill className="icon" />
                    <a>All Notes</a>
                </div>
                {noteBooks.map((item) => (
                    <div
                        onClick={() => {
                            loadNotes(currentTag?._id ?? "", item._id);
                            selectNoteBook(item);
                        }}
                        style={{
                            backgroundColor:
                                item._id === currentNotebook?._id ? "rebeccapurple" : "initial",
                        }}
                        className="item-list"
                    >
                        <BsFillJournalBookmarkFill className="icon" />
                        <a>{item.title}</a>
                    </div>
                ))}

                {tags.map((item) => (
                    <div
                        onClick={() => {
                            loadNotes(item._id, currentNotebook?._id ?? "");
                            selectTag(item);
                        }}
                        style={{
                            backgroundColor:
                                item._id === currentTag?._id ? "rebeccapurple" : "initial",
                        }}
                        className="item-list"
                    >
                        <BsFillTagFill className="icon" />
                        <a>{item.name}</a>
                    </div>
                ))}
            </div>

            <div id="main">
                <div className="header">
                    <BsList
                        className="icon"
                        onClick={() => setSideBarOpen(!sideBarOpen)}
                    />
                    <div className="search_bar">
                        <DebounceInput
                            type="text"
                            placeholder="Search"
                            debounceTimeout={1000}
                            onChange={(e) => findNotesByText(e.target.value)}
                        />
                    </div>
                    <div className="options">
                        <BsFillGearFill className="icon" />
                        <div onClick={() => toggleTheme()}>
                            {theme === "light" ? <BsMoonFill className="icon" /> : <BsSunFill className="icon" />}

                        </div>

                        <div className="logout_area">
                            <BsFillPersonFill
                                className="icon"
                                onClick={() => setIsOpenLogoutDropDown(!isOpenLogoutDropDown)}
                            />
                            <div className="logout_dropdown" onClick={() => signOut()}>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>

                <div className="presentation">
                    <div className="content_area">
                        <div className="new_note">
                            <div
                                onClick={async () => {
                                    await createNote(currentNotebook?._id);
                                    setShow(true);
                                }}
                            >
                                <NewNoteBox />
                            </div>
                        </div>

                        <div className="cards_area">
                            <div className="my_cards">

                                {notes.map((item) => (
                                    <div
                                        onClick={() => {
                                            loadCurrentNote(item);
                                            setShow(true);
                                        }}
                                    >
                                        <CardPreview card={item} tags={item.tags} />
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </HomeStyled >
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "@opennotes:token": token } = parseCookies(ctx);
    if (!token) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};
function useMemo(arg0: () => any, arg1: never[]) {
    throw new Error("Function not implemented.");
}
