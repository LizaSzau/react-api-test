import React from 'react'

// ****************************************************************************
// About
// ****************************************************************************

const About = () => {
	return (
		<div className="container-main text">
			<h1>About</h1>
			<div className="container-text">
				I'm just learning ReactJs and this is my first app to examine the basic techniques.
				<h3>This app is not ready yet, it's under construction.</h3>
			</div>
			<div className="container">
				<h2>Backend</h2>
				<h3 className="sum">PHP, mySQL - Apache webserver</h3>
				I use an API to ensure the communication between the frontend and backend.
				This API is written in PHP, mySQL and hosted by my web hosting company.
				<br />Because it's my first API, it's based on this tutorial: {" "}     
				<a href="https://codeofaninja.com/2017/02/create-simple-rest-api-in-php.html" target="_blank" className="break" rel="noopener noreferrer">
					https://codeofaninja.com/2017/02/create-simple-rest-api-in-php.html
				</a>
				<br />I made some changes and new functionalities, e. g. ordering products, paging search result, 
				adding some missing possibilities to manage categories.
			</div>
			<div className="container">
				<h2>Frontend</h2>
				<h3 className="sum">ReactJs, SASS - AWS Amplify with GitHub</h3>
				The frontend is developed by ReactJs and hosted on AWS Amplify, 
				but I made a build version to test it on my Apache server localhost.
				<br />I started learning from this site and it was my main source: {" "}  
				<a href="https://reactjs.org/docs/getting-started.html" target="_blank" className="break" rel="noopener noreferrer">
					https://reactjs.org/docs/getting-started.html
				</a>
				<h3 className="height-20">Packages</h3>
				<ul>
					<li>
						React Router: {" "} 
						<a href="https://reactrouter.com/" target="_blank" className="break" rel="noopener noreferrer">
							https://reactrouter.com/
						</a>
					</li>
					<li>
						Axios - {" "} 
						<a href="https://www.digitalocean.com/community/tutorials/react-axios-react" target="_blank" className="break" rel="noopener noreferrer">
							https://www.digitalocean.com/community/tutorials/react-axios-react
						</a>
					</li>
					<li>
						React Promise Tracker - {" "} 
						<a href="https://lemoncode.github.io/react-promise-tracker" target="_blank" className="break" rel="noopener noreferrer">
							https://lemoncode.github.io/react-promise-tracker
						</a>
					</li>
					<li>
						Formik - {" "} 
						<a href="https://formik.org/" target="_blank" className="break" rel="noopener noreferrer">
							https://formik.org/
						</a>
					</li>
					<li>
						Yup - {" "} 
						<a href="https://www.npmjs.com/package/yup" target="_blank" className="break" rel="noopener noreferrer">
							https://www.npmjs.com/package/yup
						</a>
					</li>
					<li>
						Node SASS - {" "} 
						<a href="https://www.npmjs.com/package/node-sass" target="_blank" className="break" rel="noopener noreferrer">
							https://www.npmjs.com/package/node-sass
						</a>
					</li>
					<li>
						React Slugify - {" "} 
						<a href="https://www.npmjs.com/package/react-slugify" target="_blank" className="break" rel="noopener noreferrer">
							https://www.npmjs.com/package/react-slugify
						</a>
					</li>
					<li>
						React Number Format - {" "} 
						<a href="https://www.npmjs.com/package/react-number-format" target="_blank" className="break" rel="noopener noreferrer">
							https://www.npmjs.com/package/react-number-format
						</a>
					</li>
				</ul>
				<h3 className="height-20">UI</h3>
				Based on this tutorial: <br />
				<a href="https://codeofaninja.com/2015/06/php-crud-with-ajax-and-oop.html" target="_blank" className="break" rel="noopener noreferrer">
					https://codeofaninja.com/2015/06/php-crud-with-ajax-and-oop.html
				</a>
				<br />(This tutorial was written with jQuery.)
			</div>
		</div>
	)
}

export default About