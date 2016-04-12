require 'rails_helper'

RSpec.describe ContactType, type: :model do
  it { should have_many(:contacts) }
  it { should have_many(:clients).through(:contacts) }
end
