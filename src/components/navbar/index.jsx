import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
/* import { GoCheck } from 'react-icons/go' */
import Image from 'gatsby-image'
import Popover from '../Popover'
import { GrLinkedin, GrTwitter, GrGithub } from 'react-icons/gr'

import { navDropDownFactory } from './common'
import ThemePicker from './ThemePicker'
const NavBar = React.memo(props => {
  const {
    navLogo,
    snakeGrid,
    toc,
    searching,
    sorting,
    api,
    imageToAscii,
    nepaliDate,
    snakeGame,
  } = useStaticQuery(
    graphql`
      query images {
        navLogo: file(absolutePath: { regex: "/logo.png/" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  return (
    <>
      <nav className="lg-navbar">
        <a
          href="https://github.com/subeshb1/developer-community-stats"
          target="_blank"
          id="colorless-link"
          rel="noopener noreferrer"
          style={{ fontSize: '1.5rem' }}
        >
          <GrGithub />
        </a>
        <Link to="/" className="lg-navbar__item lg-navbar__header">
          Developer Community Stats
        </Link>
       {/*  <nav>
          <ul>
            <li><GoCheck className="go-check"/><Link to="/stat-overview" className="lg-navbar__item">Overview stats</Link></li>
            <li><GoCheck className="go-check"/><Link to="/" className="lg-navbar__item">Developer stats</Link></li>
          </ul>
        </nav> */}
        {/* <div className="options">
          <div className="option">
                     </div>
          <div className="option">
                      </div>
        </div> */}

        <ThemePicker />
      </nav>
    </>
  )
})

function DropDownDisplayItem({ image, title, info, as = 'div', ...props }) {
  const As = as
  return (
    <As
      className="lg-navbar__drop-down__item lg-navbar__drop-down__display-item"
      {...props}
    >
      <div className="lg-navbar__drop-down__image">
        <Image fixed={image} alt="Website logo" className={'lg-navbar-img'} />
      </div>
      <div className="lg-navbar__drop-down__text">
        {title}
        <div className="lg-navbar__drop-down__dim">{info}</div>
      </div>
    </As>
  )
}
export default NavBar
