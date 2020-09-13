import React, {Component} from 'react'
import './menu-main.sass';

class Menu extends Component {

    render() {
        return (
            <div className="container-menu-main">
				<ul>
				  <li>Admin menu</li>
				  <li><a href="x" className="active">Products</a></li>
				  <li><a href="x">Categories</a></li>
				</ul>
            </div>
        )
	}

}

export default Menu;
