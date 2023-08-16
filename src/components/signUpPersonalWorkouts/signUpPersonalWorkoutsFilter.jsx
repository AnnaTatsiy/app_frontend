import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {getAllCoaches} from "../../actions/coaches/action";
import {getAllCustomers} from "../../actions/customers/action";
import {Button, FloatingLabel, Form, FormControl, Modal, Row} from "react-bootstrap";
import CoachOption from "../coaches/coachOption";
import CustomerOption from "../customers/customerOption";
import {filteringPersonalWorkouts} from "../../actions/signUpPersonalWorkouts/action";

export default function SignUpPersonalWorkoutsFilter(props) {
    const dispatch = useDispatch();

    const {handleSubmit, register, reset} = useForm();

    useEffect(() => {
        reset({
            date_beg: "",
            date_end: "",
            coach: "",
            customer: ""
        })
    }, [props.show, reset]);

    useEffect(() => {
        dispatch(getAllCoaches());
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllCustomers())
    }, [dispatch])

    const dataListCoaches = useSelector(state => state.coaches.dataList);
    const dataListCustomers = useSelector(state => state.customers.dataList);

    function submitForm(data) {
        localStorage.setItem('personalWorkoutsFilter', JSON.stringify(data));
        dispatch(filteringPersonalWorkouts(data));
        props.onHide();
    }

    return (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className={"fs-5"}>Фильтр для персональных тренировок</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(submitForm)} method={"get"}>
                        <Form.Group controlId={"date_beg"}>
                            <FloatingLabel label={"Дата начала периода:"} className="mb-3">
                                <FormControl
                                    type="date"
                                    {...register("date_beg")}>
                                </FormControl>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group controlId={"date_end"}>
                            <FloatingLabel label={"Дата окончания периода:"} className="mb-3">
                                <FormControl
                                    type="date"
                                    {...register("date_end")}>
                                </FormControl>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group>
                            <div className="form-floating">
                                <Form.Control
                                    {...register("coach")}
                                    type={"text"}
                                    list="datalistOptionsCoaches" id="dataListCoaches"
                                    placeholder="ФИО или серия-номер паспорта тренера"/>
                                <datalist id="datalistOptionsCoaches">
                                    {dataListCoaches.map((item) => (
                                        <CoachOption key={item.id} coach={item}/>
                                    ))}
                                </datalist>
                                <label htmlFor="dataListCoaches" className="form-label text-secondary">ФИО или
                                    серия-номер
                                    паспорта тренера:</label>
                            </div>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <div className="form-floating">
                                <Form.Control
                                    {...register("customer")}
                                    type={"text"}
                                    list="datalistOptionsCustomers" id="dataListCustomers"
                                    placeholder="ФИО или серия-номер паспорта клиента"/>
                                <datalist id="datalistOptionsCustomers">
                                    {dataListCustomers.map((item) => (
                                        <CustomerOption key={item.id} customer={item}/>
                                    ))}
                                </datalist>
                                <label htmlFor="dataListCustomers" className="form-label text-secondary">ФИО или
                                    серия-номер
                                    паспорта клиента:</label>
                            </div>
                        </Form.Group>

                        <Row className="mt-3 mb-2">
                            <Button className="mx-auto col-sm-4" variant="primary"
                                    type="submit">Поиск</Button>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}