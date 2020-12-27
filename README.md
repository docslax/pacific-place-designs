## Pacific Place Designs Website Modifications

# /layout/theme.liquid
- custom scripts for Semanti UI components
    - core
    - dropdown
    - checkbox
    - modal

#  /templates/product.liquid
Product templates used to differentiate the template to be used by the product. 

The code for the templates never changes and is stored in the /snippets/base-product-template.liquid

| short name         | template name                     | description                                                                                                        |
|--------------------|-----------------------------------|--------------------------------------------------------------------------------------------------------------------|
| product            | product.liquid                    | default selection used for all non-customized products                                                             |
| nobuy              | product.nobuy.liquid              | used to set the add to cart button to disabled                                                                     |
| ornament           | product.ornament.liquid           | used for ornaments, contains custom form code used in ornament ordering. Configured based on the product  metadata |
| personalized-pairs | product.personalized-pairs.liquid | use for any product that uses a   personalized pair design. Configured  based on the product metadata.             |

# /templates/product-template.liquid
This is what controls the differences in the templates based on the product template name. 
Further customizations can be achieved by using the product metafield in conjunction with the product template name to select which field-snippet is used.

# /snippets/*.liquid
This is where the form layout and control is processed. 
Which snippet is loaded is based on the product template selected and optionally any field-snippet metafield data.

Each snippet may process code differently and at the end calls a javascript asset to process the functionality of the form.

# /assets/*.js
This is where the code that controls form functionality resides.

## Managing Metadata
Metadata controls most of the dynamic form field setup using liquid and javascript

