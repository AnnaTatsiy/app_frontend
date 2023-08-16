export default function CoachOption({coach}){
    return (
        <>
            <option value={coach.passport}>{coach.surname} {coach.name} {coach.patronymic}</option>
        </>
    )
}