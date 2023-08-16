
export default function LimitedPriceListTableData({price}){
    return (
        <>
            <tr>
                <td>{price.coach.surname} {price.coach.name} {price.coach.patronymic}</td>
                <td>{price.amount_workout}</td>
                <td>{price.price}</td>
            </tr>
        </>
    )
}