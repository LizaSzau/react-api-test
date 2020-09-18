import React, {Component} from 'react'
import './menu-main.sass';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
} 	from "react-router-dom";

const MenuButton = (props) => {
	return (
		<li>
			<NavLink to={'/' + props.route} activeClassName={'active-menu'}>{props.name}</NavLink>
		</li>
	);
}

const menus = [
	{id: 0, name: 'Products', route: 'products'},
	{id: 1, name: 'Categories', route: 'category'},
	{id: 2, name: 'About', route: 'about'},
]

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
	
 	renderSwitch(i) {
		return (
			<Route path = {menus[i].route} key = {menus[i].id}>
				{'<' + menus[i].route + ' />'}
			</Route>
		);
	}
	
    render() {
        return (
			<Router>
				<div className="container-menu-main">
					<ul>
						<li>Admin menu</li>
						{menus.map((menu) => this.renderMenuButton(menu.id))}
					</ul>
					<Switch>
						{menus.map((menu) => this.renderSwitch(menu.id))}
					</Switch>					
				</div>
			</Router>
        )
	}
	
}

export default Menu;
