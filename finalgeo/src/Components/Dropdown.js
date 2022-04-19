import React, {useState} from 'react'
import { dropdownItems } from './NavItems'
import {Link} from 'react-router-dom';
import './Dropdown.css';

export default function Dropdown() {
    const [dropdown, setDropdown] = useState(false);
    return (
        <div>
            <ul className={dropdown ? "dropdown clicked" : "dropdown"} onClick={() => setDropdown(!dropdown)}>
                {dropdownItems.map(item => {
                    return(
                        <li key={item.key} className="dropdown-item" >
                            <Link className={item.cName} onClick={() => setDropdown(true)} to = {item.path} >{item.title}</Link>
                        </li>
                    );
                })}
                
            </ul>
        </div>
    );
}
