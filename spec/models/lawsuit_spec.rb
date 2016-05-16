require "rails_helper"

RSpec.describe Lawsuit, type: :model do
  it { should have_many :clients }
  it { should have_many :tasks }
  it { should have_many :involvements }
  it { should have_many :participations }
  it { should validate_presence_of :name }
  it { should validate_length_of(:name).is_at_most(100) }
  it "closed should have default value false" do
    client = create(:client)
    lawsuit = client.lawsuits.create(name: "Legal case example")
    expect(lawsuit.closed).to eq(false)
  end
  # it { should have_db_index(:slug) }
  # it { should have_db_index(:case_number) }
end
