import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { apiCall } from '../api-call/api-call';
import { createCarUrl, getCategoriesUrl, updateCarUrl } from '../environment';

function AddCar(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState(0);

    const initialValues = {
        color: props ? props?.car?.color : "",
        model: props ? props?.car?.model : "",
        registerationNo: props ? props?.car?.registeration_no : ""
    }

    useEffect(() => {
        apiCall("get", getCategoriesUrl)
            .then(res => {
                console.log(res)
                setCategories(res.data.response)
                if (res.data.response.length !== 0)
                    setSelectedValue(res.data.response[0].id)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {
                props?.car == null ? <h2 className="text-center mb-4">ADD</h2> :
                    <h2 className="text-center mb-4">Edit</h2>
            }
            <button
                type="button"
                class="btn-close"
                aria-label="Close"
                onClick={props.closeModalFunction}
            ></button>
            <Formik
                initialValues={initialValues}
                // validationSchema={updateUserSchema}
                onSubmit={(values) => {
                    props?.car == null ?
                        apiCall("post", createCarUrl,
                            {
                                category_id: selectedValue,
                                color: values.color,
                                model: values.model,
                                registeration_no: values.registerationNo,
                            }
                        )
                            .then((res) => {
                                enqueueSnackbar(JSON.stringify("Car created successfully"), {
                                    variant: "success",
                                    autoHideDuration: 4000,
                                });
                                navigate("/homepage")
                                props.getCars()
                                props.closeModalFunction()
                            })
                            .catch(err => console.log(err))
                        : apiCall("put", updateCarUrl + props?.car?.id,
                            {
                                category_id: selectedValue,
                                color: values.color,
                                model: values.model,
                                registeration_no: values.registerationNo,
                            }
                        )
                            .then((res) => {
                                enqueueSnackbar(JSON.stringify("Car updated successfully"), {
                                    variant: "success",
                                    autoHideDuration: 4000,
                                });
                                navigate("/homepage")
                                props.getCars()
                                props.closeModalFunction()
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
                                            <label for="select1" class="form-label mt-1 mb-0 col-auto">
                                                Select Category
                                            </label>
                                        </div>
                                        <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            id="select1"
                                            onChange={(e) => setSelectedValue(e.target.value)}
                                        >
                                            {categories?.map((category) => {
                                                return (
                                                    <option value={category.id}>
                                                        {category.category_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-8 mx-auto">
                                        <div className="mb-3">
                                            <label htmlFor="color">Color</label>
                                            <Field
                                                type="text"
                                                name="color"
                                                id="color"
                                                className="form-control"
                                                placeholder="Color"
                                            />
                                            <ErrorMessage name="color" component="span" className="error" />
                                        </div>
                                    </div>
                                    <div className="col-md-8 mx-auto">
                                        <div className="mb-3">
                                            <label htmlFor="name">Model</label>
                                            <Field
                                                type="text"
                                                name="model"
                                                id="model"
                                                className="form-control"
                                                placeholder="Model"
                                            />
                                            <ErrorMessage name="model" component="span" className="error" />
                                        </div>
                                    </div>
                                    <div className="col-md-8 mx-auto">
                                        <div className="mb-3">
                                            <label htmlFor="name">Registeration No</label>
                                            <Field
                                                type="text"
                                                name="registerationNo"
                                                id="registerationNo"
                                                className="form-control"
                                                placeholder="Registeration No"
                                            />
                                            <ErrorMessage name="registerationNo" component="span" className="error" />
                                        </div>
                                    </div>

                                    <div className="mb-5 text-center">
                                        {
                                            props?.car == null ?
                                                <button
                                                    type="submit"
                                                    className={!(isValid) ? "btn btn-primary ms-3 disabled-btn" : "btn btn-primary ms-3"}
                                                    disabled={!(isValid)}

                                                >
                                                    Add Car
                                                </button>
                                                :
                                                <button
                                                    type="submit"
                                                    className={!(isValid) ? "btn btn-primary ms-3 disabled-btn" : "btn btn-primary ms-3"}
                                                    disabled={!(isValid)}

                                                >
                                                    Edit Car
                                                </button>
                                        }
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
export default AddCar