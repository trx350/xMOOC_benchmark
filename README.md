# IntelliEye Benchmark Tool

IntelliEye Benchmark Tool (BT) is a JavaScript-based tool that allows to carry out user studies where users have to perform certain tasks in a timely manner, and collect user performance data at a set interval. The focus on the IntelliEye BT is on user face/eye-gaze detection studies. The tool can be initiated with a set of tasks with assigned time-slots. After initiation the tasks are shown to users in a random order. 

Present implementation of the IntelliEye BT is set to use WebGazer.js (an eye tracking library that uses common webcams to infer the eye-gaze but also allows to capture face coordinates through the exploitation of included trackers) to detect face presence (through tracking.js implementation included in WebGazer.js and clmtrackr face detection features) and user eye-gaze on the screen (using the included clmtrackr). Collected log contains specific metrics captured from the system.

The IntelliEye BT was initially developed for the IntelliEye project pilot study on xMOOC user behaviour in front of webcam to explore capabilities of different JavaScript-based libraries for face/eye detection. 

The IntelliEye BT has been established in cooperation between Tallinn University of Technology (TTÜ) and TU Delft.

## Features
- Presentation of custom tasks in random order with differentiated allocated time slots
- Sound-effects to notify participant of task start and end 
- Pre-study participant-related questions
- Study configuration (calibration)
- Clearly visible task
- Timer of elapsed time
- Visual progress bar
- Auto-experiment ID if you forget to add one
- Downloadable log file in CSV

<a href="/img/ieye_bt_scr1.png"><img src="https://github.com/trx350/xMOOC_benchmark/blob/master/img/ieye_bt_scr1x200.png" alt="IntelliEye Benchmark Tool in action"></a>
<a href="/img/ieye_bt_scr2.png"><img src="https://github.com/trx350/xMOOC_benchmark/blob/master/img/ieye_bt_scr2x200.png" alt="IntelliEye Benchmark Tool in action"></a>
<a href="/img/ieye_bt_scr3.png"><img src="https://github.com/trx350/xMOOC_benchmark/blob/master/img/ieye_bt_scr3x200.png" alt="IntelliEye Benchmark Tool in action"></a>

## Prerequisites
1. [jQuery](https://jquery.com), download and place in folder, rename to jquery.min.js. Preferred version: jquery-3.2.0.min.js.
2. [WebGazer](https://github.com/brownhci/WebGazer): in particular the minified library [webgazer.min.js](https://github.com/brownhci/WebGazer/blob/master/build/webgazer.min.js) 

Download these files and place them in the "lib" folder. These files are not provided for you herein.

## Setup
1. Download the project files as shown  by the structure below.
2. Obtain [webgazer.min.js](https://github.com/brownhci/WebGazer/blob/master/build/webgazer.min.js) and place  in the "lib" folder.
3. Obtain [jQuery](https://jquery.com), rename to jquery.min.js as necessary, and place in the "lib" folder.

### Project structure
<pre>start.html
|- audio
|- css  
|- img
|- js
|- lib
 </pre>
Configuration notes are provided within the files whenever necessary.

## How to run?
You can run IntelliEye BT on local machine having a locally running web server, or on a hosted web server over https (required by WebGazer).
Run it by accessing start.html on your web server resource.
For debug-view add to url "?view=y".

## Log format and fields
The IntelliEye BT produces a local log file in CSV; semicolon used as a separator. The log contains the following fields:
- logRecordNo - log record identificator (integer);
- experimentID - experiment identificator (string);
- current_task_id - task identificator (string);
- recordTime - record timestamp;
- recordTimeMS70 - record timestamp since 1970 (integer);
- logSampleRate - rate of taking log samples (milliseconds);
- predictionRate - prediction acquiry rate from webgazer; milliseconds;
- glasses - participant eye-wear (0- none, 1 - glasses, 2 - lenses);
- bg - background behind participant in camview (0 - solid-light, 1 - solid black or dark colour, 2 - mixed 2D graphics wall or other mixed, 3 - poster, photo, painting or similar);
- calibrated - whether webgazer eye-gaze calibration was applied (0 - no calibration, 1 - calibrated);
- lightLevel - ligh level identified in room (0 - natural and sufficient, 1 - natural, but not sufficient (dark), 2 - artificial general light, 3 - on-spot);
- timeIntoSurvey - time since survey task part was initialized (milliseconds);
- taskStartTime - task start timestamp since 1970 (integer);
- taskStartH - task start timestamp, human-readable;
- timeIntoTask - time into performing presented tasks (integer);
- taskDuration - task duration set in task configuration file (seconds);
- taskActive - task active slot identificator (0 - not active, 1 - active);
- "clm tjs focus visible mousemove loghasScroll leftpup rightpup" - detection string of webgazer eye-gaze (clm), trackinjs face presence (tjs), window/tab focus (focus), window/tab visibility (visible), mouse coordinates change (mousemove), scrolling detection (loghasScroll), left eye pupil (leftpup), right eye pupil (rightpup), (0 - no detection, 1 - detection);
 - coord clm - eye-gaze coordinates predicted by webgazer with clmtrackr;
 - coord tjs - detected coordinates of face-frame by trackingjs;
 - coord mouse - mouse cursor coordinates;
 - c_face_p0 - clmtrackr face model coordinate point #0 (https://github.com/auduno/clmtrackr);
 - c_face_p7 - clmtrackr face model coordinate point #7 ;
 - c_face_p14 - clmtrackr face model coordinate point #14 ;
 - c_eye_pupil_right - clmtrackr face model coordinate point #27 ;
 - c_eye_pupil_left - clmtrackr face model coordinate point #32 ;
 
 ## Publications
Tarmo Robal, Yue Zhao, Christoph Lofi and Claudia Hauff. "Towards Real-time Webcam-based Attention Tracking in Online Learning", IUI 2018: The 23rd ACM International Conference on Intelligent User Interfaces, Tokyo, Japan (accepted full paper)

## Remarks
This package is provided as is. Use at own risk.
