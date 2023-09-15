import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default function SignUpPersonalWorkoutsByCoachTableData({workout}) {

    const style = "alert " + ((workout.customer) ? "alert-success" : "alert-primary") + " max-width-col max-height-col";

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {(workout.customer) ? (`${workout.customer.surname} ${workout.customer.name} ${workout.customer.patronymic} ${workout.customer.passport}`)  : "Клиент еще не записан"}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
        <div className={"col"}>
                <div className={style} role="alert">
                   <p className={"mt-1"}> {workout.schedule.time_begin.slice(0, 5)} </p>
                </div>
        </div>

        </OverlayTrigger>
    )
}
