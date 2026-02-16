import { Form } from "../components/Form"
export function Register(){
    return(
        <>
            <Form route = "/api/auth/register/" method = "register" />
        </>
    )
}
