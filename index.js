const axios = require('axios');
const cheerio = require('cheerio');

// const url = "https://news.ycombinator.com"
const url = "https://www.sandiegocounty.gov/content/sdc/hhsa/programs/phs/community_epidemiology/dc/2019-nCoV/status.html"


axios.get(url).then(response => {
	// console.log(response.data);
	getData(response.data)
}).catch(error => {
	console.log(error);
})

let getData = html => {
	data = [];
	const $ = cheerio.load(html);
	$('table td:nth-child(2)').each((i, elem) => {
		data.push({
			count : $(elem).text(),
			// count: $(elem).find('a.storylink').attr('href')
		});
	});
	console.log(data);
}