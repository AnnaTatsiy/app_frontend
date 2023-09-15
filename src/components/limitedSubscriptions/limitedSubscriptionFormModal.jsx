import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {getAllCustomers} from "../../actions/customers/action";
import {getAllCoaches} from "../../actions/coaches/action";
import {Button, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import CustomerOption from "../customers/customerOption";
import CoachOption from "../coaches/coachOption";
import api from "../../api/axios.js";
import {toast} from "react-toastify";

export default function LimitedSubscriptionFormModal(props){

    const dispatch = useDispatch();
    const {handleSubmit, register, reset, formState: {errors}} = useForm();

    const customers = useSelector(state => state.customers.dataList)
    const coaches = useSelector(state => state.coaches.dataList)

    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");

    const filtered = coaches.filter(c => c.sale !== 0);

    useEffect( () => {

        setError("");
        setStatus(null)

        reset({
            customer:null,
            coach:null,
            amount_workout:0
        })
    },[props.show, reset])

    useEffect( () => {

        if(status === "success"){

            setError("");
            setStatus(null)

            reset()
            props.onHide()
        }

    },[props, reset, status])

    useEffect(() => {
        dispatch(getAllCustomers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllCoaches())
    }, [dispatch])

    // отправка данных на сервер
    function submitForm(data) {
        api.post("http://127.0.0.1:8000/api/limited-subscriptions/add", data)
            .then((response) => {
                if (response.status === 200) {
                    setStatus(response.data.status);
                    setError(response.data.errors);
                    setVisible(true);

                    if(response.data.status === "success") {
                        toast.success('Подписка успешно оформлена!');
                    }
                }
            })
            .catch((ex) => {
                toast.error(ex);
            });
    }

    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Оформление подписки на тренировки
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(submitForm)}>

                        <Form.Group className={"m-3"}>
                            <div className="form-floating">
                                <Form.Control
                                    {...register("coach", {
                                        required: {
                                            value:true,
                                            message: "Поле обязательно к заполнению!"
                                        }
                                    })}
                                    isInvalid={!!errors.coach}
                                    type={"text"}
                                    list="datalistOptionsCoaches" id="dataListCoaches"
                                    onChange={() => setVisible(false)}
                                    placeholder="ФИО или серия-номер паспорта тренера"/>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.coach?.message}
                                </Form.Control.Feedback>
                                <datalist id="datalistOptionsCoaches">
                                    {filtered.map((item) => (
                                        <CoachOption key={item.id} coach={item}/>
                                    ))}
                                </datalist>
                                <label htmlFor="dataListCoaches" className="form-label text-secondary">ФИО или серия-номер
                                    паспорта тренера:</label>

                                <div className="mt-2 ms-2">
                                    {status === "failed" && visible  && !errors?.coach?.message ? (
                                        <div className={"text-danger"}>
                                            {error.coach}
                                        </div> ) : ""}
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group className={"m-3"}>
                            <div className="form-floating">
                                <Form.Control
                                    {...register("customer", {

                                        required: {
                                            value: true,
                                            message: "Поле обязательно к заполнению!"
                                        },
                                    })}
                                    isInvalid={!!errors.customer}
                                    type={"text"}
                                    list="datalistOptionsCustomers" id="dataListCustomers"
                                    placeholder="ФИО или серия-номер паспорта клиента"/>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.customer?.message}
                                </Form.Control.Feedback>
                                <datalist id="datalistOptionsCustomers">
                                    {customers.map((item) => (
                                        <CustomerOption key={item.id} customer={item}/>
                                    ))}
                                </datalist>
                                <label htmlFor="dataListCustomers" className="form-label text-secondary">ФИО или серия-номер
                                    паспорта клиента:</label>

                                <div className="mt-2 ms-2">
                                    {status === "failed"  && visible && !errors?.customer?.message ? (
                                        <div className={"text-danger"}>
                                            {error.customer}
                                        </div> ) : ""}
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group className={"m-3"}>
                            <FloatingLabel label="Выберите количество тренировок в абонементе">
                                <Form.Select
                                    {...register("amount_workout", {
                                        required: {
                                            value: true,
                                            message: "Поле обязательно к заполнению!"
                                        }
                                    })}
                                    isInvalid={!!errors.amount_workout}
                                    placeholder="Количество тренировок в абонементе">
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors?.amount_workout?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Row className="mt-3 mb-2">
                            <Button className="mx-auto col-sm-4" variant="success"
                                    type="submit">Оформить</Button>
                        </Row>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}