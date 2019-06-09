$('.else').on(click, function(){
	var numberOne,
	numberTwo,
	summ;

	numberOne = $('numberOne').val();
	numberTwo = $('numberTwo').val();
	
	 numberOne = parseInt(numberOne);
	 numberTwo = parseInt(numberTwo);

	 if(isNaN(numberOne)){
					numberOne= 0;
			}

			if (isNaN( numberTwo ) ){
					numberTwo = 0;
			}

	summ =	numberOne + numberTwo;


});