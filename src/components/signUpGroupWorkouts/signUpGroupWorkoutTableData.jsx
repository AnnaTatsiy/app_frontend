export default function SignUpGroupWorkoutTableData({item}){
    return (
        <tr>
            <td>{item.customer.passport}</td>
            <td>{item.customer.name.slice(0, 1)}. {item.customer.patronymic.slice(0, 1)}. {item.customer.surname}</td>
            <td>{item.customer.number}</td>
            <td>{item.customer.mail}</td>
        </tr>
    )
}