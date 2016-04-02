require "rails_helper"

RSpec.describe Client, type: :model do
  let(:client) do
    build(:client)
  end

  it "should be valid" do
    expect(client).to be_valid
  end

  it "should not be valid without first name" do
    client.first_name = ""
    expect(client).not_to be_valid
  end

  it "should not be valid without last name" do
    client.last_name = ""
    expect(client).not_to be_valid
  end

  it "should not be valid without ssn" do
    client.ssn = ""
    expect(client).not_to be_valid
  end

  it "ssn should be numerical" do
    client.ssn = "A810158B72"
    expect(client).not_to be_valid
  end

  it "should not be valid without user" do
    client.user = nil
    expect(client).not_to be_valid
  end
end
