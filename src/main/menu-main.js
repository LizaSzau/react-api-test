import React, {Component} from 'react'
import './menu-main.sass'
import {menus} from './menu-main-items.js'
import {Route, NavLink} from 'react-router-dom';

const MenuButton = (props) => {
	return (
		<li>
			<NavLink to={'/' + props.route} activeClassName={'active-menu'}>{props.name}</NavLink>
		</li>
	);
}

class Menu extends Component {
	renderMenuButton(i) {		
		return (
			<MenuButton 
				key = {menus[i].id}
				name = {menus[i].name}
				route = {menus[i].route}
			/>
		);
	}
	
    render() {
        return (
			<div className='container-menu-main'>
				<ul>
					<li>Admin menu</li>
					{menus.map((menu) => this.renderMenuButton(menu.id))}
				</ul>				
			</div>
        )
	}
}

export default Menu;
