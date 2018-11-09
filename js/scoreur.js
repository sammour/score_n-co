$(function() {

	var custom_deadline = false

	function get_deadline() {
		let time_in_minutes = 0.1;
		let current_time = Date.parse(new Date());
		let deadline = new Date(current_time + time_in_minutes*60*1000);
		return deadline   
	}


	function time_remaining(endtime){
		let countdown   = Date.parse(endtime) - Date.parse(new Date());
		let seconds     = Math.floor( (countdown/1000) % 60 );
		let secondsTens = Math.floor(seconds / 10);
		let secondsOnes = seconds % 10;
		let minutes     = Math.floor( (countdown/1000/60) % 60 );
		return {'total':countdown, 'minutes':minutes, 'secondsTens':secondsTens, 'secondsOnes':secondsOnes};
	}


	var timeinterval;
	function run_clock(endtime){
		function update_clock(){
			let t = time_remaining(endtime);
			$('#pendantMatch-actions-timer--minutes').html(t.minutes);
			$('#pendantMatch-actions-timer--secondes').html(t.secondsTens +''+ t.secondsOnes);
			if(t.total<=0){ 
				clearInterval(timeinterval); 
				let actual_class = parseInt($('.pendantMatch-actions--quart-temp span').attr('data-qt'));
				let qt = actual_class + 1;
				$('.pendantMatch-actions--quart-temp span').attr('data-qt', qt);
				$('.pendantMatch-actions--quart-temp span').html('Q'+qt);
				$('#pendantMatch-actions-startButton #state').removeClass('stop').addClass('start').text('START');  
				$('#pendantMatch-actions-timer--minutes').html('10');
				$('#pendantMatch-actions-timer--secondes').html('00');
				custom_deadline = true;
			}
		}
		update_clock(); // run function once at first to avoid delay
		timeinterval = setInterval(update_clock,1000);
	}
	var deadline = get_deadline();
	run_clock(deadline);


	var paused = false; // is the clock paused?
	var time_left; // time left on the clock when paused

	function pause_clock(){
		if(!paused){
			paused = true;
			clearInterval(timeinterval); // stop the clock
			time_left = time_remaining(deadline).total; // preserve remaining time
		}
	}
	pause_clock()
	function resume_clock(custom_deadline=false){
		if(paused){
			paused = false;
			deadline = custom_deadline ? get_deadline() :  new Date(Date.parse(new Date()) + time_left);
			run_clock(deadline);
		}
	}


	$(document).ready(function() {

		$('.change-score div').click(function() {
			let team  = $(this).parent('div').attr('id');
			let point = parseInt($(this).find('span').text())
			let compteur = '#pendantMatch-bandeau-'+team;
			let old_score = parseInt($(compteur).text());
			let new_score = old_score + point
			$(compteur).text(new_score)
		})
		
		$('#pendantMatch-actions-startButton, .change-score div').click(function() {
			let state = $('#pendantMatch-actions-startButton').find('#state').attr('class')
			if (state == 'start' && $(this).parent('.change-score').length == 0) {
				if (custom_deadline) {
					paused = true
					resume_clock(custom_deadline)
					custom_deadline = false;
				} else {
					resume_clock()          
				}
				$('#pendantMatch-actions-startButton #state').removeClass('start').addClass('stop').text('STOP')
			} else if (state == 'stop')  {
				$('#pendantMatch-actions-startButton #state').removeClass('stop').addClass('start').text('START')
				pause_clock()
			}
		})
	})
})