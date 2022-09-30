import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'


const Todos = () => {
    // Access the client
    const queryClient = useQueryClient()



    const { isLoading, error, data } = useQuery(['repoData'], async () => {

        const res = await axios.post("https://sersaludonline.com/api/auth/login",
            { "ndo": "32162730", "password": "15081986" }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            }
        })
        return res.data
    },)

    const apellido = data?.data.currentUser.user.ape
    const nombre = data?.data.currentUser.user.nom
    const token = data?.data.currentUser.token

    const { fetchStatus, data: profile } = useQuery(['profileData'], async () => {

        const res = await axios.get("https://sersaludonline.com/api/dashboard/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        return res.data
    },
        {
            // The query will not execute until the userId exists
            enabled: !!token,
        }
    )


    const edad = profile?.data.fec_nac



    if (isLoading) return <Text>'Loading...'</Text>



    if (error) return <Text>'An error has occurred: ' + {"error.message"}</Text>


    // // Mutations
    // const mutation = useMutation(postTodo, {
    //   onSuccess: () => {
    //     // Invalidate and refetch
    //     queryClient.invalidateQueries(['todos'])
    //   },
    // })

    return (
        <View>
            <Text>Fetch Status: {fetchStatus}</Text>
            <Text>{nombre}</Text>
            <Text>{apellido}</Text>
            <Text>Fecha de nacimiento: {edad}</Text>
        </View>
    )
}

export default Todos





