
import { Form } from "../components/Form"
export function Login(){
    return(
        <>
           <Form route = "/api/auth/login/" method = "login" />
        </>
    )
}