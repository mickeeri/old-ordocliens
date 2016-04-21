
source 'https://rubygems.org'

gem 'bootstrap-sass', '~> 3.3', '>= 3.3.6'
gem 'rails', '4.2.6'
gem 'jquery-rails'
gem 'turbolinks', '~> 5.0.0.beta'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jquery-turbolinks'
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'faker', '~> 1.6', '>= 1.6.3'
# gem 'bcrypt', '~> 3.1', '>= 3.1.11'
gem 'will_paginate', '~> 3.1'
gem 'responders', '~> 2.1', '>= 2.1.2'
gem "slim"
gem 'react-rails', '~> 1.6.2'
gem 'devise'
gem 'pg'
gem 'pg_search'
gem 'active_model_serializers'
gem "js-routes"

source 'https://rails-assets.org' do
  gem 'rails-assets-es6-promise'
  gem 'rails-assets-fetch'
end

gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  gem 'rspec-rails', '~> 3.4'
  gem 'rubocop', '~> 0.39.0', require: false
  #gem 'sqlite3'
  gem 'factory_girl_rails', '~> 4.6'
  gem 'spring-commands-rspec'
end

group :test do
  gem 'shoulda-matchers'
  gem 'capybara', '~> 2.6', '>= 2.6.2'
  gem 'database_cleaner'
  gem 'sqlite3'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  gem 'better_errors'
  gem 'spring'
  gem 'capistrano',         require: false
  gem 'capistrano-rvm',     require: false
  gem 'capistrano-rails',   require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano3-puma',   require: false
end

group :production do
  gem 'puma'
end
