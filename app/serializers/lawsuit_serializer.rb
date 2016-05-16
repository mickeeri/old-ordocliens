class LawsuitSerializer < ActiveModel::Serializer
  attributes :id, :name, :closed, :court, :case_number, :slug, :primary_client
  def primary_client
    Lawsuit.find(self.id).clients.first.full_name
  end
end
