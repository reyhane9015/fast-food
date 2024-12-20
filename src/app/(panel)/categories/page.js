"use client";

// import Delete from '@/components/icons/Trash';
import Edit from '@/components/icons/Edit';
// import UserTabs from '@/components/UserTabs';
// import { useProfile } from '@/components/UseProfile';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import DeleteButton from '@/components/DeleteButton';
import Image from 'next/image';
import Input from './../../../components/Input';
import { useSession } from 'next-auth/react';

import withAuth from './../../../libs/withAuth';

function CategoriesPage() {

  const session = useSession();
  const status = session.status;

  const[categoryName , setCategoryName] = useState('');
  const [categories , setCategories] = useState([]);
  const[editedCatergory , setEditedCategory] = useState(null);
  const[dataFetched , setDataFetched] = useState(false);


  useEffect(() => {
    fetchCategories();
  } , []);



  const fetchCategories = () => {
    fetch('/api/categories').then(res => 
      res.json().then(data => {
        setCategories(data);
        setDataFetched(true);
      })
    )
  }




// Edit and Add Categories
  async function handleCategorySubmit(e) {
    e.preventDefault();
  
    const creationPromise = new Promise(async (resolve,reject) => {

      const data = {name:categoryName};
      if(editedCatergory) {
        data._id = editedCatergory._id;
      }
      const response = await fetch('/api/categories' , {
        method:editedCatergory ? 'PUT' : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })

      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);

      if(response.ok) {
        resolve();
      } else {
          reject();
        } 
    })

    await toast.promise(creationPromise , {
      loading: editedCatergory ? 'Updating Category...' : 'Creating new category...',
      success: editedCatergory ? 'Updated Category Successfully!' : 'New category created successfully!',
      error: editedCatergory ? 'Error in Updating category' : 'Error in creating new category!'
    })
  }



// Delete Categoiris
  async function handleCategoryDelete(categoryId) {

    const deletionPromise = new Promise(async(resolve, reject) => {
       const response = await fetch('/api/categories' , {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({categoryId})
       })

      //  console.log(response)
       fetchCategories();

       if (response.ok) {
        resolve();
      } else {
        reject();
      }
    })

    await toast.promise(deletionPromise, {
      loading: 'Deleting Category...',
      success: 'Category Deleted Successfully!',
      error: 'Error in Deleting Category',
    });
    
  }

  if(status == "unauthenticated") {
    return redirect ("/login");
  }



  
  return (
    <section>

      {status == "authenticated" && 

 
          <div className="max-w-2xl m-auto border rounded-md p-4">
            <form className="grow" onSubmit={handleCategorySubmit}>
              <div className="flex gap-2 items-center">
                <div className="grow"> 
                    <label>{editedCatergory ? "Update category:" : "New Category Name"}</label>
                    {editedCatergory && (
                      <>
                        <b>{editedCatergory.name}</b>
                      </>
                    )}

                    <Input 
                      type={"text"}
                      value={categoryName} 
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="pt-2">
                  <button type="submit">
                    {editedCatergory ? "Update" : "Create"}
                  </button>
                </div>

                <div className="mt-2">
                  <button className="px-2 py-1 text-gray-600 font-semibold text-primary border-2 border-primary rounded-md" 
                    type="button" 
                    onClick={() => {setEditedCategory(null); setCategoryName('')}}
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </form>


            <div className="mt-8">
              <div>
                  <h2 className="text-xl font-semibold leading-tight text-light-text dark:text-dark-text mb-4">
                    All Categories
                  </h2>
              </div>
              {categories ? (
                categories.map(cat => 
                  <div
                    key={cat._id}
                    className="flex justify-between bg-gray-100 px-4 py-2 rounded-xl mb-2 dark:bg-dark-SBackground"
                  >
                  
                    <div className="flex items-center gap-2">
                      <Image src="/pizza.png" alt="pizza" width={60} height={60} className="block mx-auto" />
                      <span className="text-lg font-bold text-light-text dark:text-dark-text">{cat.name}</span>
                    </div>

                    <div className="flex gap-2">
                      <button className="border-2 p-2 rounded-md" onClick= {() => { setEditedCategory(cat); setCategoryName(cat.name) }}>
                        <Edit />
                      </button>

                      {/* <button onClick={() => handleCategoryDelete(cat._id)}>
                        <Delete />
                      </button>  */}
                      <DeleteButton onDelete={() => handleCategoryDelete(cat._id) } />

                    </div>
                  </div>
                  )) : (
                        <div className="text-center font-semibold text-primary text-lg">There are No categories yet</div>
                      )
              }
            </div>
      
        </div>

      }

    </section>
  )
}

export default withAuth(CategoriesPage)
