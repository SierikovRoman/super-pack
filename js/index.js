// ;(function() {
$(document).ready(function() { 

    //SLIDER INIT
    $('.model-slider').slick({
        infinite: true,
        arrows: false,
        draggable: false
    });

    $('.image-slider-f').slick({
        infinite: true,
        dots: true
    });

    $('.image-slider-s').slick({
        infinite: true,
        dots: true
    });

    //MODEL SLIDER BUTTONS
    $(".prev").click(function () {
        $('.model-slider').slick('slickPrev');
        checkSlider();
    });
    
    $(".next").click(function () {
        $('.model-slider').slick('slickNext');
        checkSlider();
    });

    //SLIDE CHECKER
    function checkSlider() {
        var slider = $('.model-slider');
        var currentSlide = slider[0].slick.currentSlide;
        if( currentSlide === 0 ) {
            $('.prev').css('visibility', 'hidden');
            $('.next').css('visibility', 'visible');
        } else {
            $('.prev').css('visibility', 'visible');
            $('.next').css('visibility', 'hidden');
        }
    }
    checkSlider();

    

    //SELECT PRICE
    var select = false;
    $('#length').change(function(e){
        select = true;
        selectPrice();
    })

    var price = ['18200', '21600', 'netu'];
    var price_tape = ['19200', '22600', 'netu'];

    function selectPrice() {
        var tape = $('#tape').prop('checked');
        if(tape !== true) {
            standart();
        } else {
           standartPlus();
        }
    }

    function standart() {
        var length = Number($('#length').val());
        if(length === 290){
            $('#price').text(price[0]);
        } else if(length === 420) {
            $('#price').text(price[1]);
        } else if(length === 500){
            $('#price').text(price[2]);
        }
    };

    function standartPlus() {
        var length = Number($('#length').val());
        if(length === 290){
            $('#price').text(price_tape[0]);
        } else if(length === 420) {
            $('#price').text(price_tape[1]);
        } else if(length === 500){
            $('#price').text(price_tape[2]);
        }
    };


    //CHECK FOR CHECKBOX
    $('#tape').change(function(){
        tapeChecked();
    })

    function tapeChecked() {
        var tape = $('#tape').prop('checked');
        console.log('Tape: ' + tape, ' Select: ' + select);
        var price = Number($('#price').text());

        if (tape == true) {
            $('#price').text(price + 1000);
        } else  {
            $('#price').text(price - 1000);
        }
    }
    

    //FORM CHECKER FROM QUESTIONS
    $('#userName, #userEmail, #userPhone, #userMessage').change(function(e){
        formChecker(e.target.id);
    });

    function getCountryCode() {
        var value = $('#userPhoneCode').val();
        return value
    }

    var checkers = {
        name:  false,
        email: false,
        phone: false,
        message: false
    }

    function formChecker(input_id) {
        var userName = $('#userName').val();
        var userEmail = $('#userEmail').val();
        var userPhone = $('#userPhone').val();
        var userTelephone = getCountryCode() + userPhone;
        var userMessage = $('#userMessage').val();
        var data = {
            userName, userEmail, userTelephone, userMessage
        }

        var name_pattern = /^[a-zA-ZА-Яа-яёЁЇїІіЄєҐґ]+$/;
        var email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var phone_ukr_pattern = /^[0-9]{9}$/;
        var phone_rus_pattern = /^[0-9]{10}$/;
        var phone_bel_pattern = /^[0-9]{9}$/;

        if (input_id === 'userName') { nameChecker() } 
        else if(input_id === 'userEmail') { emailChecker() } 
        else if(input_id === 'userPhone') { phoneChecker() }
        else if(input_id === 'userMessage') { messageChecker() }

        function name_ok() { $('#userName').removeClass('error'); $('#nameHelp').fadeOut();}
        function email_ok() { $('.spam-email').show(); $('#userEmail').removeClass('error'); $('#emailHelp').fadeOut(); }
        function phone_ok() { $('.spam-phone').show(); $('#userPhone').removeClass('error'); $('#phoneHelp').fadeOut(); }
        function message_ok() { $('#userMessage').removeClass('error'); $('#messageHelp').fadeOut(); }
        function name_bad() { $('#userName').addClass('error'); $('#nameHelp').fadeIn(); }
        function email_bad() { $('.spam-email').hide(); $('#userEmail').addClass('error'); $('#emailHelp').fadeIn(); }
        function phone_bad() { $('.spam-phone').hide(); $('#userPhone').addClass('error'); $('#phoneHelp').fadeIn(); }
        function message_bad() { $('#userMessage').addClass('error'); $('#messageHelp').fadeIn(); }

        function nameChecker() {
            if (userName === '') { name_bad() } 
            else if(!name_pattern.test(userName)){ name_bad() } 
            else { name_ok(); checkers.name = true; console.log(checkers.name)}
        }

        function emailChecker() {
            if (userEmail === '') { email_bad() } 
            else if(!email_pattern.test(userEmail)){ email_bad() } 
            else { email_ok(); checkers.email = true; console.log(checkers.email)}
        }

        function phoneChecker() {
            if (userPhone === '') { phone_bad() } 
            else if(getCountryCode() === '+380'){ 
                console.log('ukr');
                if (!phone_ukr_pattern.test(userPhone)) {
                    phone_bad();
                    console.log('ukr_bad: ' + userPhone);
                } else { phone_ok(); checkers.phone = true; console.log(checkers.phone) }
            } else if(getCountryCode() === '+7'){
                console.log('ru');
                if (!phone_rus_pattern.test(userPhone)) {
                    phone_bad();
                    console.log('rus_bad');
                } else { phone_ok() }
            } else if(getCountryCode() === '+375') {
                console.log('bel');
                if (!phone_bel_pattern.test(userPhone)) {
                    phone_bad();
                    console.log('bal_bad');
                } else { phone_ok() }
            }
            else { phone_ok(); checkers.phone = true }
        }

        function messageChecker() {
            if (userMessage === '') { message_bad() } 
            else if(userMessage.length < 50){ message_bad() } 
            else { message_ok(); checkers.message = true; console.log(checkers.message)}
        }

        return data

    }

    //SUBMIT FROM QUESTIONS
    $('.submit_questions').click(function() {
        if (checkers.name === true && checkers.email === true && checkers.phone === true) {
            var data = formChecker();
            console.log(data);
            sendData(data);
        } else {
            console.log('False');
        }
    })

    //SEND DATA FROM QUESTIONS
    function sendData(data) {
        var $url = 'php/telegram_question.php';
        $.ajax({
            data: data,
            type: 'POST',
            url: $url,
        }),function(data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        };
    }
        
    //ARROW LINKS
    var sec_1 = $(".first_section").position();
    var sec_2 = $(".second_section").position();
    var sec_3 = $(".third_section").position();
    var sec_4 = $(".fourth_section").position();
    var sec_5 = $(".fifth_section").position();
    var sec_6 = $(".sixth_section").position();
    var sec_7 = $(".seventh_section").position();
    var sec_8 = $(".eight_section").position();
    var sec_9 = $(".ninth_section").position();
    var sec_10 = $(".tenth_section").position();
    var sec_11 = $(".eleventh_section").position();
    var sec_12 = $(".twelfth_section").position();

    var $btnTop = $(".btn-top");

    $('.anchor').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: sec_2.top
        }, 1500);
        return false;
    });

    /* BUTTON ON TOP */
    $(window).on("scroll", function(){
        var h =  $(window).innerHeight();
        if($(window).scrollTop() >= h){
            $btnTop.fadeIn({queue: false, duration: 'slow'});
        }else{
            $btnTop.fadeOut({queue: false, duration: 'slow'});
        }	
    });

    $btnTop.on("click", function(event) {
        $("html, body").animate({
            scrollTop: 0
        }, 1500)
    });


    $('.nav-link').click(function(e){
        e.preventDefault();
        goToByScroll(e.target.name);
    })

    function goToByScroll(name){
        var id = '#' + name;     
        $('html,body').animate({
            scrollTop: $(id).offset().top - 25+'px'
        }, 2500, "swing");
        $(".navbar-collapse").collapse('hide'); // hide menu on mobile view
    }

});

function showOrderModal(id, model) {
    $('#orderModal').modal('show');
    $('.order_model').text(model);
    var tape = $('#tape').prop('checked');
    if(id === 1) {
        $(".model_image").attr("src","assets/images/cw-350-b/cw-350-b_1.png");
        var price = Number($('#price').text());
        $("#price_s").text(price);
    } else if (id === 2){
        $(".model_image").attr("src","assets/images/cw-500/cw-500_1.png");
        var price = Number($('#price').text());
        $("#price_s").text(price);
        if (tape === true){ $('#optional').show(); }
        else { $('#optional').hide(); }
        checkLength();
    }
}

function checkLength() {
    var length = $('#length').val();
    console.log(length)
}

// window.onerror = function(message, url, line, col, error){
//     var error = {'message': message, 'url': url, 'line': line, 'col': col};
//     ajax(error);
//     console.log(window);
// }


$.ajax({
    data: 123,
    type: 'POST',
    url: 'http://localhost:4000/dolphins',

    success: function(data, status) {
        console.log("Data: " + data.response + "\nStatus: " + status);
    },
    error: function(error) {
    console.log(error);
    }
})




























