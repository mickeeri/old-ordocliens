require "rails_helper"

RSpec.describe PriceCategory, type: :model do
  it { should have_many :tasks }
end
