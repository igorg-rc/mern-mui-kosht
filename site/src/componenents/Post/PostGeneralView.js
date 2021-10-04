import { makeStyles } from "@material-ui/styles";
import { Typography } from '@material-ui/core'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { SRLWrapper } from "simple-react-lightbox"
import moment from 'moment'
import 'moment/locale/uk'

const useStyles = makeStyles(theme => ({
  main: {
    padding: 20,
    background: '#fff',
    border: '1px solid rgba(0,0,0, 0.15)',
    borderRadius: 5
  },
  topBage: {
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Gilroy-Medium, sans-serif'
  },
  categoryLink: {
    textDecoration: 'none',
    fontWeight: 600
  },
  sectionTitle: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    padding: 3,
    borderRadius: '3px',
    background: 'rgba(0,0,0, 0.07)',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  titleLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    fontFamily: 'Giroy, sans-serif',
    fontWeight: 800,
    fontSize: 18,
    '&:hover': {
      color: theme.palette.text.secondary,
      transition: '0.5s'
    }
  },
  date: {
    margin: '0 5px',
    color: '#B8B8B8',
    fontSize: 12
  },
  title: {
    textAlign: 'left',
    paddingBottom: '2vh',
    fontSize: 28,
    fontWeight: 800,
    fontFamily: 'Gilroy-Medium, sans-serif',
    // '&:hover': {
    //   color: '#2E3A59',
    //   transition: '0.2s'
    // }
  },
  body: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: 0.5
  },
  posterImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 5
  }
}))


export const PostGeneralView = props => {
  const { id, title, description, body, categories, date, posterImage, posterVideo, slug } = props
  const styles = useStyles()
  const history = useHistory()
  const match = useRouteMatch()

  const postDetailContent = <div>
    <SRLWrapper>
      <div className="post-content post-content-detail" dangerouslySetInnerHTML={{__html: body}}></div>
    </SRLWrapper>
  </div>

  const postListContent = <div className={styles.content}>
    <div className="post-content">
      <Typography paragraph>{description}</Typography>
    </div>
    { posterVideo &&
      <div className={styles.posterImage}> 
        <iframe 
          className="ql-video ql-align-center ql-iframe" 
          width="100%"
          height="315"
          frameBorder="0" 
          title="Embedded video" 
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
          src={`${posterVideo}?autoplay=1&mute=1`}
        />
      </div>
    } 
    { posterImage ? <img className={styles.posterImage} src={posterImage} alt={title} /> : null }
  </div>

  const postCreationDate = new Date(date)
  const nowDate = new Date(Date.now())
  const dateDiff = nowDate.getDate() - postCreationDate.getDate() 

  return <div className={styles.main}>
    <Typography paragraph className={styles.topBage}>
      <span className={styles.categoryLink}>{categories}</span>
      <span className={styles.date}>
        {/* if post was created less then 30 days ago is "time_ago" format , otherwise "date: day month year" */}
        {dateDiff < 30 ? moment.utc(date).local().fromNow() : moment.utc(date).local().format('DD MMM YYYY')} 
      </span> 
    </Typography>
    <div 
      style={{ 
        cursor: (
          !match.params.slug || match.path.includes('category') || 
          match.path.includes('tag')) && 'pointer' 
        }} 
      onClick={() => (
        !match.params.slug              || 
        match.params.query              || 
        match.path.includes('category') || 
        match.path.includes('tag')      || 
        match.path.includes('search') ) ? 
        history.push(`/${slug}`) : console.log(match.params.slug)
      }
    >
    <Typography variant="h1" component="h1" className={styles.title}>
      { 
        !match.params.slug              || 
        match.path.includes('category') || 
        match.path.includes('tag')      || 
        match.path.includes('search')   ? 
        <Link to={`/${slug}`} className={styles.titleLink}>{title}</Link> : 
        <span>{title}</span> 
      }
    </Typography>
      { 
        !match.params.slug              || 
        match.path.includes('category') || 
        match.path.includes('tag')      || 
        match.path.includes('search')   ? 
        postListContent :  postDetailContent 
      }
    </div>
  </div>
}