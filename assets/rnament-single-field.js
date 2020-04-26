let formFunctions = Object.create(baseFunctions);

formFunctions.initialize = () => {
  baseFunctions.initialize.call();
  
  //default fields validation
  $('.ui.form')
  .form({ 
    inline: false,
    fields: {
      child_name: 'empty'
    }
  });
  
  $('input#select-name').bind('input', formFunctions.addSelection );
}

formFunctions.addSelection = () => {
  if ($('.ui.form').form('validate form')) {
    let formData = $('.ui.form').form('get values');
    let formString = baseFunctions.buildFormString.call(this, formData);
    
    let htmlString = '<input type="hidden" id="product-template-detail" name="properties[Detail]" value="' + formString + '">';
	
    $('.individual_details').html(htmlString);
	
    $('#AddToCart-product-template').removeAttr('disabled');
  } else {
    $('#AddToCart-product-template').attr('disabled', 'disabled');
  }
}

formFunctions.initialize();

$( document ).ready(function() {
  $('#AddToCart-product-template').attr('disabled', 'disabled');
});