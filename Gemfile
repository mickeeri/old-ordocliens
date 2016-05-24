
source 'https://rubygems.org'

gem 'bootstrap', '~> 4.0.0.alpha3'
gem 'sass-rails', '~> 5.0'
gem "font-awesome-rails"
gem 'rails', '4.2.6'
gem 'jquery-rails'
gem 'turbolinks', '~> 5.0.0.beta'
gem 'jquery-turbolinks'
gem 'jbuilder', '~> 2.0' # TODO: Using this?
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'faker', '~> 1.6', '>= 1.6.3'
gem 'will_paginate', '~> 3.1'
gem 'responders', '~> 2.1', '>= 2.1.2'
gem "slim"
gem 'react-rails', '~> 1.6.2'
gem 'devise'
gem 'pg'
gem 'pg_search'
gem 'active_model_serializers'
gem "js-routes"
gem 'caracal'
gem 'caracal-rails'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'prawn-rails', '0.1.1', git: 'https://github.com/cortiz/prawn-rails.git'
gem 'prawn-table', '0.2.1'

source 'https://rails-assets.org' do
  gem 'rails-assets-es6-promise'
  gem 'rails-assets-tether', '>= 1.1.0'
end

group :development, :test do
  gem 'byebug'
  gem 'rspec-rails', '~> 3.4'
  gem 'rubocop', '~> 0.39.0', require: false
  gem 'factory_girl_rails', '~> 4.6'
  gem 'spring-commands-rspec'
end

group :test do
  gem 'shoulda-matchers'
  gem 'capybara', '~> 2.6', '>= 2.6.2'
  gem 'database_cleaner'
  # gem 'sqlite3'
end

group :development do
  gem 'web-console', '~> 2.0'
  gem 'better_errors'
  gem 'spring'
  gem 'capistrano',         require: false
  gem 'capistrano-rvm',     require: false
  gem 'capistrano-rails',   require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano3-puma',   require: false
  gem 'capistrano-ssh-doctor'
end

group :production do
  gem 'puma'
end
