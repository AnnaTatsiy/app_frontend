import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default function SignUpPersonalWorkoutsByCoachTableData({workout}) {

    const renderTooltip = () => (
        <Tooltip id="button-tooltip">
            Simple tooltip
        </Tooltip>
    );

    return (
        <div className={"col"}>

            {(workout.customer) ? <>
                <div className="alert alert-success max-width-col max-height-col" role="alert">
                    <p> {workout.schedule.time_begin.slice(0, 5)} <br/>
                        {workout.customer.passport} {workout.customer.name.slice(0, 1)}. {workout.customer.patronymic.slice(0, 1)}. {workout.customer.surname}
                    </p>
                </div>
            </> : <>

            <OverlayTrigger
                placement="right"
                overlay={renderTooltip()}>

                <div className="alert alert-primary max-width-col max-height-col" role="alert">
                   <p className={"mt-1"}> {workout.schedule.time_begin.slice(0, 5)} </p>
                </div> </OverlayTrigger>
            </>}
        </div>
    )
}
