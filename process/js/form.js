'use strict';
const EMAIL = 'example@cumul8.com';

$(() => {
  // Contact form
  var th = $("#timesheet");

  // Method for making sure at least one type field is greater than 0.
  $.validator.addMethod('maxTimeCheck', (value) => {
    if (/^([0-9]?[0-9]|2[0-3])(:[0-5][0-9])$/.test(value)) {
      let time = th.find('#time').val();
      let hours = parseInt(time.split(':')[0]);
      let minutes = parseInt(time.split(':')[1]);
      return 0 !== hours + minutes;
    } else {
      return false;
    }
  }, "* Time cannot be 0 hours and 0 minutes.");

  // Method for validating the time format
  $.validator.addMethod("time24", function(value) {
    return /^([0-9]?[0-9]|2[0-3])(:[0-5][0-9])$/.test(value);
  }, "* Invalid time format.");

  // Form functionality using jQuery.validate
  th.validate({
    validClass: "form--valid",
    errorClass: "form--invalid",
    submitHandler: (form) => {
      th.find('.form--state-in-progress').addClass('show');

      setTimeout(() => {
        let email = th.find('#eaddr').val();
        let time = th.find('#time').val();
        let hours = time.split(':')[0];
        let minutes = time.split(':')[1];
        let message = th.find('#message').val();
        let work = th.find('#work input[name="work"]:checked').val();

        // Set up fake failure to test failure UI
        // Has 3 test cases to cover edge cases
        if (
            (hours == 13 && minutes == 2) ||
            (hours == 0 && minutes == 2) ||
            (hours == 13 && minutes == 0)
          ) {
          // Set mailto link
          let mailto_link = 'mailto:' + EMAIL + '?subject=[Timesheet Manual Submission] ';
          // Append hours and minutes
          mailto_link += (hours != 0) ? hours+'h ' : '';
          mailto_link += (hours != 0 && minutes != 0) ? 'and ' : '';
          mailto_link += (minutes != 0) ? minutes+'m ' : '';
          // Append the work completed
          mailto_link += 'for ' + work;
          // Append the body of the email
          mailto_link += '&body=Message: ';
          mailto_link += (message.length != 0) ? message : '';

          // Set new mailto link
          th.find('a.form--manual-email').attr('href', mailto_link)

          // Hide input and show error
          th.find('.form--state-input').addClass('hide');
          th.find('.form--state-error').addClass('show');
        
        // Otherwise show success UI
        } else {
          // Set success UI to submitted data
          th.find('.form--sub-email span').html(email);

          let time_string = (hours != 0) ? hours+'h ' : '';
          time_string += (hours != 0 && minutes != 0) ? 'and ' : '';
          time_string += (minutes != 0) ? minutes+'m ' : '';
          th.find('.form--sub-time span').html(time_string);

          // Hide input and show success
          th.find('.form--state-input').addClass('hide');
          th.find('.form--state-success').addClass('show');
        }

        th.find('.form--state-in-progress').removeClass('show');
      }, 1000);


      // Code for AJAX Submission
      // var formData = th.serialize();

      // // Submit the form using AJAX.
      // $.ajax({
      //   type: 'POST',
      //   url: th.attr('action'),
      //   data: formData
      // })
      // .done(function(response) {
      //   // Show success message
      //   th.find(".subSuccess").show();
      //   th.find(".subError").hide();

      //   // Clear the form.
        
      // })
      // .fail(function(data) {
      //   // Show error message
      //   th.find(".subSuccess").hide();
      //   th.find(".subError").show();
      // });
    },
    rules: {
      eaddr: {
        required: true,
        maxlength: 40
      },
      time: {
        required: true,
        time24: true,
        maxTimeCheck: true,
        maxlength: 5
      },
      message: {
        maxlength: 1000
      },
      work: {
        required: true
      }
    },
    errorPlacement: (error, element) => {
      if (element.attr('name') == 'work') {
        error.insertBefore('#work');
      } else {
        error.insertBefore(element);
      }
    },
    messages: {
      eaddr: {
        required: '* Email cannot be blank.',
        maxlength: jQuery.validator.format('* Email is too long (limit {0} characters).'),
        email: '* Please enter a valid email.'
      },
      time: {
        required: '* Time cannot be blank',
        maxlength: jQuery.validator.format('* Time is too long (limit {0} characters).')
      },
      message: {
        maxlength: jQuery.validator.format('* Message is too long (limit {0} characters).')
      },
      work: {
        required: '* You must select the type of work.'
      }
    }
  });

  // Try Again, Start Again and clear buttons for form
  th.find('.form--state-error input[type="button"]').on('click', () => {
    th.find('.form--state-error').removeClass('show');
    th.find('.form--state-input').removeClass('hide');
  });

  th.find('.form--state-success input[type="button"]').on('click', () => {
    th[0].reset();
    th.find('.form--valid').removeClass('form--valid');
    th.find('.form--state-success').removeClass('show');
    th.find('.form--state-input').removeClass('hide');
  });

  th.find('.form--state-input input[type="reset"]').on('click', () => {
    th.find('.form--valid').removeClass('form--valid');
  });
});
