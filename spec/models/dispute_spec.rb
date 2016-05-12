require 'rails_helper'

RSpec.describe Dispute, type: :model do
  it { should belong_to :client }
  it { should belong_to :counterpart }
end
