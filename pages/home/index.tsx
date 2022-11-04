import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import CardModal from "../../components/card_modal";
import CardPreview from "../../components/card_preview";
import { AuthContext } from "../../context/AuthContext";
import { ICardInfo, ITagInfo } from "../../interface/card";

export default function Home() {
    const { user, signOut } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const cardInfo: ICardInfo = {
        cardId: "123",
        cardTitle: "Título do card",
        cardContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar dui a condimentum tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent ac elementum mauris. Etiam venenatis velit diam, vel aliquam magna sagittis ac. Donec condimentum arcu eget elit laoreet, quis vulputate tortor hendrerit. Suspendisse efficitur sem vitae convallis volutpat. Nullam sed dictum orci. Integer vestibulum, felis ac lobortis accumsan, sapien mauris molestie tortor, id blandit libero augue in ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vestibulum vel est a dictum. Integer in metus sit amet nulla tincidunt commodo. Proin quis bibendum metus.

                    Etiam placerat vulputate dui, eget aliquam nisi feugiat id. Etiam pulvinar mi gravida est tincidunt gravida. Aliquam ipsum mauris, dignissim sed nunc in, commodo accumsan tortor. Etiam ultricies dictum ex, sit amet tincidunt lectus rhoncus interdum. Suspendisse euismod dui ligula. Phasellus in erat vitae libero hendrerit convallis. Duis eget molestie orci. Integer eleifend tellus cursus volutpat tempus. Integer dignissim elementum urna.

                    Pellentesque gravida ornare lorem, eu volutpat diam lobortis eu. Nam eu laoreet lectus. Nunc ultricies leo sed neque posuere eleifend. Nam vehicula nibh in nunc molestie ullamcorper. Integer ut porttitor lacus. Fusce et lacus ac sem iaculis gravida. Proin eleifend erat quam, in rhoncus dolor porttitor eget. Nunc eleifend ligula ac ipsum efficitur sollicitudin. Duis hendrerit elementum quam, id rutrum tellus fringilla vitae. Phasellus lobortis dui sit amet ante condimentum, ac finibus risus vulputate.

                    Sed pharetra mollis aliquet. Ut ac justo fringilla, vulputate urna ut, finibus dolor. Nullam sed dictum mauris. Sed lacinia, libero at vehicula lobortis, nisl ex tempor leo, et bibendum dui ex et risus. Ut ac lorem consequat, tincidunt ex at, sollicitudin erat. Mauris varius nisl in pretium ullamcorper. Donec et neque ultricies, finibus nunc condimentum, pretium orci. Phasellus at pretium tortor, ac aliquam ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi mi ipsum, euismod quis pulvinar ac, faucibus vel quam. Nullam quis felis mauris.`,
    };

    const tags: ITagInfo[] = [
        {
            tagId: "123",
            tagName: "Compras do mês",
        },
        {
            tagId: "456",
            tagName: "Principais alimentos",
        },
    ];

    return (
        <div style={{ backgroundColor: "#00a3e2" }}>
            <div>
                Home - {user?.firstName}{" "}
                <button onClick={() => signOut()}>logout</button>
            </div>

            <br />

            <CardModal
                props={{
                    show: show,
                    onClose: () => setShow(false),
                    tags: tags
                }}
            />

            <div onClick={() => setShow(true)}>
                <CardPreview card={cardInfo} tags={tags} />
            </div>
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
