import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query'
import { createUSerAccount, signInAccount } from '../appwrite/api'
import { INewUser } from '@/types'


export const useCreateUserAccountMutation = () =>{
    return useMutation({mutationFn:(user:INewUser)=>createUSerAccount(user)})
}

export const useSignInAccountMutation = () =>{
    return useMutation({mutationFn:(user:{email:string, password:string})=>signInAccount(user)})
}