import z from  "zod";

export const signupInput = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})
export const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})
export const createbloginput = z.object({
    title:z.string(),
    content:z.string()
})
export const updatebloginput = z.object({
    id:z.string(),
    title:z.string(),
    content:z.string()
})

//type inference for zod
export type SignupInput = z.infer<typeof signupInput>;
export type Createbloginput = z.infer<typeof createbloginput>;
export type SigninInput = z.infer<typeof signinInput>;
export type Updatebloginput = z.infer<typeof updatebloginput>;


export const hello=()=>{
console.log("meri jan");
}