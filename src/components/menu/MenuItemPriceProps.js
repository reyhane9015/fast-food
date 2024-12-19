
import ChevronDown from '../icons/ChevronDown';
import Delete from '../icons/Trash';
import { useState } from 'react';
import ChevronUp from './../icons/ChevronUp';
import  Input from '@/components/Input';


function MenuItemPriceProps({props , setProps ,label}) {

    const [isOpen , setIsOpen] = useState(false);

    


    const addProps = () => {
        setProps(oldProps => {
            return [...oldProps , {name: "" , price: 0}]
        })
    }


    const editProp = (e,index,prop) => {
        const newValue = e.target.value;
        setProps(prevProps => {
            const newProps = [...prevProps];
            newProps[index][prop] = newValue;
            return newProps;
        })
    }

    const deleteProp = (indexToRemoved) => {
        setProps(prev => prev.filter((v,index) => index !== indexToRemoved));
    }



  return (
    <div className="my-4">
        <label>{label}s</label>
        <div className="bg-gray-100 rounded-md p-4 ">

           
            <button onClick={() => setIsOpen(prev => !prev)} type="button" className="transition duration-500 ease group bg-white flex items-center justify-center"
            >
                {isOpen ? 
                    <ChevronDown />
                    :
                    <ChevronUp />
                }
                see All {label} <span>({props?.length})</span>
            </button>
            

            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((prop, index) => (
                    <div key={prop.name} className="flex gap-2 items-center justify-between">
                        <div className="flex gap-2 grow">
                            <div>
                                <Input 
                                    type={"text"}
                                    label={"Name"} 
                                    placeholder={"Name"} 
                                    value={prop.name} 
                                    onChange={(e) => editProp(e,index,'name')}
                                />
                            </div>

                            <div>
                                <Input 
                                    type={"text"}
                                    label={"Price"} 
                                    placeholder={"Price"} 
                                    value={prop.price} 
                                    onChange={(e) => editProp(e,index,'price')}
                                />
                            </div>
                        </div>
                        <div>
                            <button type="button" onClick={() => deleteProp(index)}>
                                <Delete/>
                            </button>
                        </div>
                    </div>
                ))}


                <button type="button" className="bg-white my-2 max-w-md mx-auto" onClick={addProps}>
                    Add {label}
                </button>
            </div>


            

        </div>
      
    </div>
  )
}

export default MenuItemPriceProps
