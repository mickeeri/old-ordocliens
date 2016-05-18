class ClientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :ssn, :link
  has_one :user
  def link
    client_path(id)
  end
end
