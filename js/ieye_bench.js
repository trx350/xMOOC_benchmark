/** 
	*** iEye Benchmark tool main script ***
	
	This script depends on:
	 - jQuery (developed for version 3.2.0) https://jquery.com
	 - WebGazer https://github.com/brownhci/WebGazer -> https://github.com/brownhci/WebGazer/blob/master/build/webgazer.min.js
	 - wg.mod.js
	 
	 - Main setup through constants in section SETUP VARIABLES
	 - Refer to function initializeWg() for webgazer setup
	 - Refer to function initTrackerJs() for tracking.js setup
*/
"use strict";

$(document).ready(function() {
	
	/** 
	 * SETUP VARIABLES 
	 * Change the values of constants if necessary	
	 */
	const H1_TITLE = screenContent.title;		// Study title in the UI; default taken from ieye.bench.screencontent.js
	const PREDICTION_RATE = 100;				// prediction acquiry rate; milliseconds
	const SUBJECT_HAS_GLASSES = 0;				// 0- none, 1 - glasses, 2 - lenses
	const SUBJECT_BACKGROUND = 0; 				// 0 - solid-light, 1 - solid black or dark colour, 2 - mixed 2D graphics wall or other mixed, 3 - poster, photo, painting or similar
	const SUBJECT_CALIBRATE = 0;				// 0 - no calibration, 1 - calibrated
	const SUBJECT_LIGHT_COND = 0;				// 0 - natural and sufficient, 1 - natural, but not sufficient (dark), 2 - artificial general light, 3 - on-spot
	const DEFAULT_TASK_TIMEOUT = 1; 			// default value on after how many seconds to present a new question, used only timeout not specified for a task; seconds
	const LOG_SAMPLE_RATE = 250; 				// interval for log capturing; milliseconds
	const TIME_TO_READ_TASK = 5; 				// time to read the task before start sound is played; seconds
	
	/* ---- end of changeable variables block ---- */ 
	
	var isCompatible = webgazer.detectCompatibility();	// check if the user's browser is compatible with webgazer
	var stage = "intro";			// study stage, possible values: intro, questions, fin
	var startTime = Date.now();		// start time of the experiment
	var stopperTimeoutRef;			// needed to stop the stopper
	
	/** 
	 * Gets a difference in milliseconds from the start and converts it into HH:MM:SS 
	 */
	var stopper = function() {		
		var diff = Date.now() - startTime;
		var x = new Date(null);
		x.setSeconds(Math.round(diff/1000)); // specify value for seconds here
		var stoppertime = zeroPadTo2(x.getMinutes()) + ":" + zeroPadTo2(x.getSeconds());
		$("#stopper").html(stoppertime);
		stopperTimeoutRef = setTimeout(stopper, 1000);
		return stopperTimeoutRef;
	}
	
	/* --- Test setup variables, values from constants above --- */
	var predictionRate = PREDICTION_RATE; 		
	var subjectGlasses = SUBJECT_HAS_GLASSES;		
	var subjectBackground = SUBJECT_BACKGROUND;
	var subjectCalibrate = SUBJECT_CALIBRATE;
	var subjectLight = SUBJECT_LIGHT_COND;
	
	/* --- Log variables below --- */
	var experimentID = "";			
	var lastTaskTimeOut = 0;
	var logTaskIntervalRef;								// reference to log interval variable to stop logging	
	var sampleRateStep_500 = 2;
	var sampleRateStep_1000 = 4;
	var logRecordNo = 0;
	var defaultTaskTimeout = DEFAULT_TASK_TIMEOUT;		
	var logSampleRate = LOG_SAMPLE_RATE; 
	var timeToReadTask = TIME_TO_READ_TASK;


	/* declare them as string variables as concat is faster than assignments into array */
	var log_clm_val, log_tjs_val, log_focus_val, log_mousemove_val, log_hidden_val, log_visibilitystate_val, log_visible_val;
	var c_clm = "", c_tjs = "", c_tjs2 = "", c_mouse = "";	//captured coordinates;

	var current_task_id, previous_task_id = "";
	var currentTaskDuration;
	var timeIntoTask, taskStartTime; 		// time since task was initialized; in ms; task starttime;
	var timeIntoSurvey; 					// time since survey task part was initialized; in ms
	/* --- end of log variables --- */
	
	var trackerTaskReference; 
	var tjsDetection = {x: "", y: "", width: "", height: "" };
	var taskActive = 0; // flag to log if there is a task active for a user to perform (between ring and ding)
		
	var mmoveCoords = {x: [0,0],y: [0,0]};
	var loghasScroll = 0;
	var winScrollHistory = [0,0];

	var wgcl;	//webgazer clmtracker reference
	var c_face_p0_x, c_face_p0_y, c_face_p7_x, c_face_p7_y, c_face_p14_x, c_face_p14_y, c_eye_p27_x, c_eye_p27_y, c_eye_p32_x, c_eye_p32_y;
	
	var 	log_right_pupil_val, log_left_pupil_val;
		
	/** 
	 * Get debug parameter(s) from the URL
	 */
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};
	
	/** 
	 * Whether to show debugging view or not
	 */
	var showCam = function () {
		if (getUrlParameter('view') == 'y') 
			return true;
		else 
			return false;
	};
	
	if (stage === "intro") {
		$("#instructions-box").html(screenContent.intro);
	}

	/**
	 * START button click  
	 * - sets everything ready and calls either calibration or starts presenting the tasks
	 */
	$("#start").click( function() {
		sessionStorage.clear();
		sessionStorage.setItem('logRow', '');  		// initialize logs in webstorage
		
		if (isCompatible === true) {			
			if ( checkFields() ) { 
				// handle experiment ID; necessary for log filename as well
				if ($("#expid").val() != "" ) experimentID = $("#expid").val();
				else {
					var d = new Date();
					var month = d.getMonth() + 1;
					experimentID = "EXP" + d.getDate() + "." + month + "." + d.getFullYear() + "." + d.getHours() + "." + d.getMinutes(); 
				} 

				// if set on initial start view form, reset default values to existing ones
				if ($("#prate").val() != predictionRate && $("#prate").val() != "") logSampleRate = $("#prate").val();
				if ($("#cond-optics").val() != subjectGlasses && $("#cond-optics").val() != "") subjectGlasses = $("#cond-optics").val();
				if ($("#cond-background").val() != subjectBackground && $("#cond-background").val() != "") subjectBackground = $("#cond-background").val();
				if ($("#cond-calibrate").val() != subjectCalibrate && $("#cond-calibrate").val() != "") subjectCalibrate = $("#cond-calibrate").val();
				if ($("#cond-light").val() != subjectLight && $("#cond-light").val() != "") subjectLight = $("#cond-light").val();
				
				if (subjectCalibrate == 0) {
					var docHeight = $(document).height();
					var docWidth = $(document).width();
					initializeWg();
					setTimeout(function () { webgazer.recordScreenPosition(docWidth/2,docHeight/2); }, 4500);	//imitate initial click to the center of screen
					wgcl = webgazer.getTracker().clm;
					setTimeout(doProceed, 4500);
				}
				else {
					stage = "calibrate";
					$("#instructions-box").html("");
					$("#instructions-box").html(screenContent.calibrate);
					initializeWg();
					setTimeout(autoCalibrate, 15000);
					wgcl = webgazer.getTracker().clm;
				}

			} 
		}
		else {
			alert("Unfortunately your browser is not compatible to be used with Intellieye. Compatible browsers are Mozilla Firefox 44+, Microsoft Edge 13+, Google Chrome 47+, Opera 36+.");
		}
	});
	
	
	/** 
	 *	Workaround to launch finish that is dynamically added later to the page
	 */
	$(document).on('click', '#btnfin', function() {
		var id = $(this).attr('id');
		if (id === 'btnfin') doFinish();
	});
	
	/** 
	 *	Workaround to launch doProceed() that is dynamically added later to the page
	 */
	$(document).on('click', '#btnproceed', function() {
		var id = $(this).attr('id');
		if (id === 'btnproceed') doProceed();
	});
	
	/**
	 *	Finishes study, stops stopper and provides log
	 */
	function doFinish () {
		stage = "fin";
		stopStopper();
		
		// Kill webgazer
		webgazer.pause();
		webgazer.clearGazeListener();
		webgazer.endAndStopNoStore();		// custom function to shut down webgazer and webcam
		window.localStorage.clear();
		
		// Kill clmtrackr,  otherwise it continues to run in the background, reset necessary before stop.
		var tracker = webgazer.getTracker();
		tracker.clm.reset();
		tracker.clm.stop();
		
		// Stop tracking.js and clear the canvas
		trackerTaskReference.stop(); // Stops the tracking
		if(document.getElementById('overlay-trackerjs')) {			// if overlay used, remove it as well
			var item = document.getElementById("overlay-trackerjs");
			item.parentNode.removeChild(item);
		}
		
		clearInterval(logTaskIntervalRef);
		$("#instructions-box").html("<h1>" + H1_TITLE + "</h1> " + screenContent.finalMessage);

		saveLog("logRow", "csv");
	}
	
	/**
	 *	Sets the stage of thew study for task presentation and calls task presenter
	 */
	function doProceed() {
		stage = "questions";
		$("#instructions-box").html("");
		startTime = Date.now();
		presentQuestions();	 // start presenting the tasks
	} 
	
	/**
	 *	Acquires metrics to be logged
	 *  - predictions from webgazer
	 *  - collects other metrics into log variables
	 */
	function acquireMetrics() {
		// webgazer standard prediction with ridge and clm
		var pos = wgcl.getCurrentPosition();
		var wgPrediction = webgazer.getCurrentPrediction();
		if (wgPrediction) {
			var x = wgPrediction.x;
			var y = wgPrediction.y;
			log_clm_val = 1;
			c_clm = x + "," + y;
		}
		else {
			log_clm_val = 0;
			c_clm = "NaN";
		}
		
		// default values; value reset 
		c_face_p0_x = 0; c_face_p0_y = 0; c_face_p7_x = 0; c_face_p7_y = 0; c_face_p14_x = 0; c_face_p14_y = 0; c_eye_p27_x = 0; c_eye_p27_y = 0; c_eye_p32_x = 0; c_eye_p32_y = 0;
		log_right_pupil_val = 0; log_left_pupil_val = 0;
	
		if (pos[0])  { c_face_p0_x =  Math.round(pos[0][0]);   c_face_p0_y =  Math.round(pos[0][1]);  }	// face right
		if (pos[7])  { c_face_p7_x =  Math.round(pos[7][0]);   c_face_p7_y =  Math.round(pos[7][1]);  }	// face left
		if (pos[14]) { c_face_p14_x = Math.round(pos[14][0]);  c_face_p14_y = Math.round(pos[14][1]); }	// chin btm
		if (pos[27]) { c_eye_p27_x =  Math.round(pos[27][0]);  c_eye_p27_y  = Math.round(pos[27][1]); log_right_pupil_val = 1;} // right eye
		if (pos[32]) { c_eye_p32_x =  Math.round(pos[32][0]);  c_eye_p32_y  = Math.round(pos[32][1]); log_left_pupil_val = 1} // left eye	
		
		//tracking.js facedetection 
		if (tjsDetection.x == "" || tjsDetection.y == "") {
			log_tjs_val = 0;
			c_tjs = "NaN";
			c_tjs2 = "";
		}
		else {
			log_tjs_val = 1;
			c_tjs = tjsDetection.x + "," + tjsDetection.y;
			var x2 = tjsDetection.x + tjsDetection.width;
			var y2 = tjsDetection.y + tjsDetection.height;
			c_tjs2 = x2 + "," + y2;
		}
		
		//window focus detection
		var hasFocus = document.hasFocus();
		if (hasFocus) log_focus_val = 1;
		else log_focus_val = 0;
		
		//mousemove determination
		if( mmoveCoords.x[0] != mmoveCoords.x[1] || mmoveCoords.y[0] != mmoveCoords.y[1] ) {
			log_mousemove_val = 1;
			mmoveCoords.x[1] = mmoveCoords.x[0];
			mmoveCoords.y[1] = mmoveCoords.y[0];
			c_mouse = mmoveCoords.x[0] + "," + mmoveCoords.y[0];
		} 
		else {
			log_mousemove_val = 0;
		}
		
		//window scroll determination
		if( winScrollHistory[0] !== winScrollHistory[1] ) {
			loghasScroll = 1;
			winScrollHistory[1] = winScrollHistory[0];
		}
		else {
			loghasScroll = 0;
			winScrollHistory[0] = 0;
		}
		
		//window or tab hidden and visibility values
		if (document.hidden) log_visible_val = 0;
		else log_visible_val = 1;		
	} 
	
	/**
	 *	Writes collected log into session storage
	 *  (will be downloaded into file at the end of experiment session)
	 */
	function writeLog() {
		timeIntoSurvey = Date.now() - startTime;
		if (previous_task_id != current_task_id || previous_task_id == "") {		// if task id changed
			taskStartTime = Date.now();
			previous_task_id = current_task_id;
		} 
		
		if (current_task_id == 'FIN') {		// autostop log, if the survey has become to an end state "FIN"
			clearInterval(logTaskIntervalRef);
		} 
		else {
			logRecordNo++;
			timeIntoTask = Date.now() - taskStartTime;

			acquireMetrics();		// get predictions
			var taskActiveTF = false;
			if (taskActive === 1) taskActiveTF = true;

			var logRow = logRecordNo + ";" 
						+ experimentID + ";"
						+ current_task_id + ";" 
						+ "\"" + getTimeString(Date.now(), true) + "\"" + ";" 
						+ Date.now() + ";"
						+ logSampleRate + ";" 
						+ predictionRate + ";" 
						+ subjectGlasses + ";" 
						+ subjectBackground + ";" 
						+ subjectCalibrate + ";" 
						+ subjectLight + ";"
						+ timeIntoSurvey + ";" 
						+ taskStartTime + ";" 
						+ getTimeString(taskStartTime, false) + ";"
						+ timeIntoTask + ";" 
						+ currentTaskDuration + ";"
						+ taskActiveTF + ";"
						+ "\""
						+ log_clm_val 
						+ log_tjs_val 
						+ log_focus_val 
						+ log_visible_val
						+ log_mousemove_val  
						+ loghasScroll
						+ log_left_pupil_val
						+ log_right_pupil_val
						+ "\"" + ";"
						+ c_clm + ";"
						+ "{" + c_tjs + "},{" + c_tjs2 + "}" + ";"
						+ c_mouse + ";"
						+ c_face_p0_x + ":" + c_face_p0_y + ";" 
						+ c_face_p7_x + ":" + c_face_p7_y + ";"  
						+ c_face_p14_x + ":" + c_face_p14_y + ";"  
						+ c_eye_p27_x + ":" + c_eye_p27_y + ";"  
						+ c_eye_p32_x + ":" + c_eye_p32_y + ";"  
						+ "\r\n";

			if (sessionStorage.logRow) {
				sessionStorage.logRow += logRow;
			} else {
				var logRowDescr = "logRecordNo" + ";" 
						+ "experimentID" + ";"
						+ "current_task_id" + ";" 
						+ "recordTime" + ";" 
						+ "recordTimeMS70" + ";" 
						+ "logSampleRate" + ";" 
						+ "predictionRate" + ";" 
						+ "glasses" + ";" 
						+ "bg" + ";" 
						+ "calibrated" + ";" 
						+ "lightLevel" + ";"
						+ "timeIntoSurvey" + ";" 
						+ "taskStartTime" + ";" 
						+ "taskStartH" + ";"
						+ "timeIntoTask" + ";" 
						+ "taskDuration" + ";"
						+ "taskActive" + ";"
						+ "\""
						+ "clm " 
						+ "tjs " 
						+ "focus " 
						+ "visible " 
						+ "mousemove " 
						+ "loghasScroll "
						+ "leftpup "
						+ "rightpup "
						+ "\"" + ";"
						+ "coord clm "  + ";"
						+ "coord tjs "  + ";"
						+ "coord mouse "  + ";"
						+ "c_face_p0" + ";" 
						+ "c_face_p7" + ";"  
						+ "c_face_p14" + ";"  
						+ "c_eye_pupil_right" + ";"  
						+ "c_eye_pupil_left" + ";"
						+ "\r\n";
				sessionStorage.logRow = logRowDescr;
				sessionStorage.logRow += logRow;
			}
		} 
	} 
	
	/** 
	 * Saves log data from session storage to textfile
	 */
	function saveLog(storageKey, extension) {
		var logData = sessionStorage.getItem(storageKey);
		saveTextAsFile(logData, experimentID + "." + storageKey + "." + extension);  //saveTextAsFile(textToSave, fileNameToSaveAs);
	} //f
	
	/**
	 *	Handles task presentation and scheduling
	 *   - presents tasks to participant
	 *   - shows end screen
	 */
	function presentQuestions() {
		if (stage === "questions") {
			var i;
			var shuffledArray = shuffleArray(question);	//arr loaded from ieye_bench.questions
			var finTaskTimeout = shuffledArray[shuffledArray.length-1].timeout + 10; // needed to properly schedule last task before FIN
			
/*			shuffledArray.push( { id: "FIN", txt: "<p style='text-align:center;'>Thank you for participating!</p><p><br />Next you will be offered to download a log file. Please save it!</p><p><button id='btnfin' class='btnfin' type='button'>Finish and download log</button></p>", timeout: finTaskTimeout, activityTime: 30 });	// add finish button as the last task
*/			
			shuffledArray.push( { id: "FIN", txt: screenContent.finish, timeout: finTaskTimeout, activityTime: 30 });	// add finish button as the last task
			
			$("body").append("<div id='stopper'></div>");
			stopperTimeoutRef = stopper();
			startTime = Date.now();  //reset start time
			
			// collect log by set interval
			logTaskIntervalRef = setInterval(writeLog, logSampleRate);

			for (i=0; i<shuffledArray.length; i++) {
				planTaskPresentation(i, shuffledArray[i].id, shuffledArray[i].txt, shuffledArray[i].timeout, shuffledArray[i].activityTime);
			}				
		} 
	} 
	
	
	/**
	 *	Manages question presentation scheduling.
	 *	lastTaskTimeOut is the time from start of previous task/question
	 *	Default timeout 0 equals to 30s
	 */
	function planTaskPresentation(i, id, txt, timeout, activityTime) {
		if (timeout == 0) timeout = defaultTaskTimeout;
		var dur = timeout;
		if (i == 0) timeout=0;		//for the 1st question there is no timeout

		lastTaskTimeOut += timeout*1000;
		setTimeout(function() {
							showTask(i, id, txt, dur);
					}, lastTaskTimeOut);
		
		// play alert sounds for every task
		if (id != 'FIN') {
			setTimeout( function() { playAlert(1); taskActive = 1; }, lastTaskTimeOut + timeToReadTask * 1000); 
			setTimeout( function() { playAlert(2); taskActive = 0;}, lastTaskTimeOut + (timeToReadTask + activityTime) * 1000 + 150);  // +150ms for reaction time
		}
		//update the lastTaskTimeOut to include sound events 
		lastTaskTimeOut += (timeToReadTask + activityTime ) * 1000 + 150;  // +1 for reaction time
	}  
	

	/**	
	 *	Push task to the screen 
	 */
	function showTask(i, id, txt, dur) {
		var timelabel = getCurrentTimeString();

		$("#instructions-box").html("");
		$("#instructions-box").append("<h1>" + H1_TITLE + "</h1>");
		$("#instructions-box").append("<h2>Task #" + (i+1) + " [" + id + "]<span id='tasktimelabel'>" + timelabel + "</span><progress value='" + i + "' max='50'></progress></h2>");
		$("#instructions-box").append("<p class='task'>" + txt + "</p>");
		
		// set the global scriptwise task id for logging
		current_task_id = id;
		currentTaskDuration = dur;
	} 
	
	/**	
	 *	Outputs current time as a string 
	 */
	function getCurrentTimeString(withMs) {
		if (withMs === undefined) {
			withMs = false;
		}
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();
		var milliseconds = currentTime.getMilliseconds();
		
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		
		if (withMs == true) return hours + ":" + minutes + ":" + seconds + "," + milliseconds;
		else return hours + ":" + minutes + ":" + seconds;
	} 
	
	/**	
	 *	Outputs time as a string 
	 */
	function getTimeString(msSince1970, withMs) {
		if (withMs === undefined) {
			withMs = false;
		}
		var currentTime = new Date(msSince1970);
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();
		var milliseconds = currentTime.getMilliseconds();
		
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;

		if (withMs == true) return hours + ":" + minutes + ":" + seconds + "," + milliseconds;
		else return hours + ":" + minutes + ":" + seconds;
	} 
	
	
	/** 
	 *	Stops the internal stopper
	 */
	function stopStopper() {
		clearTimeout(stopperTimeoutRef);
	}
	
	/**
	 *	Checks if necessary fields have values on the start form
	 */
	function checkFields() {
		var result = true;
		if ($("#cond-optics").val() == '') {
			$("#cond-optics").css("border-color", "red");
			$("#cond-optics").css( "background-color", "#FFDDDD" );
			result = false;
		}
		if ($("#cond-background").val() == '') {
			$("#cond-background").css("border-color", "red");
			$("#cond-background").css( "background-color", "#FFDDDD" );
			result = false;
		}
		if ($("#cond-light").val() == '') {
			$("#cond-light").css("border-color", "red");
			$("#cond-light").css( "background-color", "#FFDDDD" );
			result = false;
		}
		if ($("#cond-calibrate").val() == '') {
			$("#cond-calibrate").css("border-color", "red");
			$("#cond-calibrate").css( "background-color", "#FFDDDD" );
			result = false;
		}
		return result;	
	}  
	
	/**
	 *	Reset form error highlightning
	 */
	$( "select" ).change(function () {
			$( this ).css("border", "1px solid #AAA");
			$( this ).css("background-color", "#FFF");
	});
	

	/** 
	 *	Initialize Webgazer with clmtracker         
	 */
	function initializeWg() {
		
		window.localStorage.clear();
		webgazer.setRegression('ridge') 		//  ridge || linear || interaction  
				.setTracker('clmtrackr')
				.addMouseEventListeners() 
				.begin()
				.showPredictionPoints(showCam());
		
		var width = 320;
		var height = 240;
		var topDist = '60px';
		var leftDist = '0px';
		
		var setup = function() {
			var video = document.getElementById('webgazerVideoFeed');
			video.style.display = 'block';
			video.style.position = 'absolute';
			video.style.top = topDist;
			video.style.left = leftDist;
			video.width = width;
			video.height = height;
			webgazer.params.imgWidth = width;
			webgazer.params.imgHeight = height;
			
			var overlay = document.createElement('canvas');
			overlay.id = 'overlay';
			overlay.style.position = 'absolute';
			overlay.width = width;
			overlay.height = height;
			overlay.style.top = topDist;
			overlay.style.left = leftDist;
			document.body.appendChild(overlay);
			
			if ( showCam() == false ) overlay.style.display = 'none';
			if ( showCam() == false  ) {
				video.style.top = -2 * height + 'px';
				video.style.left = -2 * width + 'px';
			}
			
			var cl = webgazer.getTracker().clm;
		
			function drawLoop() {
				requestAnimFrame(drawLoop);
				overlay.getContext('2d').clearRect(0,0,width,height);
				if (cl.getCurrentPosition()) {
					cl.draw(overlay);
				}
			}
			if ( showCam() ) drawLoop();
		};		
		
		function checkIfReady() {
			if (webgazer.isReady()) {
				setup();	
				setTimeout( function() { trackerTaskReference = initTrackerJs(trackerTaskReference); }, 300);	// let wg to initialize first to have DOM objects ready
				
			} else {
				setTimeout(checkIfReady, 100);
			}
		}
		
		setTimeout(checkIfReady,100);		// check if webgazer is ready
	} 
	
	
	/** 
	 *	Initializes tracking.js from webgazer for   *
	 *	fast face detection on camview              *
	 */
	function initTrackerJs(trackerTaskReference) {
		var tjsCanvas, tjsContext;
		var width = 320;
		var height = 240;
		var topDist = '60px';
		var leftDist = '0px';
		
		if (showCam()) { // show cam feed for debugging
			$( "body" ).append( "<canvas id='overlay-trackerjs'></canvas>");
			tjsCanvas = document.getElementById('overlay-trackerjs');
				tjsCanvas.style.position = 'absolute';
				tjsCanvas.width = width;
				tjsCanvas.height = height;
				tjsCanvas.style.top = topDist;
				tjsCanvas.style.left = leftDist;
				tjsCanvas.style.zIndex  = 9999;
			tjsContext = tjsCanvas.getContext('2d');	
		} 
		
		var tracker = new tracking.ObjectTracker(['face']);	//var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
			tracker.setInitialScale(4);  	// the smaller, the smaller faces it can discover, however small values are in trouble with big faces over all area.
			tracker.setStepSize(1);			// how fast is the recognition
			tracker.setEdgesDensity(0.1);	// the smaller the better; 0.1 would be ok
			
		tracker.on('track', function(event) {
			if ( showCam() )tjsContext.clearRect(0, 0, tjsCanvas.width, tjsCanvas.height);
			if (event.data.length === 0) {
				// No objects were detected in this frame.
				tjsDetection = {x: "", y: "", width: "", height: "" };
			} else {
				event.data.forEach(function(rect) {
					if ( showCam() ) {
						tjsContext.strokeStyle = '#a64ceb';
						tjsContext.strokeRect(rect.x, rect.y, rect.width, rect.height);
						tjsContext.font = '11px Helvetica';
						tjsContext.fillStyle = "#fff";
						tjsContext.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
						tjsContext.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);	
					} 
					tjsDetection = {x: rect.x, y: rect.y, width: rect.width, height: rect.height };
				});
			}
		});

		try {
			var trackerTask = tracking.track('#webgazerVideoFeed', tracker);
			trackerTaskReference = trackerTask;
			return trackerTask;
		}
		catch(err) {
			alert("Failed to initialize TrackerJs: " + err.message + ". If by default your webcam is not allowed, enable it and refresh the page.");
		}
	} 
	
	
	/**
	 * Mousemove detection via jQuery
	 */
	$(document).mousemove(function( event ) {
		if ( mmoveCoords.x[0] != event.pageX || mmoveCoords.y[0] != event.pageY ) {
			mmoveCoords.x[0] = event.pageX;
			mmoveCoords.y[0] = event.pageY;
		}
	}); 
	
	/**
	 * Page scrolling detection via jQuery
	 */
	$( window ).scroll(function() {
		winScrollHistory[0] = 1;
	});
	
	// soundtest options on first page
	$("#sound-ring").click( function() { playAlert(1); });
	$("#sound-ding").click( function() { playAlert(2); });
	

}); // when doc ready

