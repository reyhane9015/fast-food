

function InputSelect({label , value , onChange , optionLabel , optionItems  , isSaving , isEditable}) {


    return (
        <>
          <label>{label}</label>


          <select value={value} 
                onChange={onChange}
                disabled={isSaving || !isEditable} 
                className="dark:bg-dark-SBackground text-light-text dark:text-dark-text"
            >
                <option value="" className="text-gray-200">{optionLabel}</option> 
                    {optionItems?.length > 0 && optionItems.map(item => (
                        <option key={item._id}
                         value={item.name} 
                         className="dark:bg-dark-SBackground text-light-text dark:text-dark-text"
                        >
                            {item.name}
                        </option>
                    ))}
            </select>
      </>
    )
  }
  
  export default InputSelect