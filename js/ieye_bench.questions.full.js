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
	txt: "Cover the camera for 2 seconds",
	timeout: 8,
	activityTime: 2
}, 
{ 
	id: "Q-02",
	txt: "Cover the camera for 5 seconds",
	timeout: 8,
	activityTime: 5
}, 
{ 
	id: "Q-03",
	txt: "Cover your face with both hands for 5 seconds",
	timeout: 15,
	activityTime: 5
}, 
{ 
	id: "Q-04",
	txt: "Look what is under your table (3 sec)",
	timeout: 12,
	activityTime: 4
}, 
{ 
	id: "Q-05",
	txt: "Stand up for 5 seconds",
	timeout: 20,
	activityTime: 5
}, 
{ 
	id: "Q-06",
	txt: "Lean back and put your hands behind your neck for 5 seconds",
	timeout: 17,
	activityTime: 6
}, 
{ 
	id: "Q-07",
	txt: "Lean closer to the screen and immediately back",
	timeout: 12,
	activityTime: 2
}, 
{ 
	id: "Q-08",
	txt: "Open browser and navigate to www.weather.com. Return after the 'ding'. (15sec)",
	timeout: 20,
	activityTime: 15
}, 
{ 
	id: "Q-09",
	txt: "Open new browser tab and return to this after the 'ding'",
	timeout: 15,
	activityTime: 5
}, 
{ 
	id: "Q-10",
	txt: "Open some program window (e.g. My computer) on top of study window and return after the 'ding'",
	timeout: 12,
	activityTime: 6
}, 
{ 
	id: "Q-11",
	txt: "Feeling sleepy? Yawn and cover your mouth with a hand. (3 sec)",
	timeout: 11,
	activityTime: 3
}, 
{ 
	id: "Q-12",
	txt: "Grab the tip of your nose for 3 seconds",
	timeout: 10,
	activityTime: 3
}, 
{ 
	id: "Q-13",
	txt: "Rapidly lean back and forth until the 'ding' sounds",
	timeout: 18,
	activityTime: 11
}, 
{ 
	id: "Q-14",
	txt: "Reposition yourself in the chair",
	timeout: 10,
	activityTime: 2
}, 
{ 
	id: "Q-15",
	txt: "Scratch the top of your head (or nape) for 3 seconds",
	timeout: 10,
	activityTime: 3
}, 
{ 
	id: "Q-16",
	txt: "Scratch the lower part of your left leg for 2 seconds",
	timeout: 10,
	activityTime: 2
}, 
{ 
	id: "Q-17",
	txt: "Slowly lean back and stay for about 2 seconds",
	timeout: 13,
	activityTime: 5
}, 
{ 
	id: "Q-18",
	txt: "Tilt your body to the left and stay for 3 seconds",
	timeout: 14,
	activityTime: 3
}, 
{ 
	id: "Q-19",
	txt: "Tilt your body to the right and return immediately",
	timeout: 10,
	activityTime: 2
}, 
{ 
	id: "Q-20",
	txt: "Tilt your head to the right for 3 seconds",
	timeout: 8,
	activityTime: 3
}, 
{ 
	id: "Q-21",
	txt: "Check if there is a HDMI port on the laptop",
	timeout: 15,
	activityTime: 6
}, 
{ 
	id: "Q-22",
	txt: "Draw a square on the paper",
	timeout: 13,
	activityTime: 6
}, 
{ 
	id: "Q-23",
	txt: "Write down 5 keys left from letter 'A', focus back to the screen only after the 'ding'.",
	timeout: 20,
	activityTime: 10
}, 
{ 
	id: "Q-24",
	txt: "Write down a sentence about weather",
	timeout: 26,
	activityTime: 15
}, 
{ 
	id: "Q-25",
	txt: "Write down 'I love Intellieye!'",
	timeout: 20,
	activityTime: 12
}, 
{ 
	id: "Q-26",
	txt: "Look straight up to the ceiling for 8 seconds",
	timeout: 17,
	activityTime: 8
}, 
{ 
	id: "Q-27",
	txt: "Tilt your head back for 5 seconds (face ceiling)",
	timeout: 12,
	activityTime: 5
}, 
{ 
	id: "Q-28",
	txt: "Tilt your head back for 2 seconds (face ceiling)",
	timeout: 7,
	activityTime: 2
}, 
{ 
	id: "Q-29",
	txt: "Look down for 3 seconds",
	timeout: 10,
	activityTime: 3
}, 
{ 
	id: "Q-30",
	txt: "Look half-left and return",
	timeout: 10,
	activityTime: 2
}, 
{ 
	id: "Q-31",
	txt: "Look half-right and stay for about 5 seconds",
	timeout: 12,
	activityTime: 5
}, 
{ 
	id: "Q-32",
	txt: "Look left for 2 seconds",
	timeout: 8,
	activityTime: 2
}, 
{ 
	id: "Q-33",
	txt: "Look left for 8 seconds",
	timeout: 18,
	activityTime: 8
}, 
{ 
	id: "Q-34",
	txt: "Look on the top right corner of your screen for 5 seconds",
	timeout: 12,
	activityTime: 5
}, 
{ 
	id: "Q-35",
	txt: "Look over your right shoulder",
	timeout: 8,
	activityTime: 2
}, 
{ 
	id: "Q-36",
	txt: "Look right for 10 seconds",
	timeout: 20,
	activityTime: 10
}, 
{ 
	id: "Q-37",
	txt: "Look right for 3 seconds",
	timeout: 10,
	activityTime: 3
}, 
{ 
	id: "Q-38",
	txt: "Look right for 5 seconds",
	timeout: 15,
	activityTime: 5
}, 
{ 
	id: "Q-39",
	txt: "Check your phone for 10 seconds",
	timeout: 22,
	activityTime: 10
}, 
{ 
	id: "Q-40",
	txt: "Check your phone, return after the 'ding'",
	timeout: 14,
	activityTime: 7
}, 
{ 
	id: "Q-41",
	txt: "Face the camera and take a sip from the cup until you hear the 'ding'.",
	timeout: 17,
	activityTime: 4
}, 
{ 
	id: "Q-42",
	txt: "Take a sip from the cup while turning away from the camera, return it after the 'ding'",
	timeout: 15,
	activityTime: 4
}, 
{ 
	id: "Q-43",
	txt: "Rest your eyes for 5 seconds (close them)",
	timeout: 10,
	activityTime: 5
}, 
{ 
	id: "Q-44",
	txt: "Scratch your left cheek for 3 seconds",
	timeout: 10,
	activityTime: 3
}, 
{ 
	id: "Q-45",
	txt: "Sit still and face the camera for 5 seconds",
	timeout: 12,
	activityTime: 5
}, 
{ 
	id: "Q-46",
	txt: "Cover the left side of your face with left hand over cheek and eye",
	timeout: 10,
	activityTime: 3
}, 
{ 
	id: "Q-47",
	txt: "Look up and return immediately",
	timeout: 7,
	activityTime: 2
}, 
{ 
	id: "Q-48",
	txt: "Look around in the room to every direction",
	timeout: 12,
	activityTime: 5
}, 
{ 
	id: "Q-49",
	txt: "Grab your ears with both of your hands for 3 seconds",
	timeout: 12,
	activityTime: 3
}, 
{ 
	id: "Q-50",
	txt: "Stare at the camera for 3 seconds",
	timeout: 10,
	activityTime: 3
}
];
