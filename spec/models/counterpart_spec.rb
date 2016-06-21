require "rails_helper"

RSpec.describe Counterpart, type: :model do
  let(:counterpart) { create(:counterpart, firm: create(:firm)) }

  # Presence
  it { should validate_presence_of :first_name }
  it { should validate_presence_of :last_name }
  it { should validate_presence_of :personal_number }

  # DB index
  it { should have_db_index(:first_name) }
  it { should have_db_index(:last_name) }
  it { should have_db_index(:personal_number) }

  # Relations
  it { should have_many :clients }
  it { should have_many :disputes }
  it { should have_many :involvements }
  it { should have_many :lawsuits }

  # Length
  it { should validate_length_of(:first_name).is_at_most(60) }
  it { should validate_length_of(:info).is_at_most(1000) }
  it { should validate_length_of(:last_name).is_at_most(60) }
  it { should validate_length_of(:representative).is_at_most(60) }

  it "should validate personal number format" do
    counterpart.personal_number = "881015-8272"
    expect(counterpart).to be_valid

    counterpart.personal_number = "001015-8272"
    expect(counterpart).to be_valid

    counterpart.personal_number = "8810158272"
    expect(counterpart).to_not be_valid

    counterpart.personal_number = "88105-82727"
    expect(counterpart).to_not be_valid

    counterpart.personal_number = "881015"
    expect(counterpart).to_not be_valid
  end
end
