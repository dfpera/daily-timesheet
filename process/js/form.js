'use strict';
const EMAIL = 'example@cumul8.com'

$(() => {
  // Contact form
  var th = $("#timesheet");

  // Method for making sure at least one type field is greater than 0.
  $.validator.addMethod('timeCheck', () => {
    let hours = th.find('#hours').val();
    let minutes = th.find('#minutes').val();
    return 0 !== parseInt(hours) + parseInt(minutes);
  }, "* Time cannot be 0 hours and 0 minutes.");

  // Form functionality using jQuery.validate
  th.validate({
    validClass: "form--valid",
    errorClass: "form--invalid",
    submitHandler: (form) => {
      th.find('.form--state-in-progress').addClass('show');

      setTimeout(() => {
        let email = th.find('#eaddr').val();
        let hours = th.find('#hours').val();
        let minutes = th.find('#minutes').val();
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
      hours: {
        required: true,
        min: 0,
        max: 24,
        digits: true,
        timeCheck: true
      },
      minutes: {
        required: true,
        min: 0,
        max: 59,
        digits: true,
        timeCheck: true
      },
      message: {
        maxlength: 1000
      },
      work: {
        required: true
      }
    },
    groups: {
      key_valid_from: 'hours minutes'
    },
    errorPlacement: (error, element) => {
      if (element.attr('id') == 'hours' || element.attr('id') == 'minutes') {
        error.insertAfter('input#minutes');
      } else if (element.attr('name') == 'work') {
        error.insertBefore('#work');
      } else {
        error.insertAfter(element);
      }
    },
    messages: {
      eaddr: {
        required: '* Email cannot be blank.',
        maxlength: jQuery.validator.format('* Email is too long (limit {0} characters).')
      },
      hours: {
        required: '* Hours cannot be blank.',
        min: '* Hours cannot be negative.',
        max: jQuery.validator.format('* Hours cannot exceed {0}.'),
        digits: '* Must be a number.'
      },
      minutes: {
        required: '* Minutes cannot be blank.',
        min: '* Minutes cannot be negative.',
        max: jQuery.validator.format('* Minutes cannot exceed {0}.'),
        digits: '* Must be a number.'
      },
      message: {
        maxlength: jQuery.validator.format('* Message is too long (limit {0} characters).')
      },
      work: {
        required: '* You must select what the type of work.'
      }
    }
  });

  // Try Again and Start Again buttons for form
  $('.form--state-error input[type="button"]').on('click', () => {
    $('.form--state-error').removeClass('show');
    $('.form--state-input').removeClass('hide');
  });

  $('.form--state-success input[type="button"]').on('click', () => {
    th[0].reset();
    $('.form--state-success').removeClass('show');
    $('.form--state-input').removeClass('hide');
  });
});
