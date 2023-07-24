const $ = jQuery;

$(document).ready(function() {
    $('#sortTable').change(function() {
        var selectedSkill = $(this).val();
        $('.tableBlock .rider-row').each(function() {
          var dataSort = $(this).data('sort');
          var skillsArray = dataSort.split(' ');
    
          if (skillsArray.indexOf(selectedSkill) === -1) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
        var existingButton = $('.wr-reset-btn');
        if (existingButton.length === 0) {
          var button = $('<button>', { 
            text: 'Reset',
            class: 'wr-reset-btn'
          });
          $('#wr-sort').append(button);
        }
      });

      $('#wr-job-application').on('submit', function(e) {
        e.preventDefault();
        $('.handler-message').remove();
    
        var formData = $(this).serialize();
        var token = wr_job_obj.token;
    
        var data = {
            action: "wr_insert_post",
            formData: formData,
            token: token
        };
    
        $.ajax({
            url: wr_job_obj.ajaxurl,
            data: data,
            success: function(response) {
               const {data, title, first_name, last_name, date, skills, name, slug, entry_date} = response;
                if (data === 'success') {
                    var newRow =`
                    <tr class="rider-row" data-sort="${skills}">
                      <td class="post-title"><p>${title}</p></td>
                      <td class="first-name"><p>${first_name}</p></td>
                      <td class="last-name"><p>${last_name}</p></td>
                      <td class="skills"><p>${skills}</p></td>
                      <td class="skills"><p>${entry_date}</p></td>
                    </tr>
                    `;
                    $('.wr-table-sort tbody').append(newRow);

                    var successMessage = $('<p>', {
                      text: wr_job_obj.translations.formSubmissionSuccess,
                      class: 'handler-message'
                    });
                    $('#wr-job-application').append(successMessage);
                } else {
                    // Post insertion failed
                    var errorMessage = $('<p>', { 
                      text: wr_job_obj.translations.formSubmissionError,
                      class: 'handler-message'
                    });
                    $('#wr-job-application').append(errorMessage);
                }
            },
            error: function(xhr, status, error) {
                // Handle errors
                var errorMessage = $('<p>', { 
                  text: wr_job_obj.translations.requestProcessingError,
                  class: 'handler-message'
                });
                $('#wr-job-application').append(errorMessage);
            }
        });
    });
});