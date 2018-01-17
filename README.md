# IntelliEye xMOOC Benchmark Tool

IntelliEye Benchmark Tool (BT) is a Web application that allows to carry out user studies where participants have to perform certain tasks in a timely manner in front of a Webcam, and collect participant performance data into a log at a set interval.

This application was developed to investigate several eye- and face-tracking libraries that make use of a Webcam feed, and has been used in <a href="#ref-1">[1]</a> for attention tracking in online learning. The IntelliEye BT is developed using JavaScript, jQuery, CSS, and  runs entirely on user machine in browser environment. The application can be initiated with a custom set of tasks (50 benchmark tasks described in <a href="#ref-1">[1]</a> are included) with assigned time-slots. After initiation the tasks are shown to users in a random order. 

The present implementation of the IntelliEye BT uses WebGazer.js (an eye tracking library that uses common webcams to infer the eye-gaze but also allows to capture face coordinates through the exploitation of included trackers) to detect face presence (through tracking.js implementation included in WebGazer.js and clmtrackr face detection features) and user eye-gaze on the screen (using the included clmtrackr). Collected log contains specific metrics captured from the system, as described below.

The IntelliEye BT has been established in cooperation between Tallinn University of Technology (TTÜ) and TU Delft.

If you find this application useful, please cite the following paper: 

<a name="ref-1">[1] Tarmo Robal, Yue Zhao, Christoph Lofi and Claudia Hauff. "Webcam-based Attention Tracking in Online Learning: A Feasibility Study", IUI 2018: The 23rd ACM International Conference on Intelligent User Interfaces, Tokyo, Japan (accepted full paper)

```
@inproceedings{RobalZhaoLofiHauffIUI2018,
  title={Webcam-based Attention Tracking in Online Learning: A Feasibility Study},
  author={Robal, Tarmo and Zhao, Yue and Lofi, Christoph and Hauff, Claudia},
  booktitle={Proceedings of the 23rd ACM International Conference on Intelligent User Interfaces (IUI'18)},
  pages={},
  year={2018},
  organization={ACM}
}
```

## Architecture
The high-level architecture of IntelliEye BT is described on the figure below. The IntelliEye BT web application depends on [WebGazer](https://github.com/brownhci/WebGazer) and [jQuery](https://jquery.com).
<p><a href="/img/intellieye_bt_arch.png"><img src="https://github.com/trx350/xMOOC_benchmark/blob/master/img/intellieye_bt_arch.png" alt="IntelliEye Benchmark Tool High-Level Architecture" width="700" height="223"></a></p>

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

## Setup & Run
<ol>
<li>You need a locally running or hosted web server to run IntelliEye BT. For example, <a href="http://httpd.apache.org">Apache HTTP Server</a>, which was also used for the development of this web application. Yet, IntelliEye BT is web server independent, and you should be able to run it on any web server. 
<br />	
IntelliEye BT can be run:
<ul>
	<li>on local machine having a locally running web server,</li>
	<li>on a hosted web server, where requests need to be done over https (required by WebGazer).</li>
</ul>
</li>
<li>Download the project files as shown by the structure below (minimum setup).
	<pre>start.html
	|- audio
	|- css  
	|- img
	|- js
	|- lib
	 </pre>
</li>
<li>Fulfill pre-requisites:
  <ul>
	  <li>Obtain <a href="https://github.com/brownhci/WebGazer/blob/master/build/webgazer.min.js">webgazer.min.js</a> and place in the "lib" folder.</li>
	  <li>Obtain <a href="https://jquery.com">jQuery</a>, rename to jquery.min.js as necessary, and place in the "lib" folder. Preferred version: jquery-3.2.0.min.js.</li>
	</ul>
</li>
<li>Access start.html in your web server through your browser (Chrome, Firefox, Opera have been tested) to run IntelliEye BT web app, e.g. https://yourWebServerAddress/IntelliEyeBT/start.html (hosted web server), or http://localhost/IntelliEyeBT/start.html (web server running on local machine). </li>
</ol>

After successful setup (steps 1-4) you should see the Start/Intro screen shown on the figure below. 

<a href="/img/ieye_bt_scr1.png"><img src="https://github.com/trx350/xMOOC_benchmark/blob/master/img/ieye_bt_scr1x200.png" alt="IntelliEye Benchmark Tool in action"></a>

For a debug-view with a webcam videofeed and live face/gaze-detection, add to url the following parameter: `"?view=y"`.

The log file in CSV is produced at the end of the experiment session and <a href="/img/ieye_bt_scr3.png">offered for download</a> in the browser window.

## How to change the tasks?
IntelliEye BT comes with 50 benchmark tasks described in <a href="#ref-1">[1]</a> established and used for xMOOC user behaviour studies. These tasks describe potential behaviour of xMOOC users in front of webcam while following the MOOC videos. 

To change the tasks modify the [/js/ieye_bench.questions.full.js](/js/ieye_bench.questions.full.js) file. The file is structured as JSON. Instructions are provided in the header.

A setup with only 2 tasks for experiments is provided with the [/js/ieye_bench.questions.short.js](/js/ieye_bench.questions.short.js) file.

## How to change the GUI?
To change the title, start/intro screen, the screen for calibration step, and end messages modify the HTML in: [ieye.bench.screencontent.js](/js/ieye.bench.screencontent.js).

To change the look modify the following file: [/css/ieye.bench.css](/css/ieye.bench.css). 

## Replacing the library used for face/eye detection
The present implementation of the IntelliEye BT is set to use WebGazer.js. To change the library used, you need to modify the following file: [/js/ieye_bench.js](/js/ieye_bench.js). It is advised to set up a function to initialize a library and also set up a global object reference. Then follow the pattern used for clmtrackr and tracking.js in the [/js/ieye_bench.js](/js/ieye_bench.js) file. A good starting point is to look at or modify these methods:
 - The initialization of the Webgazer with clmtrackr is called in function `initializeWg()`; the tracker object reference is globally held in `var wgcl`.
 - The initialization of the tracking.js library is  called in function `initTrackerJs()`; the tracker object reference is globally held in `var trackerTaskReference`.

## Log format and fields
The IntelliEye BT produces a local log file in CSV (Comma Separated Values) format, where semicolon (";") is used as a separator. Each record in the log is presented as a single row.

Each row in the log consists of the following fields in the following order:
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

## Remarks
This package is provided as is. Use at own risk.
