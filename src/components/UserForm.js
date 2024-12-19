"use client";

import { useState ,useEffect } from 'react';
import Image from 'next/image';
import AddressInputs from '@/components/AddressInputs';
import { usePathname } from 'next/navigation';
import Input from './Input';
import { toast } from 'react-hot-toast';

import { useUser } from './UserContext';



function UserForm({user , onSave , isEditable = true}) {

    const path = usePathname();

    const [name , setName] = useState(user?.name || '');
    const [phone , setPhone] = useState(user?.phone || '');
    const [email , setEmail] = useState(user?.email || '');
    const [streetAddress , setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode , setPostalCode] = useState(user?.postalCode || '');
    const [country , setCountry] = useState(user?.country || '');
    const [city , setCity] = useState(user?.city || '');
    const [isAdmin , setIsAdmin] = useState(user?.admin || false);
    
    const[isSaving , setIsSaving] = useState(false);

    const { setUserName } = useUser();



    const countriesWithCities = [
        { _id: 1, name: 'Iran', cities: [{_id: 1, name: 'Tabriz'}, {_id: 2, name: 'Tehran'} , {_id: 3, name: 'Esfahan'}] },
        { _id: 2 , name: 'Turkye', cities: [{_id: 3, name: 'Istanbul'}, {_id: 4, name: 'Izmir'}] },
        { _id: 3 , name: 'Italy', cities: [{_id: 3, name: 'Milan'}, {_id: 4, name: 'Rome'}] },
    ];

    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        const selectedCountry = countriesWithCities.find(c => c.name === country);

        // console.log(selectedCountry);

        setCityOptions(selectedCountry ? selectedCountry.cities : []);
    }, [country]);
    


    // Validation
    const validatePhone = (phone) => {
        const phoneRegex = /^\d{4}$/;
        return phoneRegex.test(phone);
    };
    
    const validatePostalCode = (postalCode) => {
        const postalCodeRegex = /^\d{3}$/;
        return postalCodeRegex.test(postalCode);
    };


    const handleAddressChange = (propName , value) => {

        if(propName === "phone") setPhone(value);
        if(propName === "streetAddress") setStreetAddress(value);
        if(propName === "postalCode") setPostalCode(value);
        if(propName === "country") setCountry(value);
        if(propName === "city") setCity(value);

    }



    const handleSave = (e) => {
        e.preventDefault();

        if (phone && !validatePhone(phone)) {
            toast.error("Phone Number must be 4-digit");
            return;
        }

        if (postalCode && !validatePostalCode(postalCode)) {
            toast.error("Postal Code must be 3-digit");
            return;
        }

        setIsSaving(true);
        onSave(e, { name, email, phone, streetAddress, postalCode, city, country, isAdmin });

        setUserName(name);

        setTimeout(() => {
            setIsSaving(false);
        }, 2000);
        
    };


  return (
    <div className="max-w-2xl m-auto">

            <form className="grow p-8 border border-gray-400 rounded-md bg-light-SBackground dark:bg-dark-SBackground" 
                onSubmit={handleSave}
            >



                {(path === '/profile' || path.includes('/users/edit')) && 
                    <div className="block mx-auto w-16 h-16">
                        <Image className="rounded-full border-2 border-primary shadow-sm" src="/profile.png" width={120} height={120} alt="profile" />
                    </div>
                }



                {(path === '/profile' || path.includes('/users/edit')) &&
                    <>
                        <Input 
                            type={"text"}
                            label={"First and Last name"} 
                            placeholder={"First and Last name"} 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            isSaving={isSaving}
                            isEditable={true}
                        />
                    </>
                }


                {(path === '/profile' || path.includes('/users/edit')) && 
                    <>
                        <label>Email</label>
                        <input type="email" 
                            value={email} 
                            disabled={email ? true : false}
                            onChange={(e) => setEmail(e.target.value)}
                            className="dark:bg-dark-SBackground text-light-text dark:text-dark-text"
                        /> 
                    </>
                }



                <AddressInputs addressProps={{ phone , streetAddress , postalCode , country , countriesWithCities , city , cityOptions }} 
                    setAddressProps={handleAddressChange} isSaving={isSaving} 
                    validatePhone={validatePhone} validatePostalCode={validatePostalCode}
                    isEditable={isEditable}
                />





                {isAdmin && (path === '/profile' || path.includes('/users/edit')) && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                        <input
                            id="adminCb" type="checkbox" className="" value={'1'}
                            checked={isAdmin}
                            onChange={ev => setIsAdmin(ev.target.checked)}
                        />
                        <span>Admin</span>
                        </label>
                    </div>
                )}
            

                {(path === '/profile' || path.includes('/users/edit')) && 
                    <button type="submit" disabled={isSaving}>Save</button>
                }
            </form>
            
   
    </div>
  )
}

export default UserForm
