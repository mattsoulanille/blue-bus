// See https://medium.freecodecamp.org/client-side-web-scraping-with-javascript-using-jquery-and-regex-5b57a271cb86
// for details and ideas about how this was written

class busTime {
    constructor() {
		this.times = null;
		this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		this.sources = {
		    Brynmawr : new Set(["Leaves BMC", "Leave Bryn Mawr", "Bryn Mawr to Haverford"]),
		    Haverford : new Set(["Leave Haverford", "Haverford to Bryn Mawr", "Leaves Stokes"])
		};
		this.busUrl = "http://www.brynmawr.edu/transportation/bico.shtml";
    }
    getSource(source) {

		for (var valid_source in this.sources) {
		    if (this.sources[valid_source].has(source) ) {
			return valid_source;
		    }
		}
		return null;
    }


    getTimes() {


		// Adapted from https://gist.github.com/WickyNilliams/9252235
		function arrayify(htmlTable) {
		    return Array.prototype.slice.call(htmlTable);
		}


		function parseTable(table) {
		    // Parses one table objecet
		    var realHeadings = arrayify(table.tHead.rows).map(function(heading) {
				return heading.innerText;
		    });

		    var day = realHeadings[0].trim();

		    var blueBusHeadings = realHeadings[1].replace(/ +/g, " ").trim().split("\n").map(function(untrimmed) {
				return untrimmed.trim();
		    });

		    var parsedTable = arrayify(table.tBodies[0].rows).map(factory(blueBusHeadings));

		    // var out = {};
		    // out[day] = parsedTable;
		    // return out;
		    return [day, parsedTable];
		}
		function factory(headings) {
		    return function(row) {
			return arrayify(row.cells).reduce(function(prev, curr, i) {
			    prev[headings[i]] = curr.innerText;
			    return prev;
			}, {});
		    };
		}


		function scrapePage(text) {

		    var parser = new DOMParser();
		    var parsedHTML = parser.parseFromString(text, "text/html");
		    var tables = arrayify(parsedHTML.body.getElementsByTagName("table"));
		    var parsed = tables.map(parseTable)

		    return parsed;
		}

		return new Promise(function(fulfill, reject) {



		    try {
			$.get(this.busUrl, function(response) {
			    //fulfill(response);

			    // see https://stackoverflow.com/questions/10585029/parse-a-html-string-with-js
			    // for parsing info

			    // Look at https://gist.github.com/WickyNilliams/9252235
			    var scraped = scrapePage(response);
			    fulfill(scraped);

			}.bind(this));
		    }
		    catch (e) {
			reject(e);
		    }
		}.bind(this));

	    }
}
