require "rails_helper"

RSpec.describe LawsuitType, type: :model do
  it { should have_many :lawsuits }
  it { should validate_presence_of :name }
end
