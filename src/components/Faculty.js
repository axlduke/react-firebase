import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { HiOutlineHome } from 'react-icons/hi'
import { BsNewspaper } from 'react-icons/bs'
import { FaUsers, FaUserGraduate, FaBars } from 'react-icons/fa'
import { IoIosLogOut, IoIosClose } from 'react-icons/io'
import '../assets/Scrollbar.css'
import { collection, deleteDoc, getDocs, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import { userColumns } from './FacultyData'

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



    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const data = [
    //     { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    //     { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
    //     { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
    //     { id: 4, name: 'Sarah Lee', email: 'sarahlee@example.com' },
    //     { id: 5, name: 'Chris Brown', email: 'chrisbrown@example.com' },
    //     { id: 6, name: 'Taylor Swift', email: 'taylorswift@example.com' },
    //     { id: 7, name: 'Justin Bieber', email: 'justinbieber@example.com' },
    //     { id: 8, name: 'Adele', email: 'adele@example.com' },
    //     { id: 9, name: 'Ed Sheeran', email: 'edsheeran@example.com' },
    //     { id: 10, name: 'Shawn Mendes', email: 'shawnmendes@example.com' },
    //     { id: 11, name: 'Dua Lipa', email: 'dualipa@example.com' },
    //     { id: 12, name: 'Bruno Mars', email: 'brunomars@example.com' },
    //     { id: 13, name: 'Ariana Grande', email: 'arianagrande@example.com' },
    //     { id: 14, name: 'Lady Gaga', email: 'ladygaga@example.com' },
    //     { id: 15, name: 'Beyoncé', email: 'beyonce@example.com' },
    //     { id: 16, name: 'Kanye West', email: 'kanyewest@example.com' },
    //     { id: 17, name: 'Drake', email: 'drake@example.com' },
    //     { id: 18, name: 'Nicki Minaj', email: 'nickiminaj@example.com' },
    //     { id: 19, name: 'Rihanna', email: 'rihanna@example.com' },
    //     { id: 20, name: 'Katy Perry', email: 'katyperry@example.com' },
    // ]

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

    // const pageCount = Math.ceil(filteredData.length / dataLimit);

    // const paginatedData = useMemo(() => {
    //     const startIndex = (currentPage - 1) * dataLimit;
    //     return filteredData.slice(startIndex, startIndex + dataLimit);
    // }, [currentPage, dataLimit, filteredData]);

    // const handlePageClick = (event) => {
    //     setCurrentPage(Number(event.target.id));
    // };

    // const handleLimitChange = (event) => {
    //     setDataLimit(Number(event.target.value));
    //     setCurrentPage(1);
    // };

    // const handleSearch = (event) => {
    //     setSearchTerm(event.target.value);
    //     setCurrentPage(1);
    // };
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
            <div className='table -ml-72 2xl:-ml-0'>
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
        </div>
    )
}

export default Faculty