import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import { PostGeneralView } from "../componenents/Post/PostGeneralView"
import { PageMessage } from "../componenents/UI/PageMessage"
import { SpinnerContent } from "../componenents/UI/SpinnerContent"
import { PostSeparateListIndex } from "../componenents/PostList/PostSeparateListIndex"
import { get_list_by_id, get_posts } from "../api/api"

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


export const PostList = () => {
  const styles = useStyles()
  const [posts, setPosts] = useState([])
  const [mainNews, setMainNews] = useState([{}])
  const [mainNewsLabel, setMainNewsLabel] = useState("")
  const [loading, setLoading] = useState(false)
  // const MAIN_NEWS_ID = '61519aaf88511579e8d0e5ec'

  useEffect(() => {
    const setPage = async () => {
      setLoading(true)
      const fetchedPosts = await get_posts()
      // const fetchedMainNews = await get_list_by_id(MAIN_NEWS_ID)
      // const fetchedNewsList = fetchedMainNews[0].posts
      // const fetchedNewsLabel = fetchedMainNews[0].title
      setPosts(fetchedPosts)
      // setMainNewsLabel(fetchedNewsLabel)
      // setMainNews(fetchedNewsList)
      setLoading(false)
    }
    setPage()
  }, [])

  // console.log(mainNewsLabel)


  return <>
    { !loading ? <> 
    <PostSeparateListIndex label={mainNewsLabel} items={mainNews} /> 
    { posts.length > 0 ? posts.map(post => (
      <div className={styles.main} key={post._id}>
        <PostGeneralView 
          title={post.title}
          slug={post.slug}
          posterImage={post.posterImage}
          posterVideo={post.posterVideo}
          date={post.createdAt}
          id={post._id}
          description={post.description}
          categories={post.categories && post.categories.map(i => (
            <Link key={i._id} to={(`/category/${(i.slug)}`).toLowerCase()} className={styles.categoryLink}>
              <span className={styles.linkText}>{i.title_ua}</span>
            </Link>
          ))}
        />
      </div> )) : <PageMessage message={`There are no posts yet!`} /> } </>
    : <SpinnerContent loadingStatus={loading} items={posts} /> }
  </>
}