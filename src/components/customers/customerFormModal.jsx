import {Button, FloatingLabel, Form, FormControl, Modal, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {addCustomer, editCustomer} from "../../actions/customers/action";

// компонент для добавления/редактирования клиента в модальном окне
export default function CustomerFormModal(props) {
    const dispatch = useDispatch();

    const [valuePassport, setValuePassport] = useState(null);
    const [valueNumber, setValueNumber] = useState(null);
    const [valueEmail, setValueEmail] = useState(null);

    // методы для управления формой
    const {handleSubmit, register, reset, formState: {errors}} = useForm();

    useEffect(() => {

        if (props.add || props.customer == null) {
            reset({
                id: 0,
                surname: '',
                name: '',
                patronymic: '',
                passport: '',
                birth: '',
                mail: '',
                number: '',
                registration: ''
            })
        } else {
            reset({
                id: props.customer.id,
                surname: props.customer.surname,
                name: props.customer.name,
                patronymic: props.customer.patronymic,
                passport: props.customer.passport,
                birth: props.customer.birth,
                mail: props.customer.mail,
                number: props.customer.number,
                registration: props.customer.registration
            })
        }

        setValueEmail(null);
        setValueNumber(null);
        setValuePassport(null);

    }, [props.add, props.customer, props.show, reset]);

    // отправка данных на сервер
    function submitCustomerForm(data) {
        data.id === 0 ? dispatch(addCustomer(data)) : dispatch(editCustomer(data));
        reset();
        props.onHide();
    }

    const checkingUniqueNumber = async (value) => {
        const response = await fetch(`http://127.0.0.1:8000/api/customers/checking-unique-number/${value}`, {
            headers: {"Content-type": "application/json"},
            credentials: 'include'
        })
        const content = await response.json();
        setValueNumber(content.result);
    }

    const checkingUniqueEmail = async (value) => {
        const response = await fetch(`http://127.0.0.1:8000/api/customers/checking-unique-mail/${value}`, {
            headers: {"Content-type": "application/json"},
            credentials: 'include'
        })
        const content = await response.json();
        setValueEmail(content.result);
    }

    const checkingUniquePassport = async (value) => {
        const response = await fetch(`http://127.0.0.1:8000/api/customers/checking-unique-passport/${value}`, {
            headers: {"Content-type": "application/json"},
            credentials: 'include'
        })
        const content = await response.json();
        setValuePassport(content.result);
    }

    return (<>
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.add === 'true' ? "Добавление" : "Редактирование"} клиента
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(submitCustomerForm)}>
                    <FormControl
                        {...register('id')}
                        type="number"
                        hidden={true}/>

                    <Form.Group controlId={"surname"}>
                        <FloatingLabel label={"Фамилия:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("surname", {

                                    required: {
                                        value: true,
                                        message: "Фамилия клиента должна быть указана!"
                                    },

                                    maxLength: {
                                        value: 50,
                                        message: "Фамилия клиента не может быть длинее 50 символов!"
                                    },

                                    minLength: {
                                        value: 2,
                                        message: "Фамилия клиента не может состоять из 1 символа!"
                                    },

                                    pattern: {
                                        value: /^[А-Я][а-я]+/g,
                                        message: "Фамилия должна содержать только кирилицу и начинаться с заглавной буквы!"
                                    }

                                })}
                                isInvalid={!!errors.surname}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.surname?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"name"}>
                        <FloatingLabel label={"Имя:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Имя клиента должно быть указано!"
                                    },

                                    maxLength: {
                                        value: 50,
                                        message: "Имя клиента не может быть длинее 50 символов!"
                                    },

                                    minLength: {
                                        value: 2,
                                        message: "Имя клиента не может состоять из 1 символа!"
                                    },

                                    pattern: {
                                        value: /^[А-Я][а-я]+/g,
                                        message: "Имя должно содержать только кирилицу и начинаться с заглавной буквы!"
                                    }
                                })}
                                isInvalid={!!errors.name}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.name?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"patronymic"}>
                        <FloatingLabel label={"Отчество:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("patronymic", {
                                    required: {
                                        value: true,
                                        message: "Отчество клиента должно быть указано!"
                                    },

                                    maxLength: {
                                        value: 50,
                                        message: "Отчество клиента не может быть длинее 50 символов!"
                                    },

                                    minLength: {
                                        value: 2,
                                        message: "Отчество клиента не может состоять из 1 символа!"
                                    },

                                    pattern: {
                                        value: /^[А-Я][а-я]+/g,
                                        message: "Отчество должно содержать только кирилицу и начинаться с заглавной буквы!"
                                    }
                                })}
                                isInvalid={!!errors.patronymic}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.patronymic?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"passport"}>
                        <FloatingLabel label={"Номер и серия паспорта:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("passport", {
                                    required: {
                                        value: true,
                                        message: "Номер и серия паспорта клиента должны быть указаны!"
                                    },

                                    maxLength: {
                                        value: 10,
                                        message: "Номер и серия паспорта не может быть длинее 10 символов!"
                                    },

                                    minLength: {
                                        value: 7,
                                        message: "Номер и серия паспорта не может быть короче 7 символов!"
                                    },

                                    pattern: {
                                        value: /^[A-Z0-9_]+$/,
                                        message: "Номер и серия паспорта не может содержать пробельные символы и знаки препинания!"
                                    },

                                    validate: value => {
                                        checkingUniquePassport(value).then(r => r);
                                        return valuePassport || 'Клиент с данным номером-серии паспорта уже зарегистрирован!'
                                    }
                                })}
                                isInvalid={!!errors.passport}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.passport?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"birth"}>
                        <FloatingLabel label={"Дата рождения:"} className="mb-3">
                            <FormControl
                                type="date"
                                {...register("birth", {
                                    required: {
                                        value: true,
                                        message: "Дата рождения клиента должна быть указана!"
                                    },

                                    validate: {
                                        positive: (v) => new Date(v) < (new Date(new Date().getFullYear() - 14, new Date().getMonth(), new Date().getDate())) || 'Клиенту должно исполниться 14 лет!',
                                        lessThanTen: (v) => new Date(v) > (new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate())) || 'Клиент должен быть моложе 100 лет!',
                                    }

                                })}
                                isInvalid={!!errors.birth}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.birth?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"mail"}>
                        <FloatingLabel label={"Электронная почта:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("mail", {
                                    required: {
                                        value: true,
                                        message: "Электронная почта клиента должна быть указана!"
                                    },

                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Некорректный email адрес!"
                                    },

                                    validate: value => {
                                        checkingUniqueEmail(value).then((r) => r);
                                        return valueEmail || 'Клиент с данной почтой уже зарегистрирован!'
                                    }
                                })}
                                isInvalid={!!errors.mail}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.mail?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"number"}>
                        <FloatingLabel label={"Номер телефона:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("number", {
                                    required: {
                                        value: true,
                                        message: "Номер телефона клиента должен быть указан!"
                                    },

                                    pattern: {
                                        value: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
                                        message: "Некорректный номер телефона!"
                                    },

                                    validate: value => {
                                        checkingUniqueNumber(value).then(r => r);
                                        return valueNumber || 'Клиент с данным номером телефона уже зарегистрирован!'
                                    }

                                })}
                                isInvalid={!!errors.number}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.number?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group controlId={"registration"}>
                        <FloatingLabel label={"Место проживания:"} className="mb-3">
                            <FormControl
                                type="text"
                                {...register("registration", {
                                    required: {
                                        value: true,
                                        message: "Место проживания клиента должно быть указано!"
                                    },

                                    maxLength: {
                                        value: 250,
                                        message: "Место проживания клиента не может быть длинее 250 символов!"
                                    },

                                    minLength: {
                                        value: 15,
                                        message: "Место проживания клиента не может быть короче 15 символов!"
                                    }
                                })}
                                isInvalid={!!errors.registration}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                {errors?.registration?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Row className="mt-3 mb-2">
                        <Button className="mx-auto col-sm-4" variant="success"
                                type="submit"> {props.add === 'true' ? "Добавить" : "Редактировать"}</Button>
                    </Row>

                </Form>
            </Modal.Body>

        </Modal>
    </>)
}