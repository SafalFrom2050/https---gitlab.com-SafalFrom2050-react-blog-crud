import React, {useState} from 'react'

function BlogItem(props) {

    // const [title, setTitle] = useState("")
    // const [publisher, setPublisher] = useState("")
    // const [description, setDescription] = useState("")
    // const [date, setdate] = useState("")
    // const [content, setcontent] = useState("")

    const title = props.blog.title
    const publisher = props.blog.publisher
    const date = props.blog.date
    const description = props.blog.description
    const content = props.blog.content


    return (
        <div className="blog-item">
            <h2>{title}</h2>
            <strong>{publisher}</strong><br />
            <strong>{date}</strong><br />
            <i>{description}</i>
            <p>{content}</p>

        </div>
    )
}


export default BlogItem