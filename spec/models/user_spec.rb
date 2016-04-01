require "rails_helper"

RSpec.describe User, type: :model do
  it "should be valid" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "should not be valid if password does not match password confirmation" do
    user = build(:user)
    user.password_confirmation = "somethingelse"
    expect(user).not_to be_valid
  end

  it "should not be valid if password is less then 6 characters" do
    user = build(:user)
    user.password = "12345"
    user.password_confirmation = "12345"
    expect(user).not_to be_valid
  end

  it "email should be unique" do
    user = build(:user)
    another_user = create(:another_user)
    user.email = another_user.email
    expect(user).not_to be_valid
  end

  it "should not be valid witout firm" do
    user = build(:user)
    user.firm_id = nil
    expect(user).not_to be_valid
  end
end

# # Returns a User instance that's not saved
# user = build(:user)
#
# # Returns a saved User instance
# user = create(:user)
#
# # Returns a hash of attributes that can be used to build a User instance
# attrs = attributes_for(:user)
#
# # Returns an object with all defined attributes stubbed out
# stub = build_stubbed(:user)
#
# # Passing a block to any of the methods above will yield the return object
# create(:user) do |user|
#   user.posts.create(attributes_for(:post))
# end
