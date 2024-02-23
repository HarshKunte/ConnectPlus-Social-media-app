import { useMutation, useQueryClient} from '@tanstack/react-query'
import { createPost, createUSerAccount, signInAccount, signOutAccount } from '../appwrite/api'
import { INewPost, INewUser } from '@/types'
import { QUERY_KEYS } from './queryKeys'


export const useCreateUserAccountMutation = () =>{
    return useMutation({mutationFn:(user:INewUser)=>createUSerAccount(user)})
}

export const useSignInAccountMutation = () =>{
    return useMutation({mutationFn:(user:{email:string, password:string})=>signInAccount(user)})
}

export const useSignOutAccountMutation = () =>{
    return useMutation({mutationFn:()=>signOutAccount()})
}


export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        // so that it invalidates the query and hence does not return cached result
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };