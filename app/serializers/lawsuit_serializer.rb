class LawsuitSerializer < ActiveModel::Serializer
  attributes :id, :name, :closed, :court, :case_number, :created_at, :link
  has_many :counterparts
  has_many :clients

  def link
    lawsuit_path(id)
  end
end
