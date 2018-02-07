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
    	var trimmedSource = source.replace(/\s+/g, " ").trim();
		for (var valid_source in this.sources) {
		    if (this.sources[valid_source].has(trimmedSource) ) {
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

		function parseThInTable(table){
			var ths = arrayify(table.getElementsByTagName("th"));
			return ths;
		}

		function parseTdInTable(table) {
			var tds = arrayify(table.getElementsByTagName("td"));
			return tds;
		}

		function parseTrInTable(table) {
		    // Parses one table objecet
		    var rows = arrayify(table.getElementsByTagName("tr"));
		    var finalResult = [];
		    var ths = rows.slice(0,2).map(parseThInTable);
		    var tds = rows.slice(2,rows.length).map(parseTdInTable);
		    finalResult.push(ths);
		    finalResult.push(tds);
		    return finalResult;
		}



		function scrapePage(text) {

		    var parser = new DOMParser();
		    var parsedHTML = parser.parseFromString(text, "text/html");
		    var tables = arrayify(parsedHTML.body.getElementsByTagName("table"));
		    var parsed = tables.map(parseTrInTable)
		    var timeDictionary = {};
	    	var HaverfordTimes = [];
	    	var BrynMawrTimes = [];
		    for (var dayOfWeek in parsed){
		    	var HaverfordColumn;
		    	var BrynMawrColumn;
		    	for(var column in parsed[dayOfWeek][0][1]) {
		    		var source = this.getSource(parsed[dayOfWeek][0][1][column].innerText);
		    		if(source == "Haverford"){
		    			HaverfordColumn = column;
		    		}
		    		else if(source == "Brynmawr"){
		    			BrynMawrColumn = column;
		    		}
		    	}
		    	var dayTimes = parsed[dayOfWeek][1];
		    	for (var row in dayTimes){
		    		var HaverfordTime = String(dayTimes[row][HaverfordColumn].innerText.match((/([0-9]|[0-9][0-9]):[0-9][0-9]/g)));
		    		var BrynMawrTime = String(dayTimes[row][BrynMawrColumn].innerText.match((/([0-9]|[0-9][0-9]):[0-9][0-9]/g)));
		    		HaverfordTimes.push(HaverfordTime);
		    		BrynMawrTimes.push(BrynMawrTime);
		    	}
		    }
		    timeDictionary["Haverford"] = HaverfordTimes;
		    timeDictionary["BrynMawr"] = BrynMawrTimes;
		    return timeDictionary;
		};

		return new Promise(function(fulfill, reject) {



		    try {
			$.get(this.busUrl, function(response) {
			    //fulfill(response);

			    // see https://stackoverflow.com/questions/10585029/parse-a-html-string-with-js
			    // for parsing info

			    // Look at https://gist.github.com/WickyNilliams/9252235
			    var scraped = scrapePage.call(this, response);
			    fulfill(scraped);

			}.bind(this));
		    }
		    catch (e) {
			reject(e);
		    }
		}.bind(this));

	    }
}
