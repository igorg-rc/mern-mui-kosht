import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Container, IconButton } from "@material-ui/core"
import { Delete, Edit } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { delete_tag, get_tags } from "../../api/api"
import { PageTitle } from "../UI/PageTitle"
import { AddButton } from "../UI/AddButton"

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  categoriesHolder: {
    padding: 0,
    margin: 0,
    '&:last-child td': {  // !!! Remove border-bottom of the last row !!!
      borderBottom: 0
    }
  },
  headCell: {
    fontWeight: '800',
    fontSize: 16
  },
  titlesCell: {
    verticalAlign: 'middle'
  },
  categoryTitle: {
    fontSize: 16
  }
}))

export const TagIndex = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const styles = useStyles()
  const history = useHistory()

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true)
      const fetchedTags = await get_tags()
      setItems(fetchedTags)
      setLoading(false)
    }
    fetchTags()
  }, [])

  const deleteTagHandler = async id => {
    await delete_tag(id)
    const newTagList = items.filter(item => item._id !== id)
    setItems(newTagList)
  }

  const itemsList = items.map(item => (
    <TableRow className={styles.categoriesHolder} key={item._id}>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <span className={styles.categoryTitle}>{item.title_ua}</span>
      </TableCell>
      <TableCell align="right">
        <IconButton 
          color="primary" 
          onClick={() => history.push(`/tags/${(item._id).toLowerCase()}`)}>
          <Edit />
        </IconButton>
        <IconButton color="primary" onClick={() => deleteTagHandler(item._id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))

  console.log(items)

  return loading 
  ? 
  <div className={styles.main}>Loading...</div> 
  : 
  <Container>
    <PageTitle text="Tags" />
    <TableContainer>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.headCell}>Title</TableCell>  
              <TableCell className={styles.headCell} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { itemsList }
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton text="Add tag" variant="contained" color="primary" onClickBtn={() => history.push('/tags/create')} />
  </Container>
}