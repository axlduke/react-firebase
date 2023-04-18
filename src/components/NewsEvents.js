import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { HiOutlineHome } from 'react-icons/hi'
import { BsNewspaper } from 'react-icons/bs'
import { FaUsers, FaUserGraduate, FaBars } from 'react-icons/fa'
import { IoIosLogOut, IoIosClose } from 'react-icons/io'
import '../assets/Scrollbar.css'


const links = [
    { name: 'Dashboard', icon: <HiOutlineHome />, link: '/' },
    { name: 'Students List', icon: <FaUsers />, link: '/Student' },
    { name: 'Faculty List', icon: <FaUserGraduate />, link: '/faculty' },
    { name: 'New & Events', icon: <BsNewspaper />, link: '/new' },
    { name: 'Log Out', icon: <IoIosLogOut />, link: '/logout' },
];

const NewsEventsAdd = () => {

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
            <div className="lg:ml-52 mx-5 lg:mx-0 w-full h-screen">
                <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                    <div class="container max-w-screen-lg mx-auto">
                        <div>
                        <h2 class="font-semibold text-xl text-gray-600">News & Events Form</h2>
                        <p class="text-gray-500 mb-6">Form is to add new Faculty Information.</p>

                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div class="text-gray-600">
                                <p class="font-medium text-lg">Annoucement Details</p>
                                <p>Please fill out all the fields.</p>
                                <div className=''>
                                    <img src='https://fapachi.com/models/h/a/hayami-haru/1/full/hayami-haru_0034.jpeg' 
                                        alt='profile'
                                        className='w-72 aspect-square rounded-md'/>
                                </div>
                            </div>
                            
                            <div class="lg:col-span-2 lg:mt-10 2xl:mt-10">
                                <form>
                                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div class="md:col-span-3">
                                            <label for="address">Full Name</label>
                                            <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="city">Subject Teacher</label>
                                            <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>

                                        <div class="md:col-span-3">
                                            <label for="address">Address / Street</label>
                                            <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="city">City</label>
                                            <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="country">Monday</label>
                                            <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                            <input name="country" type="time" placeholder="Time" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                            </div>
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="state">Tuesday</label>
                                            <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input name="state" type="time" placeholder="Time" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                            </div>
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="zipcode">Wednesday</label>
                                            <input type="time" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Time" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="zipcode">Thursday</label>
                                            <input type="time" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Time" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="zipcode">Friday</label>
                                            <input type="time" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Time" />
                                        </div>

                                        <div class="md:col-span-5 text-right">
                                            <div class="inline-flex items-end">
                                            <button class="bg-[#7551FF] hover:bg-[#6843ff] text-white font-bold py-2 px-4 rounded">Submit</button>
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

export default NewsEventsAdd