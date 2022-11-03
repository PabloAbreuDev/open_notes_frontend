import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";
import CardPreview from "../../components/card_preview";
import { AuthContext } from "../../context/AuthContext";
import { ICardInfo, ITagInfo } from "../../interface/card";

export default function Home() {
    const { user, signOut } = useContext(AuthContext);

    const cardInfo: ICardInfo = {
        cardId: "123",
        cardTitle: "Título do card",
        cardContent: "lorem ipsum dolor at sun",
    };

    const tags: ITagInfo[] = [
        {
            tagId: "123",
            tagName: "aaa",
        },
        {
            tagId: "456",
            tagName: "bbb",
        },
    ];

    return (
        <div style={{ backgroundColor: "#00a3e2" }}>
            <div>
                Home - {user?.firstName}{" "}
                <button onClick={() => signOut()}>logout</button>
            </div>

            <br />


            <CardPreview card={cardInfo} tags={tags} />
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
