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

