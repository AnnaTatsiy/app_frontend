import {Button, Form, FormControl, Modal, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {editGroupWorkout} from "../../actions/groupWorkouts/action";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

export default function GroupWorkoutModalForm(props){

    const dispatch = useDispatch();
    const {handleSubmit, register,reset} = useForm();

    useEffect(() => {
        (props.workout !== null) ?
            reset(
                {
                    id: props.workout.id,
                }
            ) :
            reset(
                {
                    id: 0,
                }
            )
    }, [props.workout, props.show, reset]);

    function submitForm(data) {
        dispatch(editGroupWorkout(data));
        reset();
        props.onHide();
    }

    return (props.workout !== null) ? (
        <>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header>
                    <Modal.Title className={"fs-5"}>Вы уверены что хотите отменить тренировку?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(submitForm)}>

                    <FormControl
                        {...register('id')}
                        type="number"
                        hidden={true}/>

                        <Row className="d-flex justify-content-end">

                            <Button variant="danger" className={"col-2 me-2"}
                                    type="submit">Да</Button>

                            <Button  variant="success" className={"col-2 me-2"}
                                    onClick={props.onHide}>Нет</Button>
                        </Row>

                    </Form>

                </Modal.Body>

            </Modal>
        </>
    ) : (<></>);
}