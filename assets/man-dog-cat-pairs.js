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
      $('div#cat-dropdown')
      .on('click', function() {
           $('a[href*="cats"]').click();
      });
      
      $('div#dog-dropdown')
      .on('click', function() {
           $('a[href*="dogs"]').click();
      });
      
      $('div#hair-dropdown')
      .on('click', function() {
           $('a[href*="hair_choices"]').click();
      });
      
      $('div#shirt-pants-dropdown')
      .on('click', function() {
           $('a[href*="SHIRTS_AND_PANTS"]').click();
      });
      
      $('div.ui.dropdown').dropdown({
        onChange: function(value, text, $selectedItem) {
             formFunctions.validateSelections();
        }
      });
      
      //code to toggle the associated pet drop down
      // on check
      $('div.radio.checkbox').checkbox({ 
          onChecked: function() { 
            var value = $(this).val();
            var opp = (value == 'dog') ? 'cat' : 'dog';
            
            $('#' + opp + '-dropdown').hide();
            $('#' + value + '-dropdown').show();
            
            formFunctions.resetDropdown('#selected-' + opp, capitalize(opp));
            
            $('#AddToCart-' + formFunctions.sectionId).prop('disabled', true);
              $('#AddToCartText-' + formFunctions.sectionId).text(theme.strings.unavailable);
          }
      });
    },
    resetDropdown : function(dropdownId, defaultText) {
      console.log(dropdownId);
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
      
      return isValid;
    },
    validateSelections : function() {
      //let sectionId = $('div[data-section-type="product"]').attr('data-section-id');
      let variantsValidated = true;
      //validate the variants, if one isn't selected it'll return false
      for (let x = 0; x < $('input[id^=SingleOptionSelector]').length; x++) {
             variantsValidated = formFunctions.validateField('input#SingleOptionSelector-' + x);
      }
      
      let validHair = formFunctions.validateField('#selected-hair');
      let validShirtPants = formFunctions.validateField('#selected-shirt-pants');
      let validPet = formFunctions.validateField('#selected-' + $('div.ui.checkbox.checked > input').val());
      
      /*console.log(variantsValidated);
      console.log(validHair);
      console.log(validShirtPants);
      console.log(validPet);*/
      
      if (variantsValidated && validHair && validShirtPants && validPet) {
          $('#AddToCart-' + formFunctions.sectionId).prop('disabled', false);
            $('#AddToCartText-' + formFunctions.sectionId).text(theme.strings.addToCart);
      };
      
    }
  }
  
  formFunctions.initialize();
  
  $( document ).ready(function() {
    $('#dog-dropdown').hide();
    
    //lookup the section id
    //let sectionId = $('div[data-section-type="product"]').attr('data-section-id');
    
    //use the section id to disable the AddToCart button and set the text to 
    // the theme string unavailable
    $('#AddToCart-' + formFunctions.sectionId).prop('disabled', true);
    $('#AddToCartText-' + formFunctions.sectionId).text(theme.strings.unavailable);
    
    //TODO: validate dropdown selections and activate add to cart button when done.
    
    
    //$(this.selectors.shopifyPaymentButton, this.$container).hide();
    /*if ($('.individual_details').children().length == 0) {
      $('.details_header').hide();
      $('#AddToCart-product-template').attr('disabled', 'disabled');
    }*/
  });