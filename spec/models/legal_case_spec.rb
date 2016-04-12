require "rails_helper"

RSpec.describe LegalCase, type: :model do
    it { should belong_to :client }
end
