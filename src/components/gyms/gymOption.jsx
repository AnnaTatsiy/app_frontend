
export default function GymOption({gym}){

    return (
        <>
            <option value={gym.id}>{gym.title}</option>
        </>
    )
}