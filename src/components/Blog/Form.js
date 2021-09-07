import React, {useState} from 'react'

function Form(props) {

    const selectedBlog = props.blog
    const setSelectedBlog = props.setSelectedBlog
    const blogList = props.blogList
    const setBlogList = props.setBlogList
    const fetchBlogs = props.fetchBlogs
    
    function createBlog(e){
        e.preventDefault()

        console.log('create blog: '+JSON.stringify(selectedBlog))

        fetch('https://altitudeairbeta.kurmatechnepal.com/blog/', 
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedBlog)
            })
            .then(async response => {
                const result = await response.json();
                if (!response.ok) {
                    const error = (result && result.message) || response.statusText;
                    return Promise.reject(error);
                }

                let blogArray = blogList
                blogArray.push(selectedBlog)
                setBlogList(blogArray)
                
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
            fetchBlogs()
    }

    function editBlog(e){
        e.preventDefault()

        console.log('edit blog: '+JSON.stringify(selectedBlog))

        fetch('https://altitudeairbeta.kurmatechnepal.com/blog/'+selectedBlog.id+'/', 
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedBlog)
            })
            .then(async response => {
                const result = await response.json();
                if (!response.ok) {
                    const error = (result && result.message) || response.statusText;
                    return Promise.reject(error);
                }

                let blogArray = blogList
                blogArray.push(selectedBlog)
                setBlogList(blogArray)
                
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
            fetchBlogs()
    }

    return (
        <div>
            <form className="blog-form">
                <input name="id" type="hidden" value={selectedBlog.id}></input>

                <label for="title">Title</label>
                <input name="title" type="text" placeholder="title" value={selectedBlog.title} onChange={(e)=> setSelectedBlog({...selectedBlog, title : e.target.value})}></input>

                <label for="description">Description</label>
                <input name="description" type="text" placeholder="description" value={selectedBlog.description} onChange={(e)=> setSelectedBlog({...selectedBlog, description : e.target.value})}></input>

                <label for="content">Content</label>
                <textarea rows="10" name="content" placeholder="content" value={selectedBlog.content} onChange={(e)=> setSelectedBlog({...selectedBlog, content : e.target.value})}></textarea>

                <label for="date">Date</label>
                <input name="date" type="datetime-local" value={selectedBlog.date} onChange={(e)=> setSelectedBlog({...selectedBlog, date : e.target.value})}></input>

                <label for="publisher">Publisher</label>
                <input name="publisher" type="text" placeholder="publisher" value={selectedBlog.publisher} onChange={(e)=> setSelectedBlog({...selectedBlog, publisher : e.target.value})}></input>

                <select name="isFeatured" value={selectedBlog.isFeatured} onChange={(e)=> setSelectedBlog({...selectedBlog, isFeatured : e.target.value})}>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <div className="action-buttons">
                    <input type="submit" name="create" value={selectedBlog.id == null ? 'Create' : 'Edit'} onClick={selectedBlog.id == null ? createBlog : editBlog}></input>
                    <input type="submit" name="delete" value="Delete"></input>
                </div>
            </form>
        </div>
    )
}

export default Form
