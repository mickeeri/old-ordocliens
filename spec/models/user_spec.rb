require "rails_helper"

RSpec.describe User, type: :model do
  it { should validate_presence_of :full_name }
  it { should validate_presence_of :email }
  it { should validate_uniqueness_of(:email).case_insensitive }
  it { should validate_presence_of :user_name }
  it { should validate_presence_of :password }
  it { should validate_length_of(:password).is_at_least(8) }
  it { should validate_length_of(:full_name).is_at_most(100) }
  it { should validate_length_of(:user_name).is_at_most(40) }
  it { should belong_to :firm }
  it { should have_many :clients }
end
