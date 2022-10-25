import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { api } from "../../services/api"
import { getApiClient } from "../../services/axios"

export default function Home() {
    const { user, signOut } = useContext(AuthContext)
    // useEffect(() => {
    //     const doFunc = async () => {
    //         try {
    //             await api.post("/notes", { content: "conteúdo", title: 'title' })
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     doFunc()

    // }, [])
    return <>Home - {user?.firstName} <button onClick={() => signOut()}>logout</button></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getApiClient(ctx)
    const { '@opennotes:token': token } = parseCookies(ctx,)
    if (!token) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}
