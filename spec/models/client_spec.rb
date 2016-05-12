require "rails_helper"

RSpec.describe Client, type: :model do
  let(:client) do
    create(:client)
  end

  it { should validate_presence_of :first_name }
  it { should validate_presence_of :last_name }
  it { should validate_presence_of :ssn }
  # it { should validate_numericality_of  :ssn }
  it { should have_db_index(:ssn) }
  it { should have_db_index(:first_name) }
  it { should have_db_index(:last_name) }
  it { should belong_to :user }
  it { should have_many :lawsuits }
  it "should validate personal number format" do
    client.ssn = "881015-8272"
    expect(client).to be_valid

    client.ssn = "8810158272"
    expect(client).to_not be_valid

    client.ssn = "88105-82727"
    expect(client).to_not be_valid
  end
end
