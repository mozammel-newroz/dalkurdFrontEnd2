import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#FF005A', background: 'rgba(237, 76, 103,0.3)' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h1" style={{marginBottom: 10}} >404</Typography>
        <Typography variant="h3" style={{marginBottom: 60}} >Page Not Found</Typography>
        <Link to='/' style={{ color: '#333' }} > 
          <Button variant='contained' color="secondary" >back to home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
