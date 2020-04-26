const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  
  let formFunctions = {
    sectionId : $('div[data-section-type="product"]').attr('data-section-id'),
    initialize : function() {
      //added code to emulate a thumbnail click 
      // when the associated drop down is clicked
      // this works better in full mode rather than 
      // mobile mode.
      $('div#skin-tone-dropdown')
      .on('click', function() {
           $('a[href*="choices_first_page"]').click();
      });
      
      $('div#top-dropdown')
      .on('click', function() {
           $('a[href*="choices_first_page"]').click();
      });
      
      $('div#bottom-dropdown')
      .on('click', function() {
           $('a[href*="choices_first_page"]').click();
      });
      
      $('div#drink-dropdown')
      .on('click', function() {
           $('a[href*="choices_second_page"]').click();
      });
      
      $('div#accessory-dropdown')
      .on('click', function() {
           $('a[href*="choices_second_page"]').click();
      });
      
      $('div#black-hair-style-dropdown')
      .on('click', function() {
           $('a[href*="choices_black_hair"]').click();
      });
      
      $('div#blonde-hair-style-dropdown')
      .on('click', function() {
           $('a[href*="choices_blonde_hair"]').click();
      });
      
      $('div#brown-hair-style-dropdown')
      .on('click', function() {
           $('a[href*="choices_brown_hair"]').click();
      });
      
      $('div#grey-hair-style-dropdown')
      .on('click', function() {
           $('a[href*="choices_grey_hair"]').click();
      });
      
      $('div#red-hair-style-dropdown')
      .on('click', function() {
           $('a[href*="choices_red_hair"]').click();
      });
      
      //TODO: Add hats (optional)
      
      $('div#hair-color-dropdown')
      .on('change', function() {
        let color = $(this).children('input#selected-hair-color').val();
        formFunctions.hideAllHairStyleDD();
        $('#' + color.toLowerCase() + '-hair-style-dropdown').show();
      });
      
      $('div.ui.dropdown').dropdown({
        onChange: function(value, text, $selectedItem) {
             //formFunctions.validateSelections();
        }
      });
      
      
    },
    removeSelection : function(e) {
      $(e).parents("div.individual_detail")[0].remove();
      let indivDetailsCount = $('.individual_details').children().length;
      
      if (indivDetailsCount == 0) {
        $('.details_header').hide();
        
      }
      if (indivDetailsCount < 2) {
        $('#AddToCart-product-template').attr('disabled', 'disabled');
      }
      
      $('#addCharacter-product-template').removeClass('disabled');
    },
    addSelection : function() {
      if (formFunctions.validateSelections() != false) {
        //get the form values
        let newId = 1;
        
        //need to figure out which detail value we are adding, if ones already been added
        //TODO: Will need to re-factor this once i start dealing with 'families'
        if ($('.individual_details').children().length > 0) {
          let itemId = $($('.individual_details').children()[$('.individual_details').children().length - 1]).children()[0].id
          newId = itemId.split('_')[1] == '1' ? 2 : 1
        }
        
        var selectedName = $('#person-name').val();
        var selectedSkinTone = $('#selected-skin-tone').val();
        var selectedBodyType = $('#selected-body-type').val();
        var selectedTop = $('#selected-top').val();
        var selectedBottom = $('#selected-bottom').val();
        var selectedDrink = $('#selected-drink').val();
        var selectedHairColor = $('#selected-hair-color').val();
        var selectedHairStyle = $('#selected-' + $('#selected-hair-color').val().toLowerCase() + '-hair-style').val();
        var selectedAccessory = $('#selected-accessory').val();
        
        var buildString = 'Name: ' + selectedName + ', Skin Tone: ' + selectedSkinTone + ', Body Type: ' + selectedBodyType + ', Top: ' + selectedTop + ', ';
        buildString += 'Bottom: ' + selectedBottom + ', Drink: ' + selectedDrink + ', Hair Color: ' + selectedHairColor + ', Hair Style: ' + selectedHairStyle;
        if (selectedAccessory != '') {
          buildString += ', Accessory: ' + selectedAccessory;
        }
        
        var htmlString = '<div class="ui raised card individual_detail">';
        htmlString += '<input type="hidden" class="product_details" id="product-template-detail_' + newId + '" name="properties[Detail_' + newId + ']" value="' + buildString + '">';
        htmlString += '<div class="content">';
        htmlString += '<i class="right floated red delete icon" alt="Delete" onclick="formFunctions.removeSelection(this);" style="cursor: pointer;"></i>'
        htmlString += '<div class="ui red ribbon label">' + selectedName + '</div>';
        htmlString += '<div class="description">';
        htmlString += '<div class="ui bulleted list">';
        htmlString += '<div class="item">Name: ' + selectedName + '</div>';
        htmlString += '<div class="item">Skin Tone: ' + selectedSkinTone + '</div>';
        htmlString += '<div class="item">Body Type: ' + selectedBodyType + '</div>';
        htmlString += '<div class="item">Top: ' + selectedTop + '</div>';
        htmlString += '<div class="item">Bottom: ' + selectedBottom + '</div>';
        htmlString += '<div class="item">Drink: ' + selectedDrink + '</div>';
        htmlString += '<div class="item">Hair Color: ' + selectedHairColor + '</div>';
        htmlString += '<div class="item">Hair Style: ' + selectedHairStyle + '</div>';
        if (selectedAccessory != '') {
          htmlString += '<div class="item">Accessory: ' + selectedAccessory + '</div>';
        }
        htmlString += '</div></div></div></div>';
          
        $('.individual_details').append(htmlString);
      
        
        formFunctions.resetDropdown('#selected-skin-tone', 'Select Skin Tone');
        formFunctions.resetDropdown('#selected-body-type', 'Select Body Type');
        formFunctions.resetDropdown('#selected-top', 'Select Top');
        formFunctions.resetDropdown('#selected-bottom', 'Select Bottom');
        formFunctions.resetDropdown('#selected-drink', 'Select Drink');
        formFunctions.resetDropdown('#selected-hair-color', 'Select Hair Color');
        formFunctions.resetDropdown('#selected-accessory', 'Select Accessory');
        formFunctions.resetAllHairStyleDD();
        $('#person-name').val('');
        
        if ($('.individual_details').children().length > 0) {
          $('.details_header').show();
        }
        
        var person_limit = $('input#person_limit').val()
        
        if ($('.individual_details').children().length == parseInt(person_limit)) {
          $('#addCharacter-product-template').addClass('disabled');
        }
        if ($('.individual_details').children().length >= 2) {
         $('#AddToCart-product-template').removeAttr('disabled'); 
        }
      }
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
    validateField : function(fieldId) {
      console.log(fieldId);
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
      var validName = formFunctions.validateField('#person-name');
      var validSkinTone = formFunctions.validateField('#selected-skin-tone');
      var validBodyType = formFunctions.validateField('#selected-body-type');
      var validTop = formFunctions.validateField('#selected-top');
      var validBottom = formFunctions.validateField('#selected-bottom');
      var validDrink = formFunctions.validateField('#selected-drink');
      var validHairColor = formFunctions.validateField('#selected-hair-color');
      var validHairStyle = formFunctions.validateField('#selected-' + $('#selected-hair-color').val().toLowerCase() + '-hair-style');
      
      return validName && validSkinTone && validBodyType && validTop && validBottom && validDrink && validHairColor && validHairStyle;
      
    },
    hideAllHairStyleDD() {
      $('#hair-style-dropdown').hide();
        $('#black-hair-style-dropdown').hide();
      $('#brown-hair-style-dropdown').hide();
      $('#grey-hair-style-dropdown').hide();
      $('#blonde-hair-style-dropdown').hide();
      $('#red-hair-style-dropdown').hide(); 
    },
    resetAllHairStyleDD() {
      formFunctions.resetDropdown('#selected-black-hair-style', 'Select Hair Style');
      formFunctions.resetDropdown('#selected-brown-hair-style', 'Select Hair Style');
      formFunctions.resetDropdown('#selected-grey-hair-style', 'Select Hair Style');
      formFunctions.resetDropdown('#selected-blonde-hair-style', 'Select Hair Style');
      formFunctions.resetDropdown('#selected-red-hair-style', 'Select Hair Style');
      formFunctions.hideAllHairStyleDD();
      $('#hair-style-dropdown').show();
    }
  }
  
  formFunctions.initialize();
  
  $( document ).ready(function() {
    $('#black-hair-style-dropdown').hide();
    $('#brown-hair-style-dropdown').hide();
    $('#grey-hair-style-dropdown').hide();
    $('#blonde-hair-style-dropdown').hide();
    $('#red-hair-style-dropdown').hide();
    
    //lookup the section id
    //let sectionId = $('div[data-section-type="product"]').attr('data-section-id');
    
    //use the section id to disable the AddToCart button and set the text to 
    // the theme string unavailable
    $('#AddToCart-' + formFunctions.sectionId).prop('disabled', true);
    $('#AddToCartText-' + formFunctions.sectionId).text(theme.strings.addToCart);
    
    //TODO: validate dropdown selections and activate add to cart button when done.
    
    
    //$(this.selectors.shopifyPaymentButton, this.$container).hide();
    
    if ($('.individual_details').children().length == 0) {
      $('.details_header').hide();
      $('#AddToCart-product-template').attr('disabled');
    }
    
  });