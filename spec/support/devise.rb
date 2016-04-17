RSpec.configure do |config|
  # Test helpers for Devise
  config.include Devise::TestHelpers, type: :controller
  config.include Devise::TestHelpers, type: :view
end
