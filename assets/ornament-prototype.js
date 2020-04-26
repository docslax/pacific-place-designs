let commonFunctions = {
    capitalize : (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    },
    capitalizeAll : (s) => {
      if (typeof s !== 'string') return ''
      return s.split(' ').map( w =>  w.substring(0,1).toUpperCase()+ w.substring(1)).join(' ');
    },
    disableField : (f, o) => {
      if (o) {
        $(f).addClass('disabled');
      } else {
        $(f).removeClass('disabled');
      }
    }
  }
  
  let baseFunctions = {
    sectionId : $('div[data-section-type="product"]').attr('data-section-id'),
    initialize : function() {
      //init the checkbox and dropdowns in the form
      $('div.ui.radio.checkbox').checkbox();
      $('div.ui.dropdown').dropdown();
    },
    linkImageonClick : function(dropdownSelector, imgName) {
         $(dropdownSelector)
      .on('click', function() {
           $('a[href*="' + imgName + '"]').click();
      });
    },
    removeSelection : function(e) {
      console.log('in base');
      console.log(e);
      
      $(e).parents("div.individual_detail")[0].remove();
      
      $('input.product_details').each( 
        function(idx, elm) {
          let newIdx = idx+1
          $(elm).prop('id', 'product-template-detail_' + newIdx);
          $(elm).attr('name', 'properties[Detail_' + newIdx + ']');
        }
      )
      
      if ($('.individual_details').children().length == 0) {
        $('.details_header').hide();
        $('#AddToCart-product-template').attr('disabled', 'disabled');
      }
    },
    addSelection : function() {
      if ($('.ui.form').form('validate form')) {
        //get the form values
        let newId = $('.individual_details').children().length + 1;
        
        let formData = $('.ui.form').form('get values');
        
        $('.individual_details').append(formFunctions.buildMemberCard(formData, newId, formFunctions.buildFormString(formData)));
        
        $('.ui.form').form('reset');
        
        if ($('.individual_details').children().length > 0) {
          $('.details_header').show();
          $('#AddToCart-product-template').removeAttr('disabled');
        }
        
        return true;
      } else {
        return false;
      }
    },
    buildFormString: function(formData) {
      let buildString = '';
      
      for (var key in formData) {
        if (formData[key].length > 0) {
          let keyDisplay = commonFunctions.capitalizeAll(key.replace(/_/g, ' '));
          buildString += keyDisplay + ': ' + formData[key] + ', ';
        }
      }
      console.log(buildString);
      return buildString.substring(0, buildString.length - 2);
    },
    buildMemberCard: function(formData, id, formString) {
      let htmlString = '<div class="ui raised card individual_detail">';
      htmlString += '<input type="hidden" class="product_details" id="product-template-detail_' + id + '" name="properties[Detail_' + id + ']" value="' + formString + '">';
      htmlString += '<div class="content">';
      htmlString += '<i class="right floated red delete icon" alt="Delete" onclick="formFunctions.removeSelection(this);" style="cursor: pointer;"></i>'
      htmlString += '<div class="ui red ribbon label"> </div>';
      htmlString += '<div class="description">';
      htmlString += '<div class="ui bulleted list">';
      
      for (var key in formData) {
        if (formData[key].length > 0) {
          let keyDisplay = commonFunctions.capitalizeAll(key.replace(/_/g, ' '));
          htmlString += '<div class="item">' + keyDisplay + ': ' + formData[key] + '</div>';
        }
      }
      
      htmlString += '</div></div></div></div>';
      
      return htmlString;
    }
  }