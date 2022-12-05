import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { signupUrl } from '../environment';

function Signup() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const updateUserSchema = yup.object().shape({
        password: yup
            .string()
            .min(5)
            .max(20)
            .required(),
        email: yup.string().trim()
            .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Enter correct email address'
            )
            .required(),
    })
    const initialValues = {
        email: "",
        password: ""
    }

    return (
        <>
            <h2 className="text-center mb-4">SIGN UP</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={updateUserSchema}
                onSubmit={(values) => {
                    axios.post(signupUrl, { email: values.email, password: values.password })
                        .then(res => {
                            console.log("🚀 ~ file: Signup.jsx:38 ~ Signup ~ res.data", res.data)
                            if (res.data.statusCode == 201) {
                                enqueueSnackbar(JSON.stringify("User created successfully"), {
                                    variant: "success",
                                    autoHideDuration: 4000,
                                });
                                navigate("/")
                            }
                            else if (res.data.statusCode == 500) {
                                enqueueSnackbar(JSON.stringify(res.data.message), {
                                    variant: "error",
                                    autoHideDuration: 4000,
                                });
                            }
                        })
                        .catch(err => console.log(err))
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
                                            Signup
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
export default Signup