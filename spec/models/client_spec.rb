require "rails_helper"

RSpec.describe Client, type: :model do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }
  let(:client) { create(:client, user: user) }

  # Presence validation.
  it { should validate_presence_of :first_name }
  it { should validate_presence_of :last_name }
  it { should validate_presence_of :personal_number }

  # Index validation.
  it { should have_db_index(:personal_number) }
  it { should have_db_index(:first_name) }
  it { should have_db_index(:last_name) }

  # Relations
  it { should belong_to :user }
  it { should have_many :lawsuits }

  # Length
  it { should validate_length_of(:city).is_at_most(100) }
  it { should validate_length_of(:co).is_at_most(255) }
  it { should validate_length_of(:first_name).is_at_most(40) }
  it { should validate_length_of(:last_name).is_at_most(60) }
  it { should validate_length_of(:mobile).is_at_most(20) }
  it { should validate_length_of(:note).is_at_most(1000) }
  it { should validate_length_of(:phone_number).is_at_most(20) }
  it { should validate_length_of(:post_code).is_at_least(5) }
  it { should validate_length_of(:post_code).is_at_most(6) }
  it { should validate_length_of(:street).is_at_most(255) }

  # Format
  it "should validate personal number format" do
    client.personal_number = "881015-8272"
    expect(client).to be_valid

    client.personal_number = "8810158272"
    expect(client).to_not be_valid

    client.personal_number = "88105-82727"
    expect(client).to_not be_valid
  end
end
