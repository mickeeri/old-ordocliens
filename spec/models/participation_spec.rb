require 'rails_helper'

RSpec.describe Participation, type: :model do
  it { should belong_to :client }
  it { should belong_to :lawsuit }
end
