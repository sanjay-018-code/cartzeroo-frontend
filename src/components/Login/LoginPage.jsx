import React, { useContext, useState } from 'react'
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {login, getJWT} from '../../services/userServices'
import UserContext from '../../contexts/UserContext'
import setAuthToken from '../../utils/setAuthToken'
import { jwtDecode } from 'jwt-decode'

import './LoginPage.css'
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom'

const schema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(8)
})

const LoginPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [formError, setFormError] = useState("")
    const state = location.state || {}
    const from = state.from || '/'

    if(getJWT()){
        return <Navigate to={from} replace />
    }

    const onSubmit = async (formData) => {
        try {
            const token = await login(formData)
            setAuthToken(token)
            const decodedUser = jwtDecode(token)
            setUser(decodedUser)
            navigate(from, { replace: true })
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setFormError(error.response.data.message)
            }
        }
    }
    const {register, handleSubmit, formState : {errors}} = useForm({resolver : zodResolver(schema)})

  return (
    <section className="aligncenter form_page">
        <form onSubmit={handleSubmit(onSubmit)} className="authentication_form">
            <h2>Login Form</h2>
            <div className="form_input">
                <div>
                    <label className='form_inputs_label' htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id='email'
                        className="form_text_input"
                        placeholder='Enter email address'
                        {...register("email")}
                        />
                        {errors.email &&(
                            <em className='form_error'>
                                {errors.email.message}
                            </em>
                        )}
                </div>
                <div>
                    <label className='form_inputs_label' htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id='password'
                        className="form_text_input"
                        placeholder='Enter Password'
                        {...register("password")}
                        />
                        {errors.password &&(
                            <em className='form_error'>
                                {errors.password.message}
                            </em>
                        )}
                </div>
                {formError ? <em className='form_error'>{formError}</em> : null }
                <button type="submit" className="search_button form_submit">Submit</button>
            </div>
        <em style={{ alignItems: 'center', display:'flex', justifyContent:'center' }}>
      New user?{' '}
      <Link to="/signup" state={{ from }} style={{ color: 'red' }}>
        SignUp
      </Link>
    </em>
        </form>
    </section>
  )
}

export default LoginPage