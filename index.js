const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://www.sandiegocounty.gov/content/sdc/hhsa/programs/phs/community_epidemiology/dc/2019-nCoV/status.html"


axios.get(url).then(response => {
	getData(response.data)
}).catch(error => {
	console.log(error);
})

let getData = html => {
	data = new Map();
	const $ = cheerio.load(html);
	$('table tr:nth-child(22) td:nth-child(2)').each((i, elem) => {
		data.set("deaths_count", $(elem).text());
	});
	$('table tr:nth-child(22) td:nth-child(3)').each((i, elem) => {
		data.set("deaths_%", $(elem).text());
	});
	$('table tr:nth-child(22) td:nth-child(4)').each((i, elem) => {
		data.set("deaths_increase", $(elem).text());
	});
	const now = Date.now()
	data.set("timestamp", now);
	const date = new Date(now);
	data.set("date", `${String(date.getMonth()+1).padStart(2, 0)}/${String(date.getDate()).padStart(2, 0)}/${date.getFullYear()}`);
	console.log(data);
}