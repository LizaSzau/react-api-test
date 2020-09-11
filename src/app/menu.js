import React, {Component} from 'react'
import './menu.sass';

class Menu extends Component {

    render() {
        return (
            <div className="container-main-menu">
				<div className="menu-main">
					<ul>
					  <li>Admin menu</li>
					  <li><a href="" className="active">Products</a></li>
					  <li><a href="">Categories</a></li>
					</ul>
				</div>
            </div>
        )
	}

}

export default Menu;
