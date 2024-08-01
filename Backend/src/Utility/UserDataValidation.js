import zod from 'zod'

//sanitize the user input
export const userDataValidation=(userData)=>{
    //name, age, email, contact number
    const studentData=zod.object({
        firstname:zod.string().min(2,{message:'Firstname must be more than 2 characters!'}),
        lastname:zod.string().min(1,{message:"Lastname must be more than 1 characters"}),
        age:zod.string().min(1,{message:'Age must be provided!'}),
        email:zod.string().email(),
        phoneNo:zod.string().min(10,{message:'Provide valid Phone number!'}),
        password:zod.string().min(8,{message:'Password should be minimum 8 characters!'})
    })

    try {
        const {success}=studentData.safeParse(userData)
        if(!success){
            return {
                success:false,
                message:'Invalid Input! Please try again!'
            }
        }
        return {
            success:true,
            message:null
        }
    } catch (error) {
        console.log(error);
        return{
            success:false,
            message:'Something went wrong! Please try again'
        }
    }
}

export const userSignInDataValidation=(userSignInData)=>{
    const signInSchema=zod.object({
        email:zod.string().email(),
        password:zod.string().min(8,{message:"Password should be minimum 8 charcters"})
    })
    try {
        const{success,error}=signInSchema.safeParse(userSignInData)
        if(!success){
            return{
                success:false,
                message:error.message
            }
        }
        return{
            success:true,
            message:null
        }
    } catch (error) {
        console.log(error);
        return{
            success:false,
            message:'Something went wrong please try again!'
        }
    }
}