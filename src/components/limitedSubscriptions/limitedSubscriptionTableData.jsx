
export default function LimitedSubscriptionTableData({sub}){

    return (
        <>
            <tr>
                <td>{sub.customer.surname} {sub.customer.name} {sub.customer.patronymic}</td>
                <td>{sub.limited_price_list.coach.surname} {sub.limited_price_list.coach.name} {sub.limited_price_list.coach.patronymic}</td>
                <td>{sub.limited_price_list.amount_workout}</td>
                <td>{new Date(sub.open).toLocaleDateString()}</td>
            </tr>
        </>
    )
}