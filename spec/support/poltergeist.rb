require 'capybara/poltergeist'
require 'phantomjs'
Capybara.javascript_driver = :poltergeist

Capybara.register_driver :poltergeist do |app|
    options = {
              js_errors: true, # silences js errors
              timeout: 500, # adjusts timeout in ms
              debug: true
              }
  Capybara::Poltergeist::Driver.new(app, options)
end
