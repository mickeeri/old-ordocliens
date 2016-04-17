require "rails_helper"

RSpec.describe LegalCase, type: :model do
  it { should belong_to :client }
  it { should have_many :tasks }
end
