class nextBusTime {

	constructor(){
		this.bus = new busTime();
		this.busTimesInSeconds = null;
	}

	async getNextBusIndex(school){
		if(this.busTimesInSeconds == null){
			await this.getBusTimeInSeconds();
		}
		var times = this.busTimesInSeconds[school];
		var now = new Date();
		var day = now.getDay();
		day = ((day-1)+7)%7;
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();
		var totalSeconds = day*(24*60*60) + hours*(60*60) + minutes*60 + seconds;
		for(var i = 0; i < times.length;i++){
			if(times[i]>totalSeconds){
				return i;
			}
		}
		if(i==times.length){
			return 0;
		}
	}

	async getNextBuses(school, num_buses){
		var nextBusIndex = await this.getNextBusIndex(school);
		var num_times = this.busTimesInSeconds[school].length;
		var times = [];
		var now = new Date();
		for(var i=0; i< num_buses;i++){
			times.push(this.busTimesInSeconds[school][(nextBusIndex+i)%num_times]);
		}
		return times;
	}

	async getBusTimeInSeconds(){
		var timeDictionary = {};
		var times = await this.bus.getTimes();
		var BMCTimesInSeconds = [];
		var HCTimesInSeconds = [];
		var secondsInMinute = 60;
		var secondsInHour = secondsInMinute*60;
		var secondsInDay = secondsInHour*24;
		var BMC_day = 0;
		var BMC_AM = 0;
		var HC_day = 0;
		var HC_AM  = 0;
		var BMCprev_mod = 0;
		var HCprev_mod = 0;
		var BMCseenSecondMonday = false;
		var HCseenSecondMonday = false;
		for (var row in times["BrynMawr"]){
			//We know that all of the times are of form dd:dd
			var BMCSplitTime = times["BrynMawr"][row].split(":");
			var HCSplitTime = times["Haverford"][row].split(":");
			if((BMCSplitTime[0] % 12) < BMCprev_mod){
				BMC_AM = BMC_AM + 1;
				if(BMC_AM % 2 == 0){
					BMC_day = BMC_day + 1;
					if(BMC_day==7){
						BMC_day = 0;
						BMCseenSecondMonday = true;
					}
				}
			}
			BMCprev_mod = BMCSplitTime[0] % 12;
			var BMCTimeInSeconds = BMC_day*secondsInDay + ((Number(BMCSplitTime[0])%12) + (BMC_AM % 2)*12)*secondsInHour + Number(BMCSplitTime[1])*secondsInMinute;
			if(BMCseenSecondMonday){
				BMCTimesInSeconds.unshift(BMCTimeInSeconds);
			}
			else{
				BMCTimesInSeconds.push(BMCTimeInSeconds);
			}
			if((HCSplitTime[0] % 12) < HCprev_mod){
				HC_AM = HC_AM + 1;
				if(HC_AM % 2 == 0){
					HC_day = HC_day + 1;
					if(HC_day == 7){
						HC_day = 0;
						HCseenSecondMonday = true;
					}
				}
			}
			HCprev_mod = HCSplitTime[0] % 12;
			var HCTimeInSeconds = HC_day*secondsInDay + ((Number(HCSplitTime[0])%12) + (HC_AM % 2)*12)*secondsInHour + Number(HCSplitTime[1])*secondsInMinute;
			if(HCseenSecondMonday){
				HCTimesInSeconds.unshift(HCTimeInSeconds);
			}
			else{
				HCTimesInSeconds.push(HCTimeInSeconds);
			}
		}
		timeDictionary["Haverford"] = HCTimesInSeconds;
		timeDictionary["BrynMawr"] = BMCTimesInSeconds;
		this.busTimesInSeconds = timeDictionary;
	}

}
