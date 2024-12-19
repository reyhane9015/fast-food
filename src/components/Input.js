

function Input({label , type , placeholder , value , onChange , isSaving , error , isEditable}) {
  return (
    <>
        <label>{label}</label>
        <input type={type}
            disabled={isSaving} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange}
            {...(error && { error: "true" })}
            className="dark:bg-dark-SBackground text-light-text dark:text-dark-text"
        />
    </>
  )
}

export default Input
