import './App.css'
import React, {useState, useRef, useEffect} from 'react'
import BlogForm from './components/Blog/Form'
import BlogItem from './components/Blog/Item'

function App() {

  const [blogs, setBlogs] = useState([
      {
          id:1,
          title:'One Blog',
          description:'This blog is all you need for today...',
          publisher:'Saf',
          content:'This blog is all you need for today...',
          date:'2012-01-09',
          isFeatured:true,
      },
      {
          id:1,
          title:'Two Blog',
          description:'This blog is all you need for today...',
          publisher:'Saf',
          content:'This blog is all you need for today...',
          date:'2012-01-09',
          isFeatured:true,
      },
      {
          id:1,
          title:'Three Blog',
          description:'This blog is all you need for today...',
          publisher:'Saf',
          content:'This blog is all you need for today...',
          date:'2012-01-09',
          isFeatured:true,
      },
  ])

  const [selectedBlog, setSelectedBlog] = useState({
    id:null,
    title:'',
    description:'',
    publisher:'',
    content:'',
    date:'',
    isFeatured:'',
  })

  useEffect(() => {
    fetchBlogs(1)
    return null
  }, [])

  async function fetchBlogs(id){
    
    fetch('https://altitudeairbeta.kurmatechnepal.com/blog/')
        .then(async response => {
            const result = await response.json();
            if (!response.ok) {
                const error = (result && result.message) || response.statusText;
                return Promise.reject(error);
            }

            setBlogs(result.data)
            
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }

  function deleteBlog(id){
    fetch('https://altitudeairbeta.kurmatechnepal.com/blog/' + id + '/', {method:'DELETE'})
    .then(async response => {
        const result = await response.json();
        if (!response.ok) {
            const error = (result && result.message) || response.statusText;
            return Promise.reject(error);
        }

        fetchBlogs()
        
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  }

  function editBlog(blog){

    setSelectedBlog(blog)
  }

  return (
    <div className="App">
      <h1>Blog Manager</h1>

      <div className="blog-manager">
        <BlogForm blog={selectedBlog} setSelectedBlog={setSelectedBlog} blogList={blogs} setBlogList={setBlogs} fetchBlogs={fetchBlogs}/>

        <div>
          <h2>All Blogs</h2>
          {blogs.map((item, i)=>{
                return (
                    <div className="blog-list">
                        <BlogItem blog={item} />
                        <div className="action-buttons">
                            <input type="button" value="Edit" onClick={()=>{return editBlog(item)}}></input>
                            <input type="button" value="Delete" onClick={()=>{return deleteBlog(item.id)}}></input>
                        </div>
                    </div>
                )
            })}
        </div>
        

      </div>
    </div>
  )
}

export default App
