import { BrowserRouter,Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { Blog } from './Pages/Blog'
import { Blogs } from './Pages/Blogs'
import { Publish } from './Pages/Publish'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/blog/:id" element={<Blog/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/publish" element={<Publish />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
