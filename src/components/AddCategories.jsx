import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";
import { apiCall } from '../api-call/api-call';
import { useSnackbar } from "notistack"

function AddCategory() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const initialValues = {
        name: ""
    }

    return (
        <>
            <h2 className="text-center mb-4">ADD CATEGORY</h2>
            <Formik
                initialValues={initialValues}
                // validationSchema={updateUserSchema}
                onSubmit={(values) => {
                    apiCall("post", "http://localhost:3000/categories/create", { category_name: values.name })
                        .then((res) => {
                            enqueueSnackbar(JSON.stringify("Category created successfully"), {
                                variant: "success",
                                autoHideDuration: 4000,
                            });
                            navigate("/homepage")
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
                                            <label htmlFor="name">Category Name</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                placeholder="Category Name"
                                            />
                                            <ErrorMessage name="name" component="span" className="error" />
                                        </div>
                                    </div>

                                    <div className="mb-5 text-center">
                                        <button
                                            type="submit"
                                            className={!(isValid) ? "btn btn-primary ms-3 disabled-btn" : "btn btn-primary ms-3"}
                                            disabled={!(isValid)}

                                        >
                                            Add Category
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
export default AddCategory