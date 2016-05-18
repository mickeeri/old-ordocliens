class UserSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name, :full_name
  def full_name
    "#{first_name} #{last_name}"
  end
end
