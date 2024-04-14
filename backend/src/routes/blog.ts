import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createbloginput} from "@dikshajain/medium-project-zod";
import { updatebloginput } from "@dikshajain/medium-project-zod";
export const blogrouter = new Hono<{
	Bindings: {
	DATABASE_URL: string,
    JWT_SECRET :string
	},
    Variables:{
        userid:string
    }
}>();

//middleware
blogrouter.use('/*', async (c, next) => {
    //verify that user has a jwt token verified
    const header=c.req.header("Authorization")||"";
    const token = header;
    console.log(token)
    const response=await verify(token,c.env.JWT_SECRET);
      if(response.id){
        c.set("userid",response.id)
       c.json({
        msg:"you are verified",
        id:response.id,
        jwt:response.token

      })
      await next();
    }else{
      c.status(403);
      return c.json({
        error :"not verified token"
      });
    }
  })


blogrouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      //returns all blogs
      const blogs = await prisma.post.findMany({
        select:{
          content:true,
          title:true,
          id:true,
          author:true
        }
      });
     return c.json({
        blog:blogs
     })
  })
  

  //the posts are shown whose id is references author id means jyach header madhe id ahe , tyachach post dkhvtay
  blogrouter.get('/', async(c) => {
    const id=c.get("userid");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      
     try{
        const blogs = await prisma.post.findMany({
            where:{
                authorId:id
            }
        })
    
        return c.json({
            id:id,
            data:blogs
        })
      }catch(e){
        return c.json({
            error:e
        })
      }
  })
   
  
blogrouter.post('/',async(c)=>{
    const authorid = c.get("userid");
    console.log(authorid);
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const body =await c.req.json();
try{
    const blog = await prisma.post.create({
        data:{
        title:body.title,
        content:body.content,
        authorId:authorid,
        }
    })
    
    const status= createbloginput.safeParse(blog);
    if(status.success){
      return c.json({
        id:blog.id,
        authorid:authorid
    })
    }else{
      return c.json({
        err :"blog not properly mentioned"
    })
    }
    

}catch(e){
    return c.json({
        error:e
    })
}
  })
 
  //jiskki postid di , woh update hoga
blogrouter.put('/',async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body =await c.req.json();
      
      const status= updatebloginput.safeParse(body);
      if(status.success){
        
      await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
                title:body.title,
                content:body.content,
        } 
      })
    
    return c.json({
        msg:"data updated"
    })
      }else{
        return c.json({
          err :"blog not properly mentioned"
      })
    }

  })

//in request parameter whose postid is given , that single post is shown
  blogrouter.get('/:id', async(c) => {
    const id=c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
     try{
        const blogs = await prisma.post.findFirst({
            where:{
                id:id
            },
            select:{
              id:true,
              content:true,
              title:true,
              author:true,
            }
        })
    
        return c.json({
            id:id,
            blog:blogs
        })
      }catch(e){
        return c.json({
            error:e
        })
      }
  })


