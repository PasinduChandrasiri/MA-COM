import React from 'react'
import "./HomePage.css"
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to='/ContactUs'><p>To Contact Us</p></Link>
    </div>
  )
}

export default HomePage