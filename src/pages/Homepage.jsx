import axios from 'axios';
import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { apiCall } from '../api-call/api-call';
import AddCar from '../components/AddCar';
import { deleteLocalStorage, getLocalStorage } from '../localStorage/localStorage';
import { deleteCarUrl, getCarsUrl, updateCarUrl } from '../environment';

function Homepage() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [car, setCar] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    useEffect(() => {
        getCars()
    }, [])

    useEffect(() => {
        if (!getLocalStorage("token"))
            navigate("/")
    })

    const getCars = () => {
        apiCall("get", getCarsUrl)
            .then(res => {
                console.log(res)
                setCars(res.data.response)
            })
            .catch(err => console.log(err))
    }

    const removeCar = (car) => {
        apiCall("delete", deleteCarUrl + car.id)
            .then(res => {
                setCars(res.data.response)
            })
            .catch(err => console.log(err))
    }

    const handleEditCar = () => {
        apiCall("put", updateCarUrl + car.id)
            .then(res => {
                setCars(res.data.response)
            })
            .catch(err => console.log(err))
    }

    function closeModal() {
        setIsOpen(false);
        setCar(null)
    }

    const editCar = (item) => {
        setCar(item)
        setIsOpen(true);
    }

    const logout = () => {
        deleteLocalStorage("user");
        deleteLocalStorage("token");
        navigate("/")
        enqueueSnackbar(JSON.stringify("Logged out successfully"), {
            variant: "success",
            autoHideDuration: 4000,
        });
    }

    return (
        <>
            <span onClick={logout}> <i class="fa fa-sign-out pointed-cursor" title="Logout"></i>
            </span>
            <h2 className="text-center mb-4">HOMEPAGE</h2>
            <div className="mb-5 text-center">
                <button
                    onClick={() => navigate("/add-category")}
                    className={"btn btn-primary ms-3"}
                >
                    Add Category
                </button>
            </div>
            <Modal
                isOpen={modalIsOpen}
            >
                <AddCar
                    closeModalFunction={closeModal}
                    getCars={getCars}
                    car={car}
                    handleEditCar={handleEditCar}
                />
            </Modal>
            <div className="mb-5 text-center">
                <button
                    onClick={() => setIsOpen(true)}
                    className={"btn btn-primary ms-3"}
                >
                    Add Car
                </button>
            </div>
            <div className="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">SR.No</th>
                            <th scope="col">Registeration No</th>
                            <th scope="col">Model</th>
                            <th scope="col">Color</th>
                            <th scope="col">Category</th>
                            <th scope="col">Remove Car</th>
                            <th scope="col">Edit Car</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cars?.map((item, index) =>
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.registeration_no || "NA"}</td>
                                    <td>{item.model || "NA"}</td>
                                    <td>{item.color || "NA"}</td>
                                    <td>{item.category.category_name || "NA"}</td>
                                    <td><span onClick={() => removeCar(item)}> <i class="fa fa-trash pointed-cursor" aria-hidden="true" title="Remove"></i>
                                    </span></td>
                                    <td><span onClick={() => editCar(item)}> <i class="fa fa-edit pointed-cursor" aria-hidden="true" title="Edit"></i>
                                    </span></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}
export default Homepage