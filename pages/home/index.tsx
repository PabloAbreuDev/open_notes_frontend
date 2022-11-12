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

export default function Home() {
    const { user, signOut } = useContext(AuthContext);
    const { loadNotes, loadTags, notes, currentNote, loadCurrentNote, createNote, tags } = useContext(NoteContext);
    const { loadNoteBooks, currentNotebook } = useContext(NoteBookContext)
    const [show, setShow] = useState(false);

    useEffect(() => {
        function loadPageDate() {
            loadTags()
            loadNoteBooks()
            loadNotes("", "")
        }
        loadPageDate()
    }, [])





    return (
        <div style={{ backgroundColor: "#00a3e2" }}>
            <div>
                Home - {user?.firstName}{" "}
                <button onClick={() => signOut()}>logout</button>
            </div>

            <br />

            <SideMenu />

            <hr />

            <div onClick={async () => {
                await createNote(currentNotebook?._id)
                setShow(true)
            }}>
                <NewNoteBox />
            </div>

            <hr />

            <br />





            {
                notes.map((item) => (<div onClick={() => {
                    loadCurrentNote(item)
                    setShow(true)
                }}>
                    <CardPreview card={item} tags={item.tags} />
                </div>)


                )

            }

            <CardModal
                props={{
                    show: show,
                    onClose: () => setShow(false),
                    tags: currentNote?.tags || []
                }}
            />


        </div>
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
