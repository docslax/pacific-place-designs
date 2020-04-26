let formFunctions = Object.create(baseFunctions);

formFunctions.initialize = () => {
  baseFunctions.initialize.call();
  
  //default fields validation, add them all and we'll remove and re-add as needed
  $('.ui.form')
  .form({ 
    inline: false,
    fields: {
      person_name: 'empty',
      skin_tone: 'empty',
      body_type: 'empty',
      outfit: 'empty',
      hair_colour: 'empty',
      hair_style: 'empty'
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

formFunctions.controlFormFlow = () => {
 	
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
	
    //override Hair Style to remove color
    let styleElm = $(lastDetailsElm).find('.item:contains("Hair Style")');
    styleElm.text(styleElm.text().substring(styleElm.text().indexOf(' ')+1));
    
    //correct the product details input value
    let prodDetails = $(lastDetailsElm).find('.product_details').val().split(',');
    prodDetails.forEach((i, k) => { 
      if (i.toString().trimStart().includes('Hair Style', 1)) { 
        let style = i.split(":"); 
        prodDetails[k] = ' Hair Style:' + style[1]; 
      }
    });
    
    $(lastDetailsElm).find('.product_details').val(prodDetails.join(','));
    
  }
  
  $('#AddToCart-product-template').attr('disabled', 'disabled');
  
  if ($('.individual_details').children().length == 2) {
    $('#addCharacter-product-template').addClass('disabled');
    $('#AddToCart-product-template').removeAttr('disabled');
  }
  
  $('div#hair-style-dropdown').show();
}
formFunctions.removeSelection = (e) => {
  //call base function
  baseFunctions.removeSelection.call(this, e);
  
  console.log('override remove');
  
  let indivDetailsCount = $('.individual_details').children().length;
  
  if (indivDetailsCount < 2) {
    $('#AddToCart-product-template').attr('disabled', 'disabled');
  }
  
  $('#addCharacter-product-template').removeClass('disabled');
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
  
});