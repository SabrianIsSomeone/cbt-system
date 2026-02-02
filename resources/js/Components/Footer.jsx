import React from 'react'
import ApplicationLogo from "./ApplicationLogo";
import ExamRanger from "./../../assets/ExamRanger.svg"
import { useRef } from 'react';

const Footer = ({ subject }) => {


    return (
        <footer className='relative pt-10 pb-12 shadow-inner opacity-100 bg-gradient-to-b from-orange-950 via-yellow-950 to-slate-900'>
            <div className='justify-center '>
                <div className="flex flex-wrap items-center justify-center mx-auto ">
                    <div className='w-full px-4 mb-12 font-medium pl-9 md:w-1/3'>
                        <div className="flex items-center gap-4 m-3 ml-0">
                            <ApplicationLogo />
                            {/* <h2 className='mb-5 text-4xl font-bold bg-clip-text text-white/70 hover:text-primary dark-gradient2'>ExamRanger</h2> */}
                            <img src={ExamRanger} alt="" className="h-10 mt-1" />


                        </div>
                    </div>
                    <div className="w-full px-4 mb-12 md:w-1/3" >
                        <h3 className='mb-8 text-2xl font-semibold text-white/70'>Soal Try Out
                            <ul className='pt-2 text-white/70'>
                                {
                                    subject ? subject.map((data) => {
                                        return <li>
                                            <a href="#" className='inline-block text-base hover:text-primary '>{data.name}</a>
                                        </li>
                                    })
                                        :
                                        <li>
                                            <a href="#" className='inline-block mb-1 text-base hover:text-secondary'>Belum ada soal Kompetisi</a>
                                        </li>
                                }


                            </ul>
                        </h3>
                    </div>
                    <div className="w-full px-4 mb-20 md:w-1/3" >
                        <h3 className='mb-5 text-2xl font-semibold text-white/70'>Tautan
                            <ul>
                                <li>
                                    <a href="#home" className='inline-block text-base hover:text-primary '>Home</a>
                                </li>
                                <li>
                                    <a href="#home" className='inline-block text-base hover:text-primary '>Exam</a>
                                </li>
                                {/* <li>
                                    <a href="#about" className='inline-block text-base hover:text-primary '>About</a>
                                </li> */}
                            </ul>
                        </h3>
                    </div>


                    {/* <div className="mx-auto ">
                        <h1 className='pl-6 mb-2 text-center text-white/70'>Akun Sosial Media Kami :</h1>
                        <div className="grid grid-flow-col gap-5 text-slate-200">

                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_22_664)">
                                        <path d="M18 3.15137C22.8094 3.15137 23.3789 3.17187 25.2703 3.25391C27.0281 3.3291 27.9773 3.61621 28.6102 3.85547C29.4469 4.16992 30.0516 4.55273 30.6773 5.16113C31.3102 5.77637 31.6969 6.35742 32.0203 7.1709C32.2664 7.78613 32.5617 8.71582 32.6391 10.418C32.7234 12.2637 32.7445 12.8174 32.7445 17.4863C32.7445 22.1621 32.7234 22.7158 32.6391 24.5547C32.5617 26.2637 32.2664 27.1865 32.0203 27.8018C31.6969 28.6152 31.3031 29.2031 30.6773 29.8115C30.0445 30.4268 29.4469 30.8027 28.6102 31.1172C27.9773 31.3564 27.0211 31.6436 25.2703 31.7188C23.3719 31.8008 22.8023 31.8213 18 31.8213C13.1906 31.8213 12.6211 31.8008 10.7297 31.7188C8.97188 31.6436 8.02266 31.3564 7.38984 31.1172C6.55313 30.8027 5.94844 30.4199 5.32266 29.8115C4.68984 29.1963 4.30313 28.6152 3.97969 27.8018C3.73359 27.1865 3.43828 26.2568 3.36094 24.5547C3.27656 22.709 3.25547 22.1553 3.25547 17.4863C3.25547 12.8105 3.27656 12.2568 3.36094 10.418C3.43828 8.70898 3.73359 7.78613 3.97969 7.1709C4.30313 6.35742 4.69688 5.76953 5.32266 5.16113C5.95547 4.5459 6.55313 4.16992 7.38984 3.85547C8.02266 3.61621 8.97891 3.3291 10.7297 3.25391C12.6211 3.17187 13.1906 3.15137 18 3.15137ZM18 0C13.1133 0 12.5016 0.0205078 10.582 0.102539C8.66953 0.18457 7.35469 0.485351 6.21563 0.916016C5.02734 1.36719 4.02188 1.96191 3.02344 2.93945C2.01797 3.91016 1.40625 4.8877 0.942188 6.03613C0.499219 7.15039 0.189844 8.42187 0.105469 10.2812C0.0210938 12.1543 0 12.749 0 17.5C0 22.251 0.0210938 22.8457 0.105469 24.7119C0.189844 26.5713 0.499219 27.8496 0.942188 28.957C1.40625 30.1123 2.01797 31.0898 3.02344 32.0605C4.02188 33.0313 5.02734 33.6328 6.20859 34.0771C7.35469 34.5078 8.6625 34.8086 10.575 34.8906C12.4945 34.9727 13.1062 34.9932 17.993 34.9932C22.8797 34.9932 23.4914 34.9727 25.4109 34.8906C27.3234 34.8086 28.6383 34.5078 29.7773 34.0771C30.9586 33.6328 31.9641 33.0313 32.9625 32.0605C33.9609 31.0898 34.5797 30.1123 35.0367 28.9639C35.4797 27.8496 35.7891 26.5781 35.8734 24.7188C35.9578 22.8525 35.9789 22.2578 35.9789 17.5068C35.9789 12.7559 35.9578 12.1611 35.8734 10.2949C35.7891 8.43555 35.4797 7.15723 35.0367 6.0498C34.5938 4.8877 33.982 3.91016 32.9766 2.93945C31.9781 1.96875 30.9727 1.36719 29.7914 0.922852C28.6453 0.492187 27.3375 0.191406 25.425 0.109375C23.4984 0.0205078 22.8867 0 18 0Z" fill="white" />
                                        <path d="M18 8.51074C12.8953 8.51074 8.75391 12.5371 8.75391 17.5C8.75391 22.4629 12.8953 26.4893 18 26.4893C23.1047 26.4893 27.2461 22.4629 27.2461 17.5C27.2461 12.5371 23.1047 8.51074 18 8.51074ZM18 23.3311C14.6883 23.3311 12.0023 20.7197 12.0023 17.5C12.0023 14.2803 14.6883 11.6689 18 11.6689C21.3117 11.6689 23.9977 14.2803 23.9977 17.5C23.9977 20.7197 21.3117 23.3311 18 23.3311Z" fill="white" />
                                        <path d="M29.7703 8.15528C29.7703 9.31739 28.8 10.2539 27.6117 10.2539C26.4164 10.2539 25.4531 9.31055 25.4531 8.15528C25.4531 6.99317 26.4234 6.05664 27.6117 6.05664C28.8 6.05664 29.7703 7 29.7703 8.15528Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_22_664">
                                            <rect width="36" height="35" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>anatomifkunja</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <svg width="20" height="20" viewBox="0 0 31 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.8975 0H16.999V23.8405C16.999 26.6812 14.7304 29.0145 11.9071 29.0145C9.0839 29.0145 6.81525 26.6812 6.81525 23.8405C6.81525 21.0507 9.0335 18.7681 11.7559 18.6667V12.6812C5.75655 12.7826 0.916748 17.7029 0.916748 23.8405C0.916748 30.029 5.85737 35 11.9576 35C18.0577 35 22.9983 29.9783 22.9983 23.8405V11.6159C25.2166 13.2391 27.9389 14.2029 30.8126 14.2537V8.26812C26.3761 8.11595 22.8975 4.46376 22.8975 0Z" fill="white" />
                                </svg>
                                <p>anatomifkunja</p>
                            </div>

                        </div>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer
