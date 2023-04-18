import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { HiOutlineHome } from 'react-icons/hi'
import { BsNewspaper } from 'react-icons/bs'
import { FaUsers, FaUserGraduate, FaBars } from 'react-icons/fa'
import { IoIosLogOut, IoIosClose } from 'react-icons/io'
import MiniCalendar from './MiniCalendar'
import wall from '../assets/wall.jpg'
import '../assets/Scrollbar.css'


const links = [
    { name: 'Dashboard', icon: <HiOutlineHome />, link: '/home' },
    { name: 'Students List', icon: <FaUsers />, link: '/Student' },
    { name: 'Faculty List', icon: <FaUserGraduate />, link: '/faculty' },
    { name: 'New & Events', icon: <BsNewspaper />, link: '/new' },
    { name: 'Log Out', icon: <IoIosLogOut />, link: '/logout' },
];

const Home = () => {

    const [activeLink, setActiveLink] = useState('/home');
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
            <div className="lg:ml-80 mt-20 mx-5 lg:mx-0 w-full h-auto">
                <div className='flex flex-col gap-2'>
                    <div className='mt-5 lg:mt-0 2xl:mt-0'>
                        <img 
                            src={wall} 
                            alt='oscs'
                            className='w-96 h-52 lg:w-[985px] lg:h-72 rounded-lg shadow-lg'    
                        />
                    </div>
                    <div className='flex flex-col lg:flex-row gap-3 2xl:flex-row'>
                        <div className='w-96 lg:w-80 h-fit lg:mt-0 2xl:mt-0 bg-white rounded-lg shadow-md'>
                            <div className='flex justify-center my-5 items-center flex-row gap-5'>
                                <div className='bg-[#EDF1FA] p-2 rounded-full'>
                                    <FaUsers className='text-4xl text-[#7551FF]'/>
                                </div>
                                <div>
                                    <h1 className='font-bold text-slate-500'>Total Students</h1>
                                    <span>300</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-96 lg:w-80 h-fit lg:mt-0 2xl:mt-0 bg-white rounded-lg shadow-md'>
                            <div className='flex justify-center my-5 items-center flex-row gap-5'>
                                <div className='bg-[#EDF1FA] p-2 rounded-full'>
                                    <FaUserGraduate className='text-4xl text-[#7551FF]'/>
                                </div>
                                <div>
                                    <h1 className='font-bold text-slate-500'>Faculty Department</h1>
                                    <span>300</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-96 lg:w-80 h-fit lg:mt-0 2xl:mt-0 bg-white rounded-lg shadow-md'>
                            <div className='flex justify-center my-5 items-center flex-row gap-5'>
                                <div className='bg-[#EDF1FA] p-2 rounded-full'>
                                    <BsNewspaper className='text-4xl text-[#7551FF]'/>
                                </div>
                                <div>
                                    <h1 className='font-bold text-slate-500'>New & Events</h1>
                                    <span>300</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mt-2 lg:flex-row 2xl:flex-row gap-3 mb-10'>
                        <div className='w-96 lg:w-96 h-fit lg:mt-0 2xl:mt-0 bg-white rounded-lg shadow-md'>
                            <div className='flex justify-center my-5 items-center flex-row gap-5'>
                                <div className=''>
                                    {/* <PieChart/> */}
                                    PieChart
                                </div>
                            </div>
                        </div>
                        <div className='w-96 lg:w-[400px] h-fit lg:mt-0 2xl:mt-0 bg-white rounded-lg shadow-md'>
                            <div className='flex justify-center my-5 items-center flex-row gap-5'>
                                <div className=''>
                                    <MiniCalendar/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home