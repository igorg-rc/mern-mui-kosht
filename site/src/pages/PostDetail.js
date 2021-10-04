import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useRouteMatch } from "react-router"
import { Link } from "react-router-dom"
import { get_post_by_id, get_post_by_slug, get_readmore_posts } from "../api/api"
import { PostGeneralView } from "../componenents/Post/PostGeneralView"
import { makeStyles } from "@material-ui/styles"
import { PostSeparateListIndex } from "../componenents/PostList/PostSeparateListIndex"
import { SpinnerContent } from "../componenents/UI/SpinnerContent"

const useStyles = makeStyles(theme => ({
  main: {
    paddingBottom: 10,
    width: '100%'
  },
  categoryLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    marginRight: 5,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  linkText: {
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))


export const PostDetail = () => {
  const [post, setPost] = useState({})
  const [posts, setPosts] = useState([])
  const [postsLabel, setPostsLabel] = useState("")
  const [loading, setLoading] = useState(false)
  const match = useRouteMatch()
  const styles = useStyles()

  useEffect(() => {
    const setPageContent = async () => {
      setLoading(true)
      setPost(await get_post_by_slug(match.params.slug))
      setPosts(await get_readmore_posts(match.params.id))
      setPostsLabel("Read more articles")
      setLoading(false)
    }
    setPageContent()
  }, [match.params.slug])

  console.log(post)

  return !loading ? <>
    <Helmet>
      <title>{post && `Kosht | ${post.title}`}</title>
      <meta name="description" content={post && post.description} />
      <meta name="keywords" content="one, two, three" />
    </Helmet>

    <PostGeneralView
      title={post.title}
      body={post.body}
      date={post.createdAt}
      categories={post.categories && post.categories.map(i => (
        <Link key={i._id} to={(`/category/${(i.slug)}`).toLowerCase()} className={styles.categoryLink}>
          <span className={styles.linkText}>{i.title_ua}</span>
        </Link>
      )) }
    />
    <PostSeparateListIndex items={posts} label={postsLabel} />
  </> 
  : <SpinnerContent loadingStatus={loading} />
}