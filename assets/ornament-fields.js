var formFunctions = {
  initialize : function() {
    $('div.ui.dropdown').dropdown();
    
  	$('div.radio.checkbox').checkbox({ 
    	onChecked: function() { 
          var value = $(this).val();
          var inputElm = $('#header-text')
          if (value.length == 0) {
              inputElm.val('');
              inputElm.attr('placeholder', 'e.g. The Smith Family 2019');
              inputElm.parent().removeClass('disabled');
          } else {
              inputElm.val(value);
              inputElm.parent().addClass('disabled');
          }
  		}
  	});

  	$('div.ui.dropdown.age-group').dropdown('setting', 'onChange', function(value, text, $selectedItem) {
      // custom action
      if (value == 'Child') {
        $('#select-age').attr('placeholder', 'Enter Age');
        $('#select-age').parent().removeClass('disabled');
      } else {
        $('#select-age').attr('placeholder', 'Age Not Required');
        $('#select-age').parent().addClass('disabled');
      }
    });
  },
  resetDropdown : function(dropdownId, defaultText) {
    $(dropdownId)
      .parent()
      .children('.text')
      .text(defaultText)
      .addClass('default');
    $(dropdownId)
    	.removeAttr('value');
    $(dropdownId)
      .parent()
      .children('.menu')
      .children('.active.selected')
      .removeClass('active')
      .removeClass('selected');
  },
  removeSelection : function(e) {
    $(e).parents("div.individual_detail")[0].remove();

    if ($('.individual_details').children().length == 0) {
      $('.details_header').hide();
      $('#AddToCart-product-template').attr('disabled', 'disabled');
    }
  },
  addSelection : function() {
    if (formFunctions.validateSelections() != false) {
      //get the form values
      var currentCount = $('.individual_details').children().length + 1;

      var selectName = $('#select-name').val();
      var selectAging = $('#select-aging').val();
      var selectAge = $('#select-age').val();
      var selectChar = $('#select-character').val();

      var buildString = 'Name: ' + selectName + ', Character: ' + selectChar + ', AgeGroup: ' + selectAging;
      if (selectAge != '') {
        buildString += ', Age: ' + selectAge;
      }
      
      var htmlString = '<div class="ui raised card individual_detail">';
      htmlString += '<input type="hidden" id="product-template-detail_' + currentCount + '" name="properties[Detail_' + currentCount + ']" value="' + buildString + '">';
      htmlString += '<div class="content">';
      htmlString += '<i class="right floated red delete icon" alt="Delete" onclick="formFunctions.removeSelection(this);" style="cursor: pointer;"></i>'
      htmlString += '<div class="ui red ribbon label">' + selectName + '</div>';
      htmlString += '<div class="description">';
      htmlString += '<div class="ui bulleted list">';
      htmlString += '<div class="item">Character: ' + selectChar + '</div>';
      htmlString += '<div class="item">Age Group: ' + selectAging + '</div>';
      if (selectAge != '') {
        htmlString += '<div class="item">Age: ' + selectAge + '</div>';
      }
      htmlString += '</div></div></div></div>';

      $('.individual_details').append(htmlString);

      formFunctions.resetDropdown('#select-character', 'Select Character');
      formFunctions.resetDropdown('#select-aging', 'Age Group');
      $('#select-name').val('');
      $('#select-age').val('');

      if ($('.individual_details').children().length > 0) {
        $('.details_header').show();
        $('#AddToCart-product-template').removeAttr('disabled');
      }
    }
  },
  validateField : function(fieldId) {
    console.log($(fieldId).val().length);
   	var isValid = ($(fieldId).val().length > 0);
    
    if (!$(fieldId).parent().hasClass('disabled')) {
      if (isValid) {
          $(fieldId).parent().removeClass('error');  	
      } else {
          $(fieldId).parent().addClass('error');
      }
    }
    
    return isValid;
  },
  validateSelections : function() {
    var validName = formFunctions.validateField('#select-name');
    var validChar = formFunctions.validateField('#select-character');
    var validAging = formFunctions.validateField('#select-aging');
    var validAge = true;
    
    if ($('#select-aging').val() == "Child") {
     	validAge = formFunctions.validateField('#select-age');
    }
    
	return validName && validAging && validAge && validChar;
  }
}

formFunctions.initialize();

$( document ).ready(function() {
  if ($('.individual_details').children().length == 0) {
    $('.details_header').hide();
    $('#AddToCart-product-template').attr('disabled', 'disabled');
  }
});