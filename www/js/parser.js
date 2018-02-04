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

    async getNextBus(school) {
	var buses = await this.getNextBuses(school, 1);
	return buses[0];
    }

    async getNextBuses(school, count) {
	if (this.times == null) {
	    await this.getTimes();
	}

	var times = this.times[school];

	var nowDate = moment();

	var now = {
	    days : nowDate.day(),
	    hours : nowDate.hours(),
	    minutes : nowDate.minutes()
	};

	var nowDates = times.map(function(time) {
	    var start = moment().startOf('week');
	    // Monday is 1, sunday is 0
	    start.add(time.days, "days");
	    start.add(time.hours, "hours");
	    start.add(time.minutes, "minutes");
	    return start;
	});


	var futureDates = times.map(function(time) {
	    var start = moment().startOf('week');
	    //start.add(1, "week");
	    start.add(time.days + 7, "days");
	    start.add(time.hours, "hours");
	    start.add(time.minutes, "minutes");
	    return start;
	});

	var dates = [...nowDates, ...futureDates];

	//https://thomaskekeisen.de/en/blog/array-date-sort-lodash-momentjs/
	//_.sortBy(dates, function(o) {return o.valueOf();});
	dates.sort(function(a,b) {
	    return a.valueOf() - b.valueOf();
	});


	var index = dates.length - 1;
	// edge cases!!! FIX ME
	while (dates[index].valueOf() > nowDate.valueOf()) {
	    index -= 1;
	}
	index += 1;
	index = index % dates.length;

	var nextBusTimes = [];
	for (var i = 0; i < count; i++) {
	    nextBusTimes.push(dates[index].toDate());
	    index += 1;
	}

	return nextBusTimes;
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
		var previous = [null,null,null,null,null,null];
		var switchAMtoPM = [0,0,0,0,0,0]; // Hacky as all hell

		var first = [true, true, true, true, true, true];
		todayTimes.forEach(function(table_row) {
		    var columnIndex = 0;
		    Object.keys(table_row).forEach(function(maybe_source) {
			
			var prev = previous[columnIndex];
			var source = this.getSource(maybe_source);
			if (source) {

			    // fix me
			    var unparsed_time = table_row[maybe_source];
			    var trimmed = unparsed_time.trim().replace(" ", " ");
			    // FIX for wednesday 8:45 AM bus
			    // This is horrible hacks
			    if (day == 3 && trimmed == "8:45 PM") {
				trimmed = "8:45 AM";
			    }
			    
			    var timePart = trimmed.match(/[0-9]+:[0-9]+/)[0];
			    var AMPM;
			    try {
				// In case they didn't put AM / PM, use a try block
				AMPM = trimmed.match(/[A|a|P|p][M|m]/)[0].toLowerCase();
			    }
			    catch (e) {
				var t = times[source];
				if (prev.AMPM == "pm") {
				    AMPM = "pm";
				}
			    }

			    if (first[columnIndex] && AMPM == "pm") {
				// in case the day starts in the afternoon
				switchAMtoPM[columnIndex] += 1;
				first[columnIndex] = false;
			    }

			    
			    var timeSplit = timePart.split(":");
			    var hours = Number(timeSplit[0]);
			    var minutes = Number(timeSplit[1]);

			    if ((AMPM == "pm") && (prev !== null) && (prev.AMPM == "am")) {
				switchAMtoPM[columnIndex] += 1;
				if (switchAMtoPM[columnIndex] > 1) {
				    AMPM = "am";
				}
			    }

			    if (switchAMtoPM[columnIndex] > 0) {
				if (AMPM == "pm" && hours != 12) {
				    // account for pm times 
				    hours += 12;
				}
				if (AMPM == "am") {
				    if (hours == 12) {
					// acout for 12am, 1am, 2am etc
					hours += 12;
				    }
				    else {
					hours += 24;
				    }
				}

			    }
			    
			    var parsed_time = {
				days: day,
				hours : hours,
				minutes : minutes,
				AMPM : AMPM
			    };

			    // write a sort function for this later
			    // Don't trust them!
			    previous[columnIndex] = parsed_time;
			    times[source].push(parsed_time);
			    columnIndex += 1;
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
