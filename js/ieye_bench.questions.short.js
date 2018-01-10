/** 
	TASK CONFIGURATION FILE

	- id: task identificator
	- txt: text to be shown to user 
	- timeout: time slot allocated for the task; if 0 default applies (see ieye.bench.js var defaultTaskTimeout); seconds
	- activityTime: planned time for the user to carry out the activities; seconds
*/
	

var question = [
	{ 
		id: "Q-01", 
		txt: "Look left for 2 seconds.", 
		timeout: 5, 
		activityTime: 2 
	}, 
	{ 
		id: "Q-02", 
		txt: "Look on the top right corner of the screen for 5 seconds.", 
		timeout: 10, 
		activityTime: 5 
	}
];
