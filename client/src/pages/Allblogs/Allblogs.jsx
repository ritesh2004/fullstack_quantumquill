import React, { useContext, useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { getallBlogs } from '../../api/Blog'
import loader from '../../icons/loading.svg'
import Appcontext from '../../context/Appcontext'
import { Editbio } from '../../components/Editbio'
import { Link } from 'react-router-dom'
import { SkeletonCard } from '../../components/SkeletonCard'


export const Allblogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { openProfile } = useContext(Appcontext)
    useEffect(() => {
        const getBlogs = async () => {
            try {
                const allBlog = await getallBlogs();
                console.log(allBlog)
                setBlogs(allBlog.blog.reverse());
            } catch (error) {
                console.log(error);
            }
        }

        getBlogs()
    }, [])

    return (
        <div className='w-full h-full bg-[#1d232a] min-h-screen'>
            <Navbar bgColor='#00b4d8' />
            {openProfile && <Editbio />}
            <div className='cards my-10 flex flex-col gap-5 justify-center items-center min-h-[60vh] md:flex-wrap md:flex-row md:justify-around'>
                {blogs && blogs.length > 0 ? blogs.map((blog) => {
                    return (
                        <Card
                            title={blog.title}
                            desc={blog.description}
                            imageURL={blog.imageURL}
                            author={blog.user}
                            postId={blog._id}
                        />
                    )
                }) : 
                <SkeletonCard duration={5} items={8}/>
                }
                <Link className='fixed bottom-5 right-5 bg-blue-700 cursor-pointer p-3 rounded-xl hover:bg-[#03045e] md:bottom-10 md:right-10 md:p-5 md:rounded-2xl' to={'/add'}>
                    <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                </Link>
            </div>
            <Footer />
        </div>
    )
}
