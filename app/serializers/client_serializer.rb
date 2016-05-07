class ClientSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :ssn, :link
  def link
    client_path(self.id)
  end
end
