const PersonForm = ({ newInfo, handleChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input name="name" value={newInfo.name}
                    onChange={handleChange} />
            </div>
            <div>number: <input name="number" value={newInfo.number} onChange={handleChange} /></div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )
}
export default PersonForm