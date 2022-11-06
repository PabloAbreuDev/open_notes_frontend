import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import CardModal from "../../components/card_modal";
import CardPreview from "../../components/card_preview";
import NewNoteBox from "../../components/newnote_box";
import { AuthContext } from "../../context/AuthContext";
import { NoteContext } from "../../context/NoteContext";
import { ICardInfo, ITagInfo } from "../../interface/card";

export default function Home() {
    const { user, signOut } = useContext(AuthContext);
    const { loadNotes, loadTags, notes, currentNote, loadCurrentNote, createNote } = useContext(NoteContext);
    const [show, setShow] = useState(false);

    useEffect(() => {
        function loadPageDate() {
            loadNotes()
            loadTags()
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

            <div onClick={async () => {
                await createNote()
                setShow(true)
            }}>
                <NewNoteBox />

            </div>


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
