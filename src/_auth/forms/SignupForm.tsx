
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignupValidation } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation, useSignInAccountMutation } from "@/lib/react-query/queriesAndMutation"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {
  const {toast} = useToast()

  const {checkAuthUser} = useUserContext()
  const navigate = useNavigate()

 //rect query mutations
 const {mutateAsync: createUSerAccount, isPending:isCreatingUser} = useCreateUserAccountMutation()
 const {mutateAsync: signInAccount} = useSignInAccountMutation()

const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name:'',
      username: "",
      email:'',
      password:''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    
    const newUser = await createUSerAccount(values)

    if(!newUser){
      return toast({title:'Signup failed please try again.'})
    }

    const session = await signInAccount({email:values.email, password:values.password})

    if(!session){
      return toast({title:'Sign in failed please try again.'})
    }

    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn){
      form.reset()
      navigate('/')
    }else{
      return toast({title:'Sign Up failed please try again.'})
    }


  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col p-5 md:p-0">
      <p className="h1-bold md:h1-bold text-center w-full text-primary-500 mt-28">Connect+</p>

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 md:pt-4">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
        <p className="text-light-3 text-sm mt-4">
         Wanna try out app without signing in? <br />
         Signin using Username : <span className="text-green-200">johntester@gmail.com</span> Password : <span className="text-green-200">john12345</span>
        </p>
      </div>
    </Form>
  )
}

export default SignupForm