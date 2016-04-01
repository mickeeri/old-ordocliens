require 'rails_helper'

RSpec.describe Client, type: :model do
  let(:client) 
  client = build(:client)

  it "should be valid" do
    byebug
    expect(client).to be_valid
  end

  it "should not be valid witout first_name" do
    client.first_name = ""
    expect(client).not_to be_valid
  end
end
