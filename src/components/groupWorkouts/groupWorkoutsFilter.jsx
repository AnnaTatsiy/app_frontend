import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {Button, FloatingLabel, Form, FormControl, Modal, Row} from "react-bootstrap";
import {getAllCoaches} from "../../actions/coaches/action";
import CoachOption from "../coaches/coachOption";
import {getAllCustomers} from "../../actions/customers/action";
import CustomerOption from "../customers/customerOption";
import {getAllGyms} from "../../actions/gyms/action";
import GymOption from "../gyms/gymOption";
import {getAllWorkoutTypes} from "../../actions/workoutTypes/action";
import WorkoutTypeOption from "../workoutTypes/workoutTypeOption";
import {filteringGroupWorkouts} from "../../actions/groupWorkouts/action";

export default function GroupWorkoutsFilter(props){

    const dispatch = useDispatch();
    const {handleSubmit, register, reset} = useForm();

    useEffect(() => {
            reset({
                date_beg: "",
                date_end: "",
                coach: "",
                customer: "",
                cancelled: "2",
                gym : '0',
                type : '0'
            })
    }, [props.show, reset]);
    
    useEffect(() => {
        dispatch(getAllCoaches());
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllCustomers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllGyms())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllWorkoutTypes())
    }, [dispatch])

    //все тренеры для dataList
    const dataListCoaches = useSelector(state => state.coaches.dataList);
    const dataListCustomers = useSelector(state => state.customers.dataList);
    const dataListGyms = useSelector(state => state.gyms.list);
    const dataListWorkoutTypes = useSelector(state => state.workoutTypes.list);

    function submitForm(data){
        localStorage.setItem('filter', JSON.stringify(data));
        dispatch(filteringGroupWorkouts(data));
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
                    <Modal.Title className={"fs-5"}>Фильтр для групповых тренировок</Modal.Title>
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
                                <label htmlFor="dataListCoaches" className="form-label text-secondary">ФИО или серия-номер
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
                                <label htmlFor="dataListCustomers" className="form-label text-secondary">ФИО или серия-номер
                                    паспорта клиента:</label>
                            </div>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel label="Была(будет) проведена тренировки:">
                                <Form.Select
                                    {...register("cancelled")}
                                    placeholder="Была(будет) проведена тренировки">
                                    <option selected={true} value="2">Не имеет значения</option>
                                    <option value="0">Да</option>
                                    <option value="1">Нет</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel label="Спортзал:">
                                <Form.Select
                                    {...register("gym")}
                                    placeholder="Спортзал">
                                    <option value={"0"}>Не имеет значения</option>
                                    {dataListGyms.map((item) => (
                                        <GymOption  key={item.id} gym={item}/>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <FloatingLabel label="Тип тренировки:">
                                <Form.Select
                                    {...register("type")}
                                    placeholder="Тип тренировки">
                                    <option value={"0"}>Не имеет значения</option>
                                    {dataListWorkoutTypes.map((item) => (
                                        <WorkoutTypeOption  key={item.id} type={item}/>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
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