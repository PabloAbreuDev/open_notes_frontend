import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import CardModal from "../../components/card_modal";
import CardPreview from "../../components/card_preview";
import NewNoteBox from "../../components/newnote_box";
import SideMenu from "../../components/side_menu";
import { AuthContext } from "../../context/AuthContext";
import { NoteBookContext } from "../../context/NoteBookContext";
import { NoteContext } from "../../context/NoteContext";
import {
    BsFillTagFill,
    BsFillTrash2Fill,
    BsFillMarkdownFill,
    BsPaletteFill,
    BsMoonFill,
    BsSunFill,
    BsFolder2,
    BsFillPersonFill,
    BsFillGearFill,
    BsFillJournalBookmarkFill,
    BsList,
} from "react-icons/bs";
import { HomeStyled } from "./styled";
import useWindowDimensions from "../../custom_hooks/useWindowDimensions";
import { ConfigContext } from "../../context/ConfigContext";

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
    } = useContext(NoteContext);
    const { loadNoteBooks, currentNotebook } = useContext(NoteBookContext);
    const { toggleMenuOpen, menuOpen } = useContext(ConfigContext)
    const [show, setShow] = useState(false);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        function loadPageDate() {
            loadTags();
            loadNoteBooks();
            loadNotes("", "");
        }
        loadPageDate();
    }, []);

    return (
        <HomeStyled>
            <CardModal
                props={{
                    show: show,
                    onClose: () => setShow(false),
                    tags: currentNote?.tags || [],
                }}
            />

            <div className="header">
                {width! > 600 ? <div className="logo"><BsFillJournalBookmarkFill />Open Notes </div> : <BsList className="hamburger" onClick={() => toggleMenuOpen()} />}

                <div className="search_bar">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="options">
                    <BsFillGearFill className="icon" />
                    <BsMoonFill className="icon" />
                    <BsFillPersonFill className="icon" />
                </div>
            </div>

            <div className="presentation">
                <div className="side_bar">
                    <SideMenu isOpen={menuOpen} />
                </div>

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




        </HomeStyled >
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const apiClient = getApiClient(ctx) assim uso com o context
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
