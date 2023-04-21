import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { HiOutlineHome } from 'react-icons/hi'
import { BsNewspaper } from 'react-icons/bs'
import { FaUsers, FaUserGraduate, FaBars } from 'react-icons/fa'
import { IoIosLogOut, IoIosClose } from 'react-icons/io'
import '../assets/Scrollbar.css'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { userColumns } from './Data'

const links = [
    { name: 'Dashboard', icon: <HiOutlineHome />, link: '/' },
    { name: 'Students List', icon: <FaUsers />, link: '/Student' },
    { name: 'Faculty List', icon: <FaUserGraduate />, link: '/faculty' },
    { name: 'New & Events', icon: <BsNewspaper />, link: '/new' },
    { name: 'Log Out', icon: <IoIosLogOut />, link: '/logout' },
];


const Faculty = () => {

    const [ data, setData ] = useState([])

    useEffect(() => {
        // const fetchData = async () => {
        //     let list = []
        //     try {
        //         const querySnapshot = await getDocs(collection(db, 'faculty'))
        //         querySnapshot.forEach((doc) => {
        //             list.push({ id: doc.id, ...doc.data() })
        //         })
        //         setData(list)
        //     } catch(err) {
        //         console.log(err)
        //     }
        // }
        // fetchData()
        const unsub = onSnapshot(collection(db, 'faculty'), (snapShot) =>{
            let list = []
            snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            })
            setData(list)
        }, 
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    },[])
    // console.log(data)

    const handleDelete = async(id) => {
        try {
            await deleteDoc(doc(db, 'faculty', id))
            setData(data.filter((item) => item.id !== id))
        } catch (err) {
            console.log(err)
        }
    }

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

    // const [currentPage, setCurrentPage] = useState(1);
    // const [dataLimit, setDataLimit] = useState(10);
    // const [searchTerm, setSearchTerm] = useState('');

    // const filteredData = useMemo(() => {
    //     if (!searchTerm) return data;

    //     return data.filter((item) =>
    //     Object.values(item).some(
    //         (value) => String(value).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    //     )
    //     );
    // }, [data, searchTerm]);

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                <div className="cellAction">
                    <Link to="/users/test" style={{ textDecoration: "none" }}>
                    <div className="viewButton">View</div>
                    </Link>
                    <div
                    className="deleteButton"
                    onClick={() => handleDelete(params.row.id)}
                    >
                    Delete
                    </div>
                </div>
                );
            },
        },
    ];


    return (
        <div className="my-scrollable-element bg-[#EDF1FA] h-screen flex flex-row">
            <div className='absolute lg:fixed 2xl:fixed'>  
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
                        {links.map((item, index) => (
                            <Link key={index} to={item.link}
                            onClick={() => handleLinkClick(item.link)}
                            className={classNames('flex items-center py-3 pl-5 hover:bg-gray-700', {
                            'bg-gray-700 border-r-8 border-[#7551FF] text-[#886aff]': activeLink === item.link,
                            })}>
                                <span className="mr-3">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='table'>
                <div className="datatable">
                    <div className="datatableTitle">
                        Add New Faculty Member
                        <Link to="/faculty_add" className="link">
                            Add New
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                    />
                </div>
            </div>
        </div>
    )
}

export default Faculty