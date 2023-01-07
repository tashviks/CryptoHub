import React from 'react';
import { MenuList } from './MenuList';
import { NavLink } from 'react-router-dom';
import logo from '../../images/cryptohub.png';
import { LinkedinOutlined, GithubOutlined } from '@ant-design/icons';

import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-box">
      <div className="logo">
        <img src={logo} alt="" />
        Crypto<font>Hub</font>
      </div>
      <nav>
        <ul>
          {MenuList.map((item, ind) => {
            return (
              <li key={ind}>
                <NavLink to={item.url}>{item.title}</NavLink>
              </li>
            )
          })}
        </ul>
        <ul>
          <li><a href='https://www.linkedin.com/in/stanislav-tiryoshin/'><LinkedinOutlined /> LinkedIn</a></li>
          <li><a href="https://github.com/stanislavtiryoshin"><GithubOutlined/> Github</a></li>
        </ul>
      </nav>
      <div className='credentials'>
        Coded by <a href="https://www.linkedin.com/in/stanislav-tiryoshin/">Stanislav Tiryoshin</a> ⓒ 2022
      </div>
    </footer>
  )
}

export default Footer