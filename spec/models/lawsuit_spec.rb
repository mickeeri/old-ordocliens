require "rails_helper"

RSpec.describe Lawsuit, type: :model do
  let(:firm) { create(:firm) }
  let(:user) { create(:user, firm: firm) }

  it { should have_many :clients }
  it { should have_many :tasks }
  it { should have_many :involvements }
  it { should have_many :participations }
  it "closed should have default value false" do
    client = create(:client, user: user)
    lawsuit_type = create(:lawsuit_type)
    lawsuit = client.lawsuits.create(lawsuit_type_id: lawsuit_type.id)
    expect(lawsuit.closed).to eq(false)
  end
  it { should have_db_index(:court) }
  it { should have_db_index(:case_number) }
  it { should have_db_index(:slug) }
end
