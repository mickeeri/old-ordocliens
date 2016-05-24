require 'prawn'
PrawnRails.config do |config|
  config.page_layout = :landscape
  config.page_size   = "A3"
  config.skip_page_creation = false
end
