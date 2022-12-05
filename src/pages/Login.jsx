import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from '../localStorage/localStorage';
import * as yup from "yup";

function Login() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const updateUserSchema = yup.object().shape({
        email: yup.string().trim()
            .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Enter correct email address'
            )
            .required(),
        password: yup
            .string()
            .required(),
    })
    const initialValues = {
        email: "",
        password: "",
    }

    return (
        <>
            <h2 className="text-center mb-4">SIGN IN</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={updateUserSchema}
                onSubmit={(values) => {
                    axios.post("http://localhost:3000/user/login", { email: values.email, password: values.password })
                        .then(res => {
                            enqueueSnackbar(JSON.stringify("Loggedin successfully"), {
                                variant: "success",
                                autoHideDuration: 4000,
                            });
                            setLocalStorage("user", res.data.response.user)
                            setLocalStorage("token", res.data.response.token)
                            navigate("/homepage")
                        })
                        .catch(err => {
                            enqueueSnackbar(JSON.stringify("Incorrect email or password"), {
                                variant: "error",
                                autoHideDuration: 4000,
                            });
                        }
                        )
                }}
            >
                {(formik) => {
                    const { isValid } = formik;
                    return (
                        <div className='container'>
                            <div className="row form-data">
                                <Form>
                                    <div className="col-md-8 mx-auto">
                                        <div className="mb-3">
                                            <label htmlFor="name">Email</label>
                                            <Field
                                                type="text"
                                                name="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="Email"
                                            />
                                            <ErrorMessage name="email" component="span" className="error" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password">Password</label>
                                            <Field
                                                type="text"
                                                name="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Password"
                                            />
                                            <ErrorMessage name="password" component="span" className="error" />
                                        </div>
                                    </div>

                                    <div className="mb-5 text-center">
                                        <button
                                            type="submit"
                                            className={!(isValid) ? "btn btn-primary ms-3 disabled-btn" : "btn btn-primary ms-3"}
                                            disabled={!(isValid)}

                                        >
                                            Login
                                        </button>
                                    </div>

                                    <div className="mb-5 text-center">
                                        <button
                                            className={!(isValid) ? "btn btn-primary ms-3 disabled-btn" : "btn btn-primary ms-3"}
                                            disabled={!(isValid)}
                                            onClick={() => navigate("/signup")}
                                        >
                                            Not a user? Sign Up
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </>
    )
}
export default Login