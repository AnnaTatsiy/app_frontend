export default function CustomerOption({customer}){
    return (
        <>
            <option value={customer.passport}>{customer.surname} {customer.name} {customer.patronymic}</option>
        </>
    )
}