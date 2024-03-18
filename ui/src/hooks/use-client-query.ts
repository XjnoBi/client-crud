import { useMutation, useQuery, useQueryClient} from 'react-query'
import { createClient, getClients } from 'services/api'
import { STALE_TIME } from 'utils/constants'

enum ClientQk {
    list = 'clients-list',
}

const useClientFetch = () => useQuery(ClientQk.list, getClients, {
    staleTime: STALE_TIME.list,
})

const useClientMutate = () => {
    const queryClient = useQueryClient()
    const create = useMutation(createClient, {
        onSuccess: () => {
            queryClient.invalidateQueries(ClientQk.list)
        }
    })

    return { create }
}

export {useClientFetch, useClientMutate}