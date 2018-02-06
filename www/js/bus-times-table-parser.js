class nextBustime {

	constructor(){
		this.bus = new busTime();
		this.busTimesInSeconds = null;
	}

	async getBusTimeInSeconds(){
		var times = await this.bus.getTimes();
		

	}

}