/* ********************************************************************************* */

// load audiofiles
var sound1 = new Audio("./audio/sound_in_ring.mp3");
var sound2 = new Audio ("./audio/sound_out_ding.mp3");

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

/**
 *	Pads numbers with leading zeros
 */
function zeroPadTo2(nonPadded) {
	if (nonPadded < 10) return "0" + nonPadded;
	else return nonPadded;
}

/**
 *	Save to file
 *	Orig. source URL: https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
 */
function saveTextAsFile(textToSave, fileNameToSaveAs)
{
	var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
	var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = textToSaveAsURL;
	downloadLink.onclick = destroyClickedElement;
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);
	downloadLink.click();
}  

/**
 *	Consumed by saveTextAsFile
 */
function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

/**
 *	Plays alert sound
 */
function playAlert(type) {
	switch (type) {
		case 1:
			sound1.play();
		break;
		case 2:
			sound2.play();
		break;
	} 
}

/** 
 * Performs autocalibration task by setting up dots
 */
function autoCalibrate() {
	
	var docHeight = $(document).height();
	var docWidth = $(document).width();
	var dotSize = 100;
	var dotDelay = 950;
	var topDist = (docHeight - docHeight / 2);
	var leftDist = (docWidth - docWidth / 2);
	var i = 0;
	var cDot = document.createElement('div');
	
	cDot.id = 'calibration-dot';
	cDot.style.position = 'absolute';
	cDot.style.width = dotSize + "px";
	cDot.style.height = dotSize + "px";
	cDot.style.borderRadius = dotSize + "px";
	cDot.style.boxShadow = "0px 0px 4px #999";
	cDot.style.backgroundColor = "#FF3333";
	cDot.style.display = "inline-block";
	cDot.style.top = topDist + 'px';
	cDot.style.left = leftDist + 'px';	
	document.body.appendChild(cDot);
	
	var arrX = [0, docWidth-dotSize, docWidth-dotSize, 0, leftDist-dotSize];
	var arrY = [0, 0, docHeight-dotSize, docHeight-dotSize, topDist-dotSize];
	
	for ( i=0; i< arrX.length; i++) {
		$("#calibration-dot").animate({ top: arrY[i], left: arrX[i] });
		$("#calibration-dot").delay(30).fadeIn('fast');
		$("#calibration-dot").delay(dotDelay).fadeOut('slow', function () { autoCalRecord() });
		if (i == arrX.length-1) {
			setTimeout( function() { $("#instructions-box").append("<button id='btnproceed' type='button'>Continue ...</button>"); }, 12000) ;
		}
	}	
} 

/** 
 *	Records autocalibration info into webgazer model.
 *	Used within showing the calibration dots within 
 *	autoCalibrate()
 */
function autoCalRecord() {
	var cb = document.getElementById("calibration-dot"); 
	var x = cb.style.left.substr(0, cb.style.left.length-2);	// get x and y and remove px from the end of left and top
	var y = cb.style.top.substr(0, cb.style.top.length-2);
	webgazer.recordScreenPosition(x,y);
} 

/** 
 *  Necessary things to be done before unloading the tool
 *  - clear local & session  storage
 */	
window.onbeforeunload = function() {
	window.localStorage.clear(); 	// Comment out if you want to save data across different sessions 
	window.sessionStorage.clear(); 
}