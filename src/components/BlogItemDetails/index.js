// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {BlogData: {}, isLoading: true}

  componentDidMount() {
    this.getRenderBlogDetails()
  }

  getRenderBlogDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    console.log(data)

    const updatedData = {
      title: data.title,
      imageUrl: data.image_url,
      content: data.content,
      avatarUrl: data.avatar_url,
      author: data.author,
    }
    this.setState({BlogData: updatedData, isLoading: false})
  }

  renderBlogDetails = () => {
    const {BlogData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = BlogData

    return (
      <div className="blog-info">
        <h1 className="title">{title}</h1>
        <div className="author-details">
          <img src={avatarUrl} alt={author} className="avatar-img" />
          <p className="author">{author}</p>
        </div>
        <img src={imageUrl} alt={title} className="img" />
        <p className="content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
