import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog{
    "content":string;
    "title":string;
    "id":string;
    "author":string
}
export const useBlog=({id}:{id:string})=>{
const [loading,setloading]=useState(true);
const [blog,setblog]=useState<Blog>();

useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
        headers:{
            Authorization:localStorage.getItem("token"),
        }
    })
    .then((res)=>{
        const jwt=res.data.blog;
        setblog(jwt);
        setloading(false);
    })
    .catch((err)=>{
        console.log(err);
        setloading(false)
    })
},[])
return{
    loading,
    blog
}
}

export const useBlogs=()=>{
    const [loading,setloading]=useState(true);
    const [blogs,setblogs]=useState<Blog[]>([]);
   
    useEffect(()=>{
const fetchBlogs = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        setblogs(response.data.blog);
        setloading(false);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        setloading(false);
    }
};

fetchBlogs();
    },[])
    return{
        loading,
        blogs
    }
}