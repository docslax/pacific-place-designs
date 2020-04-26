let formFunctions = Object.create(baseFunctions);

formFunctions.initialize = () => {
  baseFunctions.initialize.call();
  
  //default fields validation, add them all and we'll remove and re-add as needed
  $('.ui.form')
  .form({ 
    inline: false,
    fields: {
      age_group: 'empty',
      age: 'empty',
      gender: 'empty',
      outfit: 'empty',
      top: 'empty',
      bottom: 'empty',
      hair_colour: 'empty',
      hair_style: 'empty'
    }
  });
  
  $('div#gender-dropdown')
  .dropdown({
    onChange: function(value, text, $selectedItem) { 
      formFunctions.controlFormFlow();
      /*
      //clear any colour selections
      $('div#hair-colour-dropdown').dropdown('clear');
      //reset all the hair style dropdowns, and show the default
      formFunctions.resetAllHairStyleDD();
      $('#hair-style-dropdown').show();

      if (value.toLowerCase() == 'male') {
        //change color text to skip
        $('div#hair-colour-dropdown').dropdown('set text', 'Skip to Hair Style');
        //enable the hair style and disable the hair colour
        $('div#hair-style-dropdown').removeClass('disabled');
        $('div#hair-colour-dropdown').addClass('disabled');
        //remove the hair colour validation and add the basic style
        $('.ui.form').form('remove field', 'hair_colour');
        $('.ui.form').form('add rule', 'hair_style', ['empty']);
      } else {
        //restore the hair colour placeholder text
        $('div#hair-colour-dropdown').dropdown('restore placeholder text');
        //disable the hair style and enable the hair colour
        $('div#hair-style-dropdown').addClass('disabled');
        $('div#hair-colour-dropdown').removeClass('disabled');
        //add validation for the hair colour drop down 
        // NOTE: style will take care of itself on colour selection
        $('.ui.form').form('add rule', 'hair_colour', ['empty']);
      }
      
      //check if dress only needs toggling
      formFunctions.checkIfDressOnly();
      */
    }
  });
  
  $('div#age-group-dropdown')
  .dropdown({
    onChange: function(value, text, $selectedItem) {
      formFunctions.controlFormFlow();
    }
  });
  
  $('div#dress-only').checkbox({
    onChecked: function() {
      formFunctions.toggleTopBottomDropdownOn(false);
    },
    onUnchecked: function() {
      formFunctions.toggleTopBottomDropdownOn(true);
    }
  });
  
  $('div#hair-colour-dropdown')
  .dropdown({
    onChange: function(value, text, $selectedItem) {
      formFunctions.resetAllHairStyleDD();
      $('#' + value.toLowerCase() + '-hair-style-dropdown').show();

      // clear validation for hair colors
      $('input.hair-style').each( function(i, e) { 
        if ($('.ui.form').form('get validation', $(e))) {
          $('.ui.form').form('remove field', $(e).attr('name'));
        }
      });

      $('.ui.form').form('add rule', value.toLowerCase() + '_hair_style', ['empty']);
    }
  });
}

//TODO: Outfit, Top&Bottom, Dress all need to be validated based on selection of Gender/Age
// need to refactor and rewrite the code that is currently handling this
/***
This function will be called by the onChange method of dropdowns 
that affect the form flow, i.e. Gender, Age Group
*/

/***
Business Logic
- Adult Males: Don't enter Age, Select Outfit Only, No Dress Option, Hair Style Only
- Adult Females: Don't enter Age, Select Outfit Only, No Dress Option, Hair Colour and Style
- Child Males: Enter Age, Select Top & Bottom, No Dress Option, Kids Hair Style Only
- Child Females: Enter Age, Select Top & Bottom, Dress Option (No Top & Bottom), Hair Colour & Style or Kids Hair Style

*/
formFunctions.addAllRules = () => {
  $('.ui.form')
  .form({ 
    inline: false,
    fields: {
      age_group: 'empty',
      age: 'empty',
      gender: 'empty',
      outfit: 'empty',
      top: 'empty',
      bottom: 'empty',
      hair_colour: 'empty',
      hair_style: 'empty',
      kids_hair_style: 'empty',
      dress_only: 'empty'
    }
  });
}

formFunctions.controlFormFlow = () => {
  //get the values for the gender & age group dropdowns
  let gender = $('.ui.form').form('get value', 'gender');
  let ageGroup = $('.ui.form').form('get value', 'age_group');
  
  //INFO: Removing rules if they don't exist results in an error that may cause elements
  // to not function properly. So we add them all every time, and only remove the ones 
  // we won't be using
  formFunctions.addAllRules();
  
  //remove any error flags on fields
  $('form .field.error').removeClass('error');
  
  if (ageGroup.toLowerCase() == 'adult') {
    //disable age text field input
    commonFunctions.disableField('#age-input', true);
    //disable top & bottom
    commonFunctions.disableField('#top-dropdown', true);
    commonFunctions.disableField('#bottom-dropdown', true);
    //disable dress only
    commonFunctions.disableField('#dress-only', true);
    //disable hair style kids
    $('div#hair-colour-dropdown > div.menu > div.item[data-value="Kids"]').hide();
    
    //enable outfit
    commonFunctions.disableField('#outfit-dropdown', false);
    
    //remove rules top & bottom, age, hair style kids
    $('.ui.form').form('remove fields', ['top', 'bottom', 'age', 'kids_hair_style']);
   	
    if (gender.toLowerCase() == 'male') {
      //disable hair color and clear any value it had
      commonFunctions.disableField('#hair-colour-dropdown', true);
      $('div#hair-colour-dropdown').dropdown('clear');
      
      //enable hair style
      commonFunctions.disableField('#hair-style-dropdown', false);
    	    
      //remove rules hair color
      $('.ui.form').form('remove field', 'hair_colour');
    } else {
      //disable hair style, reset them all and show the 'default'
      commonFunctions.disableField('#hair-style-dropdown', true);
      formFunctions.resetAllHairStyleDD();
      $('#hair-style-dropdown').show();
      
      //enable hair color and clear it
      commonFunctions.disableField('#hair-colour-dropdown', false);
      $('div#hair-colour-dropdown').dropdown('clear');
    }
  } else {
    //disable outfit
    commonFunctions.disableField('#outfit-dropdown', true);
    
    //enable age text field input
    commonFunctions.disableField('#age-input', false);
    //enable top & bottom
    commonFunctions.disableField('#top-dropdown', false);
    commonFunctions.disableField('#bottom-dropdown', false);
    
    //enable hair style kids option
    $('div#hair-colour-dropdown > div.menu > div.item[data-value="Kids"]').show();
    
    //remove rules outfit
    $('.ui.form').form('remove field', 'outfit');
    
    if (gender.toLowerCase() == 'male') {
      //disable dress only
      commonFunctions.disableField('#dress-only', true);
      
      //disable hair color, and clear any values it had
      commonFunctions.disableField('#hair-colour-dropdown', true);
      $('div#hair-colour-dropdown').dropdown('clear');
      
      //enable hair style kids
      formFunctions.resetAllHairStyleDD();
      $('#kids-hair-style-dropdown').show();
      
      //remove rules dress only, hair color
      $('.ui.form').form('remove fields', ['hair_colour', 'dress_only']);
    } else {
      //disable hair style, reset them all and show the 'default'
      commonFunctions.disableField('#hair-style-dropdown', true);
      formFunctions.resetAllHairStyleDD();
      $('#hair-style-dropdown').show();

      //enable hair color and clear it
      commonFunctions.disableField('#hair-colour-dropdown', false);
      $('div#hair-colour-dropdown').dropdown('clear');
      
      //enable dress only
      commonFunctions.disableField('#dress-only', false);
    }
  }
}

formFunctions.toggleOutfitsDropdownOn = (isEnabled) => {
  $('form .field.error').removeClass('error');
  
  if (isEnabled) {
    $('div#outfit-column').removeClass('disabled');
    $('div#top-dropdown').addClass('disabled');
    $('div#bottom-dropdown').addClass('disabled');
    
    $('.ui.form').form('remove fields', ['top', 'bottom']);
    $('.ui.form').form('add rule', 'outfit', ['empty']);
  } else {
    $('div#outfit-column').addClass('disabled');
    $('div#top-dropdown').removeClass('disabled');
    $('div#bottom-dropdown').removeClass('disabled');
    
    $('.ui.form').form('remove field', 'outfit');
    $('.ui.form').form('add rule', 'top', ['empty']);
    $('.ui.form').form('add rule', 'bottom', ['empty']);
  }
}

formFunctions.toggleTopBottomDropdownOn = (isEnabled) => {
  $('form .field.error').removeClass('error');
  if (isEnabled) {
    $('div#top-dropdown').removeClass('disabled');
    $('div#bottom-dropdown').removeClass('disabled');

    $('.ui.form').form('add rule', 'top', ['empty']);
    $('.ui.form').form('add rule', 'bottom', ['empty']);
  } else {
    $('div#top-dropdown').dropdown('clear');
    $('div#bottom-dropdown').dropdown('clear');

    $('div#top-dropdown').addClass('disabled');
    $('div#bottom-dropdown').addClass('disabled');

    $('.ui.form').form('remove fields', ['top', 'bottom']);
  }
}

formFunctions.checkIfDressOnly = () => {
  let ageGroup = $('input#selected-age-group').val();
  let gender = $('input#selected-gender').val();

  if ((ageGroup.toLowerCase() == 'child') && (gender.toLowerCase() == 'female')) {
    $('div#dress-only').removeClass('disabled'); 
  } else {
    $('div#dress-only').checkbox('set unchecked');
    $('div#dress-only').addClass('disabled');
    formFunctions.toggleTopBottomDropdownOn(true);
  }
}

formFunctions.resetAllHairStyleDD = () => {
  $('div.dropdown.hair-style').dropdown('clear');
  $('div.dropdown.hair-style').hide();
}

formFunctions.addSelection = () => {
  // call base function
  if (baseFunctions.addSelection.call()) {
	
    //** override display elements **//
    let lastDetailsElm = $('.individual_details').children()[$('.individual_details').children().length-1]
	
    //override dress only
    $(lastDetailsElm).find('.item:contains("Dress")').text("Outfit: Dress Only");
	
    //override Hair Style to remove color
    let styleElm = $(lastDetailsElm).find('.item:contains("Hair Style")');
    styleElm.text(styleElm.text().substring(styleElm.text().indexOf(' ')+1));
    
    //correct the product details input value
    let prodDetails = $(lastDetailsElm).find('.product_details').val().split(',');
    prodDetails.forEach((i, k) => { 
      if (i.toString().trimStart().startsWith('Dress')) { 
        prodDetails[k] = " Outfit: Dress Only"; 
      }
      
      if (i.toString().trimStart().includes('Hair Style', 1)) { 
        let style = i.split(":"); 
        prodDetails[k] = ' Hair Style:' + style[1]; 
      }
    });
    
    $(lastDetailsElm).find('.product_details').val(prodDetails.join(','));
    
  }
}

formFunctions.initialize();

$( document ).ready(function() {
  
  //use the section id to disable the AddToCart button and set the text to 
  // the theme string unavailable
  $('#AddToCart-' + formFunctions.sectionId).prop('disabled', true);
  $('#AddToCartText-' + formFunctions.sectionId).text(theme.strings.addToCart);
  
  if ($('.individual_details').children().length == 0) {
    $('.details_header').hide();
    $('#AddToCart-product-template').attr('disabled');
  }
  
  $('div#kids-style-column').hide();
});