require 'rails_helper'

RSpec.describe Involvement, type: :model do
  it { should belong_to :lawsuit }
  it { should belong_to :counterpart }
end
