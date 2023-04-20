import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import './Button.css'
import { HiOutlineHome } from 'react-icons/hi'
import { BsNewspaper } from 'react-icons/bs'
import { FaUsers, FaUserGraduate, FaBars } from 'react-icons/fa'
import { IoIosLogOut, IoIosClose } from 'react-icons/io'
import '../assets/Scrollbar.css'
import { userInputs } from '../FacultyformSource'
import { doc, serverTimestamp, setDoc, addDoc, collection, docRef
} from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const links = [
    { name: 'Dashboard', icon: <HiOutlineHome />, link: '/' },
    { name: 'Students List', icon: <FaUsers />, link: '/Student' },
    { name: 'Faculty List', icon: <FaUserGraduate />, link: '/faculty' },
    { name: 'New & Events', icon: <BsNewspaper />, link: '/new' },
    { name: 'Log Out', icon: <IoIosLogOut />, link: '/logout' },
];

const FacultyAdd = () => {

    const [activeLink, setActiveLink] = useState('/faculty');
    const [isMobile, setIsMobile] = useState(false);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        if (isMobile) {
            setIsMobile(false);
        }
    }

    const handleToggleSidebar = () => {
        setIsMobile(!isMobile);
    }

    useEffect(() => {
        const savedState = localStorage.getItem('sidebarState')
        setIsMobile(savedState === 'close' ? false : true )
    },[])

    useEffect(() => {
        if (isMobile) {
            localStorage.setItem('sidebarState', 'close')
        }
    }, [isMobile])

    const [ data, setData ] = useState({})
    const [ file, setFile ] = useState("")
    const [ per, setPerc ] = useState(null)
    const navigate = useNavigate()
    // const [data, setData] = useState({ name: "", address: "", faculty: "" })

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name //para ma prevent error pag multiple yun uploads ng images
            // console.log(name)
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPerc(progress)
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                    default:
                        break
                }
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // console.log('File available at', downloadURL);
                    setData((prev)=> ({...prev, img:downloadURL}))
                });
            }
            );
        }
        file && uploadFile()
    },[file]) 
    console.log(data)  

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]:value });
    };
    
    console.log(data)

    const handleAdd = async(e) => {
        e.preventDefault()
        try {
            const res = await (
                auth,
                data.name,
                data.subject,
                data.address,
                data.faculty,
                data.monday,
                data.tuesday,
                data.wednesday,
                data.thursday,
                data.friday
            )
            await addDoc(collection(db, "faculty"), {
                ...data,
                // timestamp: serverTimestamp(),
            });
            navigate(-1)
            // const docRef = await addDoc(collection(db, "faculty"), {
            //     ...data,
            //     timestamp: serverTimestamp(),
            // });
            console.log("Data sent successfully to Firestore!");
            // setData({ name: "", address: "", grade: "" });
        } catch (err) {
            console.log(err);
        }

        // if you want to add a new user at the same time it can be loggin
        // try {
        //     const res = await createUserWithEmailAndPassword(
        //         auth,
        //         data.email,
        //         data.password
        //     )
        //     await setDoc(doc(db, "users", res.user.uid), {
        //         ...data,
        //         timeStamp: serverTimestamp(),
        //     });
        //     console.log("Data sent successfully to Firestore!");
        // } catch (err) {
        //     console.log(err);
        // }
    }

    return (
        <div className="my-scrollable-element bg-[#EDF1FA] h-full flex flex-row">
            <div className='fixed'>  
                <div className='fixed w-screen h-auto bg-black/50'>
                    <div className='flex items-center justify-between lg:justify-end 2xl:justify-end mx-5 my-5 lg:my-3 2xl:my-3'>
                        <div className='lg:hidden 2xl:hidden'  onClick={handleToggleSidebar}>
                            <FaBars className='text-white'/>
                        </div>
                        <div>
                            <img 
                                src='' 
                                alt="" 
                                className='w-10 aspect-square rounded-full'
                            /> 
                        </div>
                    </div>
                </div>
                <div
                className={classNames('fixed flex flex-col justify-between w-72 bg-gray-800 h-screen text-white transition-all duration-150 ease-in-out', {
                    hidden: isMobile,
                })}
                >
                {/* <hr /> */}
                    <div className="flex flex-col w-auto">
                        <div className='flex flex-row items-center'>
                            <div className="my-5 ml-5 text-lg font-bold text-[#7551FF]">Oas South Central School</div>
                            <div
                                className="mx-5 bg-slate-500 hover:bg-slate-600 rounded-md lg:hidden 2xl:hidden sm:block"
                                onClick={handleToggleSidebar}
                            >
                                {isMobile ? (
                                <HiOutlineHome className='text-white text-2xl'/>
                                ) : (
                                <IoIosClose className='text-white text-2xl'/>
                                )}
                            </div>
                        </div>
                        {links.map((link) => (
                        <a  href={link.link}
                            key={link.link}
                            onClick={() => handleLinkClick(link.link)}
                            className={classNames('flex items-center py-3 pl-5 hover:bg-gray-700', {
                            'bg-gray-700 border-r-8 border-[#7551FF] text-[#886aff]': activeLink === link.link,
                            })}
                        >
                            <span className="mr-3">{link.icon}</span>
                            <span>{link.name}</span>
                        </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="lg:ml-72 mt-14 lg:mt-10 2xl:mt-0 2xl:ml-52 mx-5 lg:mx-0 w-full h-screen">
                <div className="min-h-screen p-6 flex items-center justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <div>
                        <h2 className="font-semibold text-xl text-gray-600">Faculty Form</h2>
                        <p className="text-gray-500 mb-6">Form is to add new Faculty Information.</p>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                                <div className=''>
                                    <img src={
                                            file ? URL.createObjectURL(file) : 'https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png'
                                        } 
                                        alt='profile'
                                        className='w-72 aspect-square border border-black rounded-md'/>
                                </div>
                            </div>
                            
                            <div class="lg:col-span-2 lg:mt-10 2xl:mt-10">
                                <form onSubmit={handleAdd}>
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        {userInputs.map((input) => (
                                            <div className="md:col-span-2" key={input.id}>
                                                <label>{input.label}</label>
                                                <input  
                                                    id={input.id}
                                                    type={input.type} 
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                                    placeholder={input.placeholder} onChange={handleInput}/>
                                            </div>
                                        ))}
                                        <div className="md:col-span-2">
                                            <label>Upload Image</label>
                                            <input  
                                                type="file" 
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                                onChange={(e) => setFile(e.target.files[0])}    
                                            />
                                        </div>
                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button type='submit' disabled={per !== null && per < 100 } className="bg-[#7551FF] hover:bg-[#6843ff] text-white font-bold py-2 px-4 rounded">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacultyAdd