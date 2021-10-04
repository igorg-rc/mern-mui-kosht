import moment from 'moment'
import { Link, useRouteMatch } from "react-router-dom"
import { makeStyles, Typography, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, useTheme } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  main: {
    padding: 20,
    background: '#fff',
    border: '1px solid rgba(0,0,0, 0.15)',
    borderRadius: 5
  },
  unicodeRound: {
    color: theme.palette.text.secondary,
    fontSize: 10,
    marginRight: '10px',
    verticalAlign: 'middle'
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
  row: {
    display: 'flex',
    color: theme.palette.text.primary,
    justifyContent: 'space-between'
  },
  content: {
    textAlign: 'left',
    color: theme.palette.text.primary,
    paddingBottom: 20
  },
  icon: {
    color: theme.palette.text.primary,
  },
  dateBadge: {
    color: '#B8B8B8',
    fontFamily: 'Gilroy, sans-serif',
    marginRight: 20
  },
  titleBadge: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.text.secondary,
    }
  }
}))


export const PostSeparateListIndex = ({ items, label }) => {
  const styles = useStyles()
  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))
  const match = useRouteMatch()
  
  const rows = <div className={styles.content}>
    { items.map(item => (
      <div className={styles.content} key={item._id}>
        <span className={styles.dateBadge} style={{ marginLeft: 'auto' }}>
          {moment.utc(item.createdAt).local().format('DD.MM')}
        </span>
        <Link to={`/${item.slug}`} className={styles.titleBadge}>
          {item.title}
        </Link>
      </div>
    )) }
  </div>

  return <div className={styles.main} style={{ margin : match.params.slug ? '10px 0' : '0 0 10px 0' }}>
    <Accordion defaultExpanded elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMore className={styles.icon} />}
        aria-controls="panel1c-content"
        id="panel1c-header"
        aria-label="Collapse"
      >
        <div className={styles.row}>
          <Typography paragraph className={styles.label}>
            <span className={styles.unicodeRound}>&#11044;</span>{label}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        { rows }
      </AccordionDetails>  
    </Accordion>
  </div>
}