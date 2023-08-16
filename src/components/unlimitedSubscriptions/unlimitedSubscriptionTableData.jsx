
export default function UnlimitedSubscriptionTableData({sub}){

    return (
        <>
            <tr>
                <td>{sub.customer.surname} {sub.customer.name} {sub.customer.patronymic}</td>
                <td>{sub.unlimited_price_list.subscription_type.title}</td>
                <td>{sub.unlimited_price_list.validity_period} мес.</td>
                <td>{new Date(sub.open).toLocaleDateString()}</td>
            </tr>
        </>
    )
}