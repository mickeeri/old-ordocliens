require "rails_helper"

RSpec.describe Client, type: :model do
  it { should validate_presence_of :first_name }
  it { should validate_presence_of :last_name }
  it { should validate_presence_of :ssn }
  it { should validate_numericality_of  :ssn }
  it { should have_db_index(:ssn) }
  it { should have_db_index(:first_name) }
  it { should have_db_index(:last_name) }
  it { should belong_to :user }
  it { should have_many :legal_cases }
  it { should have_many(:contacts) }
  it { should have_many(:contact_types).through(:contacts) }
end
