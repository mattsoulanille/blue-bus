class nextBustime {

	constructor(){
		this.bus = new busTime();
		this.busTimesInSeconds = null;
	}

	async getBusTimeInSeconds(){
		var times = await this.bus.getTimes();
		var timesInSeconds = [];

		for(var day in times){
			for(times[day][1]
		}


		return timesInSeconds;

	}

}

