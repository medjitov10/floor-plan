source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.6'
# Use sqlite3 as the database for Active Record
gem 'wicked_pdf'
gem 'wkhtmltopdf-binary',  "0.12.3"
gem 'redis'
gem 'resque'
gem 'puma', '~> 3.7'
gem 'bootstrap-sass'
gem 'sass-rails', '~> 5.0'
gem 'font-awesome-rails'
gem "paperclip", "~> 5.0.0"
gem 'jquery-rails'
gem 'jquery-ui-rails', '~> 5.0.5'
gem 'sass-rails', '~> 5.0'
gem 'dotenv-rails'
gem 'devise'
gem 'friendly_id'
gem 'aws-sdk', '~> 2.3'
gem 'uglifier'
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'sqlite3'
  gem 'annotate'
  gem 'listen', '~> 3.0.5'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end
group :poduction do
  gem 'pg'
  gem 'rails_12factor'
end
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
