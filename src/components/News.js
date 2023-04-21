import React, { useState, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { HiOutlineHome } from 'react-icons/hi'
import { BsNewspaper } from 'react-icons/bs'
import { FaUsers, FaUserGraduate, FaBars, FaEdit } from 'react-icons/fa'
import { FiDelete } from 'react-icons/fi'
import { IoIosLogOut, IoIosClose } from 'react-icons/io'
import '../assets/Scrollbar.css'
import { Link } from "react-router-dom"

const links = [
    { name: 'Dashboard', icon: <HiOutlineHome />, link: '/' },
    { name: 'Students List', icon: <FaUsers />, link: '/Student' },
    { name: 'Faculty List', icon: <FaUserGraduate />, link: '/faculty' },
    { name: 'New & Events', icon: <BsNewspaper />, link: '/new' },
    { name: 'Log Out', icon: <IoIosLogOut />, link: '/logout' },
];

const add = [
    {link: '/new_add'}
]

const Faculty = () => {

    const [activeLink, setActiveLink] = useState('/new');
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
    const data = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
        { id: 4, name: 'Sarah Lee', email: 'sarahlee@example.com' },
        { id: 5, name: 'Chris Brown', email: 'chrisbrown@example.com' },
        { id: 6, name: 'Taylor Swift', email: 'taylorswift@example.com' },
        { id: 7, name: 'Justin Bieber', email: 'justinbieber@example.com' },
        { id: 8, name: 'Adele', email: 'adele@example.com' },
        { id: 9, name: 'Ed Sheeran', email: 'edsheeran@example.com' },
        { id: 10, name: 'Shawn Mendes', email: 'shawnmendes@example.com' },
        { id: 11, name: 'Dua Lipa', email: 'dualipa@example.com' },
        { id: 12, name: 'Bruno Mars', email: 'brunomars@example.com' },
        { id: 13, name: 'Ariana Grande', email: 'arianagrande@example.com' },
        { id: 14, name: 'Lady Gaga', email: 'ladygaga@example.com' },
        { id: 15, name: 'Beyoncé', email: 'beyonce@example.com' },
        { id: 16, name: 'Kanye West', email: 'kanyewest@example.com' },
        { id: 17, name: 'Drake', email: 'drake@example.com' },
        { id: 18, name: 'Nicki Minaj', email: 'nickiminaj@example.com' },
        { id: 19, name: 'Rihanna', email: 'rihanna@example.com' },
        { id: 20, name: 'Katy Perry', email: 'katyperry@example.com' },
    ]

    const [currentPage, setCurrentPage] = useState(1);
    const [dataLimit, setDataLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((item) =>
        Object.values(item).some(
            (value) => String(value).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        )
        );
    }, [data, searchTerm]);

    const pageCount = Math.ceil(filteredData.length / dataLimit);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * dataLimit;
        return filteredData.slice(startIndex, startIndex + dataLimit);
    }, [currentPage, dataLimit, filteredData]);

    const handlePageClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handleLimitChange = (event) => {
        setDataLimit(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };


    return (
        <div className="my-scrollable-element bg-[#EDF1FA] h-screen flex flex-row">
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
            <div className="lg:ml-[300px] mt-28 lg:mt-20 2xl:mt-20 mx-2 w-full lg:mx-0 lg:w-full 2xl:w-[1220px] h-fit bg-white rounded-b-lg shadow-md">
                <div className="flex justify-between place-content-center">
                    <h1 className="text-2xl font-bold my-5 2xl:ml-10 text-[#886aff]">News & Events Lists</h1>
                    <button className='mr-5'>
                        {add.map((links) => (
                        <a  href={links.link}
                            className='p-2 border-2 border-[#7551FF] rounded-md'
                        >
                            Add News & Events
                        </a>
                        ))}
                    </button>
                </div>
                <div className='flex justify-end justify-between mx-6 2xl:mx-10'>
                    <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} 
                        className='w-72 p-2 border border-black outline-none rounded-md'
                    />
                    <select 
                        value={dataLimit} 
                        onChange={handleLimitChange}
                        className='border border-black px-auto rounded-md'
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <table className='min-w-full table-auto overflow-x-auto mt-2'>
                    <thead className='min-w-full table-auto'>
                        <tr className='bg-gray-200 text-[#886aff] uppercase text-sm leading-normal"'>
                            <th className="py-3 px-6 text-left">
                                ID
                            </th>
                            <th className="py-3 px-6 text-left">
                                INFO
                            </th>
                            <th className="py-3 px-6 text-left">
                                ID
                            </th>
                            <th className="py-3 px-6 text-left">
                                actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            {Object.values(item).map((value, index) => (
                                <td key={index} className="py-3 px-3 text-left ">
                                    {value}
                                </td>
                                
                            ))}
                                <td className="flex gap-2 py-1 px-3 text-left">
                                    <button className="flex items-center border border-[#886aff] text-[#886aff] hover:bg-[#e1daff] transition delay-100 ease-in-out font-bold py-2 px-4 rounded">
                                        <FaEdit/> Click me
                                    </button>

                                    <button className="flex items-center border border-red-500 text-red-500 hover:bg-red-100 transition delay-100 ease-in-out font-bold py-2 px-4 rounded">
                                        <FiDelete/> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='my-5 ml-10'>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                        <button 
                            key={page} 
                            id={page} 
                            onClick={handlePageClick}
                            className='border border-indigo-200 w-10 p-1'>
                            {page}
                        </button>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Faculty