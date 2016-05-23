require "rails_helper"

RSpec.describe Counterpart, type: :model do
  it { should validate_presence_of :first_name }
  it { should validate_presence_of :last_name }
  it { should validate_presence_of :personal_number }
  it { should have_db_index(:personal_number) }
  it { should have_db_index(:first_name) }
  it { should have_db_index(:last_name) }
  it { should have_many :lawsuits }
  it { should have_many :clients }
  it { should have_many :involvements }
  it { should have_many :disputes }
end
