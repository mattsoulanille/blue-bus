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
    }

    getSource(source) {
	
	for (var valid_source in this.sources) {
	    if (this.sources[valid_source].has(source) ) {
		return valid_source;
	    }
	}
	return null;
    }

    compareTimes(a,b) {
	// returns true iff a happens after b
	// Days
	if (a.days < b.days) {
	    return false;
	}
	if (a.days > b.days) {
	    return true;
	}


	// Hours
	if (a.hours < b.hours) {
	    return false;
	}
	if (a.hours > b.hours) {
	    return true;
	}

	// Minutes
	if (a.minutes < b.minutes) {
	    return false;
	}
	if (a.minutes > b.minutes) {
	    return true;
	}
	return false;
    }
    
    async getNextBus(school) {
	if (this.times == null) {
	    await this.getTimes();
	}
	var times = this.times[school];

	var nowDate = new Date();

	var now = {
	    days : nowDate.getDay(),
	    hours : nowDate.getHours(),
	    minutes : nowDate.getMinutes()
	};

	var index = times.length - 1;	
	var closest = times[index];
	// edge cases!!! FIX ME
	while (!this.compareTimes(now, times[index]) && times[index]) {
	    index -= 1;
	}
	index += 1;
	index = index % times.length;

	var nextTime = times[index];
	
	// This introduces a bunch of edge cases fix plz
	var nextBus = new Date(nowDate.getYear(),
			       nowDate.getMonth(),
			       nextTime.days,
			       nextTime.hours,
			       nextTime.minutes,
			       0);
	return nextBus;

    }

    
    getTimes(busUrl) {


	// Adapted from https://gist.github.com/WickyNilliams/9252235
	function arrayify(thing) {
	    return Array.prototype.slice.call(thing);
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
	    var parsed = tables.map(parseTable);
	    
	    return parsed;
	}


	var parseTime = function(scraped) {
	    // Parses one of their times : "11:30 PM" etc
	    

	}.bind(this);
	
	var parseTimes = function(scraped) {

	    var times = {};
	    Object.keys(this.sources).forEach(function(source) {
		times[source] = [];
	    });

	    // Because they include "Saturday Night"
	    var dayMap = {
		"Monday" : 1,
		"Tuesday" : 2,
		"Wednesday" : 3,
		"Thursday" : 4,
		"Friday" : 5,
		"Saturday" : 6,
		"Saturday Night" : 6,
		"Sunday" : 0
	    };

	    scraped.forEach(function(timeArray) {
		var day = dayMap[timeArray[0]];

		var todayTimes = timeArray[1];

		todayTimes.forEach(function(table_row) {
		    Object.keys(table_row).forEach(function(maybe_source) {


			var source = this.getSource(maybe_source);
			if (source) {

			    // fix me
			    var unparsed_time = table_row[maybe_source];
			    var trimmed = unparsed_time.trim().replace(" ", " ");
			    var timePart = unparsed_time.match(/[0-9]+:[0-9]+/)[0];
			    var AMPM;
			    try {
				AMPM = unparsed_time.match(/[A|a|P|p][M|m]/)[0].toLowerCase();
			    }
			    catch (e) {
				var t = times[source];
				if (t[t.length - 1].hours >= 12) {
				    AMPM = "pm";
				}
			    }

			    var timeSplit = timePart.split(":");
			    var hours = Number(timeSplit[0]);
			    var minutes = Number(timeSplit[1]);
			    
			    if (AMPM == "pm") {
				hours += 12;
			    }
			    var parsed_time = {
				days: day,
				hours : hours,
				minutes : minutes
			    };

			    // write a sort function for this later
			    // Don't trust them!
			    times[source].push(parsed_time);
			}

		    }.bind(this));
		    
		}.bind(this));
		
	    }.bind(this));
	    return times;
	}.bind(this);
	
	return new Promise(function(fulfill, reject) {
	    
	    if (typeof busUrl == "undefined") {
		
		busUrl = "http://www.brynmawr.edu/transportation/bico.shtml";
		//busUrl = "http://www.whateverorigin.org/get?url=" + encodeURIComponent(busUrl) + '&callback=?';
	    }
	    
	    try {
		$.get(busUrl, function(response) {
		    //fulfill(response);
		    
		    // see https://stackoverflow.com/questions/10585029/parse-a-html-string-with-js
		    // for parsing info
		    
		    // Look at https://gist.github.com/WickyNilliams/9252235
		    var scraped = scrapePage(response);
		    var times = scraped;

		    var parsed_times = parseTimes(times);
		    this.times = parsed_times;
		    fulfill([parsed_times, times]);
		    
		}.bind(this));
	    }
	    catch (e) {
		reject(e);
	    }
	}.bind(this));
	
    }
}


    

