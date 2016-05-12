require "rails_helper"

RSpec.describe Lawsuit, type: :model do
  it { should have_many :clients }
  it { should have_many :tasks }
  it { should have_many :involvements }
  it { should have_many :participations }
  it { should validate_presence_of :name }
  it { should validate_length_of(:name).is_at_most(100) }
  it "closed should have default value false" do
    client = build(:client)
    lawsuit = client.lawsuits.build(name: "Legal case example")
    expect(lawsuit.closed).to eq(false)
  end
end
