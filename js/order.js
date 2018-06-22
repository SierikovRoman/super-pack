;(function(){

    $(document).ready(function() { 

    //FORM CHECKER FROM ORDER
    $('#orderName, #orderEmail, #orderPhone, #orderMessage').change(function(e){
        formChecker(e.target.id);
        // console.log(e);
    });

    function getCountryCode() {
        var value = $('#orderPhoneCode').val();
        return value
    }

    var checkers = {
        name:  false,
        email: false,
        phone: false,
        message: false
    }

    function formChecker(input_id) {
        var userName = $('#orderName').val();
        var userEmail = $('#orderEmail').val();
        var userPhone = $('#orderPhone').val();
        var userTelephone = getCountryCode() + userPhone;
        var userMessage = $('#orderMessage').val();
        var data = {
            userName, userEmail, userTelephone, userMessage
        }

        var name_pattern = /^[a-zA-ZА-Яа-яёЁЇїІіЄєҐґ]+$/;
        var email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var phone_ukr_pattern = /^[0-9]{9}$/;
        var phone_rus_pattern = /^[0-9]{10}$/;
        var phone_bel_pattern = /^[0-9]{9}$/;

        if (input_id === 'orderName') { nameChecker() } 
        else if(input_id === 'orderEmail') { emailChecker() } 
        else if(input_id === 'orderPhone') { phoneChecker() }
        else if(input_id === 'orderMessage') { messageChecker() }

        function name_ok() { $('#orderName').removeClass('error'); $('#nameHelper').fadeOut();}
        function email_ok() { $('.spam-email').show(); $('#orderEmail').removeClass('error'); $('#emailHelper').fadeOut(); }
        function phone_ok() { $('.spam-phone').show(); $('#orderPhone').removeClass('error'); $('#phoneHelper').fadeOut(); }
        function message_ok() { $('#orderMessage').removeClass('error'); $('#messageHelper').fadeOut(); }
        function name_bad() { $('#orderName').addClass('error'); $('#nameHelper').fadeIn(); }
        function email_bad() { $('.spam-email').hide(); $('#orderEmail').addClass('error'); $('#emailHelper').fadeIn(); }
        function phone_bad() { $('.spam-phone').hide(); $('#orderPhone').addClass('error'); $('#phoneHelper').fadeIn(); }
        function message_bad() { $('#orderMessage').addClass('error'); $('#messageHelper').fadeIn(); }

        function nameChecker() {
            if (userName === '') { name_bad() } 
            else if(!name_pattern.test(userName)){ name_bad() } 
            else { name_ok(); checkers.name = true; console.log(checkers.name)}
        }

        function emailChecker() {
            if(!email_pattern.test(userEmail)){ email_bad() } 
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
            if(userMessage.length < 50){ message_bad() } 
            else { message_ok(); checkers.message = true; console.log(checkers.message)}
        }

        return data

    }


    //SUBMIT FROM ORDER
    $('.submit_order').click(function() {
        if (checkers.name === true && checkers.email === true || checkers.phone === true) {
            var data = formChecker();
            data.model = $('.order_model').text();
            data.price = $('#price_s').text();
            // console.log(data);
            sendData(data);
            $('#orderModal').modal('hide');
        } else {
            console.log('False');
        }
    })

    //SEND DATA FROM ORDER
    function sendData(data) {
        var $url = 'php/telegram_order.php';
        $.ajax({
            data: data,
            type: 'POST',
            url: $url,
        }),function(data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        };
    }

    });

})();