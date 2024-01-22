import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import z from "zod"
import { FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';

import {useState} from "react";
import { Link } from "react-router-dom"

// import { GroupChat } from './chat/GroupChat';

// export const App = () => {
//   return (
//       <GroupChat/>
//   );
// }

// const schema = z.object({
//   name: z.string().min(3, "Name must be longer then 3 charecters").max(20, "Name must be less then 20 charecters"),
//   age: z.number({ invalid_type_error: "Age is requiered" }).min(18, "Age must be more then 18"),
// })

// type FormData = z.infer<typeof schema>

export const App = () => {
 // const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  // const onSubmit = (data: FieldValues) => {
  //     console.log("on submit")
  //     console.log(data)
  // }

  return (
<FormControl>
    <FormLabel>Enter Email</FormLabel>
    <TextField size='small'></TextField>
    <Button>Submit</Button>
    </FormControl>
    

  
  
  )
}

{/* <form>
<input type="email" placeholder="Email"/>
<input type="password" placeholder="password"/>
<button type ="submit"> Submit</button>
</form> */}

// <FormControl>
//     <FormLabel>Enter Email</FormLabel>
//     <TextField size='small'></TextField>
//     <Button>Submit</Button>
//     </FormControl>