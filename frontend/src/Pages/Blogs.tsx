import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"


export const Blogs=()=>{
    const {blogs,loading} = useBlogs();

    if(loading){
        return <div>
            loading......
        </div>
    }
    return <div> 
        <Appbar></Appbar>
        <div className="flex justify-center">
        <div className="max-w-xl">
            {blogs.map(blog=>
            <BlogCard 
            id={blog.id}
            title={blog.title}
            authorname={"diksha"}
            publisheddate={"2 march 2004"}
            content={blog.content}
            ></BlogCard>
)}
        </div>
    </div>
    </div>
}