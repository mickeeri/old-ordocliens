require "rails_helper"

RSpec.describe User, type: :model do
  it { should validate_presence_of :full_name}
  it { should validate_presence_of :email}
  it { should validate_uniqueness_of(:email).case_insensitive}
  it { should validate_presence_of :user_name}
  it { should validate_presence_of :password}
  it { should validate_length_of(:password).is_at_least(8)}
  it { should validate_length_of(:full_name).is_at_most(100)}
  it { should validate_length_of(:user_name).is_at_most(40)}
  it { should belong_to :firm }
  it { should have_many :clients }






  # it "should be valid" do
  #   user = build(:user)
  #   expect(user).to be_valid
  # end
  #
  # it "should not be valid if password does not match password confirmation" do
  #   user = build(:user)
  #   user.password_confirmation = "somethingelse"
  #   expect(user).not_to be_valid
  # end
  #
  # it "should not be valid if password is less then 6 characters" do
  #   user = build(:user)
  #   user.password = "12345"
  #   user.password_confirmation = "12345"
  #   expect(user).not_to be_valid
  # end
  #
  # it "email should be unique" do
  #   user = build(:user)
  #   another_user = create(:another_user)
  #   user.email = another_user.email
  #   expect(user).not_to be_valid
  # end
  #
  # it "should not be valid witout firm" do
  #   user = build(:user)
  #   user.firm_id = nil
  #   expect(user).not_to be_valid
  # end
end
