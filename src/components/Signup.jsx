import React from 'react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { LoginContext , SignupContext } from '../context/context'

const Signup = () => {

    const value1 = useContext(LoginContext)
    const value2 = useContext(SignupContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <div className='text-white flex flex-col items-center mt-50'>

            <div className='flex'>
                <img className='' src="https://t3.ftcdn.net/jpg/13/01/70/20/360_F_1301702013_UQ28O653O654GtKWssNwO0nXi0Pku7OO.jpg" alt="LOGO" width={45} />
                <h1 className='font-bold text-5xl mx-2'>PassMan</h1>
            </div>

            <h1 className='text-3xl font-bold mb-2 mt-10'>Sign up</h1>
            <form className='flex flex-col items-center'>
                <input {...register("username", {
                    required: { value: true, message: "Please enter username" }
                })} className='bg-neutral-800 rounded-2xl h-9 w-100 px-5 outline-none my-5 mx-5' placeholder='Username' type="text" />

                <input {...register("password", {
                    required: { value: true, message: "Please enter password" }
                })} className='bg-neutral-800 rounded-2xl h-9 w-100 px-5 outline-none my-5 mx-5' placeholder='Password' type="password" />

                <button type='submit' onClick={() => { value1.setLoggedIn(true) }} className='bg-neutral-800 hover:bg-neutral-700 cursor-pointer font-bold w-fit m-auto px-4 py-1 rounded-lg mb-5'>Sign up</button>
            </form>
            <p>Already have an account? <span className='cursor-pointer underline' onClick={() => { value2.setSignup(true) }}>Sign in</span></p>

        </div>
    )
}

export default Signup
