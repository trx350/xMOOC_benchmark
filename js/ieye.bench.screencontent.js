/** 
	*** iEye Benchmark tool screen config file ***
	
	Contains plain HTML for introduction screen and calibration step.
	Change HTML below as necessary.
*/
	

var screenContent = { 
		intro: "<h1>Welcome to the Intellieye Pilot Study</h1> <p>In the following you will be requested to perform different activities you could be engaged with while otherwise normally watching a video. \
					You will only be shown short instructions what to do and not the associated activity itself. \
					Please read the <span style='color:#FFFF00'> instructions in yellow</span> and wait for the sound alert. \
					<p><span style='color:#FFFF00'><b>Act only and immediately after the bell ring sounds</b>.</span> Test the sound here: <span class='sound-play-button' id='sound-ring' title='Play'></span> <br/>Resume focusing for the next task after a <b>'ding'</b> sound. Test the sound here: <span class='sound-play-button' id='sound-ding' title='Play'></span></p> \
					<p align=right>Thank you for your co-operation!</p><br/> \
					<p>Prior to study, please select the values that best describe the study environment: \
					<div class='study-conditions'><span>I am wearing:</span> <select id='cond-optics'> \
						<option value=''> - please select - </option>  \
						<option value='0'>no glasses or lenses</option>\
						<option value='1'>glasses</option>\
						<option value='2'>lenses</option>\
						</select> </div>\
					<div class='study-conditions'><span>The background behind me is:</span> <select id='cond-background'>\
						<option value=''> - please select - </option>  \
						<option value='0'>solid light colour</option>  \
						<option value='1'>solid dark colour</option> \
						<option value='2'>poster, photo, painting or similar</option> \
						<option value='3'>other mixed</option></select> </div>\
					<div class='study-conditions'><span>The light in the room is majorly:</span> <select id='cond-light'> \
						<option value=''> - please select - </option>  \
						<option value='0'>natural, sufficient</option>\
						<option value='1'>natural, but not sufficient (dark)</option>\
						<option value='2'>artificial general light, e.g., ceiling light</option>\
						<option value='3'>on-spot, e.g., desk lamp</option>\
						</select> </div>\
					<div class='study-conditions'><span>Calibrate the system beforehand:</span> <select id='cond-calibrate'>\
						<option value=''> - please select - </option>  \
						<option value='1'>Yes, calibrate</option> \
						<option value='0'>No, do not calibrate</option> \
						</select> * as instructed</div>\
					</p>\
					<p>&nbsp;</p> <p>Experiment ID: <input type='text' id='expid' maxlength='30'> \
					Prediction rate: <select id='prate'><option value='100'>100ms</option><option value='500'>500ms</option><option value='1000'>1000ms</option></select> \
					<button id='start' type='button'>Click to START!</button></p>" , 
		calibrate: "<h1>Intellieye Pilot Study</h1> <p>For quick calibration please face the camera. You will be shown 5 red dots, starting soon. Please follow the dots with your eyes trying to focus on them until the dot appears at a new place. Press \"Continue ...\" when the calibration process is over.</p><br/>"
		
	};