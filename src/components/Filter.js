const Filter = ({ name, onChange }) => {
    return (<div>filter shown with <input name="name" value={name} onChange={onChange} /></div>)
}

export default Filter