#IntelliEye Benchmark Tool

IntelliEye Benchmark Tool (BT) is a JavaScript-based tool that allows to carry out user studies where users have to perform certain tasks in a timely manner, and collect user performance data at set interval. The focus on the IntelliEye BT is on user face/eye-gaze detection studies. The tool can be initiated with a set of tasks with assigned time-slots. After initiation the tasks are shown to users in a random order. 

Present implementation of the IntelliEye BT is set to use WebGazer.js (an eye tracking library that uses common webcams to infer the eye-gaze but also allows to capture face coordinates through the exploitation of included trackers) to detect face presence (through tracking.js implementation included in WebGazer.js) and user eye-gaze on the screen (using the included clmtracker). Collected log contains specific captured from the system.

The IntelliEye BT was initially developed for the IntelliEye project pilot study on xMOOC user behaviour in front of webcam to explore capabilities of different JavaScript-based libraries for face/eye detection. 

The IntelliEye BT has been established in cooperation between Tallinn University of Technology (TTÜ) and TU Delft.

##Features
- Presentation of custom tasks in random order with differentiated allocated time slots
- Sound-effects to notify participant of task start and end 
- Pre-study participant-related questions
- Study configuration (calibration)
- Clearly visible task
- Timer of elapsed time
- Visual progress bar
- Auto-experiment ID if you forget to add one
- Downloadable log file in CSV
