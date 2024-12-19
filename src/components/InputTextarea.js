

function InputTextarea({label , type , placeholder , value , onChange , isSaving , isEditable}) {
    return (
      <>
          <label>{label}</label>
          <textarea type={type}
              disabled={isSaving || !isEditable} 
              placeholder={placeholder}
              value={value} 
              onChange={onChange}
              rows={3}
              style={{ maxHeight: '6em' }}
              className="dark:bg-dark-SBackground text-light-text dark:text-dark-text"
          />
      </>
    )
  }
  
  export default InputTextarea
  