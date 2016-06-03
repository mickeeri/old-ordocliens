
source 'https://rubygems.org'

gem 'rails', '4.2.6'
gem 'react-rails', '~> 1.6.2'

gem 'active_model_serializers'
gem 'bootstrap', '~> 4.0.0.alpha3'
gem 'caracal-rails'
gem 'caracal'
gem 'devise'
gem 'faker', '~> 1.6', '>= 1.6.3'
gem 'jbuilder', '~> 2.0' # TODO: Using this?
gem 'jquery-rails'
gem 'jquery-turbolinks'
gem 'pg_search'
gem 'pg'
gem 'prawn-rails', '0.1.1', git: 'https://github.com/cortiz/prawn-rails.git'
gem 'prawn-table', '0.2.1'
gem 'responders', '~> 2.1', '>= 2.1.2'
gem 'sass-rails', '~> 5.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'turbolinks', '~> 5.0.0.beta'
gem 'uglifier', '>= 1.3.0'
gem 'will_paginate', '~> 3.1'
gem "font-awesome-rails"
gem "js-routes"
gem "slim"

source 'https://rails-assets.org' do
  gem 'rails-assets-es6-promise'
  gem 'rails-assets-tether', '>= 1.1.0'
end

group :development, :test do
  gem 'byebug'
  gem 'factory_girl_rails', '~> 4.6'
  gem 'rspec-rails', '~> 3.4'
  gem 'rubocop', '~> 0.39.0', require: false
  gem 'spring-commands-rspec'
end

group :test do
  gem 'capybara', '~> 2.6', '>= 2.6.2'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'poltergeist'
  gem 'shoulda-matchers'
  gem 'sqlite3'
end

group :development do
  gem 'better_errors'
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rails',   require: false
  gem 'capistrano-rvm',     require: false
  gem 'capistrano-ssh-doctor'
  gem 'capistrano',         require: false
  gem 'capistrano3-puma',   require: false
  gem 'guard-rspec', require: false
  gem 'spring'
  gem 'web-console', '~> 2.0'
end

group :production do
  gem 'puma'
end
