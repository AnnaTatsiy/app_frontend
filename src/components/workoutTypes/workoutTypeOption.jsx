export default function WorkoutTypeOption({type}){

    return (
        <>
            <option value={type.id}>{type.title}</option>
        </>
    )
}