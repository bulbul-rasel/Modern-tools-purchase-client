import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useForm } from 'react-hook-form';
import Loading from '../components/Loading';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import useToken from '../hookes/useToken';

const Login = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate()
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";



    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user || gUser);

    useEffect(() => {
        if (token) {
            console.log(user || gUser);
            navigate(from, { replace: true });
        }

    }, [token, from, navigate])



    let signInError;

    if (error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    if (loading || gLoading) {
        return <Loading />
    }


    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
    };

    // const resetPassword = async () => {
    //     const email = emailRef.current.value;
    //     console.log(email);


    //     if (email) {
    //         sendPasswordResetEmail(auth, email)
    //             .then(() => {
    //                 toast("Email Sent");
    //             }, [])

    //     } else {
    //         toast("Enter Your Email");
    //     }
    // }


    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Please Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is Required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                                type="email"
                                // ref={emailRef}
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is Required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 character or longer Password'
                                    }
                                })}
                                type="password"
                                // ref={passwordRef}
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                            </label>
                        </div>
                        {signInError}
                        <input className='btn w-full max-w-xs  font-bold btn-primary' type="submit" value='Login' />
                    </form>
                    <p>New to Modern Tools? <span><small><Link className='text-primary' to="/signup">Create new account?</Link></small></span></p>
                    <p>Forget Password? <button className='btn btn-link text-dark text-decoration-none '  > Reset Password </button ></p>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline btn-primary"
                    >Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;