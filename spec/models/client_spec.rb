require "rails_helper"

RSpec.describe Client, type: :model do
  let(:client) do
    create(:client)
  end

  it { should validate_presence_of :first_name }
  it { should validate_presence_of :last_name }
  it { should validate_presence_of :personal_number }
  # it { should validate_numericality_of  :personal_number }
  it { should have_db_index(:personal_number) }
  it { should have_db_index(:first_name) }
  it { should have_db_index(:last_name) }
  it { should belong_to :user }
  it { should have_many :lawsuits }
  it "should validate personal number format" do
    client.personal_number = "881015-8272"
    expect(client).to be_valid

    client.personal_number = "8810158272"
    expect(client).to_not be_valid

    client.personal_number = "88105-82727"
    expect(client).to_not be_valid
  end
end
