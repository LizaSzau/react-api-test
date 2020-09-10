/*export   const characters = [
    {
		name: 'Charlie',
        job: 'Janitor',
    },
    {
        name: 'Mac',
        job: 'Bouncer',
    },
    {
        name: 'Dee',
        job: 'Aspring actress',
    },
    {
        name: 'Dennis',
        job: 'Bartender',
    },
]
	
export default {
    characters,
}*/

import React, { Component } from "react";

async function charactersJson () 
{
	const url = 'https://oszirozsa.hu/product/read.php';
    const res = await fetch(url);
    const json = await res.json();
	
	//alert(JSON.stringify(json))
    return json;
}
