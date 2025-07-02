import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    async function getPasswords() {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setDetailsList(passwords)
    }

    useEffect(() => {
        getPasswords()
    },[])

    const [createBox, setCreateBox] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [editBox, setEditBox] = useState(false)
    const [detailsObj, setDetailsObj] = useState({ URL: "", Username: "", Password: "" })
    const [detailsList, setDetailsList] = useState([])

    function handleAdd() {
        setCreateBox(true)
        setIsDisable(true)
        setDetailsObj({ URL: "", Username: "", Password: "" })
    }

    function handleChange(e) {
        setDetailsObj({ ...detailsObj, [e.target.name]: e.target.value })
    }

    async function handleSave() {
    if (detailsObj.URL === "" || detailsObj.Username === "" || detailsObj.Password === "") {
        alert("Please enter all fields");
        return;
    }

    const newId = uuidv4();
    const newRecord = { ...detailsObj, id: newId, isVisible: false };

    // Update state
    setDetailsList([...detailsList, newRecord]);

    // Reset UI
    setCreateBox(false);
    setEditBox(false);
    setIsDisable(false);

    // Send to backend
    await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord)
    });
}


    // useEffect(() => {
    //     console.log(detailsList)
    // }, [detailsList])

    function handleCancel() {
        setCreateBox(false)
        setIsDisable(false)
    }
    function handleEditDelete() {
        setEditBox(false)
        setIsDisable(false)
    }

    function handleVisibility(id) {
        let updateddetailsList = detailsList.map(item => {
            if (item.id == id) {
                return { ...item, isVisible: !item.isVisible }
            }
            return item
        })
        setDetailsList(updateddetailsList)
    }
   async function handleEdit(id) {
    // Find the item and set it for editing
    const itemToEdit = detailsList.find(item => item.id === id);
    setDetailsObj(itemToEdit);
    setEditBox(true);
    setIsDisable(true);

    // Remove it from list temporarily while editing
    setDetailsList(detailsList.filter(item => item.id !== id));

    // Remove from backend
    await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE"
    });
}


    async function handleDelete(id) {
    const confirmMsg = confirm("Do you want to delete this password?");
    if (!confirmMsg) return;

    // Update UI
    setDetailsList(detailsList.filter(item => item.id !== id));

    // Send DELETE to backend
    await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE"
    });
}

    
    return (
        <>
            <div className='mt-20'>
                <div className='container flex flex-col text-center justify-center m-auto text-white z-0'>
                    <p className='mt-10 mb-5'>Add new password</p>
                    <button disabled={isDisable} onClick={handleAdd} className='bg-neutral-800 hover:bg-neutral-700 cursor-pointer w-fit m-auto px-4 py-1 rounded-lg font-bold disabled:cursor-auto disabled:bg-neutral-700'>Add</button>
                    {createBox && (
                        <div className="create  border mt-10 flex flex-col items-center w-fit mx-auto px-3 rounded-md z-10">
                            <h1 className='mt-5 font-bold text-lg'>New Password</h1>
                            <input type="text" className='bg-neutral-800 rounded-2xl h-9 w-full px-5 outline-none my-5 ' placeholder='URL' value={detailsObj.URL} name='URL' onChange={handleChange} />
                            <input type="text" className='bg-neutral-800 rounded-2xl h-9 w-full px-5 outline-none mb-5' placeholder='Username' value={detailsObj.Username} name='Username' onChange={handleChange} />
                            <input type="password" className='bg-neutral-800 rounded-2xl h-9 w-full px-5 outline-none mb-5' placeholder='Password' value={detailsObj.Password} name='Password' onChange={handleChange} />
                            <div className='flex gap-30'>
                                <button onClick={handleSave} className='bg-neutral-800 hover:bg-neutral-700 cursor-pointer font-bold w-fit m-auto ml-3 px-4 py-1 rounded-lg mb-5'>Save</button>
                                <button onClick={handleCancel} className='bg-red-800 hover:bg-red-700 cursor-pointer font-bold w-fit m-auto mr-3 px-4 py-1 rounded-lg mb-5'>Cancel</button>
                            </div>
                        </div>
                    )}
                    {editBox && (
                        <div className="create  border mt-10 flex flex-col items-center w-fit mx-auto px-3 rounded-md z-10">
                            <h1 className='mt-5 font-bold text-lg'>New Password</h1>
                            <input type="text" className='bg-neutral-800 rounded-2xl h-9 w-full px-5 outline-none my-5 ' placeholder='URL' value={detailsObj.URL} name='URL' onChange={handleChange} />
                            <input type="text" className='bg-neutral-800 rounded-2xl h-9 w-full px-5 outline-none mb-5' placeholder='Username' value={detailsObj.Username} name='Username' onChange={handleChange} />
                            <input type="password" className='bg-neutral-800 rounded-2xl h-9 w-full px-5 outline-none mb-5' placeholder='Password' value={detailsObj.Password} name='Password' onChange={handleChange} />
                            <div className='flex gap-30'>
                                <button onClick={handleSave} className='bg-neutral-800 hover:bg-neutral-700 cursor-pointer font-bold w-fit m-auto ml-3 px-4 py-1 rounded-lg mb-5'>Save</button>
                                <button onClick={handleEditDelete} className='bg-red-800 hover:bg-red-700 cursor-pointer font-bold w-fit m-auto mr-3 px-4 py-1 rounded-lg mb-5'>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
                {detailsList.length === 0 ? <p className='text-white text-center font-bold text-2xl mt-10'>No passwords saved</p> :

                    <div className="overflow-x-auto w-full">
                        <table className="table-auto text-white border border-neutral-600 mx-auto my-10">
                            <thead>
                                <tr>
                                    <th className='py-3 px-4 border border-neutral-600'>URL</th>
                                    <th className='py-3 px-4 border border-neutral-600'>Username/ID</th>
                                    <th className='py-3 px-4 border border-neutral-600'>Passwords</th>
                                    <th className='py-3 px-4 border border-neutral-600'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailsList.map((item, index) => {
                                    return (
                                        
                                        <tr key={index} className='border'>
                                            <td className='text-center border border-neutral-600 p-2'><a href={item.URL}>{item.URL}</a></td>
                                            <td type="password" className='text-center border border-neutral-600 p-2'>{item.Username}</td>
                                            <td className='text-center border border-neutral-600 p-2'>{item.isVisible ? item.Password : "**********"}</td>
                                            {/* <td className='text-center font-extrabold text-lg border border-neutral-600 p-2'>..............</td> */}
                                            <td className='text-center border border-neutral-600 p-2'>
                                                <div className='flex justify-center items-center gap-1'>
                                                    <span onClick={() => { handleVisibility(item.id) }} className="material-symbols-outlined cursor-pointer">
                                                        {item.isVisible ? "visibility" : "visibility_off"}
                                                    </span>
                                                    {/* <span onClick={() => { handleVisibility(item.id) }} className="material-symbols-outlined cursor-pointer">
                                                    visibility_off
                                                    </span> */}
                                                    <span onClick={() => { handleEdit(item.id) }} className="material-symbols-outlined cursor-pointer">
                                                        edit
                                                    </span><span onClick={() => { handleDelete(item.id) }} className="material-symbols-outlined text-red-500 cursor-pointer">
                                                        delete
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default Manager